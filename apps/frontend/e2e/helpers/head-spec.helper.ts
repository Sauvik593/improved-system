import { test, expect } from '@playwright/test';
import { get } from 'lodash';

interface JSONTestCase {
  name: string;
  translations: {
    _title_: string;
    [key: string]: string;
  };
  tags: Array<{
    selector: string;
    key: string;
    content: string;
  }>;
  languages: {
    [key: string]: {
      path: string;
      [key: string]: string;
    };
  };
}

export const headSpecHelper = async (jsonTestCase: JSONTestCase) => {
  const { languages, tags, translations } = jsonTestCase;
  const translationKeys = Object.keys(translations) as Array<keyof typeof translations>;

  Object.entries(languages).forEach(([locale, config]) => {
    const configKeys = Object.keys(config) as Array<keyof typeof config>;

    test(`${jsonTestCase.name} in ${locale}`, async ({ page }) => {
      const translationsFile = await require(`../../public/locales/${locale}/common.json`);
      const titleKey = translations._title_;
      const title = get(translationsFile, titleKey);

      await page.goto(config.path);
      await page.waitForLoadState();
      await expect(await page.title()).toBe(`${title} | Kyero`);

      tags.forEach(async (data) => {
        const content = data.content as keyof typeof config;
        const localeSpecificContent = configKeys.includes(content) ? config[content] : content;
        const parsedContent = translationKeys.includes(content)
          ? get(translationsFile, translations[content])
          : localeSpecificContent;

        const tag = await page.locator(data.selector);
        // @ts-ignore
        await expect(tag).toHaveAttribute(data.key, parsedContent);
      });
    });
  });
};
