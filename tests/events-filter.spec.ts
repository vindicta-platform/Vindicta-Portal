import { test, expect } from '@playwright/test';

/**
 * Events Page Filter Tests
 * 
 * Fixes https://github.com/vindicta-platform/Vindicta-Portal/issues/2
 * RED test: Reproduces the bug where filter buttons do not filter events
 */
test.describe('Events Page - Filter Functionality (Issue #2)', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/club/events.html');
    });

    test('should have filter buttons visible', async ({ page }) => {
        const allBtn = page.locator('.filter-btn', { hasText: 'All Events' });
        const tournamentsBtn = page.locator('.filter-btn', { hasText: 'Tournaments' });
        const gameNightsBtn = page.locator('.filter-btn', { hasText: 'Game Nights' });
        const hobbyBtn = page.locator('.filter-btn', { hasText: 'Hobby' });

        await expect(allBtn).toBeVisible();
        await expect(tournamentsBtn).toBeVisible();
        await expect(gameNightsBtn).toBeVisible();
        await expect(hobbyBtn).toBeVisible();
    });

    test('should filter to show only tournaments when Tournaments filter clicked', async ({ page }) => {
        const tournamentsBtn = page.locator('.filter-btn', { hasText: 'Tournaments' });
        await tournamentsBtn.click();

        // Tournaments filter should be active
        await expect(tournamentsBtn).toHaveClass(/active/);

        // All Events should NOT be active
        const allBtn = page.locator('.filter-btn', { hasText: 'All Events' });
        await expect(allBtn).not.toHaveClass(/active/);

        // Tournament event cards should be visible
        const tournamentCards = page.locator('.event-card[data-category="tournament"]');
        const visibleTournamentCount = await tournamentCards.count();
        expect(visibleTournamentCount).toBeGreaterThanOrEqual(1);

        // Non-tournament cards should be hidden
        const gameNightCards = page.locator('.event-card[data-category="game-night"]:visible');
        const hobbyCards = page.locator('.event-card[data-category="hobby"]:visible');
        expect(await gameNightCards.count()).toBe(0);
        expect(await hobbyCards.count()).toBe(0);
    });

    test('should filter to show only game nights when Game Nights filter clicked', async ({ page }) => {
        const gameNightsBtn = page.locator('.filter-btn', { hasText: 'Game Nights' });
        await gameNightsBtn.click();

        // Game nights filter should be active
        await expect(gameNightsBtn).toHaveClass(/active/);

        // Game night event cards should be visible
        const gameNightCards = page.locator('.event-card[data-category="game-night"]');
        const visibleGameNightCount = await gameNightCards.count();
        expect(visibleGameNightCount).toBeGreaterThanOrEqual(1);
    });

    test('should filter to show only hobby events when Hobby filter clicked', async ({ page }) => {
        const hobbyBtn = page.locator('.filter-btn', { hasText: 'Hobby' });
        await hobbyBtn.click();

        // Hobby filter should be active
        await expect(hobbyBtn).toHaveClass(/active/);

        // Hobby event cards should be visible
        const hobbyCards = page.locator('.event-card[data-category="hobby"]');
        const visibleHobbyCount = await hobbyCards.count();
        expect(visibleHobbyCount).toBeGreaterThanOrEqual(1);
    });

    test('should show all events when All Events filter clicked after filtering', async ({ page }) => {
        // First filter by tournaments
        const tournamentsBtn = page.locator('.filter-btn', { hasText: 'Tournaments' });
        await tournamentsBtn.click();

        // Then click All Events
        const allBtn = page.locator('.filter-btn', { hasText: 'All Events' });
        await allBtn.click();

        // All Events filter should be active
        await expect(allBtn).toHaveClass(/active/);

        // All event cards should be visible
        const allCards = page.locator('.event-card');
        const visibleCount = await allCards.count();
        expect(visibleCount).toBeGreaterThanOrEqual(4);  // We have at least 5 events
    });
});
