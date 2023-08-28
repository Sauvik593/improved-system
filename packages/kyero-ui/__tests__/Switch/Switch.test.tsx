import renderer from 'react-test-renderer';
import { Switch, type SwitchProps } from '../../src';

const getProps = (props: Partial<SwitchProps> = {}) => ({
  label: 'Test',
  name: 'Test',
  value: '1',
  defaultValue: false,
  ...props,
});

const renderSwitch = (props: SwitchProps) => <Switch {...props} />;

describe('<Switch />', () => {
  it('should render correctly', () => {
    const props = getProps() as SwitchProps;
    const radio = renderer.create(renderSwitch(props)).toJSON();
    expect(radio).toMatchSnapshot();
  });

  describe('checked type', () => {
    it('should render correctly', () => {
      const props = getProps({ defaultValue: true }) as SwitchProps;
      const radio = renderer.create(renderSwitch(props)).toJSON();
      expect(radio).toMatchSnapshot();
    });
  });

  describe('disabled', () => {
    it('should render correctly', () => {
      const props = getProps({ disabled: true }) as SwitchProps;
      const radio = renderer.create(renderSwitch(props)).toJSON();
      expect(radio).toMatchSnapshot();
    });
  });
});
