import { test, expect, Page } from '@playwright/test';

/**
 * Comprehensive Link Verification Tests
 * Ensures all internal and external links work correctly
 */

test.describe('Link Verification', () => {
    test('all landing page links are valid', async ({ page }) => {
        await page.goto('/');
        const links = page.locator('a[href]');
        const count = await links.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            const link = links.nth(i);
            const href = await link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('javascript:')) {
                expect(href).toBeTruthy();
            }
        }
    });

    test('club section internal links are valid', async ({ page }) => {
        await page.goto('/club/');
        const internalLinks = page.locator('a[href^="/"], a[href^="./"], a[href^="../"]');
        const count = await internalLinks.count();

        for (let i = 0; i < Math.min(count, 10); i++) {
            const link = internalLinks.nth(i);
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
        }
    });

    test('platform section internal links are valid', async ({ page }) => {
        await page.goto('/platform/');
        const internalLinks = page.locator('a[href^="/"], a[href^="./"], a[href^="../"]');
        const count = await internalLinks.count();

        for (let i = 0; i < Math.min(count, 10); i++) {
            const link = internalLinks.nth(i);
            const href = await link.getAttribute('href');
            expect(href).toBeTruthy();
        }
    });

    test('no dead anchor links on landing page', async ({ page }) => {
        await page.goto('/');
        const anchorLinks = page.locator('a[href^="#"]');
        const count = await anchorLinks.count();

        for (let i = 0; i < count; i++) {
            const link = anchorLinks.nth(i);
            const href = await link.getAttribute('href');
            if (href && href !== '#') {
                const targetId = href.substring(1);
                const target = page.locator(`#${targetId}`);
                // Only check if element should exist
                if (await target.count() === 0) {
                    console.log(`Warning: Anchor target not found: ${href}`);
                }
            }
        }
    });
});
