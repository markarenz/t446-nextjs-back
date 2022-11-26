import styles from '../../styles/modules/IconButton.module.scss';

type Props = {
  children: JSX.Element;
  onClick: Function;
  title: string;
  color?: string;
  disabled?: boolean;
};
const IconButton: React.FC<Props> = ({
  children,
  onClick,
  title,
  color,
  disabled
}) => {
  let classColor = styles.default;
  if (color === 'secondary') {
    classColor = styles.secondary;
  }
  if (color === 'primary') {
    classColor = styles.primary;
  }
  const optionalProps: any = {};
  if (disabled !== undefined) {
    optionalProps.disabled = disabled;
  }
  return (
    <button
      type="button"
      title={title}
      onClick={() => onClick()}
      className={`${styles.iconButton} ${classColor}`}
      {...optionalProps}
    >
      <div className={styles.inner}>{children}</div>
    </button>
  );
};

export default IconButton;
