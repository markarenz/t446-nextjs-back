import Image from 'next/image';
import IconButton from './IconButton';
import { IconDelete } from '../img/icons';
import { Asset } from '../../types/types';
import styles from '../../styles/modules/ImageSelectorItem.module.scss';

type Props = {
  idx: number;
  asset: Asset;
  allowSelection: boolean;
  handleSelection: Function;
  handleAssetDelete: Function;
  testId?: string;
};
const ImageSelectorItem: React.FC<Props> = ({
  idx,
  asset,
  allowSelection,
  handleSelection,
  handleAssetDelete,
  testId
}) => {
  const { filename, thumbnail } = asset;
  const handleImageClick = (filename: string) => {
    handleSelection(filename);
  };
  return (
    <div
      data-testid={testId}
      className={styles.root}
      style={{ backgroundImage: `url(${thumbnail})` }}
      onClick={() => handleImageClick(filename)}
    >
      <div className={styles.idx}>{idx}</div>
      <div className={styles.btnDeleteWrap}>
        <IconButton
          title="delete"
          onClick={handleAssetDelete}
          color="primary"
          testId={`${testId}-delete`}
        >
          <IconDelete />
        </IconButton>
      </div>
      <div className={styles.inner}>
        <div className={styles.title}>{filename}</div>
      </div>
    </div>
  );
};

export default ImageSelectorItem;
