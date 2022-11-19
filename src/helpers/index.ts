import { Session } from 'next-auth';
import { roles } from '../constants';
import {
  AlertFormData,
  AlertFormErrors,
  AlertFormValidReturn
} from '../types/types';

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

export const getIsValidUserRole = (role: string): boolean =>
  !!role && roles.includes(role);

export const checkSession = (session: Session | null): boolean =>
  getIsValidUserRole(`${session?.user?.role}`);

export const getRoleFromSession = (session: Session | null): string =>
  session?.user?.role || '';

export const validateFormAlert = (
  formData: AlertFormData
): AlertFormValidReturn => {
  let isFormValid = true;
  const formErrors: AlertFormErrors = {
    title: null,
    dateEnd: null
  };
  if (!formData.title || formData.title === '') {
    formErrors.title = 'Please enter a title.';
    isFormValid = false;
  }
  const de = new Date(formData.dateEnd);
  const ds = new Date(formData.dateStart);
  if (ds > de) {
    formErrors.dateEnd =
      'Please use an end date that occurs after the start date.';
    isFormValid = false;
  }
  return { isFormValid, formErrors };
};

export const serializeDate = (dateObj: Date) =>
  JSON.parse(JSON.stringify(dateObj));
