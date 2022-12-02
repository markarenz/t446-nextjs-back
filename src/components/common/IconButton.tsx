import styles from '../../styles/modules/IconButton.module.scss';

type Props = {
  children: JSX.Element;
  onClick: Function;
  title: string;
  color?: string;
  disabled?: boolean;
  testId?: string;
};
const IconButton: React.FC<Props> = ({
  children,
  onClick,
  title,
  color,
  disabled,
  testId
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
      data-testid={testId}
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
