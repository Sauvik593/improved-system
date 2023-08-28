import {
  sendInstrument,
  pageView,
  instrumentRegistrationNewsletter,
  instrumentAdditionalModalSubmit,
  instrumentFooterSubscribe,
  instrumentLoggedIn,
  instrumentRegisteredUser,
  instrumentBuyersGuide,
  type InstrumentNewsletterPayload,
} from './instrument';

beforeEach(() => {
  window.dataLayer = [];
});

describe('sendInstrument', () => {
  it('should push event to dataLayer with provided event name and data', () => {
    const eventName = 'TestEvent';
    const eventData = { key: 'value' };

    sendInstrument(eventName, eventData);

    expect(window.dataLayer).toEqual([expect.objectContaining({ event: eventName, ...eventData })]);
  });
});

describe('pageView', () => {
  it('should call sendInstrument with "SPA Page View" event and provided page name', () => {
    const pageName = 'HomePage';

    pageView(pageName);

    expect(window.dataLayer).toContainEqual(
      expect.objectContaining({ event: 'SPA Page View', page: pageName }),
    );
  });
});

describe('instrumentRegistrationNewsletter', () => {
  it('should call sendInstrument with specific event name and provided payload', () => {
    const payload: InstrumentNewsletterPayload = createPayload();

    instrumentRegistrationNewsletter(payload);

    expect(window.dataLayer).toEqual([
      {
        event: 'newsletter.registrationFormSubscribe',
        ...payload,
      },
    ]);
  });
});

describe('instrumentAdditionalModalSubmit', () => {
  it('fire correct event', () => {
    const payload: InstrumentNewsletterPayload = createPayload();

    instrumentAdditionalModalSubmit(payload);

    expect(window.dataLayer).toEqual([
      {
        event: 'newsletter.additionalDataModal',
        ...payload,
      },
    ]);
  });
});

describe('instrumentFooterSubscribe', () => {
  it('fires correct event', () => {
    const payload: InstrumentNewsletterPayload = createPayload();

    instrumentFooterSubscribe(payload);

    expect(window.dataLayer).toEqual([
      {
        event: 'newsletter.footerSubscribe',
        ...payload,
      },
    ]);
  });
});

describe('instrumentLoggedIn', () => {
  it('fires correct event', () => {
    const user = {
      email: 'john@example.com',
      firstname: 'John',
      id: 1,
      lastname: 'Example',
    };

    instrumentLoggedIn(user);

    expect(window.dataLayer).toEqual([
      {
        event: 'visitor.logged_in',
        email: user.email,
        first_name: user.firstname,
        type: 'Customer',
      },
    ]);
  });
});

describe('instrumentRegisteredUser', () => {
  it('fires correct event', () => {
    const user = {
      email: 'john@example.com',
      firstname: 'John',
      id: 1,
      lastname: 'Example',
    };

    instrumentRegisteredUser(user.email, user.firstname);

    expect(window.dataLayer).toEqual([
      {
        event: 'visitor.registered',
        email: user.email,
        first_name: user.firstname,
        type: 'Customer',
      },
    ]);
  });
});

describe('instrumentBuyersGuide', () => {
  describe('when newsletter is true', () => {
    it('fires correct events', () => {
      const payload: InstrumentNewsletterPayload = createPayload({ newsletter: true });

      instrumentBuyersGuide(payload);

      expect(window.dataLayer).toEqual([
        {
          event: 'newsletter.buyersGuideSubscribe',
          ...payload,
        },
        {
          event: 'buyerGuide.submitFormWithNL',
        },
      ]);
    });
  });

  describe('when newsletter is false', () => {
    it('fires correct event', () => {
      const payload: InstrumentNewsletterPayload = createPayload({ newsletter: false });

      instrumentBuyersGuide(payload);
      expect(window.dataLayer).toEqual([
        {
          event: 'buyerGuide.submitForm',
        },
      ]);
    });
  });
});

function createPayload(props = {}) {
  return {
    email: 'john@example.com',
    isVisitor: true,
    search: undefined,
    coiFrance: false,
    coiItaly: false,
    coiPortugal: false,
    coiSpain: true,
    firstName: 'John',
    newsletter: true,
    wantsToBuyIn: '1',
    whyBuy: '2',
    ...props,
  };
}
