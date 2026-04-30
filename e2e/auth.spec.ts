import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/login');
    
    // Check if login form is present
    await expect(page.getByText('Sign in to ELEVE')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
  });

  test('should show validation errors for empty fields', async ({ page }) => {
    await page.goto('/login');
    
    // Submit form without filling fields
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Check for error messages
    await expect(page.getByText('Please complete all required fields')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    // Fill with invalid credentials
    await page.getByLabel('Email').fill('invalid@example.com');
    await page.getByLabel('Password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Check for error message
    await expect(page.getByText(/unable to sign in/i)).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    // First login (using demo credentials if available)
    await page.goto('/login');
    await page.getByLabel('Email').fill(process.env.DEMO_EMAIL || 'admin@eleve.com');
    await page.getByLabel('Password').fill(process.env.DEMO_PASSWORD || 'SuperSecret123');
    await page.getByRole('button', { name: 'Sign in' }).click();
    
    // Wait for navigation
    await page.waitForURL('/', { timeout: 5000 });
    
    // Click logout button
    const logoutButton = page.getByRole('button', { name: 'Logout' });
    await logoutButton.click();
      
    // Should redirect to login page
    await expect(page).toHaveURL('/login');
  });
});
