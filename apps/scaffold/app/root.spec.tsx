import { vitest, expect, describe, it } from 'vitest';
import { withSentry } from '@sentry/remix';
import { render } from '@testing-library/react';
import { AppWithSentry, App } from './root';

function MockedApp() {
  return <div>App Mock</div>;
}

vitest.mock('@sentry/remix');
const MockedWithSentry = vitest.mocked(withSentry);

MockedWithSentry.mockReturnValue(MockedApp);

describe('Application Root', async () => {
  describe('rendering deafult App with Sentry', async () => {
    it('should render the application', async () => {
      const renderer = await render(<AppWithSentry />);

      expect(MockedWithSentry).toHaveBeenCalledWith(App);
      const text = await renderer.getByText('App Mock');

      expect(text).toBeTruthy();
    });
  });
});
