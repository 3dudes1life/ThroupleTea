# ThroupleTea cumulative optimization

## OneSignal protection

The OneSignal worker files, app ID, SDK initialization, notification button ID, and notification permission flow were not edited. No competing service worker registration was added.

## Changes

- Added images/favicon.png from existing approved app icon.
- Added shared focus, reduced-motion, safe-area, modal and network-status styles.
- Added missing canonicals where needed, skip links, viewport safe-area support, image dimensions, decoding and lazy/eager hints across HTML pages.
- Removed duplicate homepage navigation listener; shared accessible header controller remains.
- Added newsletter modal focus management, focus return, Escape handling, focus trap and scroll lock.
- Added device-aware install guidance, installed-mode detection, delegated analytics, network-state messaging and active navigation state.
- Added device-specific install guidance placeholder near push entry CTA.
- Enhanced manifest with app identity, display fallbacks, categories and shortcuts.
- Added branded offline fallback document without registering a competing service worker.

## Post-upload checks

- Validate live structured data with Google Rich Results Test and Schema.org Validator.
- Confirm OneSignal subscription and a test notification in normal browser and installed iOS/Android mode.
- Test Safari, Chrome, mobile Safari, Android Chrome, installed mode, tablet and wide desktop.
- Confirm canonical URLs and sitemap resolve on the live domain.
- Added explicit square dimensions to externally hosted podcast artwork to reduce layout shift.
- Added the standalone links page canonical URL to sitemap.xml.
- Converted the existing Caleb host image from mislabeled HEIF data into a standards-compatible JPEG without changing the photo.
