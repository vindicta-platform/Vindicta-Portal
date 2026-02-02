import { test, expect } from '@playwright/test';

/**
 * Club Section Visual Overhaul Tests
 * 
 * RETROACTIVE TESTS - Written as corrective action for constitution violation
 * See: docs/retrospectives/2026-02-01-visual-overhaul-violation.md
 * 
 * Tests all 6 Club pages with new visual design:
 * - index.html (Homepage with parallax hero)
 * - about.html (Origins, mission, timeline)
 * - team.html (Prime Council members)
 * - events.html (Event cards, badges)
 * - partners.html (Partner showcase)
 * - join.html (Styled form)
 */

test.describe('Club Index Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/club/');
    });

    // ==========================================
    // NAVIGATION TESTS
    // ==========================================

    test('should display fixed navigation', async ({ page }) => {
        await expect(page.locator('.club-nav')).toBeVisible();
    });

    test('should display VINDICTA logo', async ({ page }) => {
        await expect(page.locator('.club-nav .logo')).toBeVisible();
        await expect(page.locator('.club-nav .logo')).toContainText('VINDICTA');
    });

    test('should have navigation links', async ({ page }) => {
        await expect(page.locator('.club-nav a:has-text("Home")')).toBeVisible();
        await expect(page.locator('.club-nav a:has-text("About")')).toBeVisible();
        await expect(page.locator('.club-nav a:has-text("Team")')).toBeVisible();
        await expect(page.locator('.club-nav a:has-text("Events")')).toBeVisible();
    });

    // ==========================================
    // HERO SECTION TESTS
    // ==========================================

    test('should display hero section', async ({ page }) => {
        await expect(page.locator('.hero')).toBeVisible();
    });

    test('should display main heading', async ({ page }) => {
        await expect(page.locator('.hero h1')).toBeVisible();
    });

    test('should display hero description', async ({ page }) => {
        await expect(page.locator('.hero p').first()).toBeVisible();
    });

    // ==========================================
    // FEATURE CARDS TESTS
    // ==========================================

    test('should display feature cards', async ({ page }) => {
        const featureCards = page.locator('.feature-card');
        const count = await featureCards.count();
        expect(count).toBeGreaterThan(0);
    });

    // ==========================================
    // FOOTER TESTS
    // ==========================================

    test('should display footer', async ({ page }) => {
        await expect(page.locator('.footer')).toBeVisible();
    });

    test('should have Platform link in footer', async ({ page }) => {
        await expect(page.locator('.footer a[href*="platform"]')).toBeVisible();
    });
});

test.describe('Club About Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/club/about.html');
    });

    test('should load about page', async ({ page }) => {
        await expect(page).toHaveURL(/about\.html/);
    });

    test('should display page title', async ({ page }) => {
        await expect(page.locator('h1')).toBeVisible();
    });

    test('should display origins section', async ({ page }) => {
        // Check for origins content
        const content = await page.content();
        expect(content.toLowerCase()).toMatch(/origin|history|story/);
    });

    test('should have consistent navigation', async ({ page }) => {
        await expect(page.locator('.club-nav')).toBeVisible();
    });

    test('should have Platform link in footer', async ({ page }) => {
        await expect(page.locator('.footer a[href*="platform"]')).toBeVisible();
    });
});

test.describe('Club Team Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/club/team.html');
    });

    test('should load team page', async ({ page }) => {
        await expect(page).toHaveURL(/team\.html/);
    });

    test('should display Prime Council section', async ({ page }) => {
        const content = await page.content();
        expect(content).toMatch(/Prime Council|Leadership/i);
    });

    test('should display Brandon Fox', async ({ page }) => {
        await expect(page.locator('text=Brandon Fox')).toBeVisible();
    });

    test('should display Anthony Vanella', async ({ page }) => {
        await expect(page.locator('text=Anthony Vanella')).toBeVisible();
    });

    test('should display Supreme Architect role', async ({ page }) => {
        await expect(page.locator('text=Supreme Architect')).toBeVisible();
    });

    test('should display War Marshal role', async ({ page }) => {
        await expect(page.locator('text=War Marshal')).toBeVisible();
    });

    test('should have member cards', async ({ page }) => {
        const memberCards = page.locator('.member-card, .council-card, [class*="card"]');
        const count = await memberCards.count();
        expect(count).toBeGreaterThan(0);
    });

    test('should have Platform link in footer', async ({ page }) => {
        await expect(page.locator('.footer a[href*="platform"]')).toBeVisible();
    });
});

