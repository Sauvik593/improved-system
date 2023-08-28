import renderer from 'react-test-renderer';

import { fireEvent, render } from '@testing-library/react';
import { Button, type ButtonProps, type ButtonLinkElementProps } from '../../src';

const getProps = (props: Partial<ButtonProps> = {}) => ({
  buttonType: 'blue',
  variant: 'full',
  fullWidth: false,
  message: 'Test',
  onClick: undefined,
  ...props,
});

const renderButton = (props: ButtonProps) => <Button {...props} />;

const DummyLink = (props: ButtonLinkElementProps) => {
  return (
    <a data-testid="dummy-link" href={props.to as string} className={props.className || ''}>
      {props.children}
    </a>
  );
};

describe('<Button />', () => {
  it('should render correctly', () => {
    const props = getProps() as ButtonProps;
    const button = renderer.create(renderButton(props)).toJSON();
    expect(button).toMatchSnapshot();
  });

  describe('outline variant', () => {
    it('should render correctly', () => {
      const props = getProps({ variant: 'outline' }) as ButtonProps;
      const button = renderer.create(renderButton(props)).toJSON();
      expect(button).toMatchSnapshot();
    });
  });

  describe('green type', () => {
    it('should render correctly', () => {
      const props = getProps({ buttonType: 'green' }) as ButtonProps;
      const button = renderer.create(renderButton(props)).toJSON();
      expect(button).toMatchSnapshot();
    });
  });

  describe('orange type', () => {
    it('should render correctly', () => {
      const props = getProps({ buttonType: 'orange' }) as ButtonProps;
      const button = renderer.create(renderButton(props)).toJSON();
      expect(button).toMatchSnapshot();
    });
  });

  describe('sunshine type', () => {
    it('should render correctly', () => {
      const props = getProps({ buttonType: 'sunshine' }) as ButtonProps;
      const button = renderer.create(renderButton(props)).toJSON();
      expect(button).toMatchSnapshot();
    });
  });

  describe('big size', () => {
    it('should render correctly', () => {
      const props = getProps({ size: 'big' }) as ButtonProps;
      const button = renderer.create(renderButton(props)).toJSON();
      expect(button).toMatchSnapshot();
    });
  });

  describe('clickable', () => {
    const clickMock = jest.fn();

    it('should render correctly', () => {
      const props = getProps({ onClick: clickMock }) as ButtonProps;
      const button = renderer.create(renderButton(props)).toJSON();
      expect(button).toMatchSnapshot();
    });

    it('should handle click correctly', () => {
      const props = getProps({ onClick: clickMock }) as ButtonProps;
      const { getByText } = render(renderButton(props));
      const button = getByText('Test');

      fireEvent.click(button);

      expect(clickMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('anchor link', () => {
    it('should render correctly', () => {
      const props = getProps({
        LinkComponent: DummyLink,
        linkProps: {
          to: '/testing',
        },
      }) as ButtonProps;
      const button = renderer.create(renderButton(props)).toJSON();
      expect(button).toMatchSnapshot();
    });

    it('should have a href param', () => {
      const props = getProps({
        LinkComponent: DummyLink,
        linkProps: {
          to: '/testing',
        },
      }) as ButtonProps;
      const { getByTestId } = render(renderButton(props));
      const anchor = getByTestId('dummy-link');

      expect(anchor).toBeTruthy();
      expect(anchor).toHaveAttribute('href', '/testing');
    });
  });
});
