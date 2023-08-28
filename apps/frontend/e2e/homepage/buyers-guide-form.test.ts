import { AdminApiClient } from '@mocks-server/admin-api-client';
import { test, expect } from '@playwright/test';

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

test.afterEach(async () => {
  await apiClient.useRouteVariant('post-user-profile:success');
  await apiClient.useRouteVariant('get-me:unauthorized');
});

test.skip('handles the flow', async ({ page, context }) => {
  await page.goto('/');

  const buyersGuideForm = await page.getByTestId('buyers-guide-form');
  await expect(buyersGuideForm).toBeVisible();

  const personalisationModal = await page.getByTestId('personalisation-modal');
  const emailField = await buyersGuideForm.getByTestId('email');
  const emailFieldError = await buyersGuideForm.getByTestId('email.error');
  const submit = await buyersGuideForm.getByTestId('buyers-guide.submit');

  await expect(personalisationModal).toBeHidden();

  await expect(emailFieldError).toBeHidden();
  await emailField.fill('invalid-email');

  await submit.click();

  await expect(await emailFieldError.textContent()).toEqual('Please provide a valid email address');

  await emailField.fill('john.doe@example.com');
  await submit.click();

  const introSuccess = await page.getByTestId('personalisation-modal.intro-buyers-guide');

  await expect(introSuccess).toBeVisible();

  const message = await introSuccess.getByTestId(
    'personalisation-modal.intro-buyers-guide.message',
  );

  await expect(message).toContainText('john.doe@example.com');

  // TODO: add test for link to buyers guide pdf'

  const nextButton = await introSuccess.getByTestId('personalisation-modal.intro.next');
  await nextButton.click();
  const personalisationForm = await page.getByTestId('personalisation-form');
  const name = await personalisationForm.locator('input[name="name"]');
  const whyBuy = await personalisationForm.locator('select[name="why_buy"]');
  const wantstoBuyIn = await personalisationForm.locator('select[name="wants_to_buy_in"]');

  await name.fill('John');
  await whyBuy.selectOption('1');
  await wantstoBuyIn.selectOption('1');

  const submitPersonalisation = await personalisationForm.getByText('Subscribe');
  const successView = await page.getByTestId('personalisation-modal.success');

  await expect(successView).toBeHidden();
  await submitPersonalisation.click();
  await expect(successView).toBeVisible();

  const successCTA = await successView.getByTestId('personalisation-modal.success.cta');
  await successCTA.click();

  await expect(successView).toBeHidden();
});

test.skip('handles errors when forms fail', async ({ page }) => {
  await apiClient.useRouteVariant('post-user-profile:validation_error');
  await page.goto('/');

  const buyersGuideForm = await page.getByTestId('buyers-guide-form');
  const personalisationModal = await page.getByTestId('personalisation-modal');
  const emailField = await buyersGuideForm.getByTestId('email');
  const emailFieldError = await buyersGuideForm.getByTestId('email.error');
  const submit = await buyersGuideForm.getByTestId('buyers-guide.submit');

  await expect(personalisationModal).toBeHidden();

  await emailField.fill('john.doe@example.com');
  await submit.click();

  await expect(await emailFieldError.textContent()).toEqual('mocked validation error email');

  await apiClient.useRouteVariant('post-user-profile:unknown_error');
  await emailField.fill('john.rambo@example.com');

  await submit.click();

  const introSuccess = await page.getByTestId('personalisation-modal.intro-buyers-guide');
  const errorView = await page.getByTestId('error-view');

  await expect(introSuccess).toBeHidden();
  await expect(errorView).toBeVisible();

  const closeCTA = await errorView.getByText('Close');
  // Closes a modal after error from backend side
  await closeCTA.click();

  await expect(introSuccess).toBeHidden();
  await expect(errorView).toBeHidden();

  await apiClient.useRouteVariant('post-user-profile:success');
  await emailField.fill('john.doe@example.com');
  await submit.click();

  // A intro success message is shown, let's go to form state
  const nextButton = await introSuccess.getByTestId('personalisation-modal.intro.next');

  // Goes to the form view
  await nextButton.click();

  // Grabs a form and fills correct data from client side
  const personalisationForm = await page.getByTestId('personalisation-form');
  const email = await personalisationForm.locator('input[name="email"]');
  const name = await personalisationForm.locator('input[name="name"]');
  const emailError = await personalisationForm.getByTestId('email.field-error');
  const nameError = await personalisationForm.getByTestId('name.field-error');

  const whyBuy = await personalisationForm.locator('select[name="why_buy"]');
  const wantstoBuyIn = await personalisationForm.locator('select[name="wants_to_buy_in"]');

  // Check if email is passed from the first form
  expect(await email.inputValue()).toEqual('john.doe@example.com');

  await name.fill('John');
  await whyBuy.selectOption('1');
  await wantstoBuyIn.selectOption('1');

  await expect(emailError).toBeHidden();
  await expect(nameError).toBeHidden();

  // Setting mock response to fail with validation errors
  await apiClient.useRouteVariant('post-user-profile:validation_error');
  const submitPersonalisation = await personalisationForm.getByText('Subscribe');
  await submitPersonalisation.click();

  await expect(await nameError.textContent()).toEqual('mocked validation error name');
  await expect(await emailError.textContent()).toEqual('mocked validation error email');

  await name.fill('John 2');
  await whyBuy.selectOption('2');
  await wantstoBuyIn.selectOption('2');

  // Check if the error message is shown when there is a unknown error
  await apiClient.useRouteVariant('post-user-profile:unknown_error');
  await submitPersonalisation.click();

  await expect(errorView).toBeVisible();
  await expect(personalisationForm).toBeHidden();
  await expect(introSuccess).toBeHidden();

  const retryButton = await errorView.getByRole('button', { name: 'Retry' });

  // Retry and open up the form again
  await retryButton.click();

  await expect(errorView).toBeHidden();
  await expect(introSuccess).toBeHidden();
  await expect(personalisationForm).toBeVisible();

  await name.fill('John 2');
  await whyBuy.selectOption('2');
  await wantstoBuyIn.selectOption('2');

  await submitPersonalisation.click();

  // This time close the modal permanently
  const closeButton = await errorView.getByRole('button', { name: 'Close' });
  await closeButton.click();

  await expect(personalisationModal).toBeHidden();
});

test.skip('prefills a user email once logged in', async ({ page }) => {
  await apiClient.useRouteVariant('get-me:success');
  await page.goto('/');

  const buyersGuideForm = await page.getByTestId('buyers-guide-form');
  const emailField = await buyersGuideForm.getByTestId('email');
  const submit = await buyersGuideForm.getByTestId('buyers-guide.submit');

  // A user email from a api MOCK
  expect(await emailField.inputValue()).toEqual('john.doe@example.com');

  await submit.click();

  // Get the next button on intro message modal
  const nextButton = await page.getByTestId('personalisation-modal.intro.next');
  await nextButton.click();

  const personalisationForm = await page.getByTestId('personalisation-form');
  const personalisationEmailField = await personalisationForm.locator('input[name="email"]');

  // Check if email is passed correctly
  expect(await personalisationEmailField.inputValue()).toEqual('john.doe@example.com');
});
