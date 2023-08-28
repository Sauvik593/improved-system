import renderer from 'react-test-renderer';
import { SearchInput, SearchInputProps } from '../../src';

const getProps = (props: Partial<SearchInputProps> = {}) => ({
  id: 'id',
  name: 'name',
  placeholder: 'placehodler',
  ...props,
});

const renderSearchInput = (props: SearchInputProps) => <SearchInput {...props} />;

describe('<SearchInput />', () => {
  it('should render correctly', () => {
    const props = getProps() as SearchInputProps;
    const searchInput = renderer.create(renderSearchInput(props)).toJSON();
    expect(searchInput).toMatchSnapshot();
  });

  describe('With ClassName', () => {
    it('should render correctly', () => {
      const props = getProps({ className: 'bg-sierra-night-10' }) as SearchInputProps;
      const searchInput = renderer.create(renderSearchInput(props)).toJSON();
      expect(searchInput).toMatchSnapshot();
    });
  });
});
