import { useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { Gallery } from '../../types/types';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import PageDataTable from '../../components/common/PageDataTable';
import PaginationNav from '../../components/common/PaginationNav';
import PageDataHeader from '../../components/common/PageDataHeader';
import styles from '../../styles/modules/Dashboard.module.scss';
import Router from 'next/router';
import { getItemsGalleries } from '../../utility/db/queries/galleries';

type Props = {
  galleries: Gallery[];
  pageNum: number;
  itemsPerPage: number;
  numItems: number;
  defaultSearchText: string;
};

const Alerts: NextPage<Props> = ({
  galleries,
  pageNum,
  itemsPerPage,
  numItems,
  defaultSearchText
}) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Gallery | null>(null);
  const pageMeta = {
    title: 'Galleries',
    metedesc: 'This page holds a list of alerts for the T446 website.'
  };

  const handleDelete = (gallery: Gallery): void => {
    setIsConfirmingDelete(true);
    setSelectedItem(gallery);
  };
  const handleDeleteCancel = (): void => {
    setIsConfirmingDelete(false);
  };
  const handleDeleteOk = (id: string): void => {
    setIsConfirmingDelete(false);
  };
  const setSearchFilter = (searchText: string) => {
    const url = `/galleries/1?search=${encodeURIComponent(searchText)}`;
    Router.replace(url);
  };
  const handleCreateNew = async () => {
    console.log('NEW GALLERY');
  };
  const handlePublish = async () => {
    console.log('PUBLISH');
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
  return (
    <Layout pageMeta={pageMeta}>
      <div className={styles.pageRoot}>
        <div className="container-xl">
          <PageDataHeader
            title="Galleries"
            setSearchFilter={setSearchFilter}
            defaultSearchText={defaultSearchText}
            handleCreateNew={handleCreateNew}
            handlePublish={handlePublish}
          />
          <PageDataTable
            items={galleries}
            slug="galleries"
            tableFields={tableFields}
            tableActions={tableActions}
            handleDelete={handleDelete}
          />
          <PaginationNav
            pageNum={pageNum}
            itemsPerPage={itemsPerPage}
            itemsLoaded={galleries.length}
            numItems={numItems}
            path="/alerts/"
          />
        </div>
        {isConfirmingDelete && (
          <ConfirmationModal
            title="Delete Alert"
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
  const { pageNum: pageNumStr, search } = context.query;
  const pageNum = parseFloat(`${pageNumStr}`);
  const itemsPerPage = 10;
  const skip = (pageNum - 1) * itemsPerPage;
  const searchText = search === undefined ? '' : `${search}`;
  const { numItems, galleries } = await getItemsGalleries(
    searchText,
    skip,
    itemsPerPage
  );
  return {
    props: {
      galleries,
      pageNum,
      itemsPerPage,
      numItems,
      defaultSearchText: searchText
    }
  };
};

export default Alerts;
