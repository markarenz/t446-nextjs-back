import styles from '../styles/modules/Custom404.module.scss';
import LinkButton from '../components/common/LinkButton';

export default function Custom404() {
  const pageMeta = {
    title: 'Home',
    metedesc: 'This is the dashboard for the T446 Content app'
  };
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.big404}>404</div>
        <h1 className="mb-2">404 - Page Not Found, Scout!</h1>
        <div>
          <LinkButton
            variant="contained"
            color="primary"
            size="large"
            tabIndex={1}
            href="/"
          >
            <span>Go Home</span>
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
