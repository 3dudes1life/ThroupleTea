/* Throuple Tea analytics bridge configuration.
   Public website file: never place private API secrets here. */
window.ThroupleTeaAnalytics = Object.assign({
  version: '6.1.0-connected',
  endpoint: 'https://throupletea-sync-api.round-disk-6577.workers.dev/v1/analytics/event',
  publicKey: '',
  debug: false,
  queueLimit: 100,
  requestTimeoutMs: 5000
}, window.ThroupleTeaAnalytics || {});
