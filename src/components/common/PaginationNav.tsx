import Link from 'next/link';
import styles from '../../styles/modules/PaginationNav.module.scss';

type Props = {
  pageNum: number;
  itemsPerPage: number;
  itemsLoaded: number;
  numItems: number;
  path: string;
};

const PaginationNav: React.FC<Props> = ({
  pageNum,
  itemsPerPage,
  itemsLoaded,
  numItems,
  path
}) => {
  const firstItem = (pageNum - 1) * itemsPerPage + 1;
  const lastItem = firstItem + itemsLoaded - 1;
  const moreItems = lastItem + 1 <= numItems;
  return (
    <div className={styles.root} data-testid="pagination-nav">
      <span className={styles.navBtnWrapper}>
        {pageNum > 1 && (
          <Link href={`${path}${pageNum - 1}`} passHref>
            <span className="scaleHover">&#9664;</span>
          </Link>
        )}
      </span>
      <span className={styles.pageNumsWrapper}>
        {firstItem} - {lastItem}
      </span>
      <span className={styles.navBtnWrapper}>
        {moreItems && (
          <Link href={`${path}${pageNum + 1}`} className="scaleHover" passHref>
            <span className="scaleHover">&#9654;</span>
          </Link>
        )}
      </span>
    </div>
  );
};

export default PaginationNav;
