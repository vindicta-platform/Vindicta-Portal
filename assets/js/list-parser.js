/**
 * LIST PARSER MODULE
 * T003: Parses army lists from text and BattleScribe XML formats
 */

/**
 * Detect the format of the input (text or XML)
 * @param {string} input - Raw input string
 * @returns {'text' | 'xml' | 'unknown'}
 */
export function detectListFormat(input) {
    if (!input || typeof input !== 'string') {
        return 'unknown';
    }

    const trimmed = input.trim();

    // Check for XML markers
    if (trimmed.startsWith('<?xml') || trimmed.startsWith('<roster') || trimmed.startsWith('<catalogue')) {
        return 'xml';
    }

    // Check for common BattleScribe XML patterns
    if (trimmed.includes('<selection ') || trimmed.includes('<cost ')) {
        return 'xml';
    }

    // Default to text format
    return 'text';
}

/**
 * Parse a plain text army list
 * @param {string} text - Raw text list
 * @returns {Object} Parsed list structure
 */
export function parseTextList(text) {
    if (!text || typeof text !== 'string') {
        return { error: 'Invalid input: empty or not a string', valid: false };
    }

    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    if (lines.length === 0) {
        return { error: 'Invalid input: no content found', valid: false };
    }

    const result = {
        valid: true,
        faction: null,
        points: 0,
        units: [],
        rawText: text
    };

    // Common faction patterns
    const factionPatterns = [
        /^(Space Marines|Adeptus Astartes)/i,
        /^(Chaos Space Marines|Heretic Astartes)/i,
        /^(Aeldari|Craftworlds|Drukhari)/i,
        /^(Orks|Ork)/i,
        /^(Tyranids|Hive Fleet)/i,
        /^(Necrons)/i,
        /^(T'au Empire|Tau)/i,
        /^(Imperial Guard|Astra Militarum)/i,
        /^(Adeptus Mechanicus)/i,
        /^(Death Guard)/i,
        /^(Thousand Sons)/i,
        /^(World Eaters)/i,
        /^(Imperial Knights)/i,
        /^(Chaos Knights)/i,
        /^(Agents of the Imperium)/i,
        /^(Genestealer Cults)/i,
        /^(Leagues of Votann)/i,
    ];

    // Points pattern: "2000 pts", "2000pts", "2,000 points"
    const pointsPattern = /(\d{1,2},?\d{3})\s*(pts?|points?)/i;

    // Unit pattern: looks for lines with points values
    const unitPattern = /^(.+?)\s*[\[\(]?\s*(\d+)\s*(pts?|points?)[\]\)]?\s*$/i;

    for (const line of lines) {
        // Try to detect faction
        if (!result.faction) {
            for (const pattern of factionPatterns) {
                if (pattern.test(line)) {
                    result.faction = line.replace(/[-:]/g, '').trim();
                    break;
                }
            }
        }

        // Try to extract total points
        const pointsMatch = line.match(pointsPattern);
        if (pointsMatch && result.points === 0) {
            result.points = parseInt(pointsMatch[1].replace(',', ''), 10);
        }

        // Try to parse unit lines
        const unitMatch = line.match(unitPattern);
        if (unitMatch) {
            result.units.push({
                name: unitMatch[1].trim(),
                points: parseInt(unitMatch[2], 10)
            });
        }
    }

    // If no faction detected, use first non-empty line as faction guess
    if (!result.faction && lines.length > 0) {
        result.faction = lines[0].substring(0, 50);
    }

    // If no total points found, sum unit points
    if (result.points === 0 && result.units.length > 0) {
        result.points = result.units.reduce((sum, u) => sum + u.points, 0);
    }

    return result;
}

/**
 * Parse BattleScribe XML roster
 * @param {string} xml - Raw XML string
 * @returns {Object} Parsed list structure
 */
export function parseXmlList(xml) {
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, 'application/xml');

        const parserError = doc.querySelector('parsererror');
        if (parserError) {
            return { error: 'Invalid XML format', valid: false };
        }

        const roster = doc.querySelector('roster');
        if (!roster) {
            return { error: 'No roster element found', valid: false };
        }

        const result = {
            valid: true,
            faction: roster.getAttribute('name') || 'Unknown',
            points: 0,
            units: [],
            rawXml: xml
        };

        // Get total points from costs
        const costs = roster.querySelectorAll('cost[name="pts"], cost[name="Points"]');
        costs.forEach(cost => {
            const value = parseFloat(cost.getAttribute('value') || '0');
            result.points += value;
        });

        // Get selections (units)
        const selections = roster.querySelectorAll('selection[type="model"], selection[type="unit"]');
        selections.forEach(sel => {
            const name = sel.getAttribute('name');
            const costEl = sel.querySelector('cost[name="pts"], cost[name="Points"]');
            const points = costEl ? parseFloat(costEl.getAttribute('value') || '0') : 0;

            if (name) {
                result.units.push({ name, points: Math.round(points) });
            }
        });

        return result;
    } catch (e) {
        return { error: `XML parsing error: ${e.message}`, valid: false };
    }
}

/**
 * Validate parsed list structure
 * @param {Object} parsed - Parsed list object
 * @returns {Object} Validation result with isValid and errors
 */
export function validateListStructure(parsed) {
    const errors = [];

    if (!parsed || !parsed.valid) {
        return { isValid: false, errors: [parsed?.error || 'Invalid list structure'] };
    }

    if (!parsed.faction) {
        errors.push('Could not detect faction');
    }

    if (parsed.points === 0) {
        errors.push('Could not determine points total');
    }

    if (parsed.units.length === 0) {
        errors.push('No units detected in list');
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings: errors.length > 0 ? ['List may not grade accurately due to parsing issues'] : []
    };
}

/**
 * Main parsing entry point
 * @param {string} input - Raw list input (text or XML)
 * @returns {Object} Parsed and validated list
 */
export function parseList(input) {
    const format = detectListFormat(input);

    let parsed;
    if (format === 'xml') {
        parsed = parseXmlList(input);
    } else {
        parsed = parseTextList(input);
    }

    const validation = validateListStructure(parsed);

    return {
        ...parsed,
        format,
        validation
    };
}
