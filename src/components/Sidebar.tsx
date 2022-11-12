import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import styles from '../styles/Sidebar.module.scss';
import { useAppContext } from '../context/AppContext';
import { navItems } from '../constants';
import { getRoleFromSession } from '../helpers';
import NavSectionTitle from './NavSectionTitle';
import NavLink from './NavLink';

const Sidebar = () => {
  const [menuState, setMenuState] = useState<boolean[]>([]);
  const { isSidebarOpen } = useAppContext();
  const { data: session } = useSession();
  const userRole = getRoleFromSession(session);
  const handleSectionToggle = (idx: number): void => {
    setMenuState((prevMenuState) => {
      const newMenuState = [...prevMenuState];
      const newVal: boolean = newMenuState[idx] ? !newMenuState[idx] : true;
      newMenuState[idx] = newVal;
      return newMenuState;
    });
  };
  return (
    <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
      <div className={styles.inner}>
        <Link href="/">
          <img
            src="/img/t446-menu-photo.jpg"
            alt="Troop 446"
            className="responsive cursor-pointer"
          />
        </Link>
        <nav className={styles.navArea}>
          {navItems
            .filter((i) => i.roles.includes(userRole))
            .map((i) => (
              <div key={i.id} className={styles.navSection}>
                <NavSectionTitle
                  handleSectionToggle={handleSectionToggle}
                  menuState={menuState}
                  navItem={i}
                />
                <div
                  className={`${styles.navLinks} ${
                    menuState[i.id] ? styles.active : ''
                  }`}
                >
                  {i.links.map((l) => (
                    <NavLink link={l} key={l.title} />
                  ))}
                </div>
              </div>
            ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
