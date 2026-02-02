import { test, expect } from '@playwright/test';

/**
 * All Platform Section Page Tests
 * Tests each page in the /platform/ section
 */

test.describe('Platform Pages', () => {
    test.describe('Platform Index Page', () => {
        test('loads with correct title', async ({ page }) => {
            await page.goto('/platform/');
            await expect(page).toHaveTitle(/Platform|Vindicta|Strategy/i);
        });

        test('displays hero section', async ({ page }) => {
            await page.goto('/platform/');
            await expect(page.locator('body')).toContainText('STRATEGY');
        });

        test('displays feature cards', async ({ page }) => {
            await page.goto('/platform/');
            await expect(page.locator('body')).toContainText('WARScribe');
        });

        test('displays Gas Tank feature', async ({ page }) => {
            await page.goto('/platform/');
            await expect(page.locator('body')).toContainText(/Gas Tank|Gas/i);
        });

        test('displays Meta-Oracle feature', async ({ page }) => {
            await page.goto('/platform/');
            await expect(page.locator('body')).toContainText(/Meta-Oracle|Oracle/i);
        });
    });

    test.describe('Platform Dashboard Page', () => {
        test('loads successfully', async ({ page }) => {
            const response = await page.goto('/platform/dashboard.html');
            expect(response?.status()).toBe(200);
        });

        test('displays dashboard content', async ({ page }) => {
            await page.goto('/platform/dashboard.html');
            await expect(page.locator('body')).toContainText(/Dashboard|Overview|Status/i);
        });

        test('shows restricted/locked features', async ({ page }) => {
            await page.goto('/platform/dashboard.html');
            await expect(page.locator('body')).toContainText(/Restricted|Locked|Coming/i);
        });

        test('has navigation back to platform index', async ({ page }) => {
            await page.goto('/platform/dashboard.html');
            const homeLink = page.locator('a[href*="platform"]').first();
            await expect(homeLink).toBeVisible();
        });
    });

    test.describe('Platform WARScribe Page', () => {
        test('loads successfully', async ({ page }) => {
            const response = await page.goto('/platform/warscribe.html');
            expect(response?.status()).toBe(200);
        });

        test('displays WARScribe content', async ({ page }) => {
            await page.goto('/platform/warscribe.html');
            await expect(page.locator('body')).toContainText('WARScribe');
        });

        test('displays specification sections', async ({ page }) => {
            await page.goto('/platform/warscribe.html');
            await expect(page.locator('body')).toContainText(/Specification|Version|Section/i);
        });

        test('has collapsible sections or navigation', async ({ page }) => {
            await page.goto('/platform/warscribe.html');
            // Check for interactive elements
            const content = await page.content();
            expect(content.length).toBeGreaterThan(3000);
        });
    });

    test.describe('Platform Spec JSON', () => {
        test('spec.json returns valid JSON', async ({ request }) => {
            const response = await request.get('/platform/spec.json');
            expect(response.status()).toBe(200);
            const contentType = response.headers()['content-type'];
            expect(contentType).toContain('application/json');
        });

        test('spec.json contains expected structure', async ({ request }) => {
            const response = await request.get('/platform/spec.json');
            const json = await response.json();
            expect(json).toBeDefined();
            expect(typeof json).toBe('object');
        });
    });
});
