import Link from 'next/link';
import IconArrow from './img/icons/IconArrow';
import styles from '../styles/NavLink.module.scss';

type NavLinkType = {
  path: string;
  title: string;
};

type Props = {
  link: NavLinkType;
};

const NavLink: React.FC<Props> = ({ link }) => {
  return (
    <div className={styles.navLink}>
      <div className={styles.navLinkDeco}>
        <IconArrow />
      </div>
      <Link href={link.path}>{link.title}</Link>
    </div>
  );
};

export default NavLink;
