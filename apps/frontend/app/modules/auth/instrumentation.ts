import {
  instrumentLoggedIn,
  instrumentRegisteredUser,
  instrumentRegistrationNewsletter,
} from '../tracking/instrument';
import { type LoginSuccessResponse } from './login.action.server';

import { type SignupSuccessResponse } from './signup.action.server';

export const instrumentSignup = (
  response: SignupSuccessResponse,
  locationId: number | undefined,
) => {
  const { data } = response;

  instrumentRegisteredUser(data.email, data.firstname);

  if (data.receive_weekly_newsletter) {
    instrumentRegistrationNewsletter({
      search: { locationId: locationId },
      email: data.email,
      isVisitor: false,
      firstName: data.firstname,
    });
  }
};

export const instrumentLogin = (response: LoginSuccessResponse) =>
  instrumentLoggedIn(response.data);
