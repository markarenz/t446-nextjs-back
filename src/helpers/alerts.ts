import Router from 'next/router';

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
