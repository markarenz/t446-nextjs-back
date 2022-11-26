import { SelectOption } from '../../types/types';
import styles from '../../styles/modules/InputDropdown.module.scss';

type Props = {
  name: string;
  value: string;
  onChange: Function;
  options: SelectOption[];
};
const InputDropdown: React.FC<Props> = ({ name, value, onChange, options }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={(e) => onChange(e)}
      className={styles.inputDropdown}
    >
      {options.map((o) => (
        <option key={o.label} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
};

export default InputDropdown;
