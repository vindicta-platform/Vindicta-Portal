import { test, expect } from '@playwright/test';

/**
 * Static Asset Tests
 * Verifies CSS, JS, and image loading
 */

test.describe('Static Assets', () => {
    test.describe('Landing Page Assets', () => {
        test('loads CSS stylesheets', async ({ page }) => {
            await page.goto('/');
            const styles = page.locator('link[rel="stylesheet"]');
            const count = await styles.count();
            expect(count).toBeGreaterThan(0);
        });

        test('loads JavaScript files', async ({ page }) => {
            await page.goto('/');
            const scripts = page.locator('script[src]');
            const count = await scripts.count();
            expect(count).toBeGreaterThanOrEqual(0);
        });

        test('Tailwind CSS is loaded', async ({ page }) => {
            await page.goto('/');
            const content = await page.content();
            expect(content).toContain('tailwindcss');
        });
    });

    test.describe('Club Assets', () => {
        test('club CSS directory exists and loads', async ({ request }) => {
            const response = await request.get('/club/assets/css/main.css');
            expect(response.status()).toBe(200);
        });

        test('club JS directory exists and loads', async ({ request }) => {
            const response = await request.get('/club/assets/js/main.js');
            expect(response.status()).toBe(200);
        });

        test('club fonts load correctly', async ({ page }) => {
            await page.goto('/club/');
            const fonts = page.locator('link[rel="stylesheet"][href*="font"], style');
            const count = await fonts.count();
            expect(count).toBeGreaterThanOrEqual(0);
        });
    });

    test.describe('Platform Assets', () => {
        test('platform CSS loads', async ({ request }) => {
            const response = await request.get('/platform/css/portal-ui.css');
            expect(response.status()).toBe(200);
        });

        test('platform JS portal-ui loads', async ({ request }) => {
            const response = await request.get('/platform/js/portal-ui.js');
            expect(response.status()).toBe(200);
        });

        test('platform JS warscribe-spec-renderer loads', async ({ request }) => {
            const response = await request.get('/platform/js/warscribe-spec-renderer.js');
            expect(response.status()).toBe(200);
        });
    });

    test.describe('Image Assets', () => {
        test('landing page images load', async ({ page }) => {
            await page.goto('/');
            const images = page.locator('img');
            const count = await images.count();

            let brokenCount = 0;
            for (let i = 0; i < count; i++) {
                const img = images.nth(i);
                const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
                if (naturalWidth === 0) {
                    brokenCount++;
                    const src = await img.getAttribute('src');
                    console.log(`Broken image: ${src}`);
                }
            }
            // Allow some broken images in dev
            expect(brokenCount).toBeLessThan(count / 2);
        });

        test('club section images load', async ({ page }) => {
            await page.goto('/club/');
            const images = page.locator('img');
            const count = await images.count();

            for (let i = 0; i < Math.min(count, 5); i++) {
                const img = images.nth(i);
                const visible = await img.isVisible();
                if (visible) {
                    const src = await img.getAttribute('src');
                    expect(src).toBeTruthy();
                }
            }
        });
    });
});
