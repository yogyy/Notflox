import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      exp: number;
      iat: number;
      accessToken?: string;
      jti: string;
      name: string;
      picture: string;
      sub: string;
    } & DefaultSession["user"];
  }
}
