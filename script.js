var yearNode = document.getElementById('year');
if (yearNode) yearNode.textContent = new Date().getFullYear();

/* Unified site header + hamburger navigation. Does not touch OneSignal. */
(function () {
  var hdr = document.querySelector('.simple-header');
  if (!hdr) return;

  var headerWrap = hdr.querySelector(':scope > .wrap') || hdr.querySelector('.wrap');
  var btn = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');

  /* Keep the Hotline permanently visible on every legacy page. */
  if (headerWrap) {
    var hotline = headerWrap.querySelector('.header-hotline');
    var oldNavHotline = hdr.querySelector('.nav-hotline');
    var oldRow = hdr.querySelector('.hotline-row');
    var oldRowLink = oldRow ? oldRow.querySelector('a') : null;

    if (!hotline) {
      hotline = document.createElement('a');
      hotline.className = 'header-hotline';
      hotline.setAttribute('aria-label', 'Open the Throuple Hotline');
      if (btn) headerWrap.insertBefore(hotline, btn);
      else if (nav) headerWrap.insertBefore(hotline, nav);
      else headerWrap.appendChild(hotline);
    }

    hotline.href = '/#hotline';
    hotline.innerHTML = '☎️ <span>Throuple Hotline</span>';

    if (oldNavHotline && oldNavHotline !== hotline) oldNavHotline.remove();
    if (oldRowLink && oldRowLink !== hotline) oldRowLink.remove();
    if (oldRow) oldRow.remove();
  }

  if (!btn || !nav) return;

  hdr.classList.add('nav-ready');

  function updateHeaderHeight() {
    document.documentElement.style.setProperty('--header-height', hdr.offsetHeight + 'px');
  }

  function openNav() {
    updateHeaderHeight();
    hdr.classList.add('nav-open');
    nav.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close navigation menu');
    btn.innerHTML = '&#10005;';
  }

  function closeNav() {
    hdr.classList.remove('nav-open');
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open navigation menu');
    btn.innerHTML = '&#9776;';
  }

  updateHeaderHeight();
  window.addEventListener('resize', updateHeaderHeight);

  btn.addEventListener('click', function (event) {
    event.stopPropagation();
    hdr.classList.contains('nav-open') ? closeNav() : openNav();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeNav();
  });

  document.addEventListener('click', function (event) {
    if (hdr.classList.contains('nav-open') && !hdr.contains(event.target)) closeNav();
  });

  nav.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') closeNav();
  });
}());

/* Shared Hotline positioning for legacy pages that rely on styles.css. */
(function () {
  var style = document.createElement('style');
  style.id = 'unified-hotline-header-style';
  style.textContent = `
    .simple-header > .wrap,
    .simple-header .header-inner {
      display:flex !important;
      align-items:center !important;
      gap:18px !important;
    }
    .simple-header .brand { flex:0 0 auto; }
    .simple-header .header-hotline {
      display:inline-flex !important;
      align-items:center;
      justify-content:center;
      gap:7px;
      min-height:42px;
      padding:9px 14px;
      border-radius:999px;
      color:#fff;
      text-decoration:none;
      font-weight:900;
      white-space:nowrap;
      background:linear-gradient(135deg,#ff005d,#ff7a18);
      box-shadow:0 0 18px rgba(255,0,93,.34);
      flex:0 0 auto;
      order:2;
    }
    .simple-header .nav-toggle { order:4; }
    .simple-header .simple-nav { order:3; flex:1; }
    @media(max-width:900px) {
      .simple-header > .wrap,
      .simple-header .header-inner { gap:10px !important; flex-wrap:nowrap !important; }
      .simple-header .brand { order:1; }
      .simple-header .header-hotline { order:2; margin-left:auto; font-size:.86rem; padding:9px 12px; }
      .simple-header .nav-toggle { order:3; flex:0 0 44px; }
      .simple-header .simple-nav { order:4; }
    }
    @media(max-width:390px) {
      .simple-header .header-hotline { font-size:.76rem; padding:8px 8px; gap:4px; }
      .simple-header .brand img { height:40px !important; }
    }
  `;
  document.head.appendChild(style);
}());
