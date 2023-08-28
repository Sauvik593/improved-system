import { Radio } from '../Radio';

interface RadioOption {
  label: string;
  value: string;
}

export interface RadioListProps {
  name: string;
  options: RadioOption[];
  defaultValue: string | null;
}

const checkField = (checkedValue: string, currentValue: string | null) => {
  if (!checkedValue && !currentValue) {
    return true;
  }

  if (currentValue) {
    return checkedValue === currentValue;
  }

  return false;
};

export const RadioList = (props: RadioListProps) => {
  return (
    <div>
      {props.options.map((option) => (
        <Radio
          className="my-2"
          key={`${option.label}_${option.value}`}
          name={props.name}
          value={option.value}
          defaultChecked={checkField(option.value, props.defaultValue)}
          label={option.label}
        />
      ))}
    </div>
  );
};
