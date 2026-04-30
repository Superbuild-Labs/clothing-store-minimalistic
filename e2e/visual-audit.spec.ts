import { test, expect, type Page } from "@playwright/test";

const screenshotRoot = "results/visual-audit";
const appUrl = process.env.PLAYWRIGHT_AUDIT_BASE_URL ?? "http://localhost:3002";
const demoEmail = process.env.DEMO_EMAIL || "admin@eleve.com";
const demoPassword = process.env.DEMO_PASSWORD || "SuperSecret123";

async function preparePage(page: Page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        scroll-behavior: auto !important;
      }
    `,
  });
}

test.describe("Visual audit capture", () => {
  test.use({ viewport: { width: 1440, height: 1200 } });

  test("captures storefront journey screenshots", async ({ page }) => {
    await preparePage(page);

    await page.goto(`${appUrl}/login`);
    await expect(page.getByRole("heading", { name: "Sign in to ELEVE" })).toBeVisible();
    await page.screenshot({ path: `${screenshotRoot}/01-login.png`, fullPage: true });

    await page.getByLabel("Email").fill(demoEmail);
    await page.getByLabel("Password").fill(demoPassword);
    await page.getByRole("button", { name: /sign in/i }).click();
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Quiet Luxury for Daily Rituals" })).toBeVisible();
    await page.screenshot({ path: `${screenshotRoot}/02-home.png`, fullPage: true });

    await page.goto(`${appUrl}/shop`);
    await expect(page.getByRole("heading", { name: "Ready-to-Wear Collection" })).toBeVisible();
    await page.screenshot({ path: `${screenshotRoot}/03-shop.png`, fullPage: true });

    await page.getByRole("button", { name: /add .* to bag/i }).first().click();
    await expect(page.getByRole("dialog", { name: "Shopping Bag" })).toBeVisible();
    await page.screenshot({ path: `${screenshotRoot}/04-cart-drawer.png`, fullPage: true });

    await page.goto(`${appUrl}/product/alpaca-coat`);
    await expect(page.locator("h1")).toContainText("Alpaca");
    await page.screenshot({ path: `${screenshotRoot}/05-product.png`, fullPage: true });

    await page.getByRole("button", { name: "M", exact: true }).click();
    await page.getByRole("button", { name: "Camel", exact: true }).click();
    await page.getByRole("button", { name: "Add to Bag", exact: true }).click();
    await expect(page.getByRole("dialog", { name: "Shopping Bag" })).toBeVisible();
    await page.screenshot({ path: `${screenshotRoot}/06-product-added-cart.png`, fullPage: true });

    await page.getByRole("button", { name: "Continue to Checkout" }).click();
    await expect(page.getByRole("heading", { name: "Complete Your Order" })).toBeVisible();
    await page.screenshot({ path: `${screenshotRoot}/07-checkout.png`, fullPage: true });

    await page.getByLabel("Full name").fill("Aarav Sharma");
    await page.getByLabel("Email").fill("aarav@example.com");
    await page.getByLabel("Phone").fill("+91 99999 99999");
    await page.getByLabel("Address line 1").fill("12 Marine Drive");
    await page.getByLabel("City").fill("Mumbai");
    await page.getByLabel("State").fill("Maharashtra");
    await page.getByLabel("ZIP").fill("400001");
    await page.screenshot({ path: `${screenshotRoot}/08-checkout-filled.png`, fullPage: true });

    await page.goto(`${appUrl}/about`);
    await expect(page.getByRole("heading", { name: "A Quiet Luxury House for Modern Rituals" })).toBeVisible();
    await page.screenshot({ path: `${screenshotRoot}/09-about.png`, fullPage: true });
  });
});
