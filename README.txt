THROUPLE TEA — PROFESSIONAL UNIFIED HEADER

Replace these two files in the ROOT of the GitHub repository:

1. script.js
2. episode-seo.css

WHAT THIS FIXES
- One consistent desktop header across the main site, legacy pages, archive, topics and episode pages.
- One consistent mobile header: logo | Throuple Hotline | hamburger.
- Hotline is removed from the dropdown menu.
- Header gradient extends into the iPhone safe-area/status-bar region when the browser/PWA allows it.
- Theme color is changed to match the burgundy side of the header on pages using script.js.
- Mobile dropdown placement, spacing, touch targets and typography are standardized.
- Existing OneSignal, giveaway, sitemap, episode content, service workers and manifest are untouched.

IMPORTANT
GitHub's connector was readable but returned 403 for write access, so upload these replacements manually.
After GitHub Pages deploys:
- Close the Safari tab completely and reopen it.
- For the installed Home Screen app, swipe it away and relaunch.
- A normal refresh may keep the old cached script/CSS briefly.
