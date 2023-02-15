import { PrismaAdapter } from '@next-auth/prisma-adapter'; // Import the adapter
import type { NextAuthOptions, Session, User } from 'next-auth';
import NextAuth from 'next-auth'; // Import the types from the package
import CredentialsProvider from 'next-auth/providers/credentials'; // Import the Credentials provider
import DiscordProvider from 'next-auth/providers/discord'; // Import the Discord provider

import { prisma } from '@/lib/prisma'; // The adapter requires a prisma instance

export interface ExtendedSession extends Session {
  // Add any custom properties to the session here
  role: string;
}

export function getBaseUrl(req: any): string {
  const isHttps = req?.url?.startsWith('https://');
  const protocol = isHttps ? 'https' : 'http';
  const host = req.headers['x-forwarded-host'] || req.headers.host;

  return `${protocol}://${host}`;
}

/**
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET || '570d6a646386', // The secret used to encrypt the cookie
  adapter: PrismaAdapter(prisma), // The adapter is what connects NextAuth to your database

  /**
   * @see https://next-auth.js.org/configuration/providers
   */
  providers: [
    // Add as many providers as you like

    // Discord
    DiscordProvider({
      clientId: `${process.env.DISCORD_CLIENT_ID}`, // The client ID can be found on the application page
      clientSecret: `${process.env.DISCORD_CLIENT_SECRET}` // The client secret can be found on the application page
    }),

    // Credentials
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',

      // The credentials is used to generate a suitable form on the sign in page.
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' }
      },

      async authorize(credentials, req): Promise<User | null> {
        // If no credentials were provided
        if (!credentials) {
          return null;
        }

        // If the credentials were provided, validate them
        let user: User | null = null;

        try {
          // Get the base URL of the site
          // Make a request to your API to validate the credentials
          const response = await fetch(
            `${getBaseUrl(req)}/api/user/check-credentials`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
              })
            }
          );

          if (response.status !== 200) {
            // If the credentials were invalid, return null
            throw new Error('Login failed');
          }

          user = await response.json();
        } catch (err) {
          return null;
        }

        // If the credentials were valid, return the user object.
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        }

        // If you return null then an error will be displayed advising the user to check their details.
        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        return null;
      }
    })
  ],

  /**
   * @see https://next-auth.js.org/configuration/callbacks
   */
  callbacks: {
    /**
     * JWT
     */
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...user,
          ...token
        };
      }

      return token;
    },

    /**
     * Extend the session with custom properties
     */
    session({ session, token }: { session: Session; token: any; user: User }) {
      const newSession = { ...session };

      newSession.user = token;

      // Return the session to be stored in the cookie
      return newSession;
    }
  },

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: 'jwt'

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: process.env.SECRET
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  /**
   * @see https://next-auth.js.org/configuration/pages
   */
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/housekeeping' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
};

export default NextAuth(authOptions);
