import { useState, useMemo, useEffect } from 'react';
import { getBlockDefByType } from '../../helpers/pages';
import { Asset } from '../../types/types';
import IconButton from './IconButton';
import { IconClose, IconUp, IconDown, IconInfo } from '../img/icons';
import Input from './Input';
import InputMarkdown from './InputMarkdown';
import InputDropdown from './InputDropdown';
import InputImagePicker from './InputImagePicker';
import { debounce } from 'lodash';
import { sanitizeString } from '../../helpers';
import styles from '../../styles/modules/InputPageBlockItem.module.scss';

type Props = {
  idx: number;
  block: any;
  isLastBlock: boolean;
  moveBlock: Function;
  removeBlock: Function;
  updateBlocks: Function;
  baseImgUrl: string;
  assetList: Asset[];
  handleTriggerRefresh: Function;
};
const InputPageBlockItem: React.FC<Props> = ({
  idx,
  block,
  moveBlock,
  removeBlock,
  isLastBlock,
  updateBlocks,
  baseImgUrl,
  assetList,
  handleTriggerRefresh
}) => {
  const [showIdClass, setShowIdClass] = useState(false);
  const [localData, setLocalData] = useState(block);
  const blockDef = getBlockDefByType(block.type);
  const moveUp = () => {
    moveBlock(idx, -1);
  };
  const moveDown = () => {
    moveBlock(idx, 1);
  };
  const removeThisBlock = () => {
    removeBlock(idx);
  };
  const callUpdateBlocks = () => {
    updateBlocks(idx, localData);
  };
  const debouncedUpdateBlocks = useMemo(
    () => debounce(callUpdateBlocks, 300),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [localData]
  );
  const handleToggleShowIdClass = () => {
    setShowIdClass((prevShowIdClass) => !prevShowIdClass);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalData((prevLocalData: any) => ({
      ...prevLocalData,
      [e.target.name]: sanitizeString(e.target.value)
    }));
  };
  const handleChangeValue = (name: string, value: string) => {
    setLocalData((prevLocalData: any) => ({
      ...prevLocalData,
      [name]: sanitizeString(value)
    }));
  };
  useEffect(() => {
    debouncedUpdateBlocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localData]);

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>
        {blockDef?.title || ''}
        <div>
          <span className="mr-1">
            <IconButton
              title="More detail"
              disabled={false}
              onClick={handleToggleShowIdClass}
              color="secondary"
            >
              <IconInfo />
            </IconButton>
          </span>
          <span className="mr-1">
            <IconButton
              title="Move Up"
              disabled={idx < 1}
              onClick={moveUp}
              color="default"
            >
              <IconUp />
            </IconButton>
          </span>
          <span className="mr-1">
            <IconButton
              title="Move Down"
              disabled={isLastBlock}
              onClick={moveDown}
              color="default"
            >
              <IconDown />
            </IconButton>
          </span>
          <IconButton title="Remove" onClick={removeThisBlock} color="primary">
            <IconClose />
          </IconButton>
        </div>
      </h3>
      <div className="grid">
        {showIdClass && (
          <div className="col-6">
            <label>ID</label>
            <Input
              type="text"
              name="id"
              onChange={handleChange}
              autoFocus={false}
            />
          </div>
        )}
        {showIdClass && (
          <div className="col-6">
            <label>Class</label>
            <Input
              type="text"
              name="class"
              onChange={handleChange}
              autoFocus={false}
            />
          </div>
        )}
        {blockDef?.fields.map((f, idx) => (
          <div key={`${f.slug}-${idx}`} className={`col-${f.colsize}`}>
            <label>{f.label}</label>
            {['markdownarea', 'markdown'].includes(f.type) && (
              <InputMarkdown
                name={f.slug}
                value={localData[f.slug]}
                onChange={handleChange}
                rows={5}
                tabIndex={0}
              />
            )}
            {f.type === 'text' && (
              <div>
                <Input
                  name={f.slug}
                  autoFocus={false}
                  value={localData[f.slug]}
                  onChange={handleChange}
                />
              </div>
            )}
            {f.type === 'select' && (
              <InputDropdown
                name={f.slug}
                value={localData[f.slug]}
                onChange={handleChange}
                options={f?.options || []}
              />
            )}
            {f.type === 'image' && (
              <InputImagePicker
                name={f.slug}
                value={localData[f.slug]}
                onChange={handleChangeValue}
                baseImgUrl={`${baseImgUrl}`}
                assetList={assetList}
                handleTriggerRefresh={handleTriggerRefresh}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputPageBlockItem;
