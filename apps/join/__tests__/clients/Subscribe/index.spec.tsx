import {
  render,
  screen,
  waitFor,
  getByTestId,
  fireEvent,
  act,
  RenderResult,
} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { setupIntersectionObserverMock } from '../../intersectionObserverMock';
import { CountryContext } from '@contexts/CountryContext';
import { LanguageContext } from '@contexts/LanguageContext';
import { Subscribe } from '@components/Subscribe';
import { countrySpain, mockedCountries } from '../../countriesMock';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

const server = setupServer(
  rest.post('/new-join/api/hubspot', (_req, res, ctx) => res(ctx.status(200))),
);

const submitForm = async (values: { email: string }): Promise<void> => {
  const formWrapper = screen.getByTestId('form-wrapper');
  const emailField = getByTestId(formWrapper, 'email') as HTMLInputElement;
  const form = getByTestId(formWrapper, 'form') as HTMLFormElement;

  await act(async () => {
    await waitFor(async () => {
      fireEvent.change(emailField, { target: { value: values.email } });
      fireEvent.submit(form);
    });
  });
};

describe('Subscribe', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(
      <CountryContext.Provider value={{ country: countrySpain, countries: mockedCountries }}>
        <LanguageContext.Provider value={{ locale: 'en', locales: ['en', 'es', 'pt', 'fr', 'it'] }}>
          <Subscribe />
        </LanguageContext.Provider>
      </CountryContext.Provider>,
    );
    setupIntersectionObserverMock();
  });

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => server.close());

  describe('When initially rendered', () => {
    it('displays the form view', () => {
      const successView = screen.queryByTestId('success-view');
      const errorView = screen.queryByTestId('error-view');

      expect(successView).not.toBeInTheDocument();
      expect(errorView).not.toBeInTheDocument();
    });
  });

  describe('When the form is submitted', () => {
    it('displays the form success', async () => {
      await submitForm({
        email: 'test@test.com',
      });

      await waitFor(() => {
        expect(screen.queryByTestId('success-view')).toBeInTheDocument();
        expect(screen.queryByTestId('error-view')).not.toBeInTheDocument();
      });
    });
  });

  describe('When the form is submitted but request fails', () => {
    it('displays the error modal', async () => {
      server.use(rest.post('/new-join/api/hubspot', (req, res, ctx) => res(ctx.status(500))));

      await submitForm({
        email: 'test@test.com',
      });

      await waitFor(() => {
        expect(screen.queryByTestId('error-view')).toBeInTheDocument();
        expect(screen.queryByTestId('success-view')).not.toBeInTheDocument();
      });
    });
  });
  describe('When form is filled', () => {
    it('shows validation errors', async () => {
      const { asFragment } = renderResult;

      await submitForm({
        email: 'not_valid_email',
      });

      await waitFor(() => {
        expect(screen.queryByTestId('email-error')).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
      });
    });
  });
});
