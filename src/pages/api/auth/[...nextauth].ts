import { IncomingMessage } from "http"; // Import the types from the Node.js HTTP package

import NextAuth, { NextAuthOptions, Session, User } from "next-auth"; // Import the types from the package

import { PrismaAdapter } from "@next-auth/prisma-adapter"; // Import the adapter

import DiscordProvider from "next-auth/providers/discord"; // Import the Discord provider

import { prisma } from "@/lib/prisma"; // The adapter requires a prisma instance

const getBaseUrl = (req: IncomingMessage) => {
  // Extract the base URL from the incoming request
  return `${req.headers["x-forwarded-proto"] || "http"}://${req.headers.host}`;
};

export interface ExtendedSession extends Session {
  // Add any custom properties to the session here
  role: string;
}

/**
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  secret: process.env.TOKEN_SECRET || "570d6a646386", // The secret used to encrypt the cookie
  adapter: PrismaAdapter(prisma), // The adapter is what connects NextAuth to your database

  /**
   * @see https://next-auth.js.org/configuration/providers
   */
  providers: [
    DiscordProvider({
      clientId: `${process.env.DISCORD_CLIENT_ID}`, // The client ID can be found on the application page
      clientSecret: `${process.env.DISCORD_CLIENT_SECRET}`, // The client secret can be found on the application page
    }),
  ],

  /**
   * @see https://next-auth.js.org/configuration/callbacks
   */
  callbacks: {
    session({ session, user }: { session: Session; user: User }) {
      // Add the role to the session
      (session as any).user.role = (user as any).role || "user";

      // Return the session to be stored in the cookie
      return session;
    },
  },

  /**
   * @see https://next-auth.js.org/configuration/pages
   */
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/housekeeping", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

export default NextAuth(authOptions);
