import { PageMeta } from '../types/types';
import Header from './Header';
import Footer from './Footer';
import PageSeo from './PageSeo';
import Loader from './common/Loader';
import Button from './common/Button';
import Sidebar from './Sidebar';
import { checkSession } from '../helpers';
import styles from '../styles/modules/Layout.module.scss';
import { useAppContext } from '../context/AppContext';
import { useSession, signIn } from 'next-auth/react';

type Props = {
  children: JSX.Element;
  pageMeta: PageMeta;
};

const Layout: React.FC<Props> = ({ children, pageMeta }) => {
  const { data: session } = useSession();
  const isLoggedIn = checkSession(session);
  const isLoadingSession = session === undefined;
  const { isLoading } = useAppContext();
  return (
    <div className={styles.layout}>
      <PageSeo pageMeta={pageMeta} />
      {!isLoading && !isLoggedIn && (
        <div className={styles.loggedOut}>
          <h2>You need to log in.</h2>
          <Button
            disabled={false}
            onClick={() => signIn()}
            color="primary"
            variant="contained"
          >
            <span>Sign In</span>
          </Button>
        </div>
      )}
      {!isLoading && isLoggedIn && (
        <div className={styles.layoutRoot}>
          <Sidebar />
          <div className={styles.layoutMain}>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />
          </div>
        </div>
      )}
      <Loader show={isLoading || isLoadingSession} />
    </div>
  );
};

export default Layout;
