// watch.js
// Pulls ALL videos from your channel and splits them into:
// - Shorts: duration < 180 seconds
// - Full episodes: duration >= 180 seconds

const API_KEY = 'AIzaSyCakGcpxrr8UU5V4dqKhwGz-IGpxlrSl-0';
const CHANNEL_ID = 'UCswzye8bcm8bByqLlW0QaFQ';
const PAGE_SIZE = 50; // YouTube API maximum per request

const shortsGrid    = document.getElementById('shorts-grid');
const episodesGrid  = document.getElementById('episodes-grid');
const shortsNote    = document.getElementById('shorts-note');
const shortsError   = document.getElementById('shorts-error');
const episodesNote  = document.getElementById('episodes-note');
const episodesError = document.getElementById('episodes-error');

// Utility: parse ISO 8601 YouTube duration (PT#M#S) -> seconds
function parseDurationToSeconds(iso) {
  // Examples: PT59S, PT1M2S, PT10M, PT1H2M10S
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  if (!match) return 0;

  const hours = parseInt(match[1] || '0', 10);
  const mins  = parseInt(match[2] || '0', 10);
  const secs  = parseInt(match[3] || '0', 10);

  return hours * 3600 + mins * 60 + secs;
}

async function fetchJson(url) {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || data.error) {
    const message =
      data?.error?.message ||
      `YouTube API request failed with status ${response.status}.`;

    throw new Error(message);
  }

  return data;
}

async function fetchAllVideoIds() {
  const videoIds = [];
  let nextPageToken = '';

  do {
    const searchUrl =
      `https://www.googleapis.com/youtube/v3/search?` +
      `key=${encodeURIComponent(API_KEY)}` +
      `&channelId=${encodeURIComponent(CHANNEL_ID)}` +
      `&part=id` +
      `&order=date` +
      `&maxResults=${PAGE_SIZE}` +
      `&type=video` +
      (nextPageToken
        ? `&pageToken=${encodeURIComponent(nextPageToken)}`
        : '');

    const searchData = await fetchJson(searchUrl);

    for (const item of searchData.items || []) {
      const videoId = item?.id?.videoId;

      if (videoId) {
        videoIds.push(videoId);
      }
    }

    nextPageToken = searchData.nextPageToken || '';
  } while (nextPageToken);

  // Prevent duplicates just in case YouTube returns any
  return [...new Set(videoIds)];
}

async function fetchVideoDetails(videoIds) {
  const videos = [];

  // YouTube only allows 50 video IDs per details request
  for (let i = 0; i < videoIds.length; i += PAGE_SIZE) {
    const batchIds = videoIds.slice(i, i + PAGE_SIZE);

    const detailsUrl =
      `https://www.googleapis.com/youtube/v3/videos?` +
      `key=${encodeURIComponent(API_KEY)}` +
      `&id=${encodeURIComponent(batchIds.join(','))}` +
      `&part=contentDetails,snippet`;

    const detailsData = await fetchJson(detailsUrl);

    videos.push(...(detailsData.items || []));
  }

  return videos;
}

async function fetchVideos() {
  try {
    clearErrors();

    // 1. Get every video ID from every results page
    const videoIds = await fetchAllVideoIds();

    if (videoIds.length === 0) {
      throw new Error('No video IDs found for this channel.');
    }

    // 2. Get duration, title, and publish date for every video
    const videoDetails = await fetchVideoDetails(videoIds);

    const shorts = [];
    const episodes = [];

    for (const item of videoDetails) {
      const durationIso = item.contentDetails?.duration;
      const snippet = item.snippet;
      const videoId = item.id;

      if (!durationIso || !snippet || !videoId) continue;

      const seconds = parseDurationToSeconds(durationIso);
      const publishedAt = new Date(snippet.publishedAt);

      const videoObj = {
        id: videoId,
        title: snippet.title,
        seconds,
        publishedAt
      };

      if (seconds < 180) {
        shorts.push(videoObj);
      } else {
        episodes.push(videoObj);
      }
    }

    // Sort newest -> oldest
    shorts.sort((a, b) => b.publishedAt - a.publishedAt);
    episodes.sort((a, b) => b.publishedAt - a.publishedAt);

    renderVideos(shortsGrid, shorts);
    renderVideos(episodesGrid, episodes);

    if (shortsNote) {
      shortsNote.textContent = shorts.length
        ? `Showing all ${shorts.length} short${shorts.length === 1 ? '' : 's'} under 3 minutes.`
        : 'No shorts found yet — check back soon.';
    }

    if (episodesNote) {
      episodesNote.textContent = episodes.length
        ? `Showing all ${episodes.length} full episode${episodes.length === 1 ? '' : 's'}.`
        : 'No full episodes found yet — check back soon.';
    }
  } catch (err) {
    console.error('Unable to load YouTube videos:', err);

    const msg =
      'Oops, we couldn’t load videos from YouTube right now. Try refreshing in a bit.';

    if (shortsError) {
      shortsError.style.display = 'block';
      shortsError.textContent = msg;
    }

    if (episodesError) {
      episodesError.style.display = 'block';
      episodesError.textContent = msg;
    }
  }
}

function clearErrors() {
  if (shortsError) {
    shortsError.style.display = 'none';
    shortsError.textContent = '';
  }

  if (episodesError) {
    episodesError.style.display = 'none';
    episodesError.textContent = '';
  }
}

function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${mins}m ${secs}s`;
  }

  if (mins === 0) {
    return `${secs}s`;
  }

  if (secs === 0) {
    return `${mins}m`;
  }

  return `${mins}m ${secs}s`;
}

function escapeHtmlAttribute(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderVideos(container, videos) {
  if (!container) return;

  container.innerHTML = '';

  videos.forEach(video => {
    const card = document.createElement('article');
    card.className = 'video-card';

    const thumb = document.createElement('div');
    thumb.className = 'video-thumb';

    thumb.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${encodeURIComponent(video.id)}"
        title="${escapeHtmlAttribute(video.title)}"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    `;

    const meta = document.createElement('div');
    meta.className = 'video-meta';

    const titleEl = document.createElement('h3');
    titleEl.className = 'video-title';
    titleEl.textContent = video.title;

    const extra = document.createElement('div');
    extra.className = 'video-extra';

    const dur = document.createElement('span');
    dur.textContent = formatDuration(video.seconds);

    const date = document.createElement('span');
    date.textContent = video.publishedAt.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    extra.appendChild(dur);
    extra.appendChild(date);

    meta.appendChild(titleEl);
    meta.appendChild(extra);

    card.appendChild(thumb);
    card.appendChild(meta);

    container.appendChild(card);
  });
}

// Kick it off
fetchVideos();
