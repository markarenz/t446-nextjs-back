import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import Link from 'next/link';

const Test: NextPage = () => {
  const pageMeta = {
    title: 'Home',
    metedesc: 'New page...'
  };
  return (
    <Layout pageMeta={pageMeta}>
      <div>
        <h2>Test Page</h2>
        <Link href="/">Home</Link>
      </div>
    </Layout>
  );
};

export default Test;
