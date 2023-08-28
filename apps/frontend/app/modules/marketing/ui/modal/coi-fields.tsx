import { useField } from 'remix-validated-form';
import { useAppContext } from '~/common/contexts/app.context';

export const CoiFields = () => {
  return (
    <>
      <CoiField name="coi_spain" countryId={55529} />
      <CoiField name="coi_portugal" countryId={55731} />
      <CoiField name="coi_france" countryId={55702} />
      <CoiField name="coi_italy" countryId={55732} />
    </>
  );
};

export const CoiField = ({ name, countryId }: { name: string; countryId: number }) => {
  const coiCountry = useField(name);
  const { country } = useAppContext();

  const defaultChecked = country?.id === countryId;

  if (!defaultChecked) {
    return null;
  }

  return (
    <input
      type="checkbox"
      {...coiCountry.getInputProps({ id: name })}
      hidden
      checked={true}
      value="true"
      data-testid={`coiField.${name}`}
    />
  );
};
