import { test, expect } from '@playwright/test';

/**
 * All Club Section Page Tests
 * Tests each page in the /club/ section
 */

test.describe('Club Pages', () => {
    test.describe('Club Index Page', () => {
        test('loads with correct title', async ({ page }) => {
            await page.goto('/club/');
            await expect(page).toHaveTitle(/Vindicta|Club|Home/i);
        });

        test('displays main banner content', async ({ page }) => {
            await page.goto('/club/');
            await expect(page.locator('#banner, .banner, header')).toBeVisible();
        });

        test('has navigation menu', async ({ page }) => {
            await page.goto('/club/');
            await expect(page.locator('nav, #menu')).toBeVisible();
        });
    });

    test.describe('Club About Page', () => {
        test('loads successfully', async ({ page }) => {
            const response = await page.goto('/club/about.html');
            expect(response?.status()).toBe(200);
        });

        test('displays about content', async ({ page }) => {
            await page.goto('/club/about.html');
            await expect(page.locator('body')).toContainText(/about|origin|history/i);
        });

        test('has back navigation', async ({ page }) => {
            await page.goto('/club/about.html');
            const backLink = page.locator('a[href*="index"], a[href="/club/"]').first();
            await expect(backLink).toBeVisible();
        });
    });

    test.describe('Club Team Page', () => {
        test('loads successfully', async ({ page }) => {
            const response = await page.goto('/club/team.html');
            expect(response?.status()).toBe(200);
        });

        test('displays team content', async ({ page }) => {
            await page.goto('/club/team.html');
            const content = await page.content();
            expect(content.length).toBeGreaterThan(1000);
        });
    });

    test.describe('Club Code Page', () => {
        test('loads successfully', async ({ page }) => {
            const response = await page.goto('/club/code.html');
            expect(response?.status()).toBe(200);
        });

        test('displays code of conduct content', async ({ page }) => {
            await page.goto('/club/code.html');
            await expect(page.locator('body')).toContainText(/code|conduct|rules/i);
        });
    });

    test.describe('Club Generic Page', () => {
        test('loads successfully', async ({ page }) => {
            const response = await page.goto('/club/generic.html');
            expect(response?.status()).toBe(200);
        });
    });

    test.describe('Club Elements Page', () => {
        test('loads successfully', async ({ page }) => {
            const response = await page.goto('/club/elements.html');
            expect(response?.status()).toBe(200);
        });

        test('displays UI elements showcase', async ({ page }) => {
            await page.goto('/club/elements.html');
            const content = await page.content();
            expect(content.length).toBeGreaterThan(5000);
        });
    });
});
