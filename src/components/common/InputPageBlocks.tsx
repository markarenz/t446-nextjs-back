import React, { useState, useEffect } from 'react';
import IconButton from './IconButton';
import { Asset } from '../../types/types';
import { PageBlockItemFields } from '../../pageBlockDefs';
import ModalSelectBlock from '../ModalSelectBlock';
import { IconNewItem } from '../img/icons';
import { getDefaultBlockData } from '../../helpers/pages';
import InputPageBlockItem from './InputPageBlockItem';

type Props = {
  value: string;
  onChange: Function;
  baseImgUrl: string;
  assetList: Asset[];
  handleTriggerRefresh: Function;
};
type InsertBtnProps = {
  idx: number;
};
const InputPageBlocks: React.FC<Props> = ({
  value,
  onChange,
  baseImgUrl,
  assetList,
  handleTriggerRefresh
}) => {
  const getItemsFromValue = (): PageBlockItemFields[] => {
    if (value) {
      try {
        return JSON.parse(`${value}`);
      } catch (err) {
        console.error('items:', err);
        return [];
      }
    }
    return [];
  };
  const [blocks, setBlocks] = useState<PageBlockItemFields[]>(
    getItemsFromValue()
  );
  const [insertIndex, setInsertIndex] = useState<number>(-1);
  const insertBlock = (idx: number) => {
    setInsertIndex(idx);
  };
  const insertBlockCancel = () => {
    setInsertIndex(-1);
  };
  const moveBlock = (idx: number, dir: number) => {
    setBlocks((prevBlocks) => {
      const newBlocks = [...prevBlocks];
      if (idx + dir < 0 || idx + dir > prevBlocks.length - 1) {
        return prevBlocks;
      }
      const blockA = prevBlocks[idx];
      const blockB = prevBlocks[idx + dir];
      newBlocks[idx] = { ...blockB };
      newBlocks[idx + dir] = { ...blockA };
      return newBlocks;
    });
  };
  const removeBlock = (idx: number) => {
    setBlocks((prevBlocks) => prevBlocks.filter((_b, i) => i !== idx));
  };
  const insertBlockConfirm = (slug: string) => {
    setInsertIndex(-1);
    const newBlocks = [...blocks];
    const newBlock = getDefaultBlockData(slug);
    newBlocks.splice(insertIndex, 0, newBlock);
    setBlocks(newBlocks);
  };
  const updateBlocks = (idx: number, block: any) => {
    setBlocks((prevBlocks) => {
      const newBlocks = [...prevBlocks];
      newBlocks[idx] = { ...block };
      return newBlocks;
    });
  };
  useEffect(() => {
    onChange('content', JSON.stringify(blocks));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);
  const InsertBtn: React.FC<InsertBtnProps> = ({ idx }) => (
    <div className="mb-1 text-center">
      <IconButton
        title="Insert Block"
        onClick={() => insertBlock(idx)}
        color="secondary"
      >
        <IconNewItem />
      </IconButton>
    </div>
  );
  return (
    <div>
      <InsertBtn idx={0} />

      {blocks.map((b, idx) => (
        <React.Fragment key={`${b.type}-${idx}`}>
          <InputPageBlockItem
            idx={idx}
            isLastBlock={idx === blocks.length - 1}
            block={b}
            moveBlock={moveBlock}
            removeBlock={removeBlock}
            updateBlocks={updateBlocks}
            baseImgUrl={baseImgUrl}
            assetList={assetList}
            handleTriggerRefresh={handleTriggerRefresh}
          />
          <InsertBtn idx={idx + 1} />
        </React.Fragment>
      ))}

      {insertIndex > -1 && (
        <ModalSelectBlock
          handleCancel={insertBlockCancel}
          handleOk={insertBlockConfirm}
        />
      )}
    </div>
  );
};

export default InputPageBlocks;