test.describe('Club Events Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/club/events.html');
    });

    test('should load events page', async ({ page }) => {
        await expect(page).toHaveURL(/events\.html/);
    });

    test('should display page heading', async ({ page }) => {
        await expect(page.locator('h1')).toBeVisible();
    });

    test('should display event cards', async ({ page }) => {
        const eventCards = page.locator('.event-card, [class*="event"]');
        const count = await eventCards.count();
        expect(count).toBeGreaterThan(0);
    });

    test('should have event type badges', async ({ page }) => {
        const badges = page.locator('.event-type, .badge, [class*="badge"]');
        const count = await badges.count();
        expect(count).toBeGreaterThan(0);
    });

    test('should have Platform link in footer', async ({ page }) => {
        await expect(page.locator('.footer a[href*="platform"]')).toBeVisible();
    });
});

test.describe('Club Partners Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/club/partners.html');
    });

    test('should load partners page', async ({ page }) => {
        await expect(page).toHaveURL(/partners\.html/);
    });

    test('should display partner cards', async ({ page }) => {
        const partnerCards = page.locator('.partner-card, [class*="partner"]');
        const count = await partnerCards.count();
        expect(count).toBeGreaterThan(0);
    });

    test('should display Team USA Warhammer', async ({ page }) => {
        const content = await page.content();
        expect(content).toMatch(/Team USA|USA Warhammer/i);
    });

    test('should display Stat Check', async ({ page }) => {
        const content = await page.content();
        expect(content).toMatch(/Stat ?Check/i);
    });

    test('should have external partner links', async ({ page }) => {
        const externalLinks = page.locator('a[href^="http"]');
        const count = await externalLinks.count();
        expect(count).toBeGreaterThan(0);
    });

    test('should have Platform link in footer', async ({ page }) => {
        await expect(page.locator('.footer a[href*="platform"]')).toBeVisible();
    });
});

test.describe('Club Join Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/club/join.html');
    });

    test('should load join page', async ({ page }) => {
        await expect(page).toHaveURL(/join\.html/);
    });

    test('should display page heading', async ({ page }) => {
        await expect(page.locator('h1')).toBeVisible();
    });

    test('should display benefits list', async ({ page }) => {
        await expect(page.locator('.benefits-list, ul').first()).toBeVisible();
    });

    test('should display form section', async ({ page }) => {
        await expect(page.locator('form')).toBeVisible();
    });

    test('should have name field', async ({ page }) => {
        await expect(page.locator('#name')).toBeVisible();
    });

    test('should have email field', async ({ page }) => {
        await expect(page.locator('#email')).toBeVisible();
    });

    test('should have faction dropdown', async ({ page }) => {
        await expect(page.locator('#faction')).toBeVisible();
    });

    test('should have experience dropdown', async ({ page }) => {
        await expect(page.locator('#experience')).toBeVisible();
    });

    test('should have styled dropdowns (dark theme)', async ({ page }) => {
        const select = page.locator('#faction');
        const bgColor = await select.evaluate(el =>
            window.getComputedStyle(el).backgroundColor
        );
        // Should not be white (browser default)
        expect(bgColor).not.toBe('rgb(255, 255, 255)');
    });

    test('should have submit button', async ({ page }) => {
        await expect(page.locator('.submit-btn, button[type="submit"]')).toBeVisible();
    });

    test('should display Discord info', async ({ page }) => {
        const content = await page.content();
        expect(content.toLowerCase()).toMatch(/discord/);
    });

    test('should have Platform link in footer', async ({ page }) => {
        await expect(page.locator('.footer a[href*="platform"]')).toBeVisible();
    });
});

test.describe('Club Navigation Integration', () => {
    test('should navigate from index to all pages', async ({ page }) => {
        await page.goto('/club/');

        // About
        await page.click('a[href="about.html"]');
        await expect(page).toHaveURL(/about\.html/);

        // Team
        await page.click('a[href="team.html"]');
        await expect(page).toHaveURL(/team\.html/);

        // Events
        await page.click('a[href="events.html"]');
        await expect(page).toHaveURL(/events\.html/);

        // Partners
        await page.click('a[href="partners.html"]');
        await expect(page).toHaveURL(/partners\.html/);

        // Join
        await page.click('a[href="join.html"]');
        await expect(page).toHaveURL(/join\.html/);

        // Back to index
        await page.click('a[href="index.html"]');
        await expect(page).toHaveURL(/\/club\/(index\.html)?$/);
    });
});

test.describe('Club Design System', () => {
    test('should use club theme colors', async ({ page }) => {
        await page.goto('/club/');
        const body = page.locator('body');
        const bgColor = await body.evaluate(el =>
            window.getComputedStyle(el).backgroundColor
        );
        // Should be dark blue/purple, not white
        expect(bgColor).not.toBe('rgb(255, 255, 255)');
    });

    test('should load design system CSS', async ({ page }) => {
        await page.goto('/club/');
        const cssLoaded = await page.evaluate(() => {
            return Array.from(document.styleSheets).some(
                s => s.href?.includes('design-system.css')
            );
        });
        expect(cssLoaded).toBe(true);
    });
});
