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

import { ContactForm } from '@components/Contact/Form';

import { setupIntersectionObserverMock } from '../../intersectionObserverMock';
import { CountryContext } from '@contexts/CountryContext';
import { LanguageContext } from '@contexts/LanguageContext';
import { countrySpain, mockedCountries } from '../../countriesMock';

interface FormValues {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  businessName: string;
  userType: string;
}

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

const countries = mockedCountries;

const server = setupServer(
  rest.post('/new-join/api/hubspot', (_req, res, ctx) => res(ctx.status(200))),
);

const submitForm = async (values: FormValues): Promise<void> => {
  const contactWrapper = screen.getByTestId('contact-wrapper');
  const emailField = getByTestId(contactWrapper, 'email') as HTMLInputElement;
  const phoneNumberField = getByTestId(contactWrapper, 'phone-number') as HTMLInputElement;
  const firstNameField = getByTestId(contactWrapper, 'first-name') as HTMLInputElement;
  const lastNameField = getByTestId(contactWrapper, 'last-name') as HTMLInputElement;
  const businessNameField = getByTestId(contactWrapper, 'company-name') as HTMLInputElement;
  const userTypeField = getByTestId(contactWrapper, 'user-type') as HTMLSelectElement;
  const form = getByTestId(contactWrapper, 'form') as HTMLFormElement;

  await act(async () => {
    await waitFor(async () => {
      fireEvent.change(emailField, { target: { value: values.email } });
      fireEvent.change(phoneNumberField, { target: { value: values.phoneNumber } });
      fireEvent.change(firstNameField, { target: { value: values.firstName } });
      fireEvent.change(lastNameField, { target: { value: values.lastName } });
      fireEvent.change(businessNameField, { target: { value: values.businessName } });
      fireEvent.change(userTypeField, { target: { value: values.userType } });
      fireEvent.submit(form);
    });
  });
};

describe('ContactForm', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(
      <CountryContext.Provider value={{ country: countrySpain, countries }}>
        <LanguageContext.Provider value={{ locale: 'en', locales: ['en', 'es', 'pt', 'fr', 'it'] }}>
          <ContactForm />
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
      render(
        <CountryContext.Provider value={{ country: countrySpain, countries }}>
          <ContactForm />
        </CountryContext.Provider>,
      );
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
        phoneNumber: '1234567890',
        firstName: 'John',
        lastName: 'Doe',
        businessName: 'ACME INC',
        userType: 'Developer',
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
        phoneNumber: '1234567890',
        firstName: 'John',
        lastName: 'Doe',
        businessName: 'ACME INC',
        userType: 'Developer',
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
        email: 'not_valid_email',
        phoneNumber: '123',
        firstName: '',
        lastName: '',
        businessName: '',
        userType: '',
      });

      await waitFor(() => {
        expect(screen.queryByTestId('first-name-error')).toBeInTheDocument();
        expect(screen.queryByTestId('last-name-error')).toBeInTheDocument();
        expect(screen.queryByTestId('email-error')).toBeInTheDocument();
        expect(screen.queryByTestId('phone-number-error')).toBeInTheDocument();
        expect(screen.queryByTestId('company-name-error')).toBeInTheDocument();
        expect(screen.queryByTestId('user-type-error')).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
      });
    });
  });
});
