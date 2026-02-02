import { test, expect } from '@playwright/test';

/**
 * Platform Section Tests
 * Persona: Developer/Maintainer
 * Tests the platform application pages at /platform/
 */

test.describe('Platform Section', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/platform/');
    });

    test('should load platform index page', async ({ page }) => {
        await expect(page).toHaveURL(/.*\/platform.*/);
    });

    test('should display main headline', async ({ page }) => {
        await expect(page.locator('body')).toContainText('STRATEGY');
        await expect(page.locator('body')).toContainText('ADMINISTRATION');
    });

    test('should have header with navigation', async ({ page }) => {
        // Portal-ui.js injects header
        const nav = page.locator('header, nav').first();
        await expect(nav).toBeVisible();
    });

    test('should display WARScribe feature card', async ({ page }) => {
        // Check for WARScribe mention in page content
        await expect(page.locator('body')).toContainText('WARScribe');
    });

    test('should have dashboard link', async ({ page }) => {
        const dashboardLink = page.locator('a[href*="dashboard"]').first();
        await expect(dashboardLink).toBeVisible();
    });

    test('should navigate to WARScribe page', async ({ page }) => {
        const warscribeLink = page.locator('a[href*="warscribe"]').first();
        if (await warscribeLink.isVisible()) {
            await warscribeLink.click();
            await expect(page).toHaveURL(/.*warscribe.*/);
        }
    });

    test('should navigate to dashboard page', async ({ page }) => {
        const dashboardLink = page.locator('a[href*="dashboard"]').first();
        if (await dashboardLink.isVisible()) {
            await dashboardLink.click();
            await expect(page).toHaveURL(/.*dashboard.*/);
        }
    });

    test('should display restricted features as locked', async ({ page }) => {
        // Meta-Oracle and Gas Tank should show "Restricted" or locked state
        const content = await page.content();
        expect(content.toLowerCase()).toContain('restricted');
    });
});
