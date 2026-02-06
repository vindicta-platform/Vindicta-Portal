/**
 * Mock implementation of FeatureFlagService for testing.
 * Does not require Firebase initialization.
 */
export class MockFeatureFlagService {
    constructor(overrides = {}) {
        this.flags = {
            new_dashboard: false,
            warscribe_beta: false,
            platform_analytics: false,
            upload_limit_mb: 50,
            cache_ttl_minutes: 60,
            cta_button_variant: 'default',
            theme_mode: 'dark',
            ...overrides
        };
        this.isInitialized = true;
    }

    async initialize() {
        return true;
    }

    isFeatureEnabled(name) {
        return !!this.flags[name];
    }

    getBoolean(key) {
        return !!this.flags[key.replace('feat_', '').replace('conf_', '').replace('ui_', '')];
    }

    getNumber(key) {
        return Number(this.flags[key.replace('feat_', '').replace('conf_', '').replace('ui_', '')]);
    }

    getString(key) {
        return String(this.flags[key.replace('feat_', '').replace('conf_', '').replace('ui_', '')]);
    }
}
