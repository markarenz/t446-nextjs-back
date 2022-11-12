import styles from '../styles/Header.module.scss';
import { useAppContext } from '../context/AppContext';
import Button from './common/Button';
import ButtonNavToggle from './ButtonNavToggle';

const Header = () => {
  const { isSidebarOpen, setSidebarOpen, isLoggedIn, authLogout, userRole } =
    useAppContext();
  const handleLogout = () => {
    authLogout();
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
