const asset = {
  filename: 'testfile.jpg',
  fileDate: '2022-11-29',
  size: '12kb',
  url: 'https://www.domain.com/files/testfile.jpg',
  thumbnail: 'https://www.domain.com/files/thumbnail/testfile.jpg'
};
export const getAssetList = () => {
  const assetList = [];
  for (let i = 0; i < 15; i += 1) {
    assetList.push({
      ...asset,
      filename: `test-${i}.jpg`
    });
  }
  return assetList;
};
