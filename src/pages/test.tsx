import type { NextPage } from 'next';
import Layout from '../components/Layout';
import prisma from '../../lib/prismadb';
import { Page } from '../types/types';
import { publishStatuses } from '../../constants';

const TestPage: NextPage = () => {
  const pageMeta = {
    title: 'Test page',
    metedesc: 'This is a test.'
  };
  return (
    <Layout pageMeta={pageMeta}>
      <div>
        <h2>This is a test.</h2>
      </div>
    </Layout>
  );
};

export default TestPage;
