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

- Fixed the skip-navigation link appearing in the mobile Safari header; it remains available to desktop keyboard users.

## Cumulative round 2

- Replaced the older one-off mobile navigation script on the episode archive, all episode pages, and all topic hubs with the same shared, accessible `/script.js` controller used by the live-tested core pages.
- Removed 45 redundant inline navigation controllers, reducing duplicated JavaScript and keeping header/menu behavior consistent site-wide.
- Updated the manifest Hotline shortcut to open the real on-site Hotline section before the existing mail flow, improving shortcut compatibility.
- Added safe PWA launch preferences (`prefer_related_applications` and `launch_handler`) without registering or changing any service worker.
- Added deduplicated analytics for outbound links, form submissions, audio/video plays, scroll depth, install availability, completed installation, and standalone-app launches.
- OneSignal worker files, SDK initialization, app ID, button IDs, and permission flow remain untouched.


## Cumulative Round 3 — Speed, Discovery & Final Polish

- Compressed oversized approved local images in place without changing artwork or photography.
- Reduced the largest local image payload substantially and corrected intrinsic dimensions across all pages.
- Added targeted preconnect and DNS-prefetch hints only where external providers are actually used.
- Added dark color-scheme metadata for native browser controls.
- Hardened every new-tab link with `noopener noreferrer`.
- Added asynchronous decoding to lazy images where it was missing.
- Retired `seo.html` as a duplicate search landing page using `noindex,follow` and a canonical homepage link.
- Improved the branded offline page and live connection-status messaging without registering a second service worker.
- Added resilient shared focus, media sizing, reduced-data, and print behavior.
- Refreshed the manifest launch version and description.
- OneSignal worker files, app ID, SDK initialization, push DOM hooks, and registration behavior were not edited.
