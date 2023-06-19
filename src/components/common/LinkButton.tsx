import Link from 'next/link';
import styles from '../../styles/modules/Button.module.scss';

type Props = {
  href: string;
  children: JSX.Element;
  variant?: string;
  color?: string;
  size?: string;
  tabIndex?: number;
};

const LinkButton: React.FC<Props> = ({
  href,
  children,
  variant,
  color,
  size
}) => {
  const classSize = size === 'small' ? styles.small : '';
  const classVariant =
    variant === 'outlined' ? styles.outlined : styles.contained;
  let classColor = styles.colorPrimary;
  if (color === 'secondary') {
    classColor = styles.colorSecondary;
  }
  return (
    <Link href={href} passHref>
      <div
        className={`${styles.button} ${classSize} ${classVariant} ${classColor}`}
        data-testid="link-button-inner"
      >
        {children}
      </div>
    </Link>
  );
};
export default LinkButton;
