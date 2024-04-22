import { USER_ROLES_TYPE } from '@quo-pro/commons';
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      email: string;
      id: string;
      name: string;
      roles: USER_ROLES_TYPE[];
    };
    accessToken: string;
  }
}
