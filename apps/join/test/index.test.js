import { NavLinks } from '../src/components/Header/NavLinks';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
describe('NavLinks', () => {
  it('should render the heading', () => {
    const textToFind = 'Home';

    render(<NavLinks />);
    const heading = screen.getByText(textToFind);

    expect(heading).toBeInTheDocument();
  });
});
