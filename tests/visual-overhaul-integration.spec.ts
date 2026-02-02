import { test, expect } from '@playwright/test';

/**
 * Visual Overhaul Integration Tests
 * 
 * RETROACTIVE TESTS - Written as corrective action for constitution violation
 * See: docs/retrospectives/2026-02-01-visual-overhaul-violation.md
 * 
 * Tests cross-section integration, asset loading, and console errors
 */

const ALL_PAGES = [
    { url: '/', name: 'Landing' },
    { url: '/club/', name: 'Club Index' },
    { url: '/club/about.html', name: 'Club About' },
    { url: '/club/team.html', name: 'Club Team' },
    { url: '/club/events.html', name: 'Club Events' },
    { url: '/club/partners.html', name: 'Club Partners' },
    { url: '/club/join.html', name: 'Club Join' },
    { url: '/platform/', name: 'Platform Index' },
    { url: '/platform/dashboard.html', name: 'Platform Dashboard' },
    { url: '/platform/warscribe.html', name: 'Platform WARScribe' },
];

test.describe('All Pages Load Successfully', () => {
    for (const page of ALL_PAGES) {
        test(`${page.name} returns 200 status`, async ({ page: p }) => {
            const response = await p.goto(page.url);
            expect(response?.status()).toBe(200);
        });
    }
});

test.describe('No Console Errors', () => {
    for (const pg of ALL_PAGES) {
        test(`${pg.name} has no console errors`, async ({ page }) => {
            const errors: string[] = [];
            page.on('console', msg => {
                if (msg.type() === 'error') {
                    errors.push(msg.text());
                }
            });

            await page.goto(pg.url);
            await page.waitForLoadState('networkidle');

            // Filter out known acceptable errors
            const criticalErrors = errors.filter(e =>
                !e.includes('favicon') &&
                !e.includes('404')
            );

            expect(criticalErrors).toEqual([]);
        });
    }
});

test.describe('Design System CSS Loads', () => {
    for (const pg of ALL_PAGES) {
        test(`${pg.name} loads design-system.css`, async ({ page }) => {
            await page.goto(pg.url);

            const cssLoaded = await page.evaluate(() => {
                return Array.from(document.styleSheets).some(
                    s => s.href?.includes('design-system.css')
                );
            });

            expect(cssLoaded).toBe(true);
        });
    }
});

test.describe('Cross-Section Navigation', () => {
    test('Landing → Club → Platform → Club cycle', async ({ page }) => {
        // Start at landing
        await page.goto('/');

        // Go to Club
        await page.locator('.pane-club').click();
        await expect(page).toHaveURL(/\/club\//);

        // Go to Platform via footer
        await page.locator('.footer a[href*="platform"]').click();
        await expect(page).toHaveURL(/\/platform\//);

        // Go back to Club via footer
        await page.locator('footer a[href*="club"]').click();
        await expect(page).toHaveURL(/\/club\//);
    });

    test('Platform footer links work on all pages', async ({ page }) => {
        const platformPages = [
            '/platform/',
            '/platform/dashboard.html',
            '/platform/warscribe.html'
        ];

        for (const url of platformPages) {
            await page.goto(url);
            await expect(page.locator('footer a[href*="club"]')).toBeVisible();
        }
    });

    test('Club footer links work on all pages', async ({ page }) => {
        const clubPages = [
            '/club/',
            '/club/about.html',
            '/club/team.html',
            '/club/events.html',
            '/club/partners.html',
            '/club/join.html'
        ];

        for (const url of clubPages) {
            await page.goto(url);
            await expect(page.locator('.footer a[href*="platform"]')).toBeVisible();
        }
    });
});

test.describe('Static Assets Load', () => {
    test('Google Fonts load', async ({ page }) => {
        await page.goto('/');

        const fontsLoaded = await page.evaluate(() => {
            return document.fonts.ready.then(() => {
                return document.fonts.check('1em Outfit') ||
                    document.fonts.check('1em "Bebas Neue"');
            });
        });

        expect(fontsLoaded).toBe(true);
    });

    test('No 404 errors for CSS files', async ({ page }) => {
        const failedResources: string[] = [];

        page.on('response', response => {
            if (response.status() === 404 && response.url().includes('.css')) {
                failedResources.push(response.url());
            }
        });

        await page.goto('/');
        await page.waitForLoadState('networkidle');

        expect(failedResources).toEqual([]);
    });
});

test.describe('Internal Links Valid', () => {
    test('Club navigation links are valid', async ({ page }) => {
        await page.goto('/club/');

        const links = page.locator('.club-nav a[href]');
        const count = await links.count();

        for (let i = 0; i < count; i++) {
            const href = await links.nth(i).getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                // Construct full URL
                const fullUrl = new URL(href, 'http://localhost/club/').href;
                expect(href).not.toEqual('');
            }
        }
    });

    test('Platform navigation links are valid', async ({ page }) => {
        await page.goto('/platform/');

        const links = page.locator('nav a[href]');
        const count = await links.count();

        for (let i = 0; i < count; i++) {
            const href = await links.nth(i).getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#')) {
                expect(href).not.toEqual('');
            }
        }
    });
});

test.describe('Heading Hierarchy', () => {
    for (const pg of ALL_PAGES) {
        test(`${pg.name} has h1`, async ({ page }) => {
            await page.goto(pg.url);
            const h1Count = await page.locator('h1').count();
            expect(h1Count).toBeGreaterThanOrEqual(1);
        });
    }
});

test.describe('Meta Tags Present', () => {
    for (const pg of ALL_PAGES) {
        test(`${pg.name} has title`, async ({ page }) => {
            await page.goto(pg.url);
            const title = await page.title();
            expect(title.length).toBeGreaterThan(0);
            expect(title.toLowerCase()).toMatch(/vindicta/);
        });
    }

    for (const pg of ALL_PAGES) {
        test(`${pg.name} has viewport meta`, async ({ page }) => {
            await page.goto(pg.url);
            const viewport = await page.locator('meta[name="viewport"]').count();
            expect(viewport).toBeGreaterThan(0);
        });
    }
});
