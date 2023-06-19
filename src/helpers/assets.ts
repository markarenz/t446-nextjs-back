export const callGetAssetlist = async (setLoading: Function) => {
  setLoading(true);
  try {
    //
  } catch (err) {
    console.error('ASSET LIST LOAD', err);
  }
  setLoading(false);
};

export const callGetFileList = async (setLoading: Function) => {
  setLoading(true);
  const response = await fetch('/api/assets/get', {
    method: 'POST'
  });
  const data = await response.json();
  console.log('callGetFileList', data.length);
  setLoading(false);
  return data;
};

export const callDeleteAsset = async (
  setLoading: Function,
  filename: string
) => {
  setLoading(true);
  const response = await fetch('/api/assets/delete', {
    method: 'POST',
    body: JSON.stringify({
      filename
    })
  });
  const data = await response.json();
  setLoading(false);
  return data;
};
