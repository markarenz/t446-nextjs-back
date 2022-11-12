import { Page } from './types/types';
import { Session } from 'next-auth';
import { roles } from './constants';

export const getIsValidUserRole = (role: string): boolean =>
  !!role && roles.includes(role);

export const serializeDate = (dateObj: Date) =>
  JSON.parse(JSON.stringify(dateObj));

export const serializeDates = (arr: Page[]) =>
  arr.map((p) => ({
    ...p,
    dateCreated: serializeDate(p.dateCreated),
    dateModified: serializeDate(p.dateModified)
  }));

export const checkSession = (session: Session | null): boolean =>
  getIsValidUserRole(`${session?.user?.role}`);

export const getRoleFromSession = (session: Session | null): string =>
  session?.user?.role || '';
