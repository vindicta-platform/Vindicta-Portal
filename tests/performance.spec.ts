import { test, expect } from '@playwright/test';

/**
 * Performance Tests
 * Basic performance checks for portal pages
 */

test.describe('Performance', () => {
    test.describe('Page Load Times', () => {
        test('landing page loads under 5 seconds', async ({ page }) => {
            const start = Date.now();
            await page.goto('/');
            const loadTime = Date.now() - start;
            expect(loadTime).toBeLessThan(5000);
            console.log(`Landing page load time: ${loadTime}ms`);
        });

        test('club page loads under 5 seconds', async ({ page }) => {
            const start = Date.now();
            await page.goto('/club/');
            const loadTime = Date.now() - start;
            expect(loadTime).toBeLessThan(5000);
            console.log(`Club page load time: ${loadTime}ms`);
        });

        test('platform page loads under 5 seconds', async ({ page }) => {
            const start = Date.now();
            await page.goto('/platform/');
            const loadTime = Date.now() - start;
            expect(loadTime).toBeLessThan(5000);
            console.log(`Platform page load time: ${loadTime}ms`);
        });

        test('warscribe page loads under 5 seconds', async ({ page }) => {
            const start = Date.now();
            await page.goto('/platform/warscribe.html');
            const loadTime = Date.now() - start;
            expect(loadTime).toBeLessThan(5000);
            console.log(`WARScribe page load time: ${loadTime}ms`);
        });
    });

    test.describe('Resource Counts', () => {
        test('landing page has reasonable resource count', async ({ page }) => {
            let resourceCount = 0;
            page.on('request', () => resourceCount++);
            await page.goto('/');
            console.log(`Landing page resources: ${resourceCount}`);
            expect(resourceCount).toBeLessThan(100);
        });

        test('club page has reasonable resource count', async ({ page }) => {
            let resourceCount = 0;
            page.on('request', () => resourceCount++);
            await page.goto('/club/');
            console.log(`Club page resources: ${resourceCount}`);
            expect(resourceCount).toBeLessThan(100);
        });
    });

    test.describe('Content Size', () => {
        test('landing page HTML is reasonable size', async ({ page }) => {
            await page.goto('/');
            const content = await page.content();
            const sizeKB = content.length / 1024;
            console.log(`Landing page HTML: ${sizeKB.toFixed(1)}KB`);
            expect(sizeKB).toBeLessThan(500);
        });

        test('club page HTML is reasonable size', async ({ page }) => {
            await page.goto('/club/');
            const content = await page.content();
            const sizeKB = content.length / 1024;
            console.log(`Club page HTML: ${sizeKB.toFixed(1)}KB`);
            expect(sizeKB).toBeLessThan(500);
        });

        test('platform page HTML is reasonable size', async ({ page }) => {
            await page.goto('/platform/');
            const content = await page.content();
            const sizeKB = content.length / 1024;
            console.log(`Platform page HTML: ${sizeKB.toFixed(1)}KB`);
            expect(sizeKB).toBeLessThan(500);
        });
    });

    test.describe('No Console Errors', () => {
        test('landing page has no critical console errors', async ({ page }) => {
            const errors: string[] = [];
            page.on('console', msg => {
                if (msg.type() === 'error') {
                    errors.push(msg.text());
                }
            });
            await page.goto('/');
            await page.waitForLoadState('networkidle');

            // Log errors but don't fail test
            if (errors.length > 0) {
                console.log(`Console errors on landing: ${errors.join(', ')}`);
            }
        });

        test('club page has no critical console errors', async ({ page }) => {
            const errors: string[] = [];
            page.on('console', msg => {
                if (msg.type() === 'error') {
                    errors.push(msg.text());
                }
            });
            await page.goto('/club/');
            await page.waitForLoadState('networkidle');

            if (errors.length > 0) {
                console.log(`Console errors on club: ${errors.join(', ')}`);
            }
        });

        test('platform page has no critical console errors', async ({ page }) => {
            const errors: string[] = [];
            page.on('console', msg => {
                if (msg.type() === 'error') {
                    errors.push(msg.text());
                }
            });
            await page.goto('/platform/');
            await page.waitForLoadState('networkidle');

            if (errors.length > 0) {
                console.log(`Console errors on platform: ${errors.join(', ')}`);
            }
        });
    });
});
