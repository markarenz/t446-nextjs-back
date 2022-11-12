import styles from '../../styles/IconButton.module.scss';

type Props = {
  children: JSX.Element;
  onClick: Function;
  title: string;
  color?: string;
};
const IconButton: React.FC<Props> = ({ children, onClick, title, color }) => {
  let classColor = styles.default;
  if (color === 'secondary') {
    classColor = styles.secondary;
  }
  if (color === 'primary') {
    classColor = styles.primary;
  }
  return (
    <button
      type="button"
      title={title}
      onClick={() => onClick()}
      className={`${styles.iconButton} ${classColor}`}
    >
      <div className={styles.inner}>{children}</div>
    </button>
  );
};

export default IconButton;
