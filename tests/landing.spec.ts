import { test, expect } from '@playwright/test';

/**
 * Landing Page Tests
 * Persona: Developer/Maintainer
 * Tests the main portal landing page at /
 */

test.describe('Landing Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should display portal header with branding', async ({ page }) => {
        // Check for VINDICTA PORTAL branding in page
        await expect(page.locator('body')).toContainText('VINDICTA');
        await expect(page.locator('body')).toContainText('PORTAL');
    });

    test('should display split-pane layout with Club section', async ({ page }) => {
        await expect(page.locator('text=THE CLUB')).toBeVisible();
        await expect(page.locator('text=COMMUNITY + IDENTITY')).toBeVisible();
        await expect(page.locator('text=Access Sanctum')).toBeVisible();
    });

    test('should display split-pane layout with Platform section', async ({ page }) => {
        await expect(page.locator('text=THE APP')).toBeVisible();
        await expect(page.locator('text=INTELLIGENCE + STRATEGY')).toBeVisible();
        await expect(page.locator('text=Initialize Core')).toBeVisible();
    });

    test('should have working link to Club section', async ({ page }) => {
        await page.click('text=THE CLUB');
        await expect(page).toHaveURL(/.*\/club.*/);
    });

    test('should have working link to Platform section', async ({ page }) => {
        await page.click('text=THE APP');
        await expect(page).toHaveURL(/.*\/platform.*/);
    });

    test('should display footer branding', async ({ page }) => {
        await expect(page.locator('text=Portal Active')).toBeVisible();
        await expect(page.locator('text=Vindicta Operations')).toBeVisible();
    });
});
