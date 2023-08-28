import renderer from 'react-test-renderer';
import { Checkbox, FiltersField, FiltersFieldProps } from '../../src';

const getProps = (props: Partial<FiltersFieldProps> = {}) => ({
  title: 'Test',
  ...props,
});

const CHECKBOX_PROPS = {
  label: 'Test',
  name: 'Test',
  value: '1',
  defaultChecked: false,
};

const renderFiltersField = (props: FiltersFieldProps) => (
  <FiltersField {...props}>
    <Checkbox {...CHECKBOX_PROPS} />
  </FiltersField>
);

describe('<FiltersField />', () => {
  it('should render correctly', () => {
    const props = getProps() as FiltersFieldProps;
    const filtersField = renderer.create(renderFiltersField(props)).toJSON();
    expect(filtersField).toMatchSnapshot();
  });
});
