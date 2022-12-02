import styles from '../../styles/modules/Grid.module.scss';

type Props = {
  columns: number;
  children: JSX.Element[];
};

const Grid: React.FC<Props> = ({ children, columns }) => {
  return (
    <div className={styles.root} data-testid="grid-wrap">
      {children}
    </div>
  );
};

export default Grid;
