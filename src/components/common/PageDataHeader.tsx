import { useState } from 'react';
import styles from '../../styles/modules/PageDataHeader.module.scss';
import IconButton from '../../components/common/IconButton';
import Input from '../../components/common/Input';
import {
  IconNewItem,
  IconPublish,
  IconSearch
} from '../../components/img/icons';

type Props = {
  title: string;
  setSearchFilter: Function;
  defaultSearchText: string;
  handleCreateNew: Function;
  handlePublish: Function;
};

const PageDataHeader: React.FC<Props> = ({
  setSearchFilter,
  defaultSearchText,
  title,
  handleCreateNew,
  handlePublish
}) => {
  const [searchText, setSearchText] = useState(defaultSearchText);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const handleSearchClick = () => {
    setSearchFilter(searchText);
  };
  return (
    <div className={styles.pageDataHeader}>
      <h2 className="pageTitle">{title}</h2>
      <div className={styles.controlWrap}>
        <span className="mr-1">
          <Input
            type="search"
            onChange={handleSearchChange}
            autoFocus={false}
            value={searchText}
            onEnterkey={() => handleSearchClick()}
          />
        </span>
        <span className="mr-1">
          <IconButton
            onClick={() => handleSearchClick()}
            title="New Item"
            color="default"
          >
            <IconSearch />
          </IconButton>
        </span>
        <span className="mr-1">
          <IconButton onClick={handlePublish} title="Publish" color="default">
            <IconPublish />
          </IconButton>
        </span>
        <span>
          <IconButton
            onClick={handleCreateNew}
            title="New Item"
            color="primary"
          >
            <IconNewItem />
          </IconButton>
        </span>
      </div>
    </div>
  );
};

export default PageDataHeader;
