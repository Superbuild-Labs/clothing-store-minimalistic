import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load and display hero section', async ({ page }) => {
    await page.goto('/');
    
    // Check if hero section is visible
    await expect(page.locator('h1')).toContainText('Quiet Luxury for Daily Rituals');
    
    // Check if shop button is present
    const shopButton = page.getByRole('link', { name: 'Shop Collection' });
    await expect(shopButton).toBeVisible();
  });

  test('should navigate to shop page', async ({ page }) => {
    await page.goto('/');
    
    // Click on shop button
    await page.getByRole('link', { name: 'Shop Collection' }).click();
    
    // Should navigate to shop page
    await expect(page).toHaveURL('/shop');
  });

  test('should display featured products', async ({ page }) => {
    await page.goto('/');
    
    // Check for featured products section
    await expect(page.getByText('Curated Essentials')).toBeVisible();
    
    // Check for product cards
    const productCards = page.locator('article');
    await expect(productCards.first()).toBeVisible();
  });

  test('should display category highlights', async ({ page }) => {
    await page.goto('/');
    
    // Check for categories section
    await expect(page.getByText('Editorial Chapters')).toBeVisible();
    
    // Check for category links
    const categoryLinks = page.getByRole('link', { name: 'Outerwear' });
    await expect(categoryLinks.first()).toBeVisible();
  });
});
