import styles from '../../styles/modules/Loader.module.scss';
import LogoBsa from '../img/LogoBsa';
import LoaderArcs from '../img/LoaderArcs';

type Props = {
  show: boolean;
};
const Loader: React.FC<Props> = ({ show }) => {
  return (
    <div className={`${styles.loader} ${show && styles.active}`}>
      <div className={styles.loaderImg}>
        <div className={`${styles.logo} ${show ? styles.animating : ''}`}>
          <LogoBsa />
        </div>
        <div className={styles.spinner}>
          <LoaderArcs show={show} />
        </div>
      </div>
    </div>
  );
};

export default Loader;
