import styles from '../../styles/modules/Switch.module.scss';

type Props = {
  name: string;
  tabIndex: number;
  value: string;
  onChange: Function;
  options: {
    label: string;
    value: string;
  }[];
};

const Switch: React.FC<Props> = ({
  name,
  tabIndex,
  value,
  onChange,
  options
}) => {
  const handleClick = () => {
    const newVal = value === 'inactive' ? 'active' : 'inactive';
    onChange(name, newVal);
  };
  if (options.length < 2) {
    return null;
  }
  const [optionA, optionB] = options;
  const isOptionB = value === optionB.value;
  return (
    <div className={styles.switchRoot}>
      <span className={styles.optionLabel}>{optionA.label}</span>
      <button
        type="button"
        onClick={handleClick}
        tabIndex={tabIndex}
        className={styles.switchBtn}
        title="switch"
        aria-label="switch"
      >
        <svg viewBox="0 0 100 100" className={isOptionB ? styles.optionB : ''}>
          <circle cx="50" cy="50" r="50" className={styles.circleOuter} />
          <circle cx="50" cy="50" r="40" className={styles.circleInner} />
        </svg>
      </button>
      <span className={styles.optionLabel}>{optionB.label}</span>
    </div>
  );
};

export default Switch;
