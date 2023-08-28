import renderer from 'react-test-renderer';

import { fireEvent, render } from '@testing-library/react';
import { Alert, type AlertProps } from '../../src';
import type { LinkComponentProps } from '../../src/types';

const getProps = (props: Partial<AlertProps> = {}) => ({
  type: 'info',
  fullWidth: false,
  closable: false,
  onClose: undefined,
  children: undefined,
  ...props,
});

const DummyLink = (props: LinkComponentProps) => {
  return (
    <a data-testid="dummy-link" href={props.to as string} className={props.className}>
      {props.children}
    </a>
  );
};

const renderAlert = (props: AlertProps) => (
  <Alert {...props}>
    <p>test</p>
  </Alert>
);

describe('<Alert />', () => {
  it('should render correctly', () => {
    const props = getProps() as AlertProps;
    const alert = renderer.create(renderAlert(props)).toJSON();
    expect(alert).toMatchSnapshot();
  });

  describe('success type', () => {
    it('should render correctly', () => {
      const props = getProps({ type: 'success' }) as AlertProps;
      const alert = renderer.create(renderAlert(props)).toJSON();
      expect(alert).toMatchSnapshot();
    });
  });

  describe('error type', () => {
    it('should render correctly', () => {
      const props = getProps({ type: 'error' }) as AlertProps;
      const alert = renderer.create(renderAlert(props)).toJSON();
      expect(alert).toMatchSnapshot();
    });
  });

  describe('full width', () => {
    it('should render correctly', () => {
      const props = getProps({ fullWidth: true }) as AlertProps;
      const alert = renderer.create(renderAlert(props)).toJSON();
      expect(alert).toMatchSnapshot();
    });
  });

  describe('closable', () => {
    const closeMock = jest.fn();

    it('should render correctly', () => {
      const props = getProps({ closable: true, onClose: closeMock }) as AlertProps;
      const alert = renderer.create(renderAlert(props));
      expect(alert.toJSON()).toMatchSnapshot();
    });

    it('should handle click correctly', () => {
      const props = getProps({ closable: true, onClose: closeMock }) as AlertProps;
      const { getByTestId } = render(renderAlert(props));
      const closeButton = getByTestId('close');

      fireEvent.click(closeButton);

      expect(closeMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('closable with action', () => {
    const closeMock = jest.fn();

    it('should render correctly', () => {
      const props = getProps({
        closable: true,
        onClose: closeMock,
        action: {
          to: '/',
          message: 'Test',
          LinkComponent: DummyLink,
        },
      }) as AlertProps;
      const alert = renderer.create(renderAlert(props));
      expect(alert.toJSON()).toMatchSnapshot();
    });

    it('should have a button', () => {
      const props = getProps({
        closable: true,
        onClose: closeMock,
        action: {
          to: '/testing',
          message: 'Test',
          LinkComponent: DummyLink,
        },
      }) as AlertProps;
      const { getByTestId } = render(renderAlert(props));
      const action = getByTestId('dummy-link');
      expect(action).toBeTruthy();
      expect(action).toHaveAttribute('href', '/testing');
    });
  });
});
