import IconButton from './IconButton';
import { IconClose } from '../img/icons';
import styles from '../../styles/modules/InputGalleryImage.module.scss';

type Props = {
  filename: string;
  index: number;
  baseImgUrl: string;
  handleRemoveImg: Function;
};
const InputGalleryImage: React.FC<Props> = ({
  filename,
  baseImgUrl,
  handleRemoveImg,
  index
}) => {
  return (
    <div
      className={styles.item}
      style={{ backgroundImage: `url(${baseImgUrl}${filename})` }}
    >
      <div className={styles.btnWrap}>
        <IconButton
          onClick={() => handleRemoveImg(filename)}
          title="remove"
          color="primary"
        >
          <IconClose />
        </IconButton>
      </div>
    </div>
  );
};

export default InputGalleryImage;
