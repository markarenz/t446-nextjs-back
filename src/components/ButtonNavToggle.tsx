import { useAppContext } from '../context/AppContext';
import styles from '../styles/modules/ButtonNavToggle.module.scss';

const ButtonNavToggle = () => {
  const { isSidebarOpen, setSidebarOpen } = useAppContext();
  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const iconPaths = {
    top: {
      default: 'M 5.0000005,5.0000005 H 95 V 19.999999 H 5.0000005 Z',
      active:
        'M 20.606602,10.000001 91.317279,80.710678 80.710679,91.317279 10.000001,20.606601 Z'
    }
  };
  return (
    <button
      data-testid="btn-nav-toggle"
      type="button"
      onClick={handleToggleSidebar}
      className={styles.buttonNavToggle}
      title={isSidebarOpen ? 'Close' : 'Open'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 100 100"
        xmlSpace="preserve"
      >
        <rect
          width="90"
          height="15"
          x="5"
          y="5"
          className={`${styles.bar} ${styles.bar1} ${
            isSidebarOpen ? styles.active : ''
          }`}
        />
        <rect
          width="90"
          height="15"
          x="5"
          y="42"
          className={`${styles.bar} ${styles.bar2} ${
            isSidebarOpen ? styles.active : ''
          }`}
        />
        <rect
          width="90"
          height="15"
          x="5"
          y="80"
          className={`${styles.bar} ${styles.bar3} ${
            isSidebarOpen ? styles.active : ''
          }`}
        />
      </svg>
    </button>
  );
};

export default ButtonNavToggle;
