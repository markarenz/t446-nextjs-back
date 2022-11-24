import { useState } from 'react';
import Router from 'next/router';
import type { NextPage, GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { Setting } from '@prisma/client';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import PageDataTable from '../../components/common/PageDataTable';
import PaginationNav from '../../components/common/PaginationNav';
import { useAppContext } from '../../context/AppContext';
import PageDataHeader from '../../components/common/PageDataHeader';
import { callCreateNew, callDelete, callPublish } from '../../helpers/settings';
import { getItemsSettings } from '../../utility/db/queries/settings';
import styles from '../../styles/modules/Dashboard.module.scss';

type Props = {
  settings: Setting[];
  pageNum: number;
  itemsPerPage: number;
  numItems: number;
  defaultSearchText: string;
};

const Settings: NextPage<Props> = ({
  settings,
  pageNum,
  itemsPerPage,
  numItems,
  defaultSearchText
}) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Setting | null>(null);
  const { setLoading } = useAppContext();
  const pageMeta = {
    title: 'Settings',
    metedesc: 'This page holds a list of settings for the T446 website.'
  };

  const handleDelete = (setting: Setting): void => {
    setIsConfirmingDelete(true);
    setSelectedItem(setting);
  };
  const handleDeleteCancel = (): void => {
    setIsConfirmingDelete(false);
  };
  const handleDeleteOk = async () => {
    await callDelete(setLoading, setIsConfirmingDelete, `${selectedItem?.id}`);
  };
  const setSearchFilter = (searchText: string) => {
    Router.replace(`/settings/1?search=${encodeURIComponent(searchText)}`);
  };
  const handleCreateNew = async () => {
    callCreateNew(setLoading);
  };
  const handlePublish = async () => {
    callPublish(setLoading);
  };
  const tableActions = ['edit', 'delete'];
  const tableFields = [
    {
      title: 'Title',
      slug: 'title'
    }
  ];
  return (
    <Layout pageMeta={pageMeta}>
      <div className={styles.pageRoot}>
        <div className="container-xl">
          <PageDataHeader
            title="Settings"
            setSearchFilter={setSearchFilter}
            defaultSearchText={defaultSearchText}
            handleCreateNew={handleCreateNew}
            handlePublish={handlePublish}
          />
          <PageDataTable
            items={settings}
            slug="settings"
            tableFields={tableFields}
            tableActions={tableActions}
            handleDelete={handleDelete}
            viewPrefix=""
          />
          <PaginationNav
            pageNum={pageNum}
            itemsPerPage={itemsPerPage}
            itemsLoaded={settings.length}
            numItems={numItems}
            path="/settings/"
          />
        </div>
        {isConfirmingDelete && (
          <ConfirmationModal
            title="Delete Setting"
            handleCancel={handleDeleteCancel}
            handleOk={() => handleDeleteOk()}
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
  const { numItems, settings } = await getItemsSettings(
    searchText,
    skip,
    itemsPerPage
  );
  return {
    props: {
      settings,
      pageNum,
      itemsPerPage,
      numItems,
      defaultSearchText: searchText
    }
  };
};

export default Settings;
