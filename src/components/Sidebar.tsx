import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import styles from '../styles/modules/Sidebar.module.scss';
import { useAppContext } from '../context/AppContext';
import { navItems } from '../constants';
import { getRoleFromSession } from '../helpers';
import NavSectionTitle from './NavSectionTitle';

const Sidebar = () => {
  const { isSidebarOpen } = useAppContext();
  const { data: session } = useSession();
  const userRole = getRoleFromSession(session);
  return (
    <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
      <div className={styles.inner}>
        <Link href="/">
          <Image
            src="/img/t446-menu-photo.jpg"
            alt="Troop 446"
            className="responsive cursor-pointer"
            width={640}
            height={233}
          />
        </Link>
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
