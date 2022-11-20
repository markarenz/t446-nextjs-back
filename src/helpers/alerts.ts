import { AlertFormData } from '../types/types';
import Router from 'next/router';
import { statusOptions } from '../constants';
import { isValidDate } from './index';

export const callCreateNew = async (setLoading: Function) => {
  setLoading(true);
  try {
    const response = await fetch('/api/alerts/create', {
      method: 'POST'
    });
    const data = await response.json();
    if (data?.success && !!data?.alert?.id) {
      const url = `/alerts/edit/${data?.alert?.id}`;
      await Router.replace(url);
    }
  } catch (err) {
    console.error('Create Alert Error', err);
  }
  setLoading(false);
};

export const callUpdate = async () => {};

export const callDelete = async (
  setLoading: Function,
  setIsConfirmingDelete: Function,
  id: string
) => {
  try {
    if (id) {
      setIsConfirmingDelete(false);
      setLoading(true);
      const response = await fetch('/api/alerts/delete', {
        body: JSON.stringify({
          id
        }),
        method: 'POST'
      });
      const url = `/alerts/1`;
      await Router.replace(url);
    }
  } catch (err) {
    console.error('Create Alert Error', err);
  }
  setLoading(false);
};

export const callPublish = async (setLoading: Function) => {
  let success = false;
  setLoading(true);
  try {
    const response = await fetch('/api/alerts/publish', {
      method: 'POST'
    });
    const data = await response.json();
    success = data?.success;
  } catch (err) {
    console.error('Create Alert Error', err);
  }
  setLoading(false);
  return success;
};

export type FormErrors = {
  title: string | null;
  status: string | null;
  dateStart: string | null;
  dateEnd: string | null;
};
export type FormValidReturn = {
  isFormValid: boolean;
  formErrors: FormErrors;
};

export const validateFormAlert = (formData: AlertFormData): FormValidReturn => {
  let isFormValid = true;
  const formErrors: FormErrors = {
    title: null,
    status: null,
    dateStart: null,
    dateEnd: null
  };
  if (!formData.title || formData.title === '') {
    formErrors.title = 'Please enter a title.';
    isFormValid = false;
  }
  if (
    !formData.status ||
    !statusOptions.some((o) => o.value === formData.status)
  ) {
    formErrors.title = `Please select a status.`;
    isFormValid = false;
  }
  if (!isValidDate(formData.dateStart)) {
    formErrors.dateStart = 'Please enter a valid date.';
    isFormValid = false;
  }
  if (!isValidDate(formData.dateEnd)) {
    formErrors.dateEnd = 'Please enter a valid date.';
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
