import { test, expect } from '@playwright/test';

/**
 * Cross-Section Navigation Tests
 * Persona: Developer/Maintainer
 * Tests navigation paths between all major sections
 */

test.describe('Navigation Paths', () => {
    test('should navigate: Landing → Club → Back to Landing', async ({ page }) => {
        await page.goto('/');
        await page.click('text=THE CLUB');
        await expect(page).toHaveURL(/.*\/club.*/);

        // Find home/back link
        const homeLink = page.locator('a[href="/"], a[href="../"]').first();
        if (await homeLink.isVisible()) {
            await homeLink.click();
            await expect(page).toHaveURL(/^https:\/\/vindicta-warhammer\.web\.app\/?$/);
        }
    });

    test('should navigate: Landing → Platform → Dashboard', async ({ page }) => {
        await page.goto('/');
        await page.click('text=THE APP');
        await expect(page).toHaveURL(/.*\/platform.*/);

        const dashLink = page.locator('a[href*="dashboard"]').first();
        if (await dashLink.isVisible()) {
            await dashLink.click();
            await expect(page).toHaveURL(/.*dashboard.*/);
        }
    });

    test('should navigate: Platform → WARScribe', async ({ page }) => {
        await page.goto('/platform/');
        const wsLink = page.locator('a[href*="warscribe"]').first();
        if (await wsLink.isVisible()) {
            await wsLink.click();
            await expect(page).toHaveURL(/.*warscribe.*/);
        }
    });

    test('all pages should return 200 status', async ({ request }) => {
        const pages = [
            '/',
            '/club/',
            '/club/about.html',
            '/club/team.html',
            '/platform/',
            '/platform/dashboard.html',
            '/platform/warscribe.html',
        ];

        for (const path of pages) {
            const response = await request.get(path);
            expect(response.status(), `Page ${path} should return 200`).toBe(200);
        }
    });
});
