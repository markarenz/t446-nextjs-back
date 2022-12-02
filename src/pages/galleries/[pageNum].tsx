import { useState } from 'react';
import Router from 'next/router';
import type { NextPage, GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { Gallery } from '@prisma/client';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import PageDataTable from '../../components/common/PageDataTable';
import PaginationNav from '../../components/common/PaginationNav';
import PageDataHeader from '../../components/common/PageDataHeader';
import styles from '../../styles/modules/Dashboard.module.scss';
import { useAppContext } from '../../context/AppContext';
import {
  callCreateNew,
  callDelete,
  callPublish
} from '../../helpers/galleries';
import { getItemsGalleries } from '../../utility/db/queries/galleries';

type Props = {
  galleries: Gallery[];
  pageNum: number;
  itemsPerPage: number;
  numItems: number;
  defaultSearchText: string;
};

const Galleries: NextPage<Props> = ({
  galleries,
  pageNum,
  itemsPerPage,
  numItems,
  defaultSearchText
}) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Gallery | null>(null);
  const { setLoading } = useAppContext();
  const pageMeta = {
    title: 'Galleries',
    metedesc: 'This page holds a list of galleries for the T446 website.'
  };

  const handleDelete = (gallery: Gallery): void => {
    setIsConfirmingDelete(true);
    setSelectedItem(gallery);
  };
  const handleDeleteCancel = (): void => {
    setIsConfirmingDelete(false);
  };
  const handleDeleteOk = async (id: string) => {
    setIsConfirmingDelete(false);
    await callDelete(setLoading, setIsConfirmingDelete, `${selectedItem?.id}`);
  };
  const setSearchFilter = (searchText: string) => {
    const url = `/galleries/1?search=${encodeURIComponent(searchText)}`;
    Router.replace(url);
  };
  const handleCreateNew = async () => {
    callCreateNew(setLoading);
  };
  const handlePublish = async () => {
    callPublish(setLoading);
  };
  const tableActions = ['edit', 'view', 'delete'];
  const tableFields = [
    {
      title: 'Title',
      slug: 'title'
    },
    {
      title: 'Modified',
      slug: 'dateModified'
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
            viewPrefix="gallery/"
          />
          <PaginationNav
            pageNum={pageNum}
            itemsPerPage={itemsPerPage}
            itemsLoaded={galleries.length}
            numItems={numItems}
            path="/galleries/"
          />
        </div>
        {isConfirmingDelete && (
          <ConfirmationModal
            title="Delete Gallery"
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

export default Galleries;
