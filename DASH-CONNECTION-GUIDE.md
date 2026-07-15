# Throuple Tea Dash Connection — Round 6.0

The public website now mirrors every existing GA4 event into one normalized dashboard payload. It does not send those payloads anywhere until a real HTTPS ingestion endpoint is configured in `analytics-config.js`.

## Needed from the current Dash project

Provide the latest complete Dash ZIP or repository access. The integration needs to identify:

1. Framework and hosting provider.
2. Current database or analytics source.
3. Existing API route or serverless-function structure.
4. Authentication model for the private dashboard.
5. Current chart/card data shapes.
6. Deployment environment variables.

Do not place a private database password, GA service-account key, or admin token in `analytics-config.js`. Public browser code can contain only a restricted public ingestion key, if the Dash backend supports one.

## Dashboard event endpoint contract

Recommended route: `POST https://<dash-domain>/api/analytics/ingest`

Expected JSON shape:

```json
{
  "schema_version": "1.0",
  "site_version": "6.0.0",
  "event_id": "e_uuid",
  "event_name": "starter_episode_click",
  "event_time": "2026-07-15T00:00:00.000Z",
  "visitor_id": "v_uuid",
  "session_id": "s_uuid",
  "page_path": "/start-here/",
  "page_title": "Start Here | A Little Throuple Tea",
  "page_url": "https://throupletea.com/start-here/",
  "referrer": "",
  "device_type": "mobile",
  "viewport_width": 390,
  "viewport_height": 844,
  "installed_app": false,
  "online": true,
  "campaign": {"utm_source": "instagram"},
  "properties": {"episode_slug": "...", "link_text": "..."}
}
```

The backend should validate event names and field lengths, rate-limit requests, reject unexpected origins, deduplicate by `event_id`, and avoid storing IP addresses longer than operationally necessary.

## Enabling after the Dash endpoint exists

Update only these fields in `analytics-config.js`:

```js
endpoint: 'https://YOUR-DASH-DOMAIN/api/analytics/ingest',
publicKey: 'OPTIONAL_RESTRICTED_PUBLIC_INGEST_KEY'
```

GA4 continues working whether the endpoint is blank, online, or temporarily unavailable. Failed dashboard events are queued locally and retried when the visitor returns online.
