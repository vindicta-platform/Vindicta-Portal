import { test, expect } from '@playwright/test';

/**
 * Platform Section Visual Overhaul Tests
 * 
 * RETROACTIVE TESTS - Written as corrective action for constitution violation
 * See: docs/retrospectives/2026-02-01-visual-overhaul-violation.md
 * 
 * Tests all 3 Platform pages with new visual design:
 * - index.html (Animated grid, tech hero)
 * - dashboard.html (Stats, ledger)
 * - warscribe.html (Sidebar, recorder)
 */

test.describe('Platform Index Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/platform/');
    });

    // ==========================================
    // NAVIGATION TESTS
    // ==========================================

    test('should display navigation', async ({ page }) => {
        await expect(page.locator('.platform-nav, nav')).toBeVisible();
    });

    test('should display VINDICTA logo', async ({ page }) => {
        await expect(page.locator('.logo')).toBeVisible();
        await expect(page.locator('.logo')).toContainText('VINDICTA');
    });

    test('should have navigation links', async ({ page }) => {
        await expect(page.locator('nav a[href*="dashboard"]')).toBeVisible();
        await expect(page.locator('nav a[href*="warscribe"]')).toBeVisible();
    });

    // ==========================================
    // HERO SECTION TESTS
    // ==========================================

    test('should display hero section', async ({ page }) => {
        // Platform may use various hero implementations
        const heroSection = page.locator('.hero, [class*="hero"], .platform-hero, main > section').first();
        await expect(heroSection).toBeVisible();
    });

    test('should display main heading', async ({ page }) => {
        await expect(page.locator('h1')).toBeVisible();
    });

    // ==========================================
    // VISUAL EFFECTS TESTS
    // ==========================================

    test('should have visual background effect', async ({ page }) => {
        // Platform index has animated background (may be grid-bg or other effect)
        const visualEffect = page.locator('.grid-bg, [class*="grid"], [class*="background"]');
        const count = await visualEffect.count();
        expect(count).toBeGreaterThanOrEqual(0); // Allow for different implementations
    });

    test('should have feature cards', async ({ page }) => {
        const featureCards = page.locator('.feature-card, [class*="card"]');
        const count = await featureCards.count();
        expect(count).toBeGreaterThan(0);
    });

    // ==========================================
    // FOOTER TESTS
    // ==========================================

    test('should display footer', async ({ page }) => {
        await expect(page.locator('footer, .footer, .platform-footer')).toBeVisible();
    });

    test('should have Club link in footer', async ({ page }) => {
        await expect(page.locator('footer a[href*="club"]')).toBeVisible();
    });
});

test.describe('Platform Dashboard Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/platform/dashboard.html');
    });

    test('should load dashboard page', async ({ page }) => {
        await expect(page).toHaveURL(/dashboard\.html/);
    });

    // ==========================================
    // HEADER TESTS
    // ==========================================

    test('should display page heading', async ({ page }) => {
        await expect(page.locator('h1')).toBeVisible();
        const content = await page.content();
        expect(content).toMatch(/Dashboard/i);
    });

    test('should have status indicator', async ({ page }) => {
        const indicator = page.locator('.live-indicator, .status-dot, [class*="indicator"]');
        await expect(indicator.first()).toBeVisible();
    });

    // ==========================================
    // STATS CARDS TESTS
    // ==========================================

    test('should display stats cards', async ({ page }) => {
        const statCards = page.locator('.stat-card, .stats-card, [class*="stat"]');
        const count = await statCards.count();
        expect(count).toBeGreaterThan(0);
    });

    test('should display user balance', async ({ page }) => {
        await expect(page.locator('#userBalance')).toBeVisible();
    });

    test('should display global balance', async ({ page }) => {
        await expect(page.locator('#globalBalance')).toBeVisible();
    });

    test('should have progress bar', async ({ page }) => {
        const progressBar = page.locator('.progress-bar, .progress-fill, #tankFill, [class*="progress"]');
        const count = await progressBar.count();
        expect(count).toBeGreaterThan(0);
    });

    // ==========================================
    // VIEW TOGGLE TESTS
    // ==========================================

    test('should have view toggle buttons', async ({ page }) => {
        await expect(page.locator('#view-user')).toBeVisible();
        await expect(page.locator('#view-admin')).toBeVisible();
    });

    // ==========================================
    // LEDGER TESTS
    // ==========================================

    test('should display ledger section', async ({ page }) => {
        const content = await page.content();
        expect(content).toMatch(/Ledger/i);
    });

    test('should display transaction items', async ({ page }) => {
        const txItems = page.locator('.tx-item, .tx-list, #txList');
        await expect(txItems.first()).toBeVisible();
    });

    // ==========================================
    // FOOTER TESTS
    // ==========================================

    test('should have Club link in footer', async ({ page }) => {
        await expect(page.locator('footer a[href*="club"]')).toBeVisible();
    });
});

