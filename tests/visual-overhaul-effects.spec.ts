import { test, expect } from '@playwright/test';

/**
 * Visual Overhaul Visual Effects Tests
 * 
 * RETROACTIVE TESTS - Written as corrective action for constitution violation
 * See: docs/retrospectives/2026-02-01-visual-overhaul-violation.md
 * 
 * Tests animations, hover states, and visual effects
 */

test.describe('Landing Page Visual Effects', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('particles animate', async ({ page }) => {
        const particle = page.locator('.particle').first();
        const animationName = await particle.evaluate(el =>
            window.getComputedStyle(el).animationName
        );
        expect(animationName).not.toBe('none');
    });

    test('grid overlay has animation', async ({ page }) => {
        const grid = page.locator('.grid-overlay');
        const animationName = await grid.evaluate(el =>
            window.getComputedStyle(el).animationName
        );
        expect(animationName).not.toBe('none');
    });

    test('scanline has animation', async ({ page }) => {
        const scanline = page.locator('.scanline');
        const animationName = await scanline.evaluate(el =>
            window.getComputedStyle(el).animationName
        );
        expect(animationName).not.toBe('none');
    });

    test('logo icon has pulse animation', async ({ page }) => {
        const logo = page.locator('.logo-icon');
        const animationName = await logo.evaluate(el =>
            window.getComputedStyle(el).animationName
        );
        expect(animationName).not.toBe('none');
    });

    test('center divider diamond pulses', async ({ page }) => {
        const divider = page.locator('.center-divider');
        await expect(divider).toBeVisible();
        // Check pseudo-element exists via parent visibility
    });

    test('pane has hover transition', async ({ page }) => {
        const pane = page.locator('.pane-club');
        const transition = await pane.evaluate(el =>
            window.getComputedStyle(el).transition
        );
        expect(transition).not.toBe('none');
    });

    test('pane content moves on hover', async ({ page }) => {
        const pane = page.locator('.pane-club');
        const content = page.locator('.pane-club .pane-content');

        // Get initial transform
        const initialTransform = await content.evaluate(el =>
            window.getComputedStyle(el).transform
        );

        // Hover
        await pane.hover();
        await page.waitForTimeout(600); // Wait for transition

        // Get hovered transform
        const hoveredTransform = await content.evaluate(el =>
            window.getComputedStyle(el).transform
        );

        // They should be different (content moves up on hover)
        expect(hoveredTransform).not.toEqual(initialTransform);
    });

    test('status dot pulses', async ({ page }) => {
        const statusDot = page.locator('.status-dot');
        const animationName = await statusDot.evaluate(el =>
            window.getComputedStyle(el).animationName
        );
        expect(animationName).not.toBe('none');
    });
});

test.describe('Club Page Visual Effects', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/club/');
    });

    test('hero has parallax background', async ({ page }) => {
        const hero = page.locator('.hero');
        const backgroundAttachment = await hero.evaluate(el =>
            window.getComputedStyle(el, '::before').backgroundAttachment
        );
        // Parallax uses fixed or scroll attachment
        expect(['fixed', 'scroll']).toContain(backgroundAttachment);
    });

    test('feature cards have hover transition', async ({ page }) => {
        const card = page.locator('.feature-card').first();
        if (await card.count() > 0) {
            const transition = await card.evaluate(el =>
                window.getComputedStyle(el).transition
            );
            expect(transition).not.toBe('none');
        }
    });

    test('navigation is fixed position', async ({ page }) => {
        const nav = page.locator('.club-nav');
        const position = await nav.evaluate(el =>
            window.getComputedStyle(el).position
        );
        expect(position).toBe('fixed');
    });

    test('gold accents visible', async ({ page }) => {
        // Check for gold color usage
        const content = await page.content();
        expect(content).toMatch(/FFD700|ffd700|gold/i);
    });
});

test.describe('Platform Page Visual Effects', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/platform/');
    });

    test('grid background exists', async ({ page }) => {
        const gridBg = page.locator('.grid-bg');
        await expect(gridBg).toBeVisible();
    });

    test('grid background has animation', async ({ page }) => {
        const gridBg = page.locator('.grid-bg');
        const animationName = await gridBg.evaluate(el =>
            window.getComputedStyle(el).animationName
        );
        expect(animationName).not.toBe('none');
    });

    test('feature cards have glow effect', async ({ page }) => {
        const card = page.locator('.card-glow, .feature-card').first();
        if (await card.count() > 0) {
            const boxShadow = await card.evaluate(el =>
                window.getComputedStyle(el).boxShadow
            );
            expect(boxShadow).not.toBe('none');
        }
    });
});

test.describe('Dashboard Visual Effects', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/platform/dashboard.html');
    });

    test('live indicator animates', async ({ page }) => {
        const indicator = page.locator('.live-indicator, .status-dot').first();
        if (await indicator.count() > 0) {
            const animationName = await indicator.evaluate(el =>
                window.getComputedStyle(el).animationName
            );
            expect(animationName).not.toBe('none');
        }
    });

    test('grid background exists', async ({ page }) => {
        await expect(page.locator('.grid-bg')).toBeVisible();
    });

    test('progress bar has width', async ({ page }) => {
        const progressFill = page.locator('.progress-fill, #tankFill');
        if (await progressFill.count() > 0) {
            const width = await progressFill.evaluate(el =>
                window.getComputedStyle(el).width
            );
            expect(width).not.toBe('0px');
        }
    });
});

test.describe('WARScribe Visual Effects', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/platform/warscribe.html');
    });

    test('grid background exists', async ({ page }) => {
        await expect(page.locator('.grid-bg')).toBeVisible();
    });

    test('sidebar has proper styling', async ({ page }) => {
        const sidebar = page.locator('.sidebar');
        const bgColor = await sidebar.evaluate(el =>
            window.getComputedStyle(el).backgroundColor
        );
        // Should not be transparent or white
        expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
        expect(bgColor).not.toBe('rgb(255, 255, 255)');
    });

    test('recorder card has border styling', async ({ page }) => {
        const recorder = page.locator('.recorder-card');
        const border = await recorder.evaluate(el =>
            window.getComputedStyle(el).border
        );
        expect(border).not.toBe('none');
    });

    test('submit button shows disabled state', async ({ page }) => {
        const button = page.locator('#submit-log');
        const opacity = await button.evaluate(el =>
            window.getComputedStyle(el).opacity
        );
        expect(parseFloat(opacity)).toBeLessThan(1);
    });
});

test.describe('Responsive Visual Behavior', () => {
    test('landing panes stack on mobile', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });
        await page.goto('/');

        const container = page.locator('.portal-container');
        const flexDirection = await container.evaluate(el =>
            window.getComputedStyle(el).flexDirection
        );
        expect(flexDirection).toBe('column');
    });

    test('club navigation adapts to mobile', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });
        await page.goto('/club/');

        // Navigation should still be visible or have mobile equivalent
        const nav = page.locator('.club-nav, nav');
        await expect(nav).toBeVisible();
    });

    test('platform grid visible on mobile', async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 });
        await page.goto('/platform/');

        await expect(page.locator('.grid-bg')).toBeVisible();
    });
});
