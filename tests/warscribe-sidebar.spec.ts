import { test, expect } from '@playwright/test';

/**
 * WARScribe Sidebar Active Indicator Tests
 * 
 * Fixes https://github.com/vindicta-platform/Vindicta-Portal/issues/5
 * 
 * Issue #5: Sidebar active indicator does not update when scrolling or clicking
 */
test.describe('WARScribe Sidebar Active Indicator (Issue #5)', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/platform/warscribe.html');
    });

    test('should have active indicator on Overview by default', async ({ page }) => {
        const overviewLink = page.locator('.sidebar-nav a[href="#overview"]');
        await expect(overviewLink).toHaveClass(/active/);
    });

    test('should update active indicator when clicking Notation Standard link', async ({ page }) => {
        const notationLink = page.locator('.sidebar-nav a[href="#notation"]');
        await notationLink.click();

        // Notation should now be active
        await expect(notationLink).toHaveClass(/active/);

        // Overview should no longer be active
        const overviewLink = page.locator('.sidebar-nav a[href="#overview"]');
        await expect(overviewLink).not.toHaveClass(/active/);
    });

    test('should update active indicator when clicking Move Format link', async ({ page }) => {
        const moveFormatLink = page.locator('.sidebar-nav a[href="#move-format"]');
        await moveFormatLink.click();

        await expect(moveFormatLink).toHaveClass(/active/);
    });

    test('should update active indicator when clicking Validators link', async ({ page }) => {
        const validatorsLink = page.locator('.sidebar-nav a[href="#validators"]');
        await validatorsLink.click();

        await expect(validatorsLink).toHaveClass(/active/);
    });

    test('should update active indicator when clicking Examples link', async ({ page }) => {
        const examplesLink = page.locator('.sidebar-nav a[href="#examples"]');
        await examplesLink.click();

        await expect(examplesLink).toHaveClass(/active/);
    });

    test('should update active indicator when scrolling to different sections', async ({ page }) => {
        // Scroll to Validators section using JS for reliability in headless mode
        await page.evaluate(() => {
            document.querySelector('#validators')?.scrollIntoView({ behavior: 'instant', block: 'start' });
        });

        // Wait for IntersectionObserver to update (needs more time in headless)
        await page.waitForTimeout(500);

        const validatorsLink = page.locator('.sidebar-nav a[href="#validators"]');
        await expect(validatorsLink).toHaveClass(/active/);
    });
});
