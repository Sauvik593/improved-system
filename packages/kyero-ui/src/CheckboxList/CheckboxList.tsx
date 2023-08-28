import { Checkbox } from '../Checkbox';

interface CheckboxOption {
  label: string;
  value: string;
}

export interface CheckboxListProps {
  name: string;
  options: CheckboxOption[];
  defaultValue: string[] | null;
}

const checkCheckbox = (checkedValue: string, currentValue: string[] | null) => {
  if (!checkedValue && !currentValue) {
    return true;
  }

  if (currentValue) {
    return currentValue.includes(checkedValue);
  }

  return false;
};

export const CheckboxList = (props: CheckboxListProps) => {
  return (
    <div>
      {props.options.map((option) => (
        <Checkbox
          key={`${option.label}_${option.value}`}
          name={props.name}
          value={option.value}
          defaultChecked={checkCheckbox(option.value, props.defaultValue)}
          label={option.label}
          className="my-2"
        />
      ))}
    </div>
  );
};
