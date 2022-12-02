import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import IconButton from './IconButton';
import { IconView } from '../img/icons';
import Input from './Input';
import styles from '../../styles/modules/InputMarkdown.module.scss';

type Props = {
  value: string;
  name: string;
  tabIndex: number;
  rows: number;
  onChange: Function;
  testId?: string;
};
const InputMarkdown: React.FC<Props> = ({
  value,
  name,
  tabIndex,
  rows,
  onChange,
  testId
}) => {
  const [isPreviewing, setIsPreviewing] = useState(false);
  const handleTogglePreview = () => {
    setIsPreviewing((prevState) => !prevState);
  };
  return (
    <div className={styles.root} data-testid={testId}>
      <div className={styles.modeToggleWrapper}>
        <IconButton
          testId="input-markdown-toggle-preview"
          title="toggle preview"
          onClick={handleTogglePreview}
          color={isPreviewing ? 'primary' : 'default'}
        >
          <IconView />
        </IconButton>
      </div>
      <div className="grid">
        <div className={isPreviewing ? 'col-6' : 'col-12'}>
          <Input
            name={name}
            value={value}
            type="text"
            onChange={onChange}
            tabIndex={tabIndex}
            rows={rows}
            autoFocus={false}
          />
        </div>
        {isPreviewing && (
          <div className="col-6" data-testid="input-markdown-preview">
            <div className={styles.previewWrap}>
              <ReactMarkdown skipHtml>{value}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputMarkdown;
