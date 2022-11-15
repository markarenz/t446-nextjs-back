import styles from '../styles/modules/Footer.module.scss';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className="container-lg">
        <div className="text-center">
          Troop 446 Indianapolis, IN - Visit{' '}
          <a
            href="https://www.indytroop446.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Troop Website
          </a>
        </div>
        <div className={styles.copyright}>&copy;{year} All Rights Reserved</div>
      </div>
    </footer>
  );
};

export default Footer;
