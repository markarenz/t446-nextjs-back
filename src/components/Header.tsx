import styles from '../styles/modules/Header.module.scss';
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
    signOut({
      callbackUrl: `${window.location.origin}`
    });
  };
  return (
    <header className={styles.header} data-testid="header">
      <div>
        <ButtonNavToggle />
      </div>
      <div>
        <span className={styles.userRole}>{userRole}</span>
        <Button
          disabled={false}
          onClick={handleLogout}
          tabIndex={-1}
          testId="btn-logout"
        >
          <span>LOG OUT</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
