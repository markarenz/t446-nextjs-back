import { useState } from 'react';
import IconButton from './IconButton';
import { Asset } from '../../types/types';
import { IconClose } from '../img/icons';
import ImageUploader from './ImageUploader';
import ImageSelector from './ImageSelector';
import styles from '../../styles/modules/InputImagePicker.module.scss';

type Props = {
  name: string;
  value: string;
  onChange: Function;
  baseImgUrl: string;
  assetList: Asset[];
  handleTriggerRefresh: Function;
};
const InputImagePicker: React.FC<Props> = ({
  name,
  value,
  onChange,
  baseImgUrl,
  assetList,
  handleTriggerRefresh
}) => {
  const [isPickingImage, setIsPickingImage] = useState(false);
  const handleImageSelection = (filename: string) => {
    onChange(name, filename);
  };
  const handleCloseModal = () => {
    setIsPickingImage(false);
  };
  const handleOpenModal = () => {
    setIsPickingImage(true);
  };
  const handlePickItem = (filename: string) => {
    onChange(name, filename);
    handleCloseModal();
  };
  return (
    <div>
      <div
        className={styles.item}
        onClick={handleOpenModal}
        style={{
          backgroundImage: `url(${baseImgUrl}thumbnails/${
            value.length > 0 ? value : 'unknown.jpg'
          })`
        }}
      ></div>
      {isPickingImage && (
        <div className={styles.modalWrap}>
          <div className={styles.pickerModalWrap}>
            <IconButton title="close" onClick={handleCloseModal}>
              <IconClose />
            </IconButton>
            <div className={styles.inner}>
              <ImageUploader handleTriggerRefresh={handleTriggerRefresh} />
              <ImageSelector
                allowSelection={true}
                assetList={assetList}
                handleTriggerRefresh={handleTriggerRefresh}
                handleSelection={handlePickItem}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default InputImagePicker;
