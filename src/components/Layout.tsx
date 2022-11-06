import { useSession, signIn } from 'next-auth/react';
import { getIsLoggedIn } from '../../helpers';
import { PageMeta } from '../types/types';
import Header from './Header';
import Footer from './Footer';
import PageSeo from './PageSeo';
import Loader from './common/Loader';
import styles from '../styles/Layout.module.scss';

type Props = {
  children: JSX.Element;
  pageMeta: PageMeta;
};

const Layout: React.FC<Props> = ({ children, pageMeta }) => {
  const { data: session } = useSession();
  const isLoading = session === undefined;
  const isLoggedIn = session ? getIsLoggedIn(session) : false;
  return (
    <div className={styles.layout}>
      {!isLoading && !isLoggedIn && (
        <div>
          <PageSeo pageMeta={pageMeta} />
          <h1>You need to log in</h1>
          {!session ? 'No session' : 'Yes session'}
          <div>
            <button onClick={() => signIn()}>SIGN IN</button>
          </div>
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
