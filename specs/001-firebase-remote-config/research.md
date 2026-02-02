# Research: Firebase Remote Config Integration

**Feature**: 001-firebase-remote-config  
**Date**: 2026-02-01  
**Status**: Complete

## Research Tasks

### 1. Firebase Remote Config SDK Integration

**Decision**: Use Firebase JavaScript SDK v10+ modular imports

**Rationale**:
- Modular imports reduce bundle size by allowing tree-shaking
- Already using Firebase for Hosting (`vindicta-warhammer` project)
- Native support for web browsers with no server required
- Real-time updates available if needed in future

**Alternatives Considered**:
| Alternative | Pros | Cons | Rejected Because |
|-------------|------|------|------------------|
| LaunchDarkly | Enterprise features, superior UI | Cost per MAU, new vendor | Budget constraints, already on Firebase |
| Custom Firestore solution | Full control | Engineering effort, maintenance | YAGNI, Remote Config already exists |
| Environment variables | Simple | Requires redeployment | No dynamic updates, violates core requirement |

---

### 2. SDK Initialization Pattern

**Decision**: Initialize on DOMContentLoaded with async fetch

**Rationale**:
- Ensures DOM is ready before checking flags for UI changes
- Async fetch doesn't block page render
- Fallback to defaults provides instant UI response

**Implementation Pattern**:
```javascript
// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getRemoteConfig, fetchAndActivate, getValue } from 'firebase/remote-config';

const firebaseConfig = {
  // Existing config from Firebase Console
  apiKey: "...",
  projectId: "vindicta-warhammer",
  // etc.
};

const app = initializeApp(firebaseConfig);
const remoteConfig = getRemoteConfig(app);

// Set cache based on environment
remoteConfig.settings.minimumFetchIntervalMillis = 
  location.hostname === 'localhost' ? 0 : 43200000; // 12 hours for prod
```

---

### 3. Default Values Strategy

**Decision**: Centralized defaults map with fail-safe values

**Rationale**:
- Single source of truth for offline/error scenarios
- Testable without Firebase dependency
- Explicit declaration prevents undefined behaviors

**Default Values Structure**:
```javascript
// remote-config.defaults.js
export const REMOTE_CONFIG_DEFAULTS = {
  // Feature flags (Boolean)
  feat_new_dashboard_enabled: false,
  feat_warscribe_beta_enabled: false,
  feat_platform_analytics_enabled: false,
  
  // Configuration values (Number)
  conf_upload_limit_mb: 50,
  conf_cache_ttl_minutes: 60,
  
  // UI variants (String)
  ui_cta_button_variant: 'default',
  ui_theme_mode: 'dark'
};
```

---

### 4. Wrapper Abstraction Pattern

**Decision**: Create `FeatureFlagService` class wrapping Firebase SDK

**Rationale**:
- Enables mocking for Playwright tests
- Future vendor replacement without code changes
- Type-safe accessors for common patterns

**Interface Design**:
```javascript
// remote-config.js
class FeatureFlagService {
  constructor(remoteConfig, defaults) { }
  
  async initialize() { }      // Fetch and activate
  getBoolean(key) { }        // Returns boolean flag value
  getNumber(key) { }         // Returns numeric config value
  getString(key) { }         // Returns string variant value
  isFeatureEnabled(featureKey) { }  // Shorthand for getBoolean
  
  // For testing
  static createMock(overrides) { }
}
```

---

### 5. Caching Strategy

**Decision**: 12-hour cache for production, 0 for development

**Rationale**:
- Firebase throttles fetches exceeding quota (5 per 60 minutes in prod)
- Development needs instant updates for testing
- 12 hours is Firebase's recommended production interval
- Aligns with ADR-001 from user's technical specification

**Environment Detection**:
```javascript
const isDevelopment = 
  location.hostname === 'localhost' || 
  location.hostname.includes('127.0.0.1');
```

---

### 6. User Targeting Implementation

**Decision**: Use Firebase Analytics user properties for targeting

**Rationale**:
- Remote Config targeting rules reference Analytics user properties
- No backend required - properties set client-side
- Supports percentile, user ID, and custom property targeting

**User Property Setup**:
```javascript
// Set user properties for targeting
import { getAnalytics, setUserProperties, setUserId } from 'firebase/analytics';

const analytics = getAnalytics(app);
setUserId(analytics, userId);
setUserProperties(analytics, {
  subscription_tier: 'premium',
  role: 'member'
});
```

---

### 7. Testing Strategy

**Decision**: Mock-based Playwright tests with manual Firebase Console verification

**Rationale**:
- Unit tests use mocked FeatureFlagService
- Integration tests verify wrapper behavior with mock Firebase
- Manual verification confirms Firebase Console → UI propagation

**Test Categories**:
1. **Unit Tests**: FeatureFlagService methods with mocked remote config
2. **Integration Tests**: Feature visibility based on flag values
3. **Manual Verification**: End-to-end flag toggle via Firebase Console

---

## Resolved Clarifications

All technical context items resolved - no NEEDS CLARIFICATION markers remain.

| Original Unknown | Resolution |
|------------------|------------|
| SDK Version | Firebase JS SDK v10+ (modular) |
| Cache Strategy | 12h production, 0 development |
| Wrapper Pattern | FeatureFlagService class |
| Testing Approach | Playwright + mocked service |
| User Properties | Firebase Analytics integration |

## Next Steps

Proceed to Phase 1: Generate `data-model.md` and `quickstart.md`.
