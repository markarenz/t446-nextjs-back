import type { NextPage } from 'next';
import Layout from '../components/Layout';
import prisma from '../lib/prismadb';
import { Page } from '../types/types';
import { publishStatuses } from '../../constants';

type Props = {
  pages: Page[];
};

const Dashboard: NextPage<Props> = ({ pages }) => {
  const pageMeta = {
    title: 'Home',
    metedesc: 'This is the dashboard for the T446 Content app'
  };
  return (
    <Layout pageMeta={pageMeta}>
      <div>
        <h2>This is the Dashboard content</h2>
        {pages?.map((p) => (
          <div key={p.id}>
            <div>
              {p.title}-{publishStatuses[p.status]}-
              {JSON.stringify(p.dateModified)}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

const serializeDate = (dateObj: Date) => JSON.parse(JSON.stringify(dateObj));
const serializeDates = (arr: Page[]) =>
  arr.map((p) => ({
    ...p,
    dateCreated: serializeDate(p.dateCreated),
    dateModified: serializeDate(p.dateModified)
  }));

export const getServerSideProps = async () => {
  const pagesResp = await prisma.page.findMany({
    where: {
      status: 1
    }
  });
  const pages = serializeDates(pagesResp);
  console.log('PAGES', pages.length);
  return { props: { pages } };
};

export default Dashboard;
