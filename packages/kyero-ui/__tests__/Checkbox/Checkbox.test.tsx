import renderer from 'react-test-renderer';
import { Checkbox, type CheckboxProps } from '../../src';

const getProps = (props: Partial<CheckboxProps> = {}) => ({
  label: 'Test',
  name: 'Test',
  value: '1',
  defaultChecked: false,
  ...props,
});

const renderCheckbox = (props: CheckboxProps) => <Checkbox {...props} />;

describe('<Checkbox />', () => {
  it('should render correctly', () => {
    const props = getProps() as CheckboxProps;
    const checkbox = renderer.create(renderCheckbox(props)).toJSON();
    expect(checkbox).toMatchSnapshot();
  });

  describe('checked type', () => {
    it('should render correctly', () => {
      const props = getProps({ defaultChecked: true }) as CheckboxProps;
      const checkbox = renderer.create(renderCheckbox(props)).toJSON();
      expect(checkbox).toMatchSnapshot();
    });
  });

  describe('disabled', () => {
    it('should render correctly', () => {
      const props = getProps({ disabled: true }) as CheckboxProps;
      const checkbox = renderer.create(renderCheckbox(props)).toJSON();
      expect(checkbox).toMatchSnapshot();
    });
  });
});
