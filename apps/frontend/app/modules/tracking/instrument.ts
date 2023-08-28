import { type UserDTO } from '../auth/types';

export const sendInstrument = (eventName: string, data: any | undefined = {}) => {
  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  window.dataLayer.push({
    event: eventName,
    ...data,
  });
};

export const pageView = (page: string) => {
  sendInstrument('SPA Page View', { page });
};

// Newsletter
export interface InstrumentNewsletterPayload {
  search:
    | {
        locationId?: number | string;
        nationId?: number | string;
        provinceId?: number | string;
      }
    | undefined;
  isVisitor: boolean;
  email: string;
  firstName?: string;
  coiSpain?: boolean;
  coiFrance?: boolean;
  coiItaly?: boolean;
  coiPortugal?: boolean;
  wantsToBuyIn?: string;
  whyBuy?: string;
  newsletter?: boolean;
}

export const instrumentRegistrationNewsletter = (instrumentData: InstrumentNewsletterPayload) => {
  sendInstrument('newsletter.registrationFormSubscribe', instrumentData);
};

export const instrumentAdditionalModalSubmit = (instrumentData: InstrumentNewsletterPayload) => {
  sendInstrument('newsletter.additionalDataModal', instrumentData);
};

export const instrumentFooterSubscribe = (instrumentData: InstrumentNewsletterPayload) => {
  sendInstrument('newsletter.footerSubscribe', instrumentData);
};

// Auth
export const instrumentLoggedIn = (user: UserDTO) => {
  sendInstrument('visitor.logged_in', {
    email: user.email,
    first_name: user.firstname,
    type: 'Customer',
  });
};

export const instrumentRegisteredUser = (email: string, firstname: string) => {
  sendInstrument('visitor.registered', {
    email: email,
    first_name: firstname,
    type: 'Customer',
  });
};

// Buyers guide
export const instrumentBuyersGuide = (props: InstrumentNewsletterPayload) => {
  if (props.newsletter) {
    instrumenetNewsletterBuyersGuideSubscribed(props);
    instrumentSubmitFormWithNewsletter();
  } else {
    instrumentSubmitForm();
  }
};

const instrumenetNewsletterBuyersGuideSubscribed = (
  instrumentData: InstrumentNewsletterPayload,
) => {
  sendInstrument('newsletter.buyersGuideSubscribe', instrumentData);
};

const instrumentSubmitFormWithNewsletter = () => {
  sendInstrument('buyerGuide.submitFormWithNL');
};

const instrumentSubmitForm = () => {
  sendInstrument('buyerGuide.submitForm');
};
