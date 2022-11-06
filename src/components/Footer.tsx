import { signOut } from 'next-auth/react';
import styles from '../styles/Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div>This is my footer</div>
      </div>
    </footer>
  );
};

export default Footer;
