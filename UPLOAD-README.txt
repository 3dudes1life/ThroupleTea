THROUPLE TEA CLOUDFLARE PAGE-VIEW PATCH

Upload the CONTENTS of this ZIP to the root of the ThroupleTea website repository and replace matching files.

Changes:
- script.js sends one Cloudflare-only page_view after the analytics bridge initializes.
- GA4 automatic page views are not duplicated.
- HTML files use script.js?v=9 so Safari/GitHub Pages fetch the corrected script.
- Existing click events, Cloudflare endpoint, OneSignal, and UI are preserved.

Expected timing:
- Event reaches Cloudflare almost immediately.
- An open Dashboard refreshes its Website Growth section within about 60 seconds.
- A closed Dashboard displays stored events when reopened.
