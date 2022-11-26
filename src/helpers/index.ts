import { Session } from 'next-auth';
import { roles } from '../constants';

export const sanitizeString = (str: string) =>
  str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');

export const sanitizeEventValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (['text', 'textarea'].includes(e.target.type)) {
    return sanitizeString(e.target.value);
  }
  return '';
};

export const getIsAdmin = (session: Session) => session?.user?.role === 'admin';

export const getIsValidUserRole = (role: string): boolean =>
  !!role && roles.includes(role);

export const checkSession = (session: Session | null): boolean =>
  getIsValidUserRole(`${session?.user?.role}`);

export const getRoleFromSession = (session: Session | null): string =>
  session?.user?.role || '';

export const serializeDate = (dateObj: Date) =>
  JSON.parse(JSON.stringify(dateObj));

export const isValidDate = (date: Date) => isFinite(new Date(date).getTime());
