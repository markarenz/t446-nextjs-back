import styles from '../../styles/modules/Button.module.scss';

type Props = {
  children: JSX.Element;
  variant?: string;
  color?: string;
  size?: string;
  onClick?: Function;
  disabled: boolean;
  tabIndex?: number;
  testId?: string;
};

const Button: React.FC<Props> = ({
  children,
  variant,
  color,
  size,
  onClick,
  disabled,
  tabIndex,
  testId
}) => {
  const classSize = size === 'small' ? styles.small : '';
  const classVariant =
    variant === 'outlined' ? styles.outlined : styles.contained;
  let classColor = styles.colorPrimary;
  if (color === 'secondary') {
    classColor = styles.colorSecondary;
  }
  return (
    <button
      onClick={!!onClick ? (e) => onClick(e) : () => {}}
      role="button"
      type="button"
      tabIndex={tabIndex}
      disabled={disabled}
      data-testid={testId}
      className={`${styles.button} ${classSize} ${classVariant} ${classColor}`}
    >
      {children}
    </button>
  );
};

export default Button;
