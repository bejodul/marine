import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import NextAuth from "next-auth"
import { sign } from "jsonwebtoken";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  session: {
    maxAge: 100000,

  },
  callbacks: {
    async session({ session, token }) {
      const jwtToken = sign(token, process.env.NEXTAUTH_SECRET);
      session.accessToken = jwtToken;

      return session;
    },
    async jwt({ token }) {
      return token
    },
  },
}

export default NextAuth(authOptions)
