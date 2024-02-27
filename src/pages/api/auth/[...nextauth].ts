import { compare } from "bcrypt";
import prisma from "@/lib/db/prisma";
import { Adapter } from "next-auth/adapters";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getClientIp } from "request-ip";
import { ratelimit } from "@/lib/redis";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const ip = getClientIp(req) as string;

        const { success } = await ratelimit.limit(ip);
        if (!success) throw new Error("Too Many Request");

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Incorrect email or password");
        }

        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.sub = user?.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = token as Session["user"];
      return session;
    },
  },

  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt", maxAge: 3600 * 24 * 7 },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// export default NextAuth(authOptions);

const authHandler = NextAuth(authOptions);
export default async function handler(...params: any[]) {
  await authHandler(...params);
}
