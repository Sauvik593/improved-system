import { type UserDTO } from '~/modules/auth/types';

export function getFormDataForInstrumentation(form: HTMLFormElement, user: UserDTO | null) {
  const formData = new FormData(form as HTMLFormElement);
  const email = formData.get('email') as string;
  const newsletter = formData.get('receive_weekly_newsletter') as string;
  const coiFrance = formData.get('coi_france') as string;
  const coiSpain = formData.get('coi_spain') as string;
  const coiItaly = formData.get('coi_italy') as string;
  const coiPortugal = formData.get('coi_portugal') as string;
  const whyBuy = formData.get('why_buy') as string;
  const wantsToBuyIn = formData.get('wants_to_buy_in') as string;

  return {
    email,
    search: undefined,
    isVisitor: !user,
    newsletter: !!newsletter,
    coiFrance: !!coiFrance,
    coiSpain: !!coiSpain,
    coiItaly: !!coiItaly,
    coiPortugal: !!coiPortugal,
    whyBuy,
    wantsToBuyIn,
  };
}
