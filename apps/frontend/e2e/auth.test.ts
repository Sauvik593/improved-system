import { AdminApiClient } from '@mocks-server/admin-api-client';
import { test, expect, devices } from '@playwright/test';

const apiClient = new AdminApiClient();

test.beforeEach(async () => {
  await apiClient.updateConfig({
    mock: {
      collections: {
        selected: 'homepage-spain',
      },
    },
  });
});

test.afterEach(async () => {
  await apiClient.useRouteVariant('login:success');
  await apiClient.useRouteVariant('signup:success');
  await apiClient.useRouteVariant('get-me:unauthorized');
});

test.describe('When logged out', () => {
  test('should be able to switch between modals', async ({ page }) => {
    await page.goto('/');
    const desktopLogin = await page.getByTestId('desktop-menu.login');
    const loginModal = await page.getByTestId('auth-modal.login');
    const signupModal = await page.getByTestId('auth-modal.signup');

    await expect(loginModal).toBeHidden();
    await expect(signupModal).toBeHidden();

    await desktopLogin.click();

    await expect(loginModal).toBeVisible();
    await expect(signupModal).toBeHidden();

    await loginModal.getByTestId('auth-modal.login.switch-to-signup').click();

    await expect(loginModal).toBeHidden();
    await expect(signupModal).toBeVisible();

    await signupModal.getByTestId('auth-modal.signup.switch-to-login').click();

    await expect(loginModal).toBeVisible();
    await expect(signupModal).toBeHidden();
  });

  test('Desktop - Login -  with valid credentials', async ({ page }) => {
    await page.goto('/');
    const desktopLogin = await page.getByTestId('desktop-menu.login');
    const userPopover = await page.getByTestId('desktop-menu.user-popover');
    const authModalContainer = await page.getByTestId('auth-modal');
    const loginModal = await page.getByTestId('auth-modal.login');

    expect(userPopover).toBeHidden();
    await desktopLogin.click();

    const emailField = await page.getByTestId('login-form-email');
    const passwordField = await page.getByTestId('login-form-password');

    await emailField.fill('john.doe@example.com');
    await passwordField.fill('secretpassword');

    await apiClient.useRouteVariant('get-me:success');

    const pageResponse = page.waitForResponse((response) => response.url().includes('/auth/login'));
    await loginModal.getByRole('button', { name: 'Login' }).click();
    await pageResponse;

    await expect(userPopover).toBeVisible();
    await expect(authModalContainer).toBeHidden({ timeout: 300 });
  });

  test('Mobile - Login - with valid credentials', async ({ page }) => {
    await page.setViewportSize(devices['iPhone X'].viewport);
    await page.goto('/');

    const mobileMenu = await page.getByTestId('mobile-menu');
    const mobileOpenButton = await page.getByTestId('desktop-menu.open-mobile-menu');
    const loginModal = await page.getByTestId('auth-modal.login');

    await expect(mobileMenu).toBeHidden();
    await expect(loginModal).toBeHidden();
    await mobileOpenButton.click();

    await expect(mobileMenu).toBeVisible();

    const mobileLogin = await page.getByTestId('mobile-menu.footer-login');

    await mobileLogin.click();

    const emailField = await page.getByTestId('login-form-email');
    const passwordField = await page.getByTestId('login-form-password');

    await emailField.fill('john.doe@example.com');
    await passwordField.fill('secretpassword');

    await apiClient.useRouteVariant('get-me:success');

    const pageResponse = page.waitForResponse((response) => response.url().includes('/auth/login'));
    await page.getByRole('button', { name: 'Login' }).click();
    await pageResponse;

    await expect(mobileMenu).toBeHidden();
    // Open menu again
    await mobileOpenButton.click();
    // Check that user accordion is visible
    await expect(mobileMenu).toBeVisible();
    const userAccordion = await mobileMenu.getByText('User account');

    await expect(userAccordion).toBeVisible();
  });

  test('Login - Validating client side errors', async ({ page }) => {
    await page.goto('/');
    const desktopLogin = await page.getByTestId('desktop-menu.login');

    await desktopLogin.click();
    const emailField = await page.getByTestId('login-form-email');
    const passwordField = await page.getByTestId('login-form-password');

    await emailField.fill('john.doe');
    await passwordField.fill('');

    await page.getByRole('button', { name: 'Login' }).click();

    const emailError = await page.getByTestId('login-form-email.field-error');
    const passwordError = await page.getByTestId('login-form-password.field-error');

    await expect(emailError).toHaveText('Please provide a valid email address');
    await expect(passwordError).toHaveText('This field is required');
  });

  test('Login - Validating API base Error', async ({ page }) => {
    await page.goto('/');
    await apiClient.useRouteVariant('login:base_error');

    const desktopLogin = await page.getByTestId('desktop-menu.login');

    await desktopLogin.click();

    const authAPIError = await page.getByTestId('auth-modal.error-message');
    await expect(authAPIError).toBeHidden();

    const emailField = await page.getByTestId('login-form-email');
    const passwordField = await page.getByTestId('login-form-password');

    await emailField.fill('john.doe@example.com');
    await passwordField.fill('secretpassword');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(authAPIError).toBeVisible();
    await expect(authAPIError).toHaveText('Invalid email or password.');
  });

  test('Login - Validating API field errors', async ({ page }) => {
    await page.goto('/');
    await apiClient.useRouteVariant('login:validation_error');

    const desktopLogin = await page.getByTestId('desktop-menu.login');
    await desktopLogin.click();

    const authAPIError = await page.getByTestId('auth-modal.error-message');
    await expect(authAPIError).toBeHidden();

    const emailField = await page.getByTestId('login-form-email');
    const passwordField = await page.getByTestId('login-form-password');

    await emailField.fill('john.doe@example.com');
    await passwordField.fill('secretpassword');

    await page.getByRole('button', { name: 'Login' }).click();

    const emailFieldError = await page.getByTestId('login-form-email.field-error');
    const passwordFieldError = await page.getByTestId('login-form-password.field-error');

    await expect(emailFieldError).toHaveText('mocked validation error email');
    await expect(passwordFieldError).toHaveText('mocked validation error password');

    await expect(authAPIError).toBeHidden();
  });

  test('Desktop - Signup - with valid credentials', async ({ page }) => {
    await page.goto('/');
    const desktopSignup = await page.getByTestId('desktop-menu.signup');
    const userPopover = await page.getByTestId('desktop-menu.user-popover');
    const signupModal = await page.getByTestId('auth-modal.signup');

    expect(userPopover).toBeHidden();
    await desktopSignup.click();

    const firstName = await page.getByTestId('signup-form-firstname');
    const lastName = await page.getByTestId('signup-form-lastname');
    const emailField = await page.getByTestId('signup-form-email');
    const passwordField = await page.getByTestId('signup-form-password');

    await firstName.fill('John');
    await lastName.fill('Doe');
    await emailField.fill('john.doe@example.com');
    await passwordField.fill('secretpassword');

    await apiClient.useRouteVariant('get-me:success');

    const pageResponse = page.waitForResponse((response) =>
      response.url().includes('/auth/signup'),
    );
    await signupModal.getByRole('button', { name: 'Join Kyero' }).click();
    await pageResponse;

    await expect(userPopover).toBeVisible();
    await expect(signupModal).toBeHidden();
  });

  test('Mobile - Signup - with valid credentials', async ({ page }) => {
    await page.setViewportSize(devices['iPhone X'].viewport);
    await page.goto('/');

    const mobileMenu = await page.getByTestId('mobile-menu');
    const mobileOpenButton = await page.getByTestId('desktop-menu.open-mobile-menu');
    const signupModal = await page.getByTestId('auth-modal.signup');

    await expect(mobileMenu).toBeHidden();
    await expect(signupModal).toBeHidden();
    await mobileOpenButton.click();

    await expect(mobileMenu).toBeVisible();

    const mobileSignup = await mobileMenu.getByText('Sign up');

    await mobileSignup.click();

    const firstName = await page.getByTestId('signup-form-firstname');
    const lastName = await page.getByTestId('signup-form-lastname');
    const emailField = await page.getByTestId('signup-form-email');
    const passwordField = await page.getByTestId('signup-form-password');

    await firstName.fill('John');
    await lastName.fill('Doe');
    await emailField.fill('john.doe@example.com');
    await passwordField.fill('secretpassword');

    await apiClient.useRouteVariant('get-me:success');

    const pageResponse = page.waitForResponse((response) =>
      response.url().includes('/auth/signup'),
    );
    await page.getByRole('button', { name: 'Join Kyero' }).click();
    await pageResponse;

    await expect(mobileMenu).toBeHidden();
    // Open menu again
    await mobileOpenButton.click();
    // Check that user accordion is visible
    await expect(mobileMenu).toBeVisible();
    const userAccordion = await mobileMenu.getByText('User account');

    await expect(userAccordion).toBeVisible();
  });

  test('Signup - Validating client side errors', async ({ page }) => {
    await page.goto('/');
    const desktopSignup = await page.getByTestId('desktop-menu.signup');
    const userPopover = await page.getByTestId('desktop-menu.user-popover');
    const signupModal = await page.getByTestId('auth-modal.signup');

    expect(userPopover).toBeHidden();
    await desktopSignup.click();

    const firstName = await page.getByTestId('signup-form-firstname');
    const lastName = await page.getByTestId('signup-form-lastname');
    const emailField = await page.getByTestId('signup-form-email');
    const passwordField = await page.getByTestId('signup-form-password');

    await firstName.fill('');
    await lastName.fill('');
    await emailField.fill('');
    await passwordField.fill('');

    await signupModal.getByRole('button', { name: 'Join Kyero' }).click();

    const firstNameError = await page.getByTestId('signup-form-firstname.field-error');
    const lastNameError = await page.getByTestId('signup-form-lastname.field-error');
    const emailError = await page.getByTestId('signup-form-email.field-error');
    const passwordError = await page.getByTestId('signup-form-password.field-error');

    await expect(emailError).toHaveText('This field is required');
    await expect(passwordError).toHaveText('This field is required');
    await expect(firstNameError).toHaveText('This field is required');

    // Last name is not required!
    await expect(lastNameError).toBeHidden();

    await emailField.fill('john.doe');

    await expect(emailError).toHaveText('Please provide a valid email address');
  });

  test('Signup - Validating API base Error', async ({ page }) => {
    await page.goto('/');
    await apiClient.useRouteVariant('signup:validation_error');

    const desktopSignup = await page.getByTestId('desktop-menu.signup');
    const userPopover = await page.getByTestId('desktop-menu.user-popover');
    const signupModal = await page.getByTestId('auth-modal.signup');

    expect(userPopover).toBeHidden();
    await desktopSignup.click();

    const firstName = await page.getByTestId('signup-form-firstname');
    const lastName = await page.getByTestId('signup-form-lastname');
    const emailField = await page.getByTestId('signup-form-email');
    const passwordField = await page.getByTestId('signup-form-password');

    await firstName.fill('John');
    await lastName.fill('Doe');
    await emailField.fill('john.doe@example.com');
    await passwordField.fill('secretpassword');

    await signupModal.getByRole('button', { name: 'Join Kyero' }).click();

    const firstNameFieldError = await page.getByTestId('signup-form-firstname.field-error');
    const lastNameFieldError = await page.getByTestId('signup-form-lastname.field-error');
    const emailFieldError = await page.getByTestId('signup-form-email.field-error');
    const passwordFieldError = await page.getByTestId('signup-form-password.field-error');

    await expect(firstNameFieldError).toHaveText('mocked validation error firstname');
    await expect(lastNameFieldError).toHaveText('mocked validation error lastname');
    await expect(emailFieldError).toHaveText('mocked validation error email');
    await expect(passwordFieldError).toHaveText('mocked validation error password');
  });
});
