import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface AdapterUser {
    id: string;
    name: string;
    email: string;
    role: string;
  }
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }
  interface Session {
    user: User;
  }
}
