import React, { useState, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Layout from '../../../components/Layout';
import { Gallery } from '@prisma/client';
import Router from 'next/router';
import DatePicker from 'react-datepicker';
import EditItemHeader from '../../../components/common/EditItemHeader';
import Button from '../../../components/common/Button';
import { useAppContext } from '../../../context/AppContext';
import { getItemGallery } from '../../../utility/db/queries/galleries';
import Input from '../../../components/common/Input';
import InputMarkdown from '../../../components/common/InputMarkdown';
import InputGalleryImages from '../../../components/common/InputGalleryImages';
import Switch from '../../../components/common/Switch';
import { callGetFileList } from '../../../helpers/assets';
import styles from '../../../styles/modules/editingForms.module.scss';
import { statusOptions } from '../../../constants';
import { sanitizeEventValue } from '../../../helpers';
import { validateFormGallery } from '../../../helpers/galleries';
import { Asset } from '../../../types/types';

type Props = {
  gallery: Gallery | null;
  baseImgUrl: string;
};

const GalleryEdit: NextPage<Props> = ({ gallery, baseImgUrl }) => {
  const defaultData = {
    title: gallery?.title || '',
    slug: gallery?.slug || '',
    status: gallery?.status || '',
    content: gallery?.content || '',
    images: gallery?.images || '',
    pubDate: gallery?.pubDate || new Date()
  };
  const [formData, setFormData] = useState(defaultData);
  const [assetList, setAssetList] = useState<Asset[]>([]);
  const handleLoadFileList = async () => {
    const newAssetList = await callGetFileList(setLoading);
    setAssetList(newAssetList);
  };
  const handleTriggerRefresh = () => {
    handleLoadFileList();
  };
  useEffect(() => {
    handleLoadFileList();
    //eslint-disable-next-line
  }, []);

  const pageMeta = {
    title: 'Edit Gallery',
    metedesc: 'Editing gallery for T446 website.'
  };
  const { setLoading } = useAppContext();
  const handleSave = async () => {
    setLoading(true);
    const body = {
      id: gallery?.id,
      formData
    };
    await fetch('/api/galleries/update', {
      method: 'POST',
      body: JSON.stringify(body)
    });
    setLoading(false);
  };
  const handleExit = () => {
    const url = `/galleries/1`;
    Router.replace(url);
  };
  const hanleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: sanitizeEventValue(e)
    });
  };
  const handleValueChange = (name: string, val: string | Date) => {
    setFormData({
      ...formData,
      [name]: val
    });
  };
  const { isFormValid, formErrors } = validateFormGallery(formData);

  return (
    <Layout pageMeta={pageMeta}>
      <div className={styles.pageRoot}>
        <div className="container-xl">
          <EditItemHeader title="Gallery: Edit" />
          <div className="card">
            <div className="card-header">{`Editing: ${formData?.title}`}</div>
            <div className="card-body">
              <div className={styles.form}>
                <div className="grid">
                  <div className="col-12">
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
                  <div className="col-6">
                    <label>Publish Date</label>
                    <DatePicker
                      name="pubDate"
                      selected={new Date(formData.pubDate)}
                      onChange={(date: Date) =>
                        handleValueChange('pubDate', date)
                      }
                    />
                  </div>
                  <div className="col-12">
                    <label>Content</label>
                    <InputMarkdown
                      value={formData.content}
                      name="content"
                      tabIndex={1}
                      rows={5}
                      onChange={hanleInputChange}
                    />
                  </div>

                  <div className="col-12">
                    <InputGalleryImages
                      value={formData.images}
                      onChange={handleValueChange}
                      baseImgUrl={baseImgUrl}
                      assetList={assetList}
                      handleTriggerRefresh={handleTriggerRefresh}
                    />
                    {formErrors.title && (
                      <div className="error">{formErrors.images}</div>
                    )}
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
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const { gallery } = await getItemGallery(`${id}`);
  const baseImgUrl = `${process.env.AWS__BASE_DIR}files/`;
  return {
    props: {
      gallery,
      baseImgUrl
    }
  };
};

export default GalleryEdit;
