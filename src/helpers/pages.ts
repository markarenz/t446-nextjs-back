import { PageFormData } from '../types/types';
import Router from 'next/router';
import { statusOptions } from '../constants';
import { pageBlocks, PageBlockItemFields } from '../pageBlockDefs';

export const callCreateNew = async (setLoading: Function) => {
  setLoading(true);
  try {
    const response = await fetch('/api/pages/create', {
      method: 'POST'
    });
    const data = await response.json();
    if (data?.success && !!data?.page?.id) {
      const url = `/pages/edit/${data?.page?.id}`;
      await Router.replace(url);
    }
  } catch (err) {
    console.error('Create Page Error', err);
  }
  setLoading(false);
};

export const callUpdate = async (
  setLoading: Function,
  id: string,
  formData: PageFormData
) => {
  setLoading(true);
  const body = {
    id,
    formData
  };
  await fetch('/api/pages/update', {
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
      const response = await fetch('/api/pages/delete', {
        body: JSON.stringify({
          id
        }),
        method: 'POST'
      });
      const url = `/pages/1`;
      await Router.replace(url);
    }
  } catch (err) {
    console.error('Delete Page Error', err);
  }
  setLoading(false);
};

export const callPublish = async (setLoading: Function) => {
  let success = false;
  setLoading(true);
  try {
    const response = await fetch('/api/pages/publish', {
      method: 'POST'
    });
    const data = await response.json();
    success = data?.success;
  } catch (err) {
    console.error('Publish Pages Error', err);
  }
  setLoading(false);
  return success;
};

export type FormErrors = {
  title: string | null;
  status: string | null;
  slug: string | null;
  metadesc: string | null;
  content: string | null;
};
export type FormValidReturn = {
  isFormValid: boolean;
  formErrors: FormErrors;
};

export const validateFormPage = (formData: PageFormData): FormValidReturn => {
  let isFormValid = true;
  const formErrors: FormErrors = {
    title: null,
    status: null,
    slug: null,
    metadesc: null,
    content: null
  };
  if (!formData.title || formData.title === '') {
    formErrors.title = 'Please enter a title.';
    isFormValid = false;
  }
  if (!formData.slug || formData.slug === '') {
    formErrors.slug = `Please enter a slug.`;
    isFormValid = false;
  }
  if (!formData.metadesc || formData.metadesc === '') {
    formErrors.metadesc = `Please enter a meta description.`;
    isFormValid = false;
  }
  if (!formData.content || formData.content === '') {
    formErrors.metadesc = `Please add content.`;
    isFormValid = false;
  }
  if (
    !formData.status ||
    !statusOptions.some((o) => o.value === formData.status)
  ) {
    formErrors.status = `Please select a status.`;
    isFormValid = false;
  }

  return { isFormValid, formErrors };
};

export const getBlockDefByType = (slug: string) =>
  pageBlocks.find((b) => b.slug === slug) || null;

export const getDefaultBlockData = (slug: string) => {
  const pageBlock = pageBlocks.find((b) => b.slug === slug);
  const defaultObject: PageBlockItemFields = {
    slug
  };
  if (pageBlock) {
    pageBlock.fields.forEach((f) => {
      let defaultVal = '';
      console.log('FIELDS', f.slug);
      // @ts-ignore
      defaultObject[f.slug] = defaultVal;
    });
  }
  return defaultObject;
};
