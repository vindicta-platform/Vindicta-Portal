import { test, expect } from '@playwright/test';

/**
 * Landing Page Visual Overhaul Tests
 * 
 * RETROACTIVE TESTS - Written as corrective action for constitution violation
 * See: docs/retrospectives/2026-02-01-visual-overhaul-violation.md
 * 
 * Tests the enhanced landing page with:
 * - Particle effects
 * - Split-pane layout
 * - Animated elements
 * - Navigation to Club and Platform
 */

test.describe('Landing Page - Visual Overhaul', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    // ==========================================
    // STRUCTURE TESTS
    // ==========================================

    test('should display VINDICTA branding in header', async ({ page }) => {
        await expect(page.locator('.logo')).toBeVisible();
        await expect(page.locator('.logo')).toContainText('VINDICTA');
    });

    test('should have logo icon element', async ({ page }) => {
        await expect(page.locator('.logo-icon')).toBeVisible();
    });

    test('should display tagline', async ({ page }) => {
        await expect(page.locator('.tagline')).toBeVisible();
        await expect(page.locator('.tagline')).toContainText('Long Island');
    });

    // ==========================================
    // SPLIT-PANE LAYOUT TESTS
    // ==========================================

    test('should display Club pane with correct content', async ({ page }) => {
        const clubPane = page.locator('.pane-club');
        await expect(clubPane).toBeVisible();
        await expect(clubPane).toContainText('CLUB');
        await expect(clubPane).toContainText('Brotherhood');
    });

    test('should display Platform pane with correct content', async ({ page }) => {
        const platformPane = page.locator('.pane-platform');
        await expect(platformPane).toBeVisible();
        await expect(platformPane).toContainText('PLATFORM');
        await expect(platformPane).toContainText('Intelligence');
    });

    test('should have pane icons', async ({ page }) => {
        const clubIcon = page.locator('.pane-club .pane-icon');
        const platformIcon = page.locator('.pane-platform .pane-icon');
        await expect(clubIcon).toBeVisible();
        await expect(platformIcon).toBeVisible();
    });

    test('should have action buttons on both panes', async ({ page }) => {
        await expect(page.locator('.pane-club .pane-btn')).toBeVisible();
        await expect(page.locator('.pane-platform .pane-btn')).toBeVisible();
    });

    // ==========================================
    // VISUAL EFFECTS TESTS
    // ==========================================

    test('should have particle elements', async ({ page }) => {
        const particles = page.locator('.particle');
        const count = await particles.count();
        expect(count).toBeGreaterThan(5);
    });

    test('should have grid overlay', async ({ page }) => {
        await expect(page.locator('.grid-overlay')).toBeVisible();
    });

    test('should have glow effects', async ({ page }) => {
        await expect(page.locator('.glow-left')).toBeVisible();
        await expect(page.locator('.glow-right')).toBeVisible();
    });

    test('should have scanline element', async ({ page }) => {
        await expect(page.locator('.scanline')).toBeVisible();
    });

    test('should have center divider', async ({ page }) => {
        await expect(page.locator('.center-divider')).toBeVisible();
    });

    test('should have vignette effect', async ({ page }) => {
        await expect(page.locator('.vignette')).toBeVisible();
    });

    // ==========================================
    // NAVIGATION TESTS
    // ==========================================

    test('should navigate to Club on pane click', async ({ page }) => {
        await page.locator('.pane-club').click();
        await expect(page).toHaveURL(/\/club\//);
    });

    test('should navigate to Platform on pane click', async ({ page }) => {
        await page.locator('.pane-platform').click();
        await expect(page).toHaveURL(/\/platform\//);
    });

    // ==========================================
    // FOOTER TESTS
    // ==========================================

    test('should display footer with status indicator', async ({ page }) => {
        await expect(page.locator('.portal-footer')).toBeVisible();
        await expect(page.locator('.status-dot')).toBeVisible();
    });

    test('should display footer text', async ({ page }) => {
        await expect(page.locator('.portal-footer')).toContainText('Portal Active');
    });

    // ==========================================
    // DESIGN SYSTEM TESTS
    // ==========================================

    test('should load design system CSS', async ({ page }) => {
        const cssLoaded = await page.evaluate(() => {
            return Array.from(document.styleSheets).some(
                s => s.href?.includes('design-system.css')
            );
        });
        expect(cssLoaded).toBe(true);
    });

    test('should use correct fonts', async ({ page }) => {
        const fontFamily = await page.locator('body').evaluate(el =>
            window.getComputedStyle(el).fontFamily
        );
        expect(fontFamily.toLowerCase()).toMatch(/outfit/);
    });

    // ==========================================
    // RESPONSIVE TESTS
    // ==========================================

    test('should stack panes on mobile', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });
        const container = page.locator('.portal-container');
        const flexDirection = await container.evaluate(el =>
            window.getComputedStyle(el).flexDirection
        );
        expect(flexDirection).toBe('column');
    });
});
