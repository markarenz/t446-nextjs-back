import { signOut } from 'next-auth/react';
import styles from '../styles/Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div>This is my header</div>
      <button onClick={() => signOut()}>SIGN OUT</button>
    </header>
  );
};

export default Header;
