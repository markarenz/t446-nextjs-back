import { useState } from 'react';
import Button from './common/Button';
import { pageBlocks } from '../pageBlockDefs';
import styles from '../styles/modules/ModalSelectBlock.module.scss';
import {
  Block1Col,
  Block2Col,
  Block2ColPhoto,
  BlockAnnouncements,
  BlockCalendar,
  BlockContactForm,
  BlockContactList,
  BlockCta1,
  BlockGalleriesList,
  BlockGallery,
  BlockHeaderSlider,
  BlockHeaderStatic,
  BlockImgFull,
  BlockImgGrid1,
  BlockPullQuote,
  BlockSpacer
} from './img/blockTypes';
import css from 'styled-jsx/css';

type Props = {
  handleCancel: Function;
  handleOk: Function;
};
const ModalSelectBlock: React.FC<Props> = ({ handleCancel, handleOk }) => {
  const [selectedBlockType, setSelectedBlockType] = useState<string>('');
  const [selectedBlockTypeTitle, setSelectedBlockTypeTitle] =
    useState<string>('');
  const handleBlockTypeClick = (slug: string, title: string) => {
    setSelectedBlockType(slug);
    setSelectedBlockTypeTitle(title);
  };
  const isFormValid = selectedBlockType !== '';
  return (
    <div className={styles.modalRoot}>
      <div className="card">
        <div className="card-header">
          {!isFormValid ? (
            <span>Select a Block Type</span>
          ) : (
            <span>Selected: {selectedBlockTypeTitle}</span>
          )}
        </div>
        <div className="card-body">
          <div className={styles.blockIcons}>
            {pageBlocks.map((b, idx) => (
              <button
                key={b.slug}
                onClick={() => handleBlockTypeClick(b.slug, b.title)}
                className={`${styles.blockTypeBtn} ${
                  b.slug === selectedBlockType ? styles.active : ''
                }`}
                title={b.title}
              >
                <div className={styles.iconWrap}>
                  {b.slug === '1-col' && <Block1Col />}
                  {b.slug === '2-col' && <Block2Col />}
                  {b.slug === '2-col-photo' && <Block2ColPhoto />}
                  {b.slug === 'calendar' && <BlockCalendar />}
                  {b.slug === 'cta-one' && <BlockCta1 />}
                  {b.slug === 'header-slider' && <BlockHeaderSlider />}
                  {b.slug === 'header-static' && <BlockHeaderStatic />}
                  {b.slug === 'announcements' && <BlockAnnouncements />}
                  {b.slug === 'gallery' && <BlockGallery />}
                  {b.slug === 'galleries-list' && <BlockGalleriesList />}
                  {b.slug === 'contact-form' && <BlockContactForm />}
                  {b.slug === 'pull-quote' && <BlockPullQuote />}
                  {b.slug === 'img-full' && <BlockImgFull />}
                  {b.slug === 'img-grid-1' && <BlockImgGrid1 />}
                  {b.slug === 'contact-list' && <BlockContactList />}
                  {b.slug === 'spacer' && <BlockSpacer />}
                </div>
                <div className={styles.label}>{b.slug.toUpperCase()}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="card-actions">
          <span className="mr-1">
            <Button
              disabled={false}
              variant="outlined"
              onClick={handleCancel}
              tabIndex={1}
            >
              <span>Cancel</span>
            </Button>
          </span>
          <span>
            <Button
              disabled={!isFormValid}
              variant="contained"
              color="primary"
              onClick={() => handleOk(selectedBlockType)}
              tabIndex={2}
            >
              <span>OK</span>
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ModalSelectBlock;
