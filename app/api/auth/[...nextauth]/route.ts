import { authConfig } from '@lib/authConfig';
import NextAuth from 'next-auth/next';

const handler = NextAuth(authConfig);

const GET = handler;
const POST = handler;

export { GET, POST };