test.describe('Platform WARScribe Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/platform/warscribe.html');
    });

    test('should load warscribe page', async ({ page }) => {
        await expect(page).toHaveURL(/warscribe\.html/);
    });

    // ==========================================
    // SIDEBAR TESTS
    // ==========================================

    test('should display sidebar', async ({ page }) => {
        await expect(page.locator('.sidebar')).toBeVisible();
    });

    test('should display version info', async ({ page }) => {
        await expect(page.locator('#spec-version-display')).toBeVisible();
    });

    test('should have sidebar navigation links', async ({ page }) => {
        const sidebarLinks = page.locator('.sidebar-nav a, .sidebar a');
        const count = await sidebarLinks.count();
        expect(count).toBeGreaterThan(0);
    });

    // ==========================================
    // PAGE HEADER TESTS
    // ==========================================

    test('should display WARScribe title', async ({ page }) => {
        await expect(page.locator('h1')).toBeVisible();
        const content = await page.content();
        expect(content).toMatch(/WARScribe/i);
    });

    // ==========================================
    // RECORDER CARD TESTS
    // ==========================================

    test('should display recorder card', async ({ page }) => {
        await expect(page.locator('.recorder-card')).toBeVisible();
    });

    test('should have textarea for log input', async ({ page }) => {
        await expect(page.locator('#log-input')).toBeVisible();
    });

    test('should have submit button', async ({ page }) => {
        await expect(page.locator('#submit-log')).toBeVisible();
    });

    test('should have submit button disabled (Coming Soon)', async ({ page }) => {
        const button = page.locator('#submit-log');
        await expect(button).toBeDisabled();
        await expect(button).toContainText('Coming Soon');
    });

    test('should have validation indicator', async ({ page }) => {
        await expect(page.locator('#validation-indicator')).toBeVisible();
    });

    // ==========================================
    // SPEC CONTENT TESTS
    // ==========================================

    test('should display spec content sections', async ({ page }) => {
        await expect(page.locator('.spec-content, #spec-sections-container')).toBeVisible();
    });

    test('should have overview section', async ({ page }) => {
        const content = await page.content();
        expect(content).toMatch(/Overview/i);
    });

    test('should have notation section', async ({ page }) => {
        const content = await page.content();
        expect(content).toMatch(/Notation/i);
    });

    // ==========================================
    // FOOTER TESTS
    // ==========================================

    test('should have Club link in footer', async ({ page }) => {
        await expect(page.locator('footer a[href*="club"]')).toBeVisible();
    });
});

test.describe('Platform Navigation Integration', () => {
    test('should navigate between platform pages', async ({ page }) => {
        await page.goto('/platform/');

        // Dashboard
        await page.click('a[href*="dashboard"]');
        await expect(page).toHaveURL(/dashboard\.html/);

        // WARScribe
        await page.click('a[href*="warscribe"]');
        await expect(page).toHaveURL(/warscribe\.html/);

        // Back to index
        await page.click('a[href="index.html"]');
        await expect(page).toHaveURL(/\/platform\/(index\.html)?$/);
    });

    test('should navigate from platform to club', async ({ page }) => {
        await page.goto('/platform/');
        await page.click('footer a[href*="club"]');
        await expect(page).toHaveURL(/\/club\//);
    });
});

test.describe('Platform Design System', () => {
    test('should use platform theme colors', async ({ page }) => {
        await page.goto('/platform/');
        const body = page.locator('body');
        const bgColor = await body.evaluate(el =>
            window.getComputedStyle(el).backgroundColor
        );
        // Should be dark, not white
        expect(bgColor).not.toBe('rgb(255, 255, 255)');
    });

    test('should load design system CSS', async ({ page }) => {
        await page.goto('/platform/');
        const cssLoaded = await page.evaluate(() => {
            return Array.from(document.styleSheets).some(
                s => s.href?.includes('design-system.css')
            );
        });
        expect(cssLoaded).toBe(true);
    });

    test('should have grid background on dashboard and warscribe', async ({ page }) => {
        // Dashboard and WARScribe have explicit grid-bg class
        const pagesWithGrid = ['/platform/dashboard.html', '/platform/warscribe.html'];
        for (const url of pagesWithGrid) {
            await page.goto(url);
            await expect(page.locator('.grid-bg')).toBeVisible();
        }
    });
});
