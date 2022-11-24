import { useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Layout from '../../../components/Layout';
import { Setting } from '@prisma/client';
import Router from 'next/router';
import DatePicker from 'react-datepicker';
import EditItemHeader from '../../../components/common/EditItemHeader';
import Button from '../../../components/common/Button';
import { useAppContext } from '../../../context/AppContext';
import { getItemSetting } from '../../../utility/db/queries/settings';
import Input from '../../../components/common/Input';
import InputMarkdown from '../../../components/common/InputMarkdown';
import Switch from '../../../components/common/Switch';
import styles from '../../../styles/modules/editingForms.module.scss';
import { statusOptions } from '../../../constants';
import { sanitizeEventValue } from '../../../helpers';
import { validateFormSetting } from '../../../helpers/settings';

type Props = {
  setting: Setting | null;
};

const SettingEdit: NextPage<Props> = ({ setting }) => {
  const defaultData = {
    title: setting?.title || '',
    key: setting?.key || '',
    value: setting?.value || ''
  };
  const [formData, setFormData] = useState(defaultData);
  const pageMeta = {
    title: 'Edit Setting',
    metedesc: 'Editing setting for T446 website.'
  };
  const { setLoading } = useAppContext();
  const handleSave = async () => {
    setLoading(true);
    const body = {
      id: setting?.id,
      formData
    };
    await fetch('/api/settings/update', {
      method: 'POST',
      body: JSON.stringify(body)
    });
    setLoading(false);
  };
  const handleExit = () => {
    const url = `/settings/1`;
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
  const { isFormValid, formErrors } = validateFormSetting(formData);
  return (
    <Layout pageMeta={pageMeta}>
      <div className={styles.pageRoot}>
        <div className="container-xl">
          <EditItemHeader title="Setting: Edit" />
          <div className="card">
            <div className="card-header">{`Editing: ${setting?.title}`}</div>
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
                  <div className="col-12">
                    <label>Key</label>
                    <Input
                      type="text"
                      name="key"
                      autoFocus={true}
                      tabIndex={2}
                      value={formData.key}
                      onChange={hanleInputChange}
                    />
                    {formErrors.title && (
                      <div className="error">{formErrors.key}</div>
                    )}
                  </div>
                  <div className="col-12">
                    <label>Value</label>
                    <Input
                      type="text"
                      name="value"
                      autoFocus={true}
                      tabIndex={3}
                      rows={7}
                      value={formData.value}
                      onChange={hanleInputChange}
                    />
                    {formErrors.title && (
                      <div className="error">{formErrors.value}</div>
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
  const { setting } = await getItemSetting(`${id}`);
  return {
    props: {
      setting
    }
  };
};

export default SettingEdit;
