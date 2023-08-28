import 'dotenv/config';

export class Env {
  get wtiKey(): string | undefined {
    return process.env.WTI_KEY;
  }

  get wtiTarget(): string | undefined {
    return process.env.WTI_TRANSLATION_TARGET;
  }
}
