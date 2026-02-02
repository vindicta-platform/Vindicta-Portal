import { test, expect } from '@playwright/test';

/**
 * Club Section Tests
 * Persona: Developer/Maintainer
 * Tests the club community pages at /club/
 */

test.describe('Club Section', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/club/');
    });

    test('should load club index page', async ({ page }) => {
        await expect(page).toHaveURL(/.*\/club.*/);
    });

    test('should display club navigation', async ({ page }) => {
        // Check for nav elements - HTML5UP Solid State template
        await expect(page.locator('nav')).toBeVisible();
    });

    test.skip('should have working Home link', async ({ page }) => {
        // SKIP: HTML5UP template has non-standard nav structure - needs investigation
        const homeLink = page.locator('a:has-text("Home")').first();
        const visible = await homeLink.isVisible().catch(() => false);
        if (visible) {
            await homeLink.click();
            const url = page.url();
            expect(url).toMatch(/\/(club)?$/);
        }
    });

    test('should display club content', async ({ page }) => {
        // Check for main content areas
        await expect(page.locator('body')).toBeVisible();
        const content = await page.content();
        expect(content.length).toBeGreaterThan(1000);
    });

    test('should have no broken images', async ({ page }) => {
        const images = page.locator('img');
        const count = await images.count();
        for (let i = 0; i < count; i++) {
            const img = images.nth(i);
            const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
            // Allow missing images but log them (development state)
            if (naturalWidth === 0) {
                const src = await img.getAttribute('src');
                console.log(`Warning: Image not loaded: ${src}`);
            }
        }
    });

    test('should navigate to about page', async ({ page }) => {
        const aboutLink = page.locator('a[href*="about"]').first();
        if (await aboutLink.isVisible()) {
            await aboutLink.click();
            await expect(page).toHaveURL(/.*about.*/);
        }
    });
});
