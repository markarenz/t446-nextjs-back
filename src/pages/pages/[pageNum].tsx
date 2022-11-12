import { useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import prisma from '../../../lib/prismadb';
import { Page } from '../../types/types';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import IconButton from '../../components/common/IconButton';
import { IconEdit, IconView, IconDelete } from '../../components/img/icons';
import PaginationNav from '../../components/common/PaginationNav';
import { serializeDates } from '../../helpers';
import styles from '../../styles/Dashboard.module.scss';

type Props = {
  pages: Page[];
  pageNum: number;
  itemsPerPage: number;
  numItems: number;
};

const Pages: NextPage<Props> = ({ pages, pageNum, itemsPerPage, numItems }) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Page | null>(null);
  const router = useRouter();
  const pageMeta = {
    title: 'Pages',
    metedesc: 'A list of pages for the T446 website'
  };
  const handler = () => {};

  const handleDelete = (page: Page): void => {
    setIsConfirmingDelete(true);
    setSelectedItem(page);
  };
  const handleDeleteCancel = (): void => {
    setIsConfirmingDelete(false);
  };
  const handleNavigateToEdit = (id: string): void => {
    router.replace(`/pages/edit/${id}`);
  };
  const handleDeleteOk = (id: string): void => {
    setIsConfirmingDelete(false);
  };
  return (
    <Layout pageMeta={pageMeta}>
      <div className={styles.pageRoot}>
        <div className="container-xl">
          <h2 className="pageTitle">Pages</h2>
          <table className="mb-2">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {pages?.map((p) => (
                <tr key={p.id}>
                  <td>
                    <label>Title:</label>
                    <Link href={`pages/edit/${p.id}`}>{p.title}</Link>
                  </td>
                  <td>
                    <label>Status:</label>
                    {p.status.toUpperCase()}
                  </td>
                  <td className="right">
                    <span className="mr-1">
                      <IconButton
                        onClick={() => handleNavigateToEdit(p.id)}
                        title="edit"
                        color="secondary"
                      >
                        <IconEdit />
                      </IconButton>
                    </span>
                    <span className="mr-1">
                      <a
                        href={`https://indytroop446.org/${p.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconButton onClick={handler} title="view">
                          <IconView />
                        </IconButton>
                      </a>
                    </span>
                    <span>
                      <IconButton
                        onClick={() => handleDelete(p)}
                        title="delete"
                        color="primary"
                      >
                        <IconDelete />
                      </IconButton>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationNav
            pageNum={pageNum}
            itemsPerPage={itemsPerPage}
            itemsLoaded={pages.length}
            numItems={numItems}
            path="/pages/"
          />
        </div>
        {isConfirmingDelete && (
          <ConfirmationModal
            title="Delete Page"
            handleCancel={handleDeleteCancel}
            handleOk={handleDeleteOk}
          >
            <span>Are you sure you want to delete this item?</span>
          </ConfirmationModal>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pageNum: pageNumStr } = context.query;
  const pageNum = parseFloat(`${pageNumStr}`);
  const itemsPerPage = 10;
  const skip = (pageNum - 1) * itemsPerPage;
  const numItems: number = await prisma.page.count();
  const pagesResp = await prisma.page.findMany({
    where: {
      OR: [{ status: 'published' }, { status: 'draft' }]
    },
    orderBy: [{ title: 'asc' }],
    skip,
    take: itemsPerPage
  });
  const pages = serializeDates(pagesResp);
  return { props: { pages, pageNum, itemsPerPage, numItems } };
};

export default Pages;
