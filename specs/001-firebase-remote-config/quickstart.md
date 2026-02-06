# Quickstart: Firebase Remote Config Integration

**Feature**: 001-firebase-remote-config  
**Date**: 2026-02-01  
**Audience**: Developers implementing feature flags in Vindicta Portal

## Prerequisites

- Access to Firebase Console for `vindicta-warhammer` project
- Node.js 18+ for local development
- Firebase CLI installed (`npm install -g firebase-tools`)

## 1. Install Firebase SDK

Add the Firebase SDK to the Portal's package.json:

```bash
npm install firebase
```

## 2. Initialize Firebase Configuration

Create `assets/js/firebase-config.js`:

```javascript
import { initializeApp } from 'firebase/app';
import { getRemoteConfig } from 'firebase/remote-config';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "vindicta-warhammer.firebaseapp.com",
  projectId: "vindicta-warhammer",
  storageBucket: "vindicta-warhammer.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

export const app = initializeApp(firebaseConfig);
export const remoteConfig = getRemoteConfig(app);

// Development: instant updates; Production: 12-hour cache
const isDev = location.hostname === 'localhost';
remoteConfig.settings.minimumFetchIntervalMillis = isDev ? 0 : 43200000;
```

## 3. Set Up Default Values

Create `assets/js/remote-config.defaults.js`:

```javascript
export const REMOTE_CONFIG_DEFAULTS = {
  feat_new_dashboard_enabled: false,
  feat_warscribe_beta_enabled: false,
  conf_upload_limit_mb: 50,
  ui_cta_button_variant: 'default'
};
```

## 4. Create Feature Flag Service

Create `assets/js/remote-config.js`:

```javascript
import { fetchAndActivate, getBoolean, getNumber, getString } from 'firebase/remote-config';
import { setUserId, setUserProperties } from 'firebase/analytics';

export class FeatureFlagService {
  constructor(remoteConfig, defaults, analytics) {
    this.remoteConfig = remoteConfig;
    this.remoteConfig.defaultConfig = defaults;
    this.analytics = analytics;
    this.isInitialized = false;
  }

  async initialize() {
    try {
      await fetchAndActivate(this.remoteConfig);
      this.isInitialized = true;
      console.log('Firebase: Remote config activated');
    } catch (error) {
      console.warn('Firebase: Using defaults:', error.message);
    }
  }

  isFeatureEnabled(featureName) {
    return getBoolean(this.remoteConfig, `feat_${featureName}_enabled`);
  }
}
```

## 5. Initialize on Page Load

Add to your HTML pages:

```html
<script type="module">
  import { remoteConfig, analytics } from './assets/js/firebase-config.js';
  import { REMOTE_CONFIG_DEFAULTS } from './assets/js/remote-config.defaults.js';
  import { FeatureFlagService } from './assets/js/remote-config.js';

  document.addEventListener('DOMContentLoaded', async () => {
    const flags = new FeatureFlagService(remoteConfig, REMOTE_CONFIG_DEFAULTS, analytics);
    await flags.initialize();
    window.vindictaFlags = flags; // Optional: Global access
  });
</script>
```

## 6. Configure Flags in Firebase Console

1. Open [Firebase Console](https://console.firebase.google.com)
2. Select `vindicta-warhammer` project
3. Navigate to **Remote Config**
4. Click **Add parameter**
5. Enter key (e.g., `feat_new_dashboard_enabled`)
6. Set default value and any conditions
7. Click **Publish changes**

## Usage Examples

### Toggle a Feature

```javascript
if (featureFlags.isFeatureEnabled('warscribe_beta')) {
  showBetaUI();
} else {
  showStableUI();
}
```

### Get Configuration Value

```javascript
const maxUpload = featureFlags.getNumber('conf_upload_limit_mb');
validateFileSize(file, maxUpload * 1024 * 1024);
```

### A/B Test Variants

```javascript
const variant = featureFlags.getString('ui_cta_button_variant');
applyButtonVariant(variant); // 'blue', 'red', 'default'
```

## Testing

### Mock for Playwright Tests

```javascript
// In test setup
window.featureFlags = {
  isFeatureEnabled: (name) => mockFlags[name] ?? false,
  getBoolean: (key) => mockFlags[key] ?? false,
  getNumber: (key) => mockConfig[key] ?? 0,
  getString: (key) => mockConfig[key] ?? ''
};
```

### Verify in Browser Console

```javascript
// After page load
featureFlags.getBoolean('feat_new_dashboard_enabled');
// Returns: true or false
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Values not updating | Check cache interval; use 0ms for dev |
| TypeError on getValue | Ensure SDK initialized before calling |
| Network errors | Verify API key restrictions in GCP Console |
| Throttled requests | Production has 5 requests/60min limit |

## Next Steps

1. Run `/speckit.tasks` to generate implementation task list
2. Follow TDD: Write Playwright tests first
3. Implement service, then integrate into pages
