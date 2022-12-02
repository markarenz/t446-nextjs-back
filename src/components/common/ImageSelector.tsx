import { useState } from 'react';
import IconButton from './IconButton';
import Input from './Input';
import ImageSelectorItem from './ImageSelectorItem';
import { Asset } from '../../types/types';
import { useAppContext } from '../../context/AppContext';
import { IconSearch, IconRefresh } from '../img/icons';
import { callDeleteAsset } from '../../helpers/assets';
import styles from '../../styles/modules/ImageSelector.module.scss';

type Props = {
  assetList: Asset[];
  allowSelection: boolean;
  handleTriggerRefresh: Function;
  handleSelection?: Function | null;
};
const ImageSelector: React.FC<Props> = ({
  assetList,
  handleTriggerRefresh,
  allowSelection,
  handleSelection
}) => {
  const [resultsPage, setResultsPage] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const { setLoading } = useAppContext();
  const filteredAssets = assetList.filter(
    (a) =>
      a.filename.toLowerCase().includes(searchText.toLocaleLowerCase()) ||
      searchText === ''
  );
  const itemsPerPage = 10;
  const totalItems = filteredAssets.length;
  const startItem = resultsPage * itemsPerPage;
  const endItem =
    startItem + itemsPerPage > totalItems
      ? totalItems
      : startItem + itemsPerPage;
  const paginatedAssets = filteredAssets.slice(startItem, endItem);
  const assetPageNav = (dir: number) => {
    setResultsPage((prevResultsPage) => (prevResultsPage += dir));
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const handleUpdateSearch = () => {
    setSearchText(searchInput);
  };
  const handleAssetDelete = async (filename: string) => {
    const result = await callDeleteAsset(setLoading, filename);
    handleTriggerRefresh();
  };
  return (
    <div className={styles.root} data-testid="image-selector">
      <div className={styles.controlsWrap}>
        <div className={styles.search}>
          <Input
            testId="asset-search"
            type="search"
            value={searchInput}
            onChange={handleSearchChange}
            onEnterkey={handleUpdateSearch}
            autoFocus
          />
        </div>
        <div className="mr-1">
          <IconButton
            testId="asset-search-btn"
            title="Search"
            onClick={handleUpdateSearch}
            color="default"
          >
            <IconSearch />
          </IconButton>
        </div>
        <IconButton
          title="Refresh"
          onClick={handleTriggerRefresh}
          color="primary"
        >
          <IconRefresh />
        </IconButton>
      </div>
      <div className={styles.listStage} data-testid="asset-list-stage">
        {paginatedAssets.map((a, idx) => (
          <ImageSelectorItem
            testId={`asset-item-${idx}`}
            key={`${a.filename}`}
            idx={idx + startItem + 1}
            asset={a}
            allowSelection={allowSelection}
            handleSelection={
              handleSelection ? () => handleSelection(a.filename) : () => {}
            }
            handleAssetDelete={() => handleAssetDelete(a.filename)}
          />
        ))}
      </div>
      <div className={styles.pagination}>
        <button
          data-testid="btn-pagenav-prev"
          onClick={() => assetPageNav(-1)}
          disabled={resultsPage < 1}
          className={styles.navBtn}
        >
          <span className="scaleHover">&#9664;</span>
        </button>
        <span className={styles.pageNumsWrapper}>
          {startItem + 1} - {endItem} of {totalItems}
        </span>
        <button
          data-testid="btn-pagenav-next"
          onClick={() => assetPageNav(1)}
          disabled={totalItems <= endItem}
          className={styles.navBtn}
        >
          <span className="scaleHover">&#9654;</span>
        </button>
      </div>
    </div>
  );
};

export default ImageSelector;
