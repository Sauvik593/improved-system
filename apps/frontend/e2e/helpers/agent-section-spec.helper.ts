import { expect, type Page } from '@playwright/test';

import { type FeaturedAgent } from '~/modules/agents/featured-agents-data.server';

export const agentSectionSpecHelper = async (page: Page, agents: FeaturedAgent[]) => {
  const agentsSection = await page.getByTestId('agent-directory-section');
  const agentFigure = await page.getByTestId('agent-figure');

  await expect(agentsSection).toBeVisible();
  // Agent figure should be invisible until user scrolls to the view
  await expect(agentFigure).toBeHidden();

  await agentsSection.scrollIntoViewIfNeeded();
  await expect(agentFigure).toBeVisible();

  const agentName = await page.getByTestId('agent-figure.name');
  const agentImage = await page.getByTestId('agent-figure.image');
  const agentCompany = await page.getByTestId('agent-figure.company');
  const agentNameContent = await agentName.textContent();

  await expect(agentName).toBeVisible();

  // Check if rendered agent is the one matching the country
  const matchingAgent = agents.find((agent) => agent.name === agentNameContent) as FeaturedAgent;
  expect(matchingAgent).toBeDefined();

  // Check if img is correct
  expect(agentImage).toHaveAttribute('src', matchingAgent.photo);
  expect(agentImage).toHaveAttribute('srcSet', `${matchingAgent.photo_retina} 2x`);

  // Check if company is correct
  expect(await agentCompany.textContent()).toEqual(matchingAgent.company);
};
