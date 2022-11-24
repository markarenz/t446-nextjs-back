import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import ImageUploader from '../../components/common/ImageUploader';
import ImageSelector from '../../components/common/ImageSelector';
import { useAppContext } from '../../context/AppContext';
import { callGetFileList } from '../../helpers/assets';
import { Asset } from '../../types/types';

const Assets: NextPage = () => {
  const pageMeta = {
    title: 'Home',
    metedesc: 'This is the dashboard for the T446 Content app'
  };
  const [assetList, setAssetList] = useState<Asset[]>([]);
  const { setLoading } = useAppContext();
  const handleLoadFileList = async () => {
    const newAssetList = await callGetFileList(setLoading);
    setAssetList(newAssetList);
  };
  const handleTriggerRefresh = () => {
    handleLoadFileList();
  };
  useEffect(() => {
    handleLoadFileList();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout pageMeta={pageMeta}>
      <div>
        <div className="mb-2">
          <h2>Assets</h2>
        </div>
        <ImageUploader handleTriggerRefresh={handleTriggerRefresh} />
        <ImageSelector
          allowSelection={false}
          assetList={assetList}
          handleTriggerRefresh={handleTriggerRefresh}
        />
      </div>
    </Layout>
  );
};

export default Assets;
