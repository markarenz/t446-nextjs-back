import styles from '../styles/Header.module.scss';
import { useSession, signOut } from 'next-auth/react';
import { useAppContext } from '../context/AppContext';
import Button from './common/Button';
import { getRoleFromSession } from '../helpers';
import ButtonNavToggle from './ButtonNavToggle';

const Header = () => {
  const { data: session } = useSession();
  const userRole = getRoleFromSession(session);
  const { isSidebarOpen, setSidebarOpen } = useAppContext();
  const handleLogout = () => {
    signOut();
  };
  return (
    <header className={styles.header}>
      <div>
        <ButtonNavToggle />
      </div>
      <div>
        <span className={styles.userRole}>{userRole}</span>
        <Button disabled={false} onClick={handleLogout} tabIndex={-1}>
          <span>LOG OUT</span>
        </Button>
      </div>
      {/* <button onClick={() => signOut()}>SIGN OUT</button> */}
    </header>
  );
};

export default Header;
