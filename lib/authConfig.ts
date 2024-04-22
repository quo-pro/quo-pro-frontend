import { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { login } from '@app/resources/auth/helper';
import NAVIGATION from '@app/navigations/navigation';

export const authConfig: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: NAVIGATION.PUBLIC_FEEDS,
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        userName: {
          label: 'Email or Phone',
          type: 'text',
        },
        UUID: {
          label: 'Unique UUID',
          type: 'text',
        },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const parsedCredentials = z
          .object({
            userName: z.string(),
            UUID: z.string().uuid(),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const loginAuth = await login(parsedCredentials.data);

        if (!loginAuth) return null;

        return {
          ...loginAuth,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session, }: any) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.roles = user.roles;
        token.accessToken = user.accessToken;
      }

      return token;
    },
    session: async ({ session, token }: any) => {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.roles = token.roles;
      session.accessToken = token.accessToken;

      return session;
    },
  },
};
