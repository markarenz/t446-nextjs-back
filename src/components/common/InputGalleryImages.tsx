import React, { useState, useEffect, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy
} from '@dnd-kit/sortable';
import Grid from './Grid';
import IconButton from './IconButton';
import ImageUploader from './ImageUploader';
import ImageSelector from './ImageSelector';
import { IconClose, IconNewItem } from '../img/icons';
import SortableItem from './SortableItem';
import Item from './SortableGalleryItem';
import { Asset } from '../../types/types';
import styles from '../../styles/modules/InputGalleryImages.module.scss';

type Props = {
  value: string;
  onChange: Function;
  baseImgUrl: string;
  assetList: Asset[];
  handleTriggerRefresh: Function;
};
const InputGalleryImages: React.FC<Props> = ({
  value,
  onChange,
  baseImgUrl,
  assetList,
  handleTriggerRefresh
}) => {
  const getItemsFromValue = (): string[] => {
    try {
      return JSON.parse(value);
    } catch (err) {
      console.error('items:', err);
      return [];
    }
  };
  const defaultItems = getItemsFromValue();
  const [items, setItems] = useState(defaultItems);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isAddingImages, setIsAddingImages] = useState(false);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(`${event.active.id}`);
  }, []);
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(`${active.id}`);
        const newIndex = items.indexOf(`${over!.id}`);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  }, []);
  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);
  useEffect(() => {
    onChange('images', JSON.stringify(items));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const handleOpenModal = () => {
    document.body.classList.add('modal-open');
    setIsAddingImages(true);
  };
  const handleCloseModal = () => {
    document.body.classList.remove('modal-open');
    setIsAddingImages(false);
  };
  const handleRemoveImg = (filename: string) => {
    console.log('handleRemoveImg', filename);
    setItems((prevItems) => prevItems.filter((i: string) => i !== filename));
  };
  const handleAddItem = (filename: string) => {
    console.log('handleAddImage', filename);
    if (!items.includes(filename)) {
      setItems((prevItems) => [filename, ...items]);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.controlWrap}>
        <IconButton
          title="Add Images"
          onClick={handleOpenModal}
          color="secondary"
        >
          <IconNewItem />
        </IconButton>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <Grid columns={5}>
            {items.map((id) => (
              <div className={styles.sortableItemWrap} key={id}>
                <SortableItem id={id} baseImgUrl={baseImgUrl} />
                <div className={styles.btnRemoveWrap}>
                  <IconButton
                    title="Remove"
                    color="primary"
                    onClick={() => handleRemoveImg(id)}
                  >
                    <IconClose />
                  </IconButton>
                </div>
              </div>
            ))}
          </Grid>
        </SortableContext>
        <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
          {activeId ? (
            <Item id={activeId} isDragging baseImgUrl={baseImgUrl} />
          ) : null}
        </DragOverlay>
      </DndContext>
      {isAddingImages && (
        <div className={styles.modalWrap}>
          <div className={styles.addImages}>
            <IconButton title="close" onClick={handleCloseModal}>
              <IconClose />
            </IconButton>
            <div className={styles.inner}>
              <ImageUploader handleTriggerRefresh={handleTriggerRefresh} />
              <ImageSelector
                allowSelection={true}
                assetList={assetList}
                handleTriggerRefresh={handleTriggerRefresh}
                handleSelection={handleAddItem}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputGalleryImages;
