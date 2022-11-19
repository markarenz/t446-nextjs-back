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
};
const ImageSelectorItem: React.FC<Props> = ({
  idx,
  asset,
  allowSelection,
  handleSelection,
  handleAssetDelete
}) => {
  const { filename, url } = asset;
  return (
    <div className={styles.root} style={{ backgroundImage: `url(${url})` }}>
      <div className={styles.idx}>{idx}</div>
      <div className={styles.btnDeleteWrap}>
        <IconButton title="delete" onClick={handleAssetDelete} color="primary">
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
