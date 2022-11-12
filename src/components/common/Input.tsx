import styles from '../../styles/Input.module.scss';

type Props = {
  name?: string;
  type?: string;
  value?: string;
  onChange: Function;
  tabIndex?: number;
  autoFocus: boolean;
};
const Input: React.FC<Props> = ({
  name,
  type,
  value,
  onChange,
  tabIndex,
  autoFocus
}) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={(e) => onChange(e)}
      tabIndex={tabIndex}
      autoFocus={autoFocus}
      className={styles.input}
    />
  );
};

export default Input;
