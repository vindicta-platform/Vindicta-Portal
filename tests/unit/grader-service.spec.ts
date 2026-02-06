/**
 * GRADER SERVICE UNIT TESTS
 * T007: Vitest unit tests for parsing and service logic
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
    detectListFormat,
    parseTextList,
    parseXmlList,
    validateListStructure,
    parseList
} from '../assets/js/list-parser.js';

describe('detectListFormat', () => {
    it('returns "text" for plain text lists', () => {
        const plainText = `Space Marines [2000 pts]
Captain [100 pts]
Intercessors x10 [180 pts]`;
        expect(detectListFormat(plainText)).toBe('text');
    });

    it('returns "xml" for XML content with xml declaration', () => {
        const xml = '<?xml version="1.0"?><roster name="Test"></roster>';
        expect(detectListFormat(xml)).toBe('xml');
    });

    it('returns "xml" for BattleScribe roster element', () => {
        const xml = '<roster name="My Army"><costs></costs></roster>';
        expect(detectListFormat(xml)).toBe('xml');
    });

    it('returns "unknown" for empty input', () => {
        expect(detectListFormat('')).toBe('unknown');
        expect(detectListFormat(null)).toBe('unknown');
        expect(detectListFormat(undefined)).toBe('unknown');
    });
});

describe('parseTextList', () => {
    it('parses valid text list with faction and points', () => {
        const list = `Space Marines [2000 pts]
Captain in Gravis Armour [105 pts]
Librarian [70 pts]
Intercessor Squad x10 [180 pts]`;

        const result = parseTextList(list);

        expect(result.valid).toBe(true);
        expect(result.faction).toContain('Space Marines');
        expect(result.units.length).toBeGreaterThan(0);
    });

    it('returns error for empty input', () => {
        const result = parseTextList('');
        expect(result.valid).toBe(false);
        expect(result.error).toContain('Invalid input');
    });

    it('returns error for non-string input', () => {
        const result = parseTextList(null);
        expect(result.valid).toBe(false);
        expect(result.error).toContain('Invalid input');
    });

    it('extracts units with points values', () => {
        const list = `Necrons
Overlord [100 pts]
Warriors x20 [260 pts]
Immortals [150 pts]`;

        const result = parseTextList(list);

        expect(result.units).toContainEqual(
            expect.objectContaining({ name: expect.any(String), points: 100 })
        );
    });

    it('handles various points formats', () => {
        const list = `Test Army
Unit A [100 pts]
Unit B (150pts)
Unit C [200 points]`;

        const result = parseTextList(list);
        expect(result.units.length).toBe(3);
    });

    it('sums unit points if total not provided', () => {
        const list = `Test Army
Unit A [100 pts]
Unit B [200 pts]`;

        const result = parseTextList(list);
        expect(result.points).toBe(300);
    });
});

describe('validateListStructure', () => {
    it('validates a complete list structure', () => {
        const parsed = {
            valid: true,
            faction: 'Space Marines',
            points: 2000,
            units: [{ name: 'Captain', points: 100 }]
        };

        const result = validateListStructure(parsed);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it('returns errors for missing faction', () => {
        const parsed = {
            valid: true,
            faction: null,
            points: 2000,
            units: [{ name: 'Captain', points: 100 }]
        };

        const result = validateListStructure(parsed);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Could not detect faction');
    });

    it('returns errors for zero points', () => {
        const parsed = {
            valid: true,
            faction: 'Test Faction',
            points: 0,
            units: []
        };

        const result = validateListStructure(parsed);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Could not determine points total');
    });

    it('returns errors for empty units array', () => {
        const parsed = {
            valid: true,
            faction: 'Test Faction',
            points: 2000,
            units: []
        };

        const result = validateListStructure(parsed);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('No units detected in list');
    });

    it('handles invalid parsed object', () => {
        const result = validateListStructure(null);
        expect(result.isValid).toBe(false);
    });
});

describe('parseList (main entry point)', () => {
    it('returns complete parsed result with validation', () => {
        const list = `Aeldari [1500 pts]
Farseer [90 pts]
Guardians x10 [100 pts]`;

        const result = parseList(list);

        expect(result).toHaveProperty('valid');
        expect(result).toHaveProperty('format');
        expect(result).toHaveProperty('validation');
        expect(result.format).toBe('text');
    });

    it('detects and parses XML format', () => {
        const xml = '<?xml version="1.0"?><roster name="Test Army"></roster>';
        const result = parseList(xml);

        expect(result.format).toBe('xml');
    });
});

// Additional edge case tests
describe('Edge Cases', () => {
    it('handles lists with special characters', () => {
        const list = `T'au Empire [2000 pts]
Commander O'Shovah [150 pts]`;

        const result = parseTextList(list);
        expect(result.valid).toBe(true);
    });

    it('handles multi-line unit entries', () => {
        const list = `Space Marines
10x Intercessors with 
    Auto Bolt Rifles [180 pts]`;

        const result = parseTextList(list);
        expect(result.valid).toBe(true);
    });

    it('ignores comment lines', () => {
        const list = `Space Marines [2000 pts]
# This is a comment
Captain [100 pts]`;

        const result = parseTextList(list);
        expect(result.valid).toBe(true);
    });
});
