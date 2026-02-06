/**
 * LIST GRADER E2E TESTS
 * T006: Playwright end-to-end tests for the grader page
 */

import { test, expect } from '@playwright/test';

test.describe('List Grader Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/platform/grader.html');
    });

    test('page loads successfully', async ({ page }) => {
        // Check page title
        await expect(page).toHaveTitle(/List Grader.*Vindicta/);

        // Check main elements are present
        await expect(page.locator('h1')).toContainText('List Grader');
        await expect(page.locator('#list-input')).toBeVisible();
        await expect(page.locator('#submit-btn')).toBeVisible();
    });

    test('form validates empty input', async ({ page }) => {
        // Click submit without entering list
        await page.click('#submit-btn');

        // Should show error
        const errorState = page.locator('#error-state');
        await expect(errorState).toBeVisible();
        await expect(errorState).toContainText('enter an army list');
    });

    test('valid list submission returns grade', async ({ page }) => {
        const testList = `++ Battalion Detachment ++

Space Marines [2000 pts]

HQ:
Captain in Gravis Armour [105 pts]
Librarian [70 pts]

Troops:
Intercessor Squad x10 [180 pts]
Tactical Squad x10 [150 pts]`;

        // Enter valid list
        await page.fill('#list-input', testList);

        // Submit form
        await page.click('#submit-btn');

        // Wait for results
        await expect(page.locator('#results-panel')).toBeVisible({ timeout: 5000 });

        // Check grade badge is visible (A-F)
        const gradeBadge = page.locator('.grade-badge');
        await expect(gradeBadge).toBeVisible();
        const gradeText = await gradeBadge.textContent();
        expect(gradeText).toMatch(/^[A-F][+-]?$/);
    });

    test('loading state displays during grading', async ({ page }) => {
        const testList = `Space Marines [2000 pts]
Captain [100 pts]
Intercessors [180 pts]`;

        await page.fill('#list-input', testList);

        // Start submission
        const submitPromise = page.click('#submit-btn');

        // Check loading state appears
        await expect(page.locator('#loading-state')).toBeVisible();

        // Wait for completion
        await submitPromise;
        await expect(page.locator('#loading-state')).toBeHidden();
    });

    test('results panel shows after grading complete', async ({ page }) => {
        const testList = `Necrons [1500 pts]
Overlord [100 pts]
Warriors x20 [260 pts]
Immortals x10 [150 pts]`;

        await page.fill('#list-input', testList);
        await page.click('#submit-btn');

        // Wait for results panel
        await expect(page.locator('#results-panel')).toBeVisible({ timeout: 5000 });

        // Check key result elements
        await expect(page.locator('.grade-display')).toBeVisible();
        await expect(page.locator('.grade-summary')).toBeVisible();
        await expect(page.locator('.parsed-info')).toBeVisible();
    });

    test('mobile viewport has no horizontal scroll', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });

        // Check no horizontal overflow
        const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
        const viewportWidth = await page.evaluate(() => window.innerWidth);

        expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
    });

    test('clear button resets form', async ({ page }) => {
        // Enter some text
        await page.fill('#list-input', 'Test army list content');

        // Click clear
        await page.click('#clear-btn');

        // Check input is empty
        const inputValue = await page.locator('#list-input').inputValue();
        expect(inputValue).toBe('');
    });

    test('file input accepts valid extensions', async ({ page }) => {
        const fileInput = page.locator('#file-input');

        // Check accept attribute
        const accept = await fileInput.getAttribute('accept');
        expect(accept).toContain('.ros');
        expect(accept).toContain('.xml');
        expect(accept).toContain('.txt');
    });

    test('details section expands on click', async ({ page }) => {
        const testList = `T'au Empire [2000 pts]
Commander [120 pts]
Crisis Suits x6 [300 pts]`;

        await page.fill('#list-input', testList);
        await page.click('#submit-btn');

        await expect(page.locator('#results-panel')).toBeVisible({ timeout: 5000 });

        // Click to expand details
        const details = page.locator('.analysis-details');
        await details.locator('summary').click();

        // Check details content is visible
        await expect(page.locator('.strengths-weaknesses')).toBeVisible();
        await expect(page.locator('.matchups')).toBeVisible();
    });
});
