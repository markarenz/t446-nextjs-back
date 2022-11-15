import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from '../../../types/types';

const checkSimpleAuth = (username: string, password: string): User | null => {
  let user = null;
  const loginStr = `${username}|${password}`;
  let role = '';
  if (loginStr === process.env.USER_ADMIN) {
    role = 'admin';
  }
  if (loginStr === process.env.USER_HISTORIAN) {
    role = 'historian';
  }
  if (role) {
    user = {
      id: '1',
      name: username,
      email: `${username}@indytroop446.org`,
      role: role
    };
  }
  return user;
};
const getRoleByEmail = (email: string): string => {
  if (email === `${process.env.USER_ADMIN?.split('|')[0]}@indytroop446.org`) {
    return 'admin';
  }
  if (
    email === `${process.env.USER_HISTORIAN?.split('|')[0]}@indytroop446.org`
  ) {
    return 'historian';
  }
  return '';
};

export const authOptions = {
  debug: false,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'T446 CMS',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      // @ts-ignore
      async authorize(credentials, req) {
        const user = checkSimpleAuth(
          `${credentials?.username}`,
          `${credentials?.password}`
        );
        return user;
      }
    })
  ],
  callbacks: {
    // @ts-ignore
    async session({ session }: { session: Session }) {
      const role = getRoleByEmail(session?.user?.email);
      session.user.role = role;
      return session;
    }
  }
};

export default NextAuth(authOptions);
