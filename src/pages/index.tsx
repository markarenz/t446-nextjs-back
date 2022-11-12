import type { NextPage } from 'next';
import Layout from '../components/Layout';
import Link from 'next/link';
import prisma from '../../lib/prismadb';
import { Page } from '../types/types';
// import { publishStatuses } from '../constants';
import T446Logo from '../components/img/T446Logo';
import styles from '../styles/Dashboard.module.scss';

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

// const serializeDate = (dateObj: Date) => JSON.parse(JSON.stringify(dateObj));
// const serializeDates = (arr: Page[]) =>
//   arr.map((p) => ({
//     ...p,
//     dateCreated: serializeDate(p.dateCreated),
//     dateModified: serializeDate(p.dateModified)
//   }));

// export const getServerSideProps = async () => {
//   const pagesResp = await prisma.page.findMany({
//     where: {
//       status: 1
//     }
//   });
//   const pages = serializeDates(pagesResp);
//   console.log('PAGES', pages.length);
//   return { props: { pages } };
// };

export default Dashboard;
