import React, { forwardRef, HTMLAttributes, CSSProperties } from 'react';
import IconButton from './IconButton';
import { IconClose } from '../img/icons';
import styles from '../../styles/modules/SortableGalleryItem.module.scss';

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
  withOpacity?: boolean;
  isDragging?: boolean;
  baseImgUrl: string;
};

const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ id, withOpacity, isDragging, style, baseImgUrl, ...props }, ref) => {
    const inlineStyles: CSSProperties = {
      backgroundImage: `url(${baseImgUrl}thumbnails/${id})`,
      ...style
    };
    return (
      <div
        ref={ref}
        style={inlineStyles}
        {...props}
        className={`${styles.root} ${withOpacity ? styles.withOpacity : ''}`}
      >
        <div className={styles.idLabel}>{id}</div>
      </div>
    );
  }
);

Item.displayName = 'Item';

export default Item;
