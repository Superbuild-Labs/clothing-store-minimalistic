import { test, expect } from '@playwright/test';

test.describe('Shopping Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/shop');
  });

  test('should add product to cart', async ({ page }) => {
    // Find first product and add to cart
    const firstProductCard = page.locator('article').first();
    await firstProductCard.getByRole('button', { name: 'Add to Bag' }).click();
    
    // Check if cart drawer opens
    const cartDrawer = page.getByRole('dialog', { name: 'Shopping bag' });
    await expect(cartDrawer).toBeVisible();
    
    // Check if product is in cart
    await expect(cartDrawer.getByText('Cart is empty')).not.toBeVisible();
  });

  test('should open cart drawer from navbar', async ({ page }) => {
    // Click cart icon in navbar
    await page.getByLabel('Open cart').click();
    
    // Check if cart drawer opens
    const cartDrawer = page.getByRole('dialog', { name: 'Shopping bag' });
    await expect(cartDrawer).toBeVisible();
  });

  test('should close cart drawer', async ({ page }) => {
    // Open cart drawer
    await page.getByLabel('Open cart').click();
    
    // Close cart drawer
    await page.getByLabel('Close cart', { exact: true }).click();
    
    // Check if cart drawer is closed
    const cartDrawer = page.getByRole('dialog', { name: 'Shopping bag' });
    await expect(cartDrawer).not.toBeVisible();
  });

  test('should navigate to checkout from cart', async ({ page }) => {
    // Add product to cart first
    const firstProductCard = page.locator('article').first();
    await firstProductCard.getByRole('button', { name: 'Add to Bag' }).click();
    
    // Click continue to checkout
    await page.getByRole('button', { name: 'Continue to Checkout' }).click();
    
    // Should navigate to checkout page
    await expect(page).toHaveURL('/checkout');
  });
});
