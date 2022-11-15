import styles from '../../styles/modules/Button.module.scss';

type Props = {
  children: JSX.Element;
  variant?: string;
  color?: string;
  size?: string;
  onClick?: Function;
  disabled: boolean;
  tabIndex?: number;
};

const Button: React.FC<Props> = ({
  children,
  variant,
  color,
  size,
  onClick,
  disabled,
  tabIndex
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
      type="button"
      tabIndex={tabIndex}
      disabled={disabled}
      className={`${styles.button} ${classSize} ${classVariant} ${classColor}`}
    >
      {children}
    </button>
  );
};

export default Button;
