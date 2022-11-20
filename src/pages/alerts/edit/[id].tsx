import { useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Layout from '../../../components/Layout';
import { Alert } from '@prisma/client';
import Router from 'next/router';
import DatePicker from 'react-datepicker';
import EditItemHeader from '../../../components/common/EditItemHeader';
import Button from '../../../components/common/Button';
import { useAppContext } from '../../../context/AppContext';
import { getItemAlert } from '../../../utility/db/queries/alerts';
import Input from '../../../components/common/Input';
import InputMarkdown from '../../../components/common/InputMarkdown';
import Switch from '../../../components/common/Switch';
import styles from '../../../styles/modules/editingForms.module.scss';
import { statusOptions } from '../../../constants';
import { sanitizeEventValue } from '../../../helpers';
import { validateFormAlert } from '../../../helpers/alerts';

type Props = {
  alert: Alert | null;
};

const AlertEdit: NextPage<Props> = ({ alert }) => {
  const defaultData = {
    title: alert?.title || '',
    status: alert?.status || '',
    content: alert?.content || '',
    dateStart: alert?.dateStart || new Date(),
    dateEnd: alert?.dateEnd || new Date()
  };
  const [formData, setFormData] = useState(defaultData);
  const pageMeta = {
    title: 'Edit Alert',
    metedesc: 'Editing alert for T446 website.'
  };
  const { setLoading } = useAppContext();
  const handleSave = async () => {
    setLoading(true);
    const body = {
      id: alert?.id,
      formData
    };
    await fetch('/api/alerts/update', {
      method: 'POST',
      body: JSON.stringify(body)
    });
    setLoading(false);
  };
  const handleExit = () => {
    const url = `/alerts/1`;
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
  const { isFormValid, formErrors } = validateFormAlert(formData);
  return (
    <Layout pageMeta={pageMeta}>
      <div className={styles.pageRoot}>
        <div className="container-xl">
          <EditItemHeader title="Alert: Edit" />
          <div className="card">
            <div className="card-header">{`Editing: ${alert?.title}`}</div>
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
                  <div className="col-6">
                    <label>Start Date</label>
                    <DatePicker
                      name="dateStart"
                      selected={new Date(formData.dateStart)}
                      onChange={(date: Date) =>
                        handleValueChange('dateStart', date)
                      }
                    />
                  </div>
                  <div className="col-6">
                    <label>End Date</label>
                    <DatePicker
                      name="dateEnd"
                      selected={new Date(formData.dateEnd)}
                      onChange={(date: Date) =>
                        handleValueChange('dateEnd', date)
                      }
                    />
                    {formErrors.dateEnd && (
                      <div className="error">{formErrors.dateEnd}</div>
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
  const { alert } = await getItemAlert(`${id}`);
  return {
    props: {
      alert
    }
  };
};

export default AlertEdit;
