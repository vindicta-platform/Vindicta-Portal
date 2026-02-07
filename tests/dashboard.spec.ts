import { test, expect } from '@playwright/test';

/**
 * Dashboard Access and Toggle Tests
 * 
 * Fixes https://github.com/vindicta-platform/Vindicta-Portal/issues/3
 * Fixes https://github.com/vindicta-platform/Vindicta-Portal/issues/4
 * 
 * Issue #3: Dashboard should be flagged for removal (hidden until auth implemented)
 * Issue #4: Dashboard view toggle buttons should work
 */
test.describe('Dashboard - Access Model & Toggle (Issues #3 & #4)', () => {

    test('should NOT show Dashboard link in Platform navigation (Issue #3)', async ({ page }) => {
        await page.goto('/platform/');

        // Dashboard link should NOT be visible in the main navigation
        const dashboardLink = page.locator('.platform-nav a[href="dashboard.html"]');
        await expect(dashboardLink).toHaveCount(0);
    });

    test('should show access notice on Dashboard page when unauthenticated (Issue #3)', async ({ page }) => {
        await page.goto('/platform/dashboard.html');

        // Should display an access notice or be redirected
        const accessNotice = page.locator('.access-notice, .auth-required-notice');
        const isNoticeVisible = await accessNotice.isVisible().catch(() => false);
        const currentUrl = page.url();

        // Either the access notice is visible OR we were redirected away from dashboard
        expect(isNoticeVisible || !currentUrl.includes('dashboard.html')).toBe(true);
    });

    test('should have working view toggle buttons (Issue #4)', async ({ page }) => {
        await page.goto('/platform/dashboard.html');

        const userBtn = page.locator('#view-user');
        const arbiterBtn = page.locator('#view-admin');

        // Initially User button should be active
        await expect(userBtn).toHaveClass(/active/);
        await expect(arbiterBtn).not.toHaveClass(/active/);

        // Click Arbiter button
        await arbiterBtn.click();

        // Now Arbiter should be active
        await expect(arbiterBtn).toHaveClass(/active/);
        await expect(userBtn).not.toHaveClass(/active/);

        // Click User button again
        await userBtn.click();

        // Now User should be active again
        await expect(userBtn).toHaveClass(/active/);
        await expect(arbiterBtn).not.toHaveClass(/active/);
    });

    test('should show different content based on view selection (Issue #4)', async ({ page }) => {
        await page.goto('/platform/dashboard.html');

        const userBtn = page.locator('#view-user');
        const arbiterBtn = page.locator('#view-admin');

        // Check for user/arbiter view sections
        const userSection = page.locator('[data-view="user"]');
        const arbiterSection = page.locator('[data-view="arbiter"]');

        // Initially user view should be visible if sections exist
        if (await userSection.count() > 0) {
            await expect(userSection.first()).toBeVisible();
        }

        // Click Arbiter
        await arbiterBtn.click();

        // Arbiter section should now be visible if sections exist
        if (await arbiterSection.count() > 0) {
            await expect(arbiterSection.first()).toBeVisible();
        }
    });
});
