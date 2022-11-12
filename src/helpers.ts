import { Page } from './types/types';
// import { Session } from 'next-auth';
// import { User } from './types/types';
import { roles } from './constants';

export const getIsValidUserRole = (role: string) =>
  role && roles.includes(role);

export const serializeDate = (dateObj: Date) =>
  JSON.parse(JSON.stringify(dateObj));

export const serializeDates = (arr: Page[]) =>
  arr.map((p) => ({
    ...p,
    dateCreated: serializeDate(p.dateCreated),
    dateModified: serializeDate(p.dateModified)
  }));
