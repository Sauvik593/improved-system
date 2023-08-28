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

import { TellUsAboutForm } from '@components/TellUsAboutForm';
import { CountryContext } from '@contexts/CountryContext';
import { LanguageContext } from '@contexts/LanguageContext';
import type { PlanKey } from '@components/Pricing/PlansSeed';

import { setupIntersectionObserverMock } from '../../intersectionObserverMock';
import { countrySpain, mockedCountries } from '../../countriesMock';

interface FormValues {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  company: string;
}

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

const server = setupServer(
  rest.post('/new-join/api/hubspot', (_req, res, ctx) => res(ctx.status(200))),
);

const submitForm = async (values: FormValues): Promise<void> => {
  const formWrapper = screen.getByTestId('form-wrapper');
  const emailField = getByTestId(formWrapper, 'email') as HTMLInputElement;
  const phoneNumberField = getByTestId(formWrapper, 'phone-number') as HTMLInputElement;
  const firstNameField = getByTestId(formWrapper, 'first-name') as HTMLInputElement;
  const lastNameField = getByTestId(formWrapper, 'last-name') as HTMLInputElement;
  const businessNameField = getByTestId(formWrapper, 'company-name') as HTMLInputElement;
  const form = getByTestId(formWrapper, 'form') as HTMLFormElement;

  await act(async () => {
    await waitFor(async () => {
      fireEvent.change(emailField, { target: { value: values.email } });
      fireEvent.change(phoneNumberField, { target: { value: values.phone } });
      fireEvent.change(firstNameField, { target: { value: values.firstName } });
      fireEvent.change(lastNameField, { target: { value: values.lastName } });
      fireEvent.change(businessNameField, { target: { value: values.company } });
      fireEvent.submit(form);
    });
  });
};

describe('TellUsAboutForm', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(
      <CountryContext.Provider value={{ country: countrySpain, countries: mockedCountries }}>
        <LanguageContext.Provider value={{ locale: 'en', locales: ['en', 'es', 'pt', 'fr', 'it'] }}>
          <TellUsAboutForm isLoading={false} listings="25" duration="1_month" />
        </LanguageContext.Provider>
      </CountryContext.Provider>,
    );
    setupIntersectionObserverMock();
  });

  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => server.close());

  describe('When initially rendered', () => {
    it('displays the form view', () => {
      const successModal = screen.queryByTestId('success-modal');
      const errorModal = screen.queryByTestId('error-modal');

      expect(successModal).not.toBeInTheDocument();
      expect(errorModal).not.toBeInTheDocument();
    });
  });

  describe('When the form is submitted', () => {
    it('displays the form success', async () => {
      await submitForm({
        email: 'test@test.com',
        phone: '1234567890',
        firstName: 'John',
        lastName: 'Doe',
        company: 'ACME INC',
      });

      await waitFor(() => {
        expect(screen.queryByTestId('success-modal')).toBeInTheDocument();
        expect(screen.queryByTestId('error-modal')).not.toBeInTheDocument();
      });
    });
  });

  describe('When the form is submitted but request fails', () => {
    it('displays the error modal', async () => {
      server.use(rest.post('/new-join/api/hubspot', (req, res, ctx) => res(ctx.status(500))));

      await submitForm({
        email: 'test@test.com',
        phone: '1234567890',
        firstName: 'John',
        lastName: 'Doe',
        company: 'ACME INC',
      });

      await waitFor(() => {
        expect(screen.queryByTestId('error-modal')).toBeInTheDocument();
        expect(screen.queryByTestId('success-modal')).not.toBeInTheDocument();
      });
    });
  });
  describe('When form is filled', () => {
    it('shows validation errors', async () => {
      const { asFragment } = renderResult;
      await submitForm({
        email: 'wrong_email',
        phone: '123',
        firstName: '',
        lastName: '',
        company: '',
      });

      await waitFor(() => {
        expect(screen.queryByTestId('first-name-error')).toBeInTheDocument();
        expect(screen.queryByTestId('last-name-error')).toBeInTheDocument();
        expect(screen.queryByTestId('email-error')).toBeInTheDocument();
        expect(screen.queryByTestId('phone-number-error')).toBeInTheDocument();
        expect(screen.queryByTestId('company-name-error')).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
      });
    });
  });
});

describe('When wrong params are passed to form', () => {
  it('should fill in backup value', () => {
    render(
      <CountryContext.Provider value={{ country: countrySpain, countries: mockedCountries }}>
        <LanguageContext.Provider value={{ locale: 'en', locales: ['en', 'es', 'pt', 'fr', 'it'] }}>
          <TellUsAboutForm
            isLoading={false}
            listings="400"
            duration={'today' as string as PlanKey}
          />
        </LanguageContext.Provider>
      </CountryContext.Provider>,
    );

    const primePackageSelected = screen.getByTestId('prime-package-selected') as HTMLInputElement;

    expect(primePackageSelected.value).toBe('200_prime_listings_1_month');
  });
});
