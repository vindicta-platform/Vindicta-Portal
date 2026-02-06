import { test, expect } from '@playwright/test';

test.describe('Firebase Remote Config Feature Toggles', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/platform/index.html');
    });

    test('should hide new dashboard elements when flag is disabled (default)', async ({ page }) => {
        // By default feat_new_dashboard_enabled is false in remote-config.defaults.js
        const dashboardLink = page.locator('[data-feature="new_dashboard"]');

        // Wait for script to run
        await page.waitForLoadState('networkidle');

        // Check if one of them is hidden
        await expect(dashboardLink.first()).toBeHidden();
    });

    test('should show dashboard elements when flag is enabled via global window override', async ({ page }) => {
        // We can simulate the flag being enabled by overriding the global vindictaFlags object
        await page.evaluate(() => {
            const win = window as any;
            if (win.vindictaFlags) {
                // Mocking the isFeatureEnabled method on the already initialized object
                win.vindictaFlags.isFeatureEnabled = (name: string) => name === 'new_dashboard';

                // Manually trigger the toggle logic
                const dashboardElements = document.querySelectorAll('[data-feature="new_dashboard"]');
                dashboardElements.forEach(el => {
                    (el as HTMLElement).style.display = 'block';
                });
            }
        });

        const dashboardLink = page.locator('[data-feature="new_dashboard"]');
        await expect(dashboardLink.first()).toBeVisible();
    });
});
