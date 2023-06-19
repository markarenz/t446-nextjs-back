import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import styles from '../styles/modules/Sidebar.module.scss';
import { useAppContext } from '../context/AppContext';
import { navItems } from '../constants';
import { getRoleFromSession } from '../helpers';
import NavSectionTitle from './NavSectionTitle';

const Sidebar = () => {
  const router = useRouter();
  const { isSidebarOpen } = useAppContext();
  const { data: session } = useSession();
  const userRole = getRoleFromSession(session);
  const handleImageClick = () => {
    router.replace('/');
  };
  return (
    <div
      className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}
      data-testid="sidebar"
    >
      <div className={styles.inner}>
        <Image
          src="/img/t446-menu-photo.jpg"
          alt="Troop 446"
          className="responsive cursor-pointer"
          width={640}
          height={233}
          onClick={handleImageClick}
          data-testid="sidebar-img"
        />
        <nav className={styles.navArea}>
          {navItems
            .filter((i) => i.roles.includes(userRole))
            .map((i) => (
              <div key={i.id} className={styles.navSection}>
                <NavSectionTitle navItem={i} />
              </div>
            ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
