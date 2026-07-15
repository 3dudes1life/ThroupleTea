# Round 5.0 — Listener Growth Engine

Built from Round 4.1 Hero Overflow Fix.

## Added
- `/start-here/` new-listener guide
- Homepage starter episode collection and Start Here CTA
- Start Here navigation link across public pages
- Listener growth CTAs on all episode and topic pages
- Instagram-only social pathways (`@ThroupleTea`); no TikTok references
- Named GA4 events for future dashboard reporting
- PWA Start Here shortcut
- Sitemap and llms.txt discovery updates

## Dashboard-ready events
- `start_here_click`
- `starter_episode_click`
- `start_listening_click`
- `meet_hosts_click`
- `instagram_click`
- `hotline_click`
- `tea_list_click`
- `platform_click`

## Safety
- OneSignal workers are byte-for-byte unchanged.
- Existing episode URLs, artwork and schema were preserved.
- Existing hero overflow safeguard remains in place.

## Validation
- HTML files: 56
- Valid JSON-LD blocks: 51
- OneSignal SHA-256 preserved: yes
- TikTok references: 0
