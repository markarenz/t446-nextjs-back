import styles from '../styles/NavSectionTitle.module.scss';
import IconChevron from './img/icons/IconChevron';
import {
  IconAlerts,
  IconPages,
  IconGalleries,
  IconAssets,
  IconTools
} from './img/icons';

type Props = {
  handleSectionToggle: Function;
  menuState: boolean[];
  navItem: {
    id: number;
    title: string;
  };
};

const NavSectionTitle: React.FC<Props> = ({
  handleSectionToggle,
  menuState,
  navItem
}) => {
  return (
    <div
      className={styles.navSectionTitle}
      onClick={() => handleSectionToggle(navItem.id)}
    >
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
      <div>
        <div
          className={`${styles.chevron} ${
            menuState[navItem.id] ? styles.active : ''
          }`}
        >
          <IconChevron />
        </div>
      </div>
    </div>
  );
};

export default NavSectionTitle;
