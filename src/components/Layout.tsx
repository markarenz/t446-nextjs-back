import { PageMeta } from '../types/types';
import Header from './Header';
import Footer from './Footer';
import PageSeo from './PageSeo';
import Loader from './common/Loader';
import Sidebar from './Sidebar';
import { checkSession } from '../helpers';
import styles from '../styles/Layout.module.scss';
import { useAppContext } from '../context/AppContext';
import { useSession, signIn } from 'next-auth/react';

type Props = {
  children: JSX.Element;
  pageMeta: PageMeta;
};

const Layout: React.FC<Props> = ({ children, pageMeta }) => {
  const { data: session } = useSession();
  console.log('session', session);
  const isLoggedIn = checkSession(session);
  const { isLoading } = useAppContext();
  return (
    <div className={styles.layout}>
      <PageSeo pageMeta={pageMeta} />
      {!isLoading && !isLoggedIn && (
        <div>
          You need to log in.
          <button onClick={() => signIn()}>Sign in</button>
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
      <Loader show={isLoading} />
    </div>
  );
};

export default Layout;
