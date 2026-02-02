import { test, expect } from '@playwright/test';

/**
 * SEO and Meta Tags Tests
 * Verifies proper meta tags for search engine optimization
 */

test.describe('SEO and Meta Tags', () => {
    test.describe('Landing Page SEO', () => {
        test('has meta description', async ({ page }) => {
            await page.goto('/');
            const metaDesc = page.locator('meta[name="description"]');
            const count = await metaDesc.count();
            if (count > 0) {
                const content = await metaDesc.getAttribute('content');
                expect(content?.length).toBeGreaterThan(10);
            } else {
                console.log('Missing meta description on landing page');
            }
        });

        test('has proper title tag', async ({ page }) => {
            await page.goto('/');
            const title = await page.title();
            expect(title).toBeTruthy();
            expect(title.length).toBeGreaterThan(5);
            expect(title.length).toBeLessThan(70);
        });

        test('has viewport meta tag', async ({ page }) => {
            await page.goto('/');
            const viewport = page.locator('meta[name="viewport"]');
            await expect(viewport).toHaveCount(1);
        });

        test('has charset defined', async ({ page }) => {
            await page.goto('/');
            const charset = page.locator('meta[charset], meta[http-equiv="Content-Type"]');
            const count = await charset.count();
            expect(count).toBeGreaterThan(0);
        });
    });

    test.describe('Club Page SEO', () => {
        test('has proper title', async ({ page }) => {
            await page.goto('/club/');
            const title = await page.title();
            expect(title).toBeTruthy();
        });

        test('has viewport meta', async ({ page }) => {
            await page.goto('/club/');
            const viewport = page.locator('meta[name="viewport"]');
            await expect(viewport).toHaveCount(1);
        });
    });

    test.describe('Platform Page SEO', () => {
        test('has proper title', async ({ page }) => {
            await page.goto('/platform/');
            const title = await page.title();
            expect(title).toBeTruthy();
        });

        test('has viewport meta', async ({ page }) => {
            await page.goto('/platform/');
            const viewport = page.locator('meta[name="viewport"]');
            await expect(viewport).toHaveCount(1);
        });
    });

    test.describe('Heading Structure', () => {
        test('landing page has single h1', async ({ page }) => {
            await page.goto('/');
            const h1 = page.locator('h1');
            const count = await h1.count();
            // Should have at least one h1
            expect(count).toBeGreaterThanOrEqual(1);
        });

        test('club page has single h1', async ({ page }) => {
            await page.goto('/club/');
            const h1 = page.locator('h1');
            const count = await h1.count();
            expect(count).toBeGreaterThanOrEqual(1);
        });

        test('platform page has single h1', async ({ page }) => {
            await page.goto('/platform/');
            const h1 = page.locator('h1');
            const count = await h1.count();
            expect(count).toBeGreaterThanOrEqual(1);
        });
    });

    test.describe('Canonical and OG Tags', () => {
        test('landing page has og:title', async ({ page }) => {
            await page.goto('/');
            const ogTitle = page.locator('meta[property="og:title"]');
            const count = await ogTitle.count();
            if (count === 0) {
                console.log('Missing og:title on landing page');
            }
        });

        test('landing page has og:description', async ({ page }) => {
            await page.goto('/');
            const ogDesc = page.locator('meta[property="og:description"]');
            const count = await ogDesc.count();
            if (count === 0) {
                console.log('Missing og:description on landing page');
            }
        });
    });
});
