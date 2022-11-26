import { useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { Page } from '@prisma/client';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import PageDataTable from '../../components/common/PageDataTable';
import PaginationNav from '../../components/common/PaginationNav';
import { useAppContext } from '../../context/AppContext';
import PageDataHeader from '../../components/common/PageDataHeader';
import Router from 'next/router';
import { callCreateNew, callDelete, callPublish } from '../../helpers/pages';
import { getItemsPages } from '../../utility/db/queries/pages';
import ProtectedByRole from '../../components/common/ProtectedByRole';
import styles from '../../styles/modules/Dashboard.module.scss';

type Props = {
  pages: Page[];
  pageNum: number;
  itemsPerPage: number;
  numItems: number;
  defaultSearchText: string;
};

const Pages: NextPage<Props> = ({
  pages,
  pageNum,
  itemsPerPage,
  numItems,
  defaultSearchText
}) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Page | null>(null);
  const { setLoading } = useAppContext();
  const pageMeta = {
    title: 'Pages',
    metedesc: 'This page holds a list of pages for the T446 website.'
  };
  const handleDelete = (page: Page): void => {
    setIsConfirmingDelete(true);
    setSelectedItem(page);
  };
  const handleDeleteCancel = (): void => {
    setIsConfirmingDelete(false);
  };
  const handleDeleteOk = async () => {
    await callDelete(setLoading, setIsConfirmingDelete, `${selectedItem?.id}`);
  };
  const setSearchFilter = (searchText: string) => {
    const url = `/pages/1?search=${encodeURIComponent(searchText)}`;
    Router.replace(url);
  };
  const tableActions = ['edit', 'view', 'delete'];
  const tableFields = [
    {
      title: 'Title',
      slug: 'title'
    },
    {
      title: 'Status',
      slug: 'status'
    }
  ];
  const handleCreateNew = async () => {
    callCreateNew(setLoading);
  };
  const handlePublish = async () => {
    callPublish(setLoading);
  };
  return (
    <Layout pageMeta={pageMeta}>
      <ProtectedByRole>
        <div className={styles.pageRoot}>
          <div className="container-xl">
            <PageDataHeader
              title="Pages"
              setSearchFilter={setSearchFilter}
              defaultSearchText={defaultSearchText}
              handleCreateNew={handleCreateNew}
              handlePublish={handlePublish}
            />
            <PageDataTable
              items={pages}
              slug="pages"
              tableFields={tableFields}
              tableActions={tableActions}
              handleDelete={handleDelete}
              viewPrefix=""
            />
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
      </ProtectedByRole>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pageNum: pageNumStr, search } = context.query;
  const pageNum = parseFloat(`${pageNumStr}`);
  const itemsPerPage = 10;
  const skip = (pageNum - 1) * itemsPerPage;
  const searchText = search === undefined ? '' : `${search}`;
  const { numItems, pages } = await getItemsPages(
    searchText,
    skip,
    itemsPerPage
  );
  return {
    props: {
      pages,
      pageNum,
      itemsPerPage,
      numItems,
      defaultSearchText: searchText
    }
  };
};

export default Pages;
