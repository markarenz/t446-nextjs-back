export const callAssetUpload = async (setLoading: Function, images: File[]) => {
  // issue fetch with array of images
  setLoading(true);
  try {
    if (images.length > 0) {
      images.forEach((file) => {
        const reader = new FileReader();
        // reader.onabort = () => console.log('file reading was aborted');
        // reader.onerror = () => console.log('file reading has failed');
        reader.onload = () => {
          const binaryStr = reader.result;
          console.log(binaryStr);
          const response = fetch('/api/assets/upload', {
            body: JSON.stringify({
              image: {
                file,
                binaryStr
              }
            }),
            method: 'POST'
          });
        };
        reader.readAsArrayBuffer(file);
      });
    }
  } catch (err) {
    console.error('ASSET UPLOAD', err);
  }
  setLoading(false);
};
