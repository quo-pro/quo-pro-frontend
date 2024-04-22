import axios from 'axios';

/**
 * Use this for client side.
 */
export const apiHttp = axios.create({
  baseURL: '/api',
});

/**
 * Use this for server side.
 */
export const axiosHttp = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  headers: { 'Content-Type': 'application/json' },
});

export const axiosFileHttp = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  headers: { 'Content-Type': 'multipart/form-data' },
});

export const apiRoutes = {
  login: '/auth/login',
  register: '/auth/register',
  users: '/users',
  me: '/users/me',
  publicUsers: '/users/public',
  friends: '/friends',
  friendRequests: '/friend-requests',
  notifications: '/notifications',
  flaggedContents: '/flagged-contents',
  files: '/files',
  posts: '/posts',
  publicPosts: '/posts/public',
  comments: '/comments',
  likes: '/likes',
};
