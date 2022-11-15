import styles from '../../styles/modules/EditItemHeader.module.scss';
type Props = {
  title: string;
};
const EditItemHeader: React.FC<Props> = ({ title }) => {
  return (
    <div className={styles.pageHeader}>
      <h2 className="pageTitle">{title}</h2>
    </div>
  );
};

export default EditItemHeader;
