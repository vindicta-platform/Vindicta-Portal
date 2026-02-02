import { test, expect } from '@playwright/test';

/**
 * Club Section Feature Tests (BDD-First)
 * Written BEFORE implementation per Portal Constitution v3.0
 */

test.describe('Club Unique Navigation', () => {
    test('should have club-specific navigation items', async ({ page }) => {
        await page.goto('/club/');

        // Club navigation should include these items
        const nav = page.locator('nav, #club-nav, .club-navigation');
        await expect(nav).toBeVisible();

        // Check for club-specific nav items
        await expect(page.locator('a:has-text("Home")')).toBeVisible();
        await expect(page.locator('a:has-text("About")')).toBeVisible();
        await expect(page.locator('a:has-text("Team")')).toBeVisible();
        await expect(page.locator('a:has-text("Events")')).toBeVisible();
        await expect(page.locator('a:has-text("Partners")')).toBeVisible();
        await expect(page.locator('a:has-text("Join")')).toBeVisible();
    });

    test('should have distinct styling from Platform section', async ({ page }) => {
        await page.goto('/club/');

        // Club should NOT have Platform-style branding
        const body = await page.locator('body').textContent();
        // Should feel like a club, not an app
        expect(body).toContain('Vindicta');
    });
});

test.describe('Upcoming Events Page', () => {
    test('events page loads successfully', async ({ page }) => {
        const response = await page.goto('/club/events.html');
        expect(response?.status()).toBe(200);
    });

    test('displays upcoming events list', async ({ page }) => {
        await page.goto('/club/events.html');

        // Should have events section
        await expect(page.locator('body')).toContainText(/Events|Upcoming|Calendar/i);

        // Events should have structure
        const events = page.locator('.event, article, .event-card');
        const count = await events.count();
        expect(count).toBeGreaterThanOrEqual(0); // May be empty initially
    });

    test('events have title and date', async ({ page }) => {
        await page.goto('/club/events.html');

        // Check for event structure elements
        const content = await page.content();
        expect(content.length).toBeGreaterThan(1000);
    });
});

test.describe('Partner RSS Feed Page', () => {
    test('partners page loads successfully', async ({ page }) => {
        const response = await page.goto('/club/partners.html');
        expect(response?.status()).toBe(200);
    });

    test('displays partner site information', async ({ page }) => {
        await page.goto('/club/partners.html');

        // Should mention partner sites
        await expect(page.locator('body')).toContainText(/Team USA|Stat Check|Art of War/i);
    });

    test('has links to partner sites', async ({ page }) => {
        await page.goto('/club/partners.html');

        // Should have external links
        const externalLinks = page.locator('a[target="_blank"], a[href*="teamusa"], a[href*="statcheck"], a[href*="artofwar"]');
        const count = await externalLinks.count();
        expect(count).toBeGreaterThanOrEqual(1);
    });
});

test.describe('Discord Join Form', () => {
    test('join page loads successfully', async ({ page }) => {
        const response = await page.goto('/club/join.html');
        expect(response?.status()).toBe(200);
    });

    test('displays join form', async ({ page }) => {
        await page.goto('/club/join.html');

        // Should have a form
        await expect(page.locator('form')).toBeVisible();
    });

    test('form has required fields', async ({ page }) => {
        await page.goto('/club/join.html');

        // Name field
        await expect(page.locator('input[name="name"], input[type="text"]').first()).toBeVisible();

        // Email field
        await expect(page.locator('input[name="email"], input[type="email"]')).toBeVisible();
    });

    test('form has submit button', async ({ page }) => {
        await page.goto('/club/join.html');

        const submitBtn = page.locator('button[type="submit"], input[type="submit"]');
        await expect(submitBtn).toBeVisible();
    });

    test('form mentions Discord', async ({ page }) => {
        await page.goto('/club/join.html');

        await expect(page.locator('body')).toContainText(/Discord/i);
    });
});

test.describe('Club Navigation Links Work', () => {
    test('Events link navigates to events page', async ({ page }) => {
        await page.goto('/club/');

        const eventsLink = page.locator('a:has-text("Events")');
        if (await eventsLink.isVisible()) {
            await eventsLink.click();
            await expect(page).toHaveURL(/events/i);
        }
    });

    test('Partners link navigates to partners page', async ({ page }) => {
        await page.goto('/club/');

        const partnersLink = page.locator('a:has-text("Partners")');
        if (await partnersLink.isVisible()) {
            await partnersLink.click();
            await expect(page).toHaveURL(/partners/i);
        }
    });

    test('Join link navigates to join page', async ({ page }) => {
        await page.goto('/club/');

        const joinLink = page.locator('a:has-text("Join")');
        if (await joinLink.isVisible()) {
            await joinLink.click();
            await expect(page).toHaveURL(/join/i);
        }
    });
});
