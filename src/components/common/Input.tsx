import styles from '../../styles/modules/Input.module.scss';

type Props = {
  name?: string;
  type?: string;
  value?: string;
  onChange: Function;
  onEnterkey?: Function;
  tabIndex?: number;
  autoFocus: boolean;
  rows?: number;
  maxLen?: number;
};
type OptionalInputProps = {
  maxLength?: number;
};
const Input: React.FC<Props> = ({
  name,
  type,
  value,
  onChange,
  onEnterkey,
  tabIndex,
  autoFocus,
  rows,
  maxLen
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (typeof onEnterkey === 'function') {
        onEnterkey();
      }
    }
  };
  const optionalProps: OptionalInputProps = {};
  if (maxLen) {
    optionalProps.maxLength = maxLen;
  }
  if (rows && rows > 1) {
    return (
      <textarea
        rows={rows}
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
        tabIndex={tabIndex}
        autoFocus={autoFocus}
        className={styles.textarea}
        {...optionalProps}
      />
    );
  }
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={(e) => onChange(e)}
      tabIndex={tabIndex}
      autoFocus={autoFocus}
      onKeyDown={handleKeyDown}
      className={styles.input}
      {...optionalProps}
    />
  );
};

export default Input;
