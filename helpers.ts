import { Session } from 'next-auth';
import { User } from './src/types/types';
import { roles } from './constants';

// if session is NULL the session is loaded but the user is not logged in...
// if the session is UNDEFINED the page is loading...
export const getIsLoggedIn = (session: Session) =>
  session && roles.includes(session.user.role);

export const getIsValidUserRole = (role: string) =>
  role && roles.includes(role);
