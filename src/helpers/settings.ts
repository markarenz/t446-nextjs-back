import { SettingFormData } from '../types/types';
import Router from 'next/router';

export const callCreateNew = async (setLoading: Function) => {
  setLoading(true);
  try {
    const response = await fetch('/api/settings/create', {
      method: 'POST'
    });
    const data = await response.json();
    if (data?.success && !!data?.setting?.id) {
      const url = `/settings/edit/${data?.setting?.id}`;
      await Router.replace(url);
    }
  } catch (err) {
    console.error('Create Setting Error', err);
  }
  setLoading(false);
};

export const callUpdate = async (
  setLoading: Function,
  id: string,
  formData: SettingFormData
) => {
  setLoading(true);
  const body = {
    id,
    formData
  };
  await fetch('/api/settings/update', {
    method: 'POST',
    body: JSON.stringify(body)
  });
  setLoading(false);
};

export const callDelete = async (
  setLoading: Function,
  setIsConfirmingDelete: Function,
  id: string
) => {
  try {
    if (id) {
      setIsConfirmingDelete(false);
      setLoading(true);
      const response = await fetch('/api/settings/delete', {
        body: JSON.stringify({
          id
        }),
        method: 'POST'
      });
      const url = `/settings/1`;
      await Router.replace(url);
    }
  } catch (err) {
    console.error('Create Setting Error', err);
  }
  setLoading(false);
};

export const callPublish = async (setLoading: Function) => {
  let success = false;
  setLoading(true);
  try {
    const response = await fetch('/api/settings/publish', {
      method: 'POST'
    });
    const data = await response.json();
    success = data?.success;
  } catch (err) {
    console.error('Publish Settings Error', err);
  }
  setLoading(false);
  return success;
};

export type FormErrors = {
  title: string | null;
  key: string | null;
  value: string | null;
};
export type FormValidReturn = {
  isFormValid: boolean;
  formErrors: FormErrors;
};

export const validateFormSetting = (
  formData: SettingFormData
): FormValidReturn => {
  let isFormValid = true;
  const formErrors: FormErrors = {
    title: null,
    key: null,
    value: null
  };
  if (!formData.title || formData.title === '') {
    formErrors.title = 'Please enter a title.';
    isFormValid = false;
  }

  if (!formData.key || formData.key === '') {
    formErrors.key = 'Please enter a key.';
    isFormValid = false;
  }

  if (!formData.value || formData.value === '') {
    formErrors.value = 'Please enter a value.';
    isFormValid = false;
  }
  return { isFormValid, formErrors };
};
