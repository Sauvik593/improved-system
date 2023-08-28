import { Checkbox as KyeroCheckbox, type CheckboxProps } from '@kyero/ui';

export const Checkbox = (props: CheckboxProps) => {
  return (
    <KyeroCheckbox
      {...props}
      checkboxBgClassName={`after:bg-[url('/new-frontend-assets/images/check.svg')]`}
    />
  );
};
