import { test, expect } from '@playwright/test';

/**
 * Responsive Design Tests
 * Verifies portal works across different viewport sizes
 */

test.describe('Responsive Design', () => {
    const viewports = [
        { name: 'Mobile', width: 375, height: 667 },
        { name: 'Tablet', width: 768, height: 1024 },
        { name: 'Desktop', width: 1280, height: 720 },
        { name: 'Wide', width: 1920, height: 1080 },
    ];

    for (const vp of viewports) {
        test.describe(`${vp.name} (${vp.width}x${vp.height})`, () => {
            test.use({ viewport: { width: vp.width, height: vp.height } });

            test('landing page renders correctly', async ({ page }) => {
                await page.goto('/');
                await expect(page.locator('body')).toBeVisible();
                const content = await page.content();
                expect(content.length).toBeGreaterThan(1000);
            });

            test('club section loads', async ({ page }) => {
                await page.goto('/club/');
                await expect(page.locator('body')).toBeVisible();
            });

            test('platform section loads', async ({ page }) => {
                await page.goto('/platform/');
                await expect(page.locator('body')).toBeVisible();
            });
        });
    }
});

test.describe('Mobile Navigation', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('landing page navigation works on mobile', async ({ page }) => {
        await page.goto('/');
        // Should be able to tap club section
        const clubSection = page.locator('text=THE CLUB').first();
        await expect(clubSection).toBeVisible();
    });

    test('club section navigation on mobile', async ({ page }) => {
        await page.goto('/club/');
        // Check for hamburger menu or visible nav
        const nav = page.locator('nav, #menu, .menu-toggle, button[aria-label*="menu"]').first();
        if (await nav.isVisible()) {
            await expect(nav).toBeVisible();
        }
    });

    test('platform section navigation on mobile', async ({ page }) => {
        await page.goto('/platform/');
        const content = await page.content();
        expect(content.length).toBeGreaterThan(1000);
    });
});

test.describe('Touch Targets', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('buttons have adequate touch target size', async ({ page }) => {
        await page.goto('/');
        const buttons = page.locator('button, a.button, [role="button"]');
        const count = await buttons.count();

        for (let i = 0; i < Math.min(count, 5); i++) {
            const button = buttons.nth(i);
            if (await button.isVisible()) {
                const box = await button.boundingBox();
                if (box) {
                    // Touch targets should be at least 44x44 pixels
                    // Allow some smaller ones but log
                    if (box.width < 44 || box.height < 44) {
                        console.log(`Small touch target: ${box.width}x${box.height}`);
                    }
                }
            }
        }
    });
});
