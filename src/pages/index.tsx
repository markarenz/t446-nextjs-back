import type { NextPage } from 'next';
import Layout from '../components/Layout';
import T446Logo from '../components/img/T446Logo';
import styles from '../styles/modules/Dashboard.module.scss';

const Dashboard: NextPage = () => {
  const pageMeta = {
    title: 'Home',
    metedesc: 'This is the dashboard for the T446 Content app'
  };
  return (
    <Layout pageMeta={pageMeta}>
      <div className={styles.pageRoot}>
        <div className={styles.logoWrap}>
          <T446Logo />
          <h2 className="mb-2">Troop 446 CMS</h2>
          <div className="container-lg text-center">
            <p>
              Welcome to the Troop 446 Content Management System. With this
              tool, you can edit the data used by the frontend website. To
              publish your changes, use the publish tool for each type of item:
              page, gallery, alert, etc.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
