import { useState, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Layout from '../../../components/Layout';
import { Page } from '@prisma/client';
import { Asset } from '../../../types/types';
import Router from 'next/router';
import EditItemHeader from '../../../components/common/EditItemHeader';
import Button from '../../../components/common/Button';
import IconButton from '../../../components/common/IconButton';
import { IconInfo } from '../../../components/img/icons';
import { useAppContext } from '../../../context/AppContext';
import { getItemPage } from '../../../utility/db/queries/pages';
import Input from '../../../components/common/Input';
import Switch from '../../../components/common/Switch';
import { callGetFileList } from '../../../helpers/assets';
import { statusOptions } from '../../../constants';
import { sanitizeEventValue } from '../../../helpers';
import { validateFormPage, callUpdate } from '../../../helpers/pages';
import InputPageBlocks from '../../../components/common/InputPageBlocks';
import ProtectedByRole from '../../../components/common/ProtectedByRole';
import styles from '../../../styles/modules/editingForms.module.scss';

type Props = {
  page: Page | null;
  baseImgUrl: string;
};

const PageEdit: NextPage<Props> = ({ page, baseImgUrl }) => {
  const defaultData = {
    title: page?.title || '',
    slug: page?.slug || '',
    status: page?.status || '',
    metadesc: page?.metadesc || '',
    content: page?.content || ''
  };
  const [formData, setFormData] = useState(defaultData);
  const [assetList, setAssetList] = useState<Asset[]>([]);
  const [showRawContent, setShowRawContent] = useState(false);
  const handleToggleShowRawContent = () => {
    setShowRawContent((prev) => !prev);
  };
  const handleLoadFileList = async () => {
    const newAssetList = await callGetFileList(setLoading);
    setAssetList(newAssetList);
  };
  const handleTriggerRefresh = () => {
    handleLoadFileList();
  };
  useEffect(() => {
    handleLoadFileList();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const pageMeta = {
    title: 'Edit Page',
    metedesc: 'Editing page for T446 website.'
  };
  const { setLoading } = useAppContext();
  const handleSave = () => {
    callUpdate(setLoading, `${page?.id}`, formData);
  };
  const handleExit = () => {
    const url = `/pages/1`;
    Router.replace(url);
  };
  const cleanSlug = (str: string): string =>
    str
      .replaceAll(' ', '-')
      .replace(/[^A-Za-z0-9\-/]/g, '')
      .toLocaleLowerCase();

  const hanleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = sanitizeEventValue(e);
    if (e.target.name === 'slug') {
      value = cleanSlug(value);
    }
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };
  const handleValueChange = (name: string, val: string | Date) => {
    setFormData({
      ...formData,
      [name]: val
    });
  };
  const handleMakeSlug = () => {
    const slug = cleanSlug(formData.title);
    setFormData({
      ...formData,
      slug
    });
  };
  const { isFormValid, formErrors } = validateFormPage(formData);
  return (
    <Layout pageMeta={pageMeta}>
      <ProtectedByRole>
        <div className={styles.pageRoot}>
          <div className="container-xl">
            <EditItemHeader title="Page: Edit" />
            <div className="card">
              <div className="card-header">{`Editing: ${formData?.title}`}</div>
              <div className="card-body">
                <div className={styles.form}>
                  <div className="grid">
                    <div className="col-6">
                      <label>Title</label>
                      <Input
                        type="text"
                        name="title"
                        autoFocus={true}
                        tabIndex={1}
                        value={formData.title}
                        onChange={hanleInputChange}
                      />
                      {formErrors.title && (
                        <div className="error">{formErrors.title}</div>
                      )}
                    </div>
                    <div className="col-6">
                      <label>Status</label>
                      <Switch
                        name="status"
                        tabIndex={2}
                        value={formData.status}
                        onChange={handleValueChange}
                        options={statusOptions}
                      />
                      {formErrors.status && (
                        <div className="error">{formErrors.status}</div>
                      )}
                    </div>

                    <div className="col-12">
                      <label className="flex-space-between">
                        <span className="mr-2">Page Slug</span>
                        <Button
                          onClick={handleMakeSlug}
                          color="primary"
                          variant="contained"
                          size="small"
                          disabled={false}
                        >
                          <span>Make Slug</span>
                        </Button>
                      </label>
                      <Input
                        value={formData.slug}
                        name="slug"
                        tabIndex={3}
                        autoFocus={false}
                        rows={1}
                        onChange={hanleInputChange}
                      />
                    </div>
                    <div className="col-12">
                      <label>
                        Meta Description ({160 - formData.metadesc.length}{' '}
                        chars)
                      </label>
                      <Input
                        value={formData.metadesc}
                        name="metadesc"
                        tabIndex={4}
                        autoFocus={false}
                        rows={1}
                        maxLen={160}
                        onChange={hanleInputChange}
                      />
                    </div>
                    <div className="col-12">
                      <label>Page Content</label>
                      <InputPageBlocks
                        value={formData.content}
                        onChange={handleValueChange}
                        baseImgUrl={baseImgUrl}
                        assetList={assetList}
                        handleTriggerRefresh={handleTriggerRefresh}
                      />
                    </div>
                    <div className="col-12">
                      <label className="flex-space-between">
                        Raw Content (For Troubleshooting Only)
                        <IconButton
                          title="Show or hide raw content"
                          onClick={handleToggleShowRawContent}
                        >
                          <IconInfo />
                        </IconButton>
                      </label>
                      {showRawContent && <div>{formData.content}</div>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-actions">
                <span className="mr-1">
                  <Button
                    disabled={false}
                    variant="outlined"
                    onClick={handleExit}
                  >
                    <span>Exit</span>
                  </Button>
                </span>
                <span>
                  <Button
                    variant="contained"
                    disabled={!isFormValid}
                    onClick={handleSave}
                  >
                    <span>Save</span>
                  </Button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </ProtectedByRole>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const { page } = await getItemPage(`${id}`);
  const baseImgUrl = `${process.env.AWS__BASE_DIR}files/`;
  return {
    props: {
      page,
      baseImgUrl
    }
  };
};

export default PageEdit;
