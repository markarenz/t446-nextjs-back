import { useState } from 'react';
import Button from '../common/Button';
import IconButton from './IconButton';
import { IconClose } from '../img/icons';
import styles from '../../styles/modules/ImageUploader.module.scss';

type StagedImage = {
  img: File;
  srcUrl: string;
  filename: string;
  uploading: boolean;
  uploaded: boolean;
};

const ImageUploader = () => {
  const [images, setImages] = useState<StagedImage[]>([]);
  const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target?.files && event.target?.files[0]) {
      const newImages: StagedImage[] = [];
      Object.values(event.target.files).forEach((i) => {
        if (!images.some((imgObj) => imgObj.img.name === i.name)) {
          newImages.push({
            img: i,
            srcUrl: URL.createObjectURL(i),
            filename: i.name,
            uploading: false,
            uploaded: false
          });
        }
      });
      setImages([...images, ...newImages]);
    }
  };
  const handleRemoveImage = (imgName: string): void => {
    setImages(images.filter((imgObj) => imgObj.img.name !== imgName));
  };

  const setAllImagesUploading = () => {
    setImages((prev) => prev.map((i) => ({ ...i, uploading: true })));
  };

  const uploadToServer = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setAllImagesUploading();
    images.forEach(async (imgObj) => {
      const body = new FormData();
      body.append('files', imgObj.img);
      const response = await fetch('/api/assets/upload', {
        method: 'POST',
        body
      });
      const data = await response.json();
      setImages((prev) =>
        prev.map((i) =>
          i.filename === data.filename ? { ...i, uploaded: true } : i
        )
      );
    });
  };
  const isFormValid = images.some((i) => !i.uploading);
  return (
    <div className={styles.uploader}>
      <form encType="multipart/form-data" action="">
        <div className={styles.uploaderStage}>
          <input
            type="file"
            name="myImage"
            multiple
            accept="image/jpg, image/jpeg, image/png"
            onChange={handleAddImages}
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
            <div className={styles.inner}>
              <div
                className={`${styles.uploaded} ${
                  imgObj.uploaded ? styles.complete : ''
                }`}
              >
                {'\u2713'}
              </div>
            </div>
            <div
              className={`${styles.closeBtnWrap} ${
                !imgObj.uploading ? styles.staged : ''
              }`}
            >
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
