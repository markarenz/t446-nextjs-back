import { useState } from 'react';
import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import Button from '../../components/common/Button';
import { useAppContext } from '../../context/AppContext';
import ProtectedByRole from '../../components/common/ProtectedByRole';

const Dashboard: NextPage = () => {
  const pageMeta = {
    title: 'Tools',
    metedesc: 'This is the tools page for the T446 Content app.'
  };
  const [isCompleteSitemap, setIsCompleteSitemap] = useState(false);
  const { setLoading } = useAppContext();

  const handleSitemapClick = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/tools/sitemap', {
        method: 'POST'
      });
      const data = await response.json();
      console.log('SITEMAP', data);
      if (data?.success) {
        setIsCompleteSitemap(true);
      }
    } catch (err) {
      console.error('Update Sitemap Error', err);
    }
    setLoading(false);
  };
  return (
    <Layout pageMeta={pageMeta}>
      <ProtectedByRole>
        <div className="mb-4">
          <div className="mb-2">
            <h1>T446 Content Tools</h1>
          </div>
          <div className="mb-2">
            <div className="mb-2">
              <Button
                onClick={handleSitemapClick}
                variant="contained"
                color="primary"
                disabled={false}
              >
                <span>Update Sitemap</span>
              </Button>
            </div>
            {isCompleteSitemap && <div>Sitemap update complete.</div>}
          </div>
        </div>
      </ProtectedByRole>
    </Layout>
  );
};

export default Dashboard;
