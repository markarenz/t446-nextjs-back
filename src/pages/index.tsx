import type { NextPage } from 'next';
import Layout from '../components/Layout';
import Link from 'next/link';
import prisma from '../../lib/prismadb';
import { Page } from '../types/types';
import T446Logo from '../components/img/T446Logo';
import styles from '../styles/modules/Dashboard.module.scss';

// type Props = {
//   pages: Page[];
// };

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
          <h2>Troop 446 CMS</h2>
          <Link href="/test">Test Link</Link>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
