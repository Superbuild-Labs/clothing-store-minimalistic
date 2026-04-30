import { test, expect } from '@playwright/test';

test.describe('Product Page', () => {
  test('should load product page', async ({ page }) => {
    await page.goto('/product/alpaca-coat');
    
    // Check if product name is visible
    await expect(page.locator('h1')).toBeVisible();
    
    // Check if price is visible
    await expect(page.locator('text=/\$/')).toBeVisible();
  });

  test('should display product gallery', async ({ page }) => {
    await page.goto('/product/alpaca-coat');
    
    // Check if gallery is present
    const gallery = page.locator('img').first();
    await expect(gallery).toBeVisible();
  });

  test('should allow size selection', async ({ page }) => {
    await page.goto('/product/alpaca-coat');
    
    // Check if size buttons are present
    const sizeButtons = page.getByRole('button').filter({ hasText: /XS|S|M|L/ });
    await expect(sizeButtons.first()).toBeVisible();
    
    // Click a size button
    await sizeButtons.first().click();
    
    // Check if it's selected (aria-pressed)
    await expect(sizeButtons.first()).toHaveAttribute('aria-pressed', 'true');
  });

  test('should allow color selection', async ({ page }) => {
    await page.goto('/product/alpaca-coat');
    
    // Check if color buttons are present
    const colorButtons = page.getByRole('button').filter({ hasText: /Black|Cream|Charcoal/i });
    await expect(colorButtons.first()).toBeVisible();
    
    // Click a color button
    await colorButtons.first().click();
    
    // Check if it's selected (aria-pressed)
    await expect(colorButtons.first()).toHaveAttribute('aria-pressed', 'true');
  });

  test('should add product to cart from product page', async ({ page }) => {
    await page.goto('/product/alpaca-coat');
    
    // Click add to bag button
    await page.getByRole('button', { name: 'Add to Bag' }).click();
    
    // Check if cart drawer opens
    const cartDrawer = page.getByRole('dialog', { name: 'Shopping bag' });
    await expect(cartDrawer).toBeVisible();
  });

  test('should display product information accordion', async ({ page }) => {
    await page.goto('/product/alpaca-coat');
    
    // Check for accordion sections
    await expect(page.getByText('Material Details')).toBeVisible();
    await expect(page.getByText('Shipping & Returns')).toBeVisible();
    await expect(page.getByText('Size & Fit')).toBeVisible();
  });
});
