import renderer from 'react-test-renderer';
import { Badge } from '../../src';

describe('<Badge />', () => {
  it('should render correctly', () => {
    const badge = renderer.create(<Badge variant="green" message="Test Message" />).toJSON();
    expect(badge).toMatchSnapshot();
  });

  describe('Gray Variant', () => {
    it('should render correctly', () => {
      const badge = renderer.create(<Badge variant="gray" message="Test Message" />).toJSON();
      expect(badge).toMatchSnapshot();
    });
  });

  describe('Orange Variant', () => {
    it('should render correctly', () => {
      const badge = renderer.create(<Badge variant="orange" message="Test Message" />).toJSON();
      expect(badge).toMatchSnapshot();
    });
  });

  describe('with indicator', () => {
    it('should render correctly', () => {
      const badge = renderer
        .create(<Badge variant="orange" message="Test Message" indicator />)
        .toJSON();
      expect(badge).toMatchSnapshot();
    });
  });
});
