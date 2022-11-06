// import { getIsLoggedIn } from '../helpers';
import { PageMeta } from '../types/types';
import Header from './Header';
import Footer from './Footer';
import PageSeo from './PageSeo';
import Loader from './common/Loader';
import styles from '../styles/Layout.module.scss';
import Login from './Login';
import { useAuthContext } from '../auth/AuthContext';

type Props = {
  children: JSX.Element;
  pageMeta: PageMeta;
};

const Layout: React.FC<Props> = ({ children, pageMeta }) => {
  const isLoading = false;
  const { isLoggedIn } = useAuthContext();
  return (
    <div className={styles.layout}>
      {!isLoading && !isLoggedIn && (
        <div>
          <PageSeo pageMeta={pageMeta} />
          <Login />
        </div>
      )}
      {!isLoading && isLoggedIn && (
        <div className={styles.layoutMain}>
          <PageSeo pageMeta={pageMeta} />
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </div>
      )}
      <Loader show={isLoading} />
    </div>
  );
};

export default Layout;
