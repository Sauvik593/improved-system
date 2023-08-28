import renderer from 'react-test-renderer';
import { RadioList, type RadioListProps } from '../../src';

const OPTIONS = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
];

const getProps = (props: Partial<RadioListProps> = {}) => ({
  name: 'Test',
  defaultValue: '1',
  options: OPTIONS,
  ...props,
});

const renderRadioList = (props: RadioListProps) => <RadioList {...props} />;

describe('<RadioList />', () => {
  it('should render correctly', () => {
    const props = getProps() as RadioListProps;
    const radioList = renderer.create(renderRadioList(props)).toJSON();
    expect(radioList).toMatchSnapshot();
  });
});
