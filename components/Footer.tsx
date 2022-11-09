import styles from '../styles/Footer.module.scss';
import { useAuthContext } from '../auth/AuthContext';

const Footer = () => {
  const { isLoggedIn, userRole, authLogout } = useAuthContext();
  const handleLogout = () => {
    authLogout();
  };
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div>This is my footer </div>
        {isLoggedIn && (
          <div>
            You are logged in as: <span>{userRole}</span>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
