import styles from '../../styles/modules/ConfirmationModal.module.scss';
import Button from './Button';

type Props = {
  handleOk: Function;
  handleCancel: Function;
  children: JSX.Element;
  title: string;
};

const ConfirmationModal: React.FC<Props> = ({
  handleOk,
  handleCancel,
  children,
  title
}) => {
  return (
    <div className={styles.modalRoot}>
      <div className="card">
        <div className="card-header">{title}</div>
        <div className="card-body">{children}</div>
        <div className="card-actions">
          <span className="mr-1">
            <Button
              disabled={false}
              variant="outlined"
              onClick={handleCancel}
              tabIndex={1}
            >
              <span>Cancel</span>
            </Button>
          </span>
          <span>
            <Button
              disabled={false}
              variant="contained"
              color="primary"
              onClick={handleOk}
              tabIndex={2}
            >
              <span>OK</span>
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
