import NextAuth from 'next-auth';
import GooglePorvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { UserMeta } from '@prisma/client';
import { UserMeta } from '../../../types/types';
import prisma from '../../../lib/prismadb';
import { getIsValidUserRole } from '../../../helpers';

const getUserMetaByEmail = async (
  email: string
): Promise<UserMeta | null | undefined> => {
  try {
    const dbUserMeta = await prisma.userMeta.findUnique({
      where: {
        email
      }
    });
    if (!dbUserMeta) {
      return null;
    }
    return dbUserMeta;
  } catch (err) {
    console.error('ERROR', err);
  }
};

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  debug: false,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GooglePorvider({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`
    })
  ],
  callbacks: {
    async signIn({ user }) {
      const dbUserMeta = await getUserMetaByEmail(`${user?.email}`);
      return getIsValidUserRole(`${dbUserMeta?.role}`);
    },
    async session({ session, user }) {
      const dbUserMeta = await getUserMetaByEmail(`${user?.email}`);
      if (!!session.user && getIsValidUserRole(`${dbUserMeta?.role}`)) {
        session.user.id = user.id;
        session.user.role = `${dbUserMeta?.role}`;
      } else {
        session.user.id = '';
        session.user.name = '';
        session.user.email = '';
        session.user.role = '';
      }
      return session;
    }
  }
});
