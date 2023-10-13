import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      createdAt: string;
      email: string;
      emailVerified: string;
      exp: number;
      hashedPassword: string;
      iat: number;
      id: string;
      image: string;
      jti: string;
      name: string;
      picture: string;
      sub: string;
      updatedAt: string;
    };
  }
}
