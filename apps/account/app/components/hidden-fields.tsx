interface Props {
  searchParams: URLSearchParams;
  fieldsList: string[];
  visible: boolean;
}

export const HiddenFields = ({ searchParams, fieldsList, visible }: Props) => {
  if (!visible) {
    return null;
  }

  return (
    <>
      {[...searchParams.entries()].map(([key, value]) => {
        if (!fieldsList.includes(key)) {
          return null;
        }

        if (!value) {
          return null;
        }

        if (Array.isArray(value)) {
          return value.map(
            (arrVal) =>
              arrVal && <input key={`${arrVal}__${key}`} type="hidden" name={key} value={arrVal} />,
          );
        }

        if (value !== '') {
          return <input key={`${key}__${value}`} type="hidden" name={key} value={value} />;
        }

        return null;
      })}
    </>
  );
};
