import { useState, useRef } from 'react';
import axios from 'axios';
import Button from '../common/Button';
import IconButton from './IconButton';
import { IconClose } from '../img/icons';
import { useAppContext } from '../../context/AppContext';
import styles from '../../styles/modules/ImageUploader.module.scss';

type StagedImage = {
  img: File;
  srcUrl: string;
};

const ImageUploader = () => {
  const [images, setImages] = useState<StagedImage[]>([]);
  const fileUploader = useRef<HTMLInputElement | null>(null);

  const uploadToClient = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files && event.target?.files[0]) {
      const newImages: StagedImage[] = [];
      Object.values(event.target.files).forEach((i) => {
        if (!images.some((imgObj) => imgObj.img.name === i.name)) {
          newImages.push({
            img: i,
            srcUrl: URL.createObjectURL(i)
          });
        }
      });
      setImages([...images, ...newImages]);
    }
  };
  const handleRemoveImage = (imgName: string): void => {
    setImages(images.filter((imgObj) => imgObj.img.name !== imgName));
  };

  const uploadToServer = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const body = new FormData();
    // @ts-ignore
    body.append('files', images[0].img); //fileUploader?.current?.files[0]
    const response = await fetch('/api/assets/upload', {
      method: 'POST',
      body
    });
  };
  const isFormValid = images.length > 0;
  return (
    <div className={styles.uploader}>
      <form encType="multipart/form-data" action="">
        <div className={styles.uploaderStage}>
          <input
            type="file"
            ref={fileUploader}
            name="myImage"
            multiple
            accept="image/jpg, image/jpeg, image/png"
            onChange={uploadToClient}
            className={styles.imgUploadInput}
          />
          <div className={styles.messaging}>
            <h3>Drop images here or click to select.</h3>
            <Button
              onClick={uploadToServer}
              disabled={!isFormValid}
              color="primary"
            >
              <span>Upload</span>
            </Button>
          </div>
        </div>
      </form>
      <div className={styles.previews}>
        {images.map((imgObj) => (
          <div
            key={imgObj.img.name}
            className={styles.preview}
            style={{ backgroundImage: `url(${imgObj.srcUrl})` }}
          >
            <div className={styles.closeBtnWrap}>
              <IconButton
                title="Delete"
                color="primary"
                onClick={() => handleRemoveImage(imgObj.img.name)}
              >
                <IconClose />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
