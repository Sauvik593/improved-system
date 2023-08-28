import renderer from 'react-test-renderer';
import { CheckboxList, type CheckboxListProps } from '../../src';

const OPTIONS = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
];

const getProps = (props: Partial<CheckboxListProps> = {}) => ({
  name: 'Test',
  defaultValue: '1',
  options: OPTIONS,
  ...props,
});

const renderCheckboxList = (props: CheckboxListProps) => <CheckboxList {...props} />;

describe('<CheckboxList />', () => {
  it('should render correctly', () => {
    const props = getProps() as CheckboxListProps;
    const checkboxList = renderer.create(renderCheckboxList(props)).toJSON();
    expect(checkboxList).toMatchSnapshot();
  });
});
