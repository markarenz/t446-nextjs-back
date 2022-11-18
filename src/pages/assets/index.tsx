import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import ImageUploader from '../../components/common/ImageUploader';

const Assets: NextPage = () => {
  const pageMeta = {
    title: 'Home',
    metedesc: 'This is the dashboard for the T446 Content app'
  };
  return (
    <Layout pageMeta={pageMeta}>
      <div>
        <h2>Assets Page</h2>
        <ImageUploader />
      </div>
    </Layout>
  );
};

export default Assets;
