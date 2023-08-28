import { AdminApiClient } from '@mocks-server/admin-api-client';
import { test, expect, type Cookie } from '@playwright/test';

const apiClient = new AdminApiClient();

test.beforeAll(async () => {
  await apiClient.updateConfig({
    mock: {
      collections: {
        selected: 'homepage-spain',
      },
    },
  });
});

const getNonEssentialCookies = (cookies: Cookie[]) =>
  cookies.find((cookie) => cookie.name === 'non_essential_cookies');

test.skip('Cookie policy modal', () => {
  test('active when initially loaded', async ({ page, context }) => {
    let nonEssentialCookies: Cookie | undefined = undefined;

    nonEssentialCookies = getNonEssentialCookies(await context.cookies());
    expect(nonEssentialCookies).toBeUndefined();

    await page.goto('/');
    const cookieBar = await page.getByTestId('cookie-bar');

    // Wait for appear animation
    await page.waitForTimeout(100);
    expect(cookieBar).toBeVisible();

    const acceptButton = await cookieBar.getByTestId('accept-cookies-button');
    await acceptButton.click();

    // Wait for disappear animation
    await page.waitForTimeout(400);
    expect(cookieBar).toBeHidden();

    nonEssentialCookies = getNonEssentialCookies(await context.cookies());
    expect(nonEssentialCookies).toBeDefined();
    expect(nonEssentialCookies).toMatchObject({ name: 'non_essential_cookies', value: 'true' });
  });

  test('not visible when non_essential_cookies cookie is set to false', async ({
    page,
    context,
  }) => {
    let nonEssentialCookies: Cookie | undefined = undefined;

    context.addCookies([
      {
        name: 'non_essential_cookies',
        value: 'false',
        domain: 'localhost',
        path: '/',
        expires: -1,
        httpOnly: false,
        secure: false,
        sameSite: 'Lax',
      },
    ]);

    await page.goto('/');

    nonEssentialCookies = getNonEssentialCookies(await context.cookies());
    expect(nonEssentialCookies).toBeDefined();
    expect(nonEssentialCookies).toMatchObject({ name: 'non_essential_cookies', value: 'false' });

    const cookieBar = await page.getByTestId('cookie-bar');

    // Wait for potential animation
    await page.waitForTimeout(100);
    expect(cookieBar).toBeHidden();
  });

  test('not visible when non_essential_cookies cookie is set to true', async ({
    page,
    context,
  }) => {
    let nonEssentialCookies: Cookie | undefined = undefined;

    context.addCookies([
      {
        name: 'non_essential_cookies',
        value: 'true',
        domain: 'localhost',
        path: '/',
        expires: -1,
        httpOnly: false,
        secure: false,
        sameSite: 'Lax',
      },
    ]);

    await page.goto('/');

    nonEssentialCookies = getNonEssentialCookies(await context.cookies());
    expect(nonEssentialCookies).toBeDefined();
    expect(nonEssentialCookies).toMatchObject({ name: 'non_essential_cookies', value: 'true' });

    const cookieBar = await page.getByTestId('cookie-bar');

    // Wait for potential animation
    await page.waitForTimeout(100);
    expect(cookieBar).toBeHidden();
  });
});
