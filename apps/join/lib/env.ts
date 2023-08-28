const REVALIDATE_PRODUCTION_DEFAULT = 60;

export class Env {
  static isDev(): boolean {
    return process.env.NODE_ENV === 'development';
  }

  static get revalidate(): number | boolean {
    return process.env.NODE_ENV === 'production' ? REVALIDATE_PRODUCTION_DEFAULT : false;
  }

  static get strapiUrl(): string {
    return process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://strapi:1337';
  }

  static get strapiToken(): string {
    return process.env.STRAPI_TOKEN || '';
  }

  static get baseUrl(): string {
    return process.env.BASE_URL || 'http://new-join.kyero.test';
  }
}
