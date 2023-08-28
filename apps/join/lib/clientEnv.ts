export class ClientEnv {
  static get strapiMediaUrl(): string {
    return process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL || 'http://strapi:1337';
  }

  static get baseUrl(): string {
    return process.env.NEXT_PUBLIC_BASE_URL || 'http://new-join.kyero.test';
  }

  static get imageResizerUrl(): string {
    return process.env.NEXT_PUBLIC_IMAGE_RESIZER_URL || '';
  }
}
