import { GalleryFormData } from '../types/types';
import Router from 'next/router';
import { isValidDate } from './index';
import { statusOptions } from '../constants';

export const callCreateNew = async (setLoading: Function) => {
  setLoading(true);
  try {
    const response = await fetch('/api/galleries/create', {
      method: 'POST'
    });
    const data = await response.json();
    if (data?.success && !!data?.gallery?.id) {
      const url = `/galleries/edit/${data?.gallery?.id}`;
      await Router.replace(url);
    }
  } catch (err) {
    console.error('Create Error', err);
  }
  setLoading(false);
};

export const callUpdate = async (
  setLoading: Function,
  id: string,
  formData: GalleryFormData
) => {
  setLoading(true);
  const body = {
    id,
    formData
  };
  await fetch('/api/galleries/update', {
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
      const response = await fetch('/api/galleries/delete', {
        body: JSON.stringify({
          id
        }),
        method: 'POST'
      });
      const url = `/galleries/1`;
      await Router.replace(url);
    }
  } catch (err) {
    console.error('Delete Error', err);
  }
  setLoading(false);
};

export const callPublish = async (setLoading: Function) => {
  let success = false;
  setLoading(true);
  try {
    const response = await fetch('/api/galleries/publish', {
      method: 'POST'
    });
    const data = await response.json();
    success = data?.success;
  } catch (err) {
    console.error('Publish Error', err);
  }
  setLoading(false);
  return success;
};

type FormErrors = {
  title: string | null;
  slug: string | null;
  status: string | null;
  content: string | null;
  images: string | null;
  pubDate: string | null;
};
type FormValidReturn = {
  isFormValid: boolean;
  formErrors: FormErrors;
};

export const validateFormGallery = (
  formData: GalleryFormData
): FormValidReturn => {
  let isFormValid = true;
  const formErrors: FormErrors = {
    title: null,
    slug: null,
    status: null,
    content: null,
    images: null,
    pubDate: null
  };
  const requiredStringFields: string[] = [
    'title',
    'slug',
    'status',
    'content',
    'images'
  ];
  if (!formData.title || formData.title === '') {
    formErrors.title = `Please enter a title.`;
    isFormValid = false;
  }
  if (
    !formData.slug ||
    formData.slug === '' ||
    encodeURIComponent(formData.slug) !== formData.slug
  ) {
    formErrors.slug = `Please enter a URL-safe slug.`;
    isFormValid = false;
  }
  if (
    !formData.status ||
    !statusOptions.some((o) => o.value === formData.status)
  ) {
    formErrors.status = `Please select a status.`;
    isFormValid = false;
  }
  if (!formData.images || formData.images === '') {
    formErrors.images = `Please add images.`;
    isFormValid = false;
  }
  if (!isValidDate(formData.pubDate)) {
    formErrors.pubDate = 'Please enter a valid date.';
    isFormValid = false;
  }
  return { isFormValid, formErrors };
};
