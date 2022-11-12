import { PageMeta } from '../types/types';
import Header from './Header';
import Footer from './Footer';
import PageSeo from './PageSeo';
import Loader from './common/Loader';
import Sidebar from './Sidebar';
import styles from '../styles/Layout.module.scss';
import Login from './Login';
import { useAppContext } from '../context/AppContext';

type Props = {
  children: JSX.Element;
  pageMeta: PageMeta;
};

const Layout: React.FC<Props> = ({ children, pageMeta }) => {
  const { isLoggedIn, isLoading } = useAppContext();
  return (
    <div className={styles.layout}>
      <PageSeo pageMeta={pageMeta} />
      {!isLoading && !isLoggedIn && (
        <div>
          <Login />
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
