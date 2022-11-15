import styles from '../styles/modules/NavSectionTitle.module.scss';
import Link from 'next/link';
import {
  IconAlerts,
  IconPages,
  IconGalleries,
  IconAssets,
  IconTools
} from './img/icons';

type Props = {
  navItem: {
    id: number;
    title: string;
    path: string;
  };
};

const NavSectionTitle: React.FC<Props> = ({ navItem }) => {
  return (
    <div className={styles.navSectionTitle}>
      <Link href={navItem.path}>
        <div className={styles.titleWrap}>
          <div className={styles.iconWrap}>
            {navItem.title === 'Alerts' && <IconAlerts />}
            {navItem.title === 'Pages' && <IconPages />}
            {navItem.title === 'Galleries' && <IconGalleries />}
            {navItem.title === 'Assets' && <IconAssets />}
            {navItem.title === 'Tools' && <IconTools />}
          </div>
          {navItem.title}
        </div>
      </Link>
    </div>
  );
};

export default NavSectionTitle;
