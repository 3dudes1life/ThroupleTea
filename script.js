var yearNode = document.getElementById('year');
if (yearNode) yearNode.textContent = new Date().getFullYear();

/* One professional header system for every main/legacy page. Does not touch OneSignal. */
(function () {
  var hdr = document.querySelector('.simple-header');
  if (!hdr) return;

  var headerWrap = hdr.querySelector(':scope > .wrap') || hdr.querySelector('.wrap');
  var btn = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');

  /* Match mobile browser/PWA chrome to the header. */
  var theme = document.querySelector('meta[name="theme-color"]');
  if (!theme) {
    theme = document.createElement('meta');
    theme.name = 'theme-color';
    document.head.appendChild(theme);
  }
  theme.content = '#160712';

  /* Remove every older duplicate Hotline placement. */
  hdr.querySelectorAll('.nav-hotline, .hotline-row, .header-hotline').forEach(function (node) {
    node.remove();
  });

  /* Create one permanent Hotline action. */
  if (headerWrap) {
    var hotline = document.createElement('a');
    hotline.className = 'header-hotline';
    hotline.href = '/#hotline';
    hotline.setAttribute('aria-label', 'Open the Throuple Hotline');
    hotline.innerHTML = '<span aria-hidden="true">☎️</span><span class="hotline-label">Throuple Hotline</span>';
    if (nav) headerWrap.insertBefore(hotline, nav);
    else if (btn) headerWrap.insertBefore(hotline, btn);
    else headerWrap.appendChild(hotline);
  }

  hdr.classList.add('unified-header');

  var style = document.createElement('style');
  style.id = 'throuple-tea-unified-header-v3';
  style.textContent = `
    :root{
      --tt-header-left:#1d0613;
      --tt-header-mid:#10101a;
      --tt-header-right:#041d25;
      --tt-pink:#ff005d;
      --tt-orange:#ff7a18;
      --tt-teal:#00d7e8;
    }

    html,body{background-color:#160712}

    .simple-header.unified-header{
      position:sticky!important;
      top:0!important;
      z-index:99999!important;
      margin:0!important;
      padding:0!important;
      background:
        linear-gradient(100deg,var(--tt-header-left) 0%,var(--tt-header-mid) 48%,var(--tt-header-right) 100%)!important;
      border-bottom:1px solid rgba(255,42,127,.42)!important;
      box-shadow:0 10px 34px rgba(0,0,0,.38)!important;
      backdrop-filter:saturate(150%) blur(18px)!important;
      -webkit-backdrop-filter:saturate(150%) blur(18px)!important;
    }

    .simple-header.unified-header::before{
      content:"";
      position:absolute;
      left:0;
      right:0;
      bottom:100%;
      height:max(0px,env(safe-area-inset-top));
      background:
        linear-gradient(100deg,var(--tt-header-left) 0%,var(--tt-header-mid) 48%,var(--tt-header-right) 100%);
    }

    .simple-header.unified-header > .wrap,
    .simple-header.unified-header .header-inner{
      width:min(calc(100% - 32px),1180px)!important;
      max-width:1180px!important;
      min-height:78px!important;
      height:auto!important;
      margin:0 auto!important;
      padding:10px 0!important;
      display:grid!important;
      grid-template-columns:auto minmax(0,1fr) auto!important;
      grid-template-areas:"brand nav hotline"!important;
      align-items:center!important;
      gap:22px!important;
    }

    .simple-header.unified-header .brand{
      grid-area:brand!important;
      display:flex!important;
      align-items:center!important;
      margin:0!important;
    }

    .simple-header.unified-header .brand img{
      height:50px!important;
      width:auto!important;
      display:block!important;
      border-radius:11px!important;
      box-shadow:0 0 18px rgba(255,0,93,.30)!important;
    }

    .simple-header.unified-header .simple-nav{
      grid-area:nav!important;
      display:flex!important;
      align-items:center!important;
      justify-content:center!important;
      gap:18px!important;
      flex-wrap:wrap!important;
      margin:0!important;
      padding:0!important;
      position:static!important;
      background:none!important;
      border:0!important;
    }

    .simple-header.unified-header .simple-nav a{
      margin:0!important;
      padding:7px 0!important;
      color:#fff!important;
      text-decoration:none!important;
      font-size:.9rem!important;
      font-weight:800!important;
      border:0!important;
      background:none!important;
      white-space:nowrap!important;
    }

    .simple-header.unified-header .simple-nav a:hover,
    .simple-header.unified-header .simple-nav a.active{
      color:var(--tt-pink)!important;
      text-shadow:0 0 12px rgba(255,0,93,.55)!important;
    }

    .simple-header.unified-header .header-hotline{
      grid-area:hotline!important;
      display:inline-flex!important;
      align-items:center!important;
      justify-content:center!important;
      gap:7px!important;
      min-height:43px!important;
      padding:9px 15px!important;
      border-radius:999px!important;
      color:#fff!important;
      text-decoration:none!important;
      font-size:.9rem!important;
      font-weight:900!important;
      white-space:nowrap!important;
      background:linear-gradient(135deg,var(--tt-pink),var(--tt-orange))!important;
      box-shadow:0 7px 22px rgba(255,0,93,.30)!important;
    }

    .simple-header.unified-header .nav-toggle{display:none!important}

    @media(max-width:980px){
      .simple-header.unified-header > .wrap,
      .simple-header.unified-header .header-inner{
        width:100%!important;
        max-width:none!important;
        min-height:78px!important;
        padding:calc(env(safe-area-inset-top,0px) + 12px) 16px 12px!important;
        grid-template-columns:auto minmax(0,1fr) 48px!important;
        grid-template-areas:"brand hotline toggle"!important;
        gap:10px!important;
      }

      .simple-header.unified-header .brand img{height:44px!important}

      .simple-header.unified-header .header-hotline{
        justify-self:center!important;
        width:auto!important;
        max-width:230px!important;
        min-height:42px!important;
        padding:8px 14px!important;
        font-size:.86rem!important;
      }

      .simple-header.unified-header .nav-toggle{
        grid-area:toggle!important;
        display:inline-flex!important;
        align-items:center!important;
        justify-content:center!important;
        width:48px!important;
        height:48px!important;
        min-width:48px!important;
        min-height:48px!important;
        padding:0!important;
        margin:0!important;
        border:1px solid rgba(0,215,232,.42)!important;
        border-radius:14px!important;
        background:rgba(4,29,37,.58)!important;
        color:#fff!important;
        font-size:1.3rem!important;
        line-height:1!important;
        box-shadow:none!important;
      }

      .simple-header.unified-header .simple-nav{
        display:none!important;
        position:fixed!important;
        top:var(--header-height,78px)!important;
        left:0!important;
        right:0!important;
        max-height:calc(100dvh - var(--header-height,78px))!important;
        overflow-y:auto!important;
        padding:8px 0 calc(18px + env(safe-area-inset-bottom))!important;
        background:linear-gradient(180deg,rgba(5,8,18,.995),rgba(4,20,28,.995))!important;
        border-top:1px solid rgba(255,42,127,.30)!important;
        border-bottom:1px solid rgba(0,215,232,.22)!important;
        box-shadow:0 22px 50px rgba(0,0,0,.5)!important;
        flex-direction:column!important;
        align-items:stretch!important;
        gap:0!important;
      }

      .simple-header.unified-header.nav-open .simple-nav,
      .simple-header.unified-header .simple-nav.open{
        display:flex!important;
      }

      .simple-header.unified-header .simple-nav a{
        display:block!important;
        padding:16px 22px!important;
        font-size:1rem!important;
        border-bottom:1px solid rgba(255,255,255,.07)!important;
      }
    }

    @media(max-width:430px){
      .simple-header.unified-header > .wrap,
      .simple-header.unified-header .header-inner{
        grid-template-columns:48px minmax(0,1fr) 48px!important;
        padding-left:14px!important;
        padding-right:14px!important;
      }

      .simple-header.unified-header .brand img{height:42px!important}
      .simple-header.unified-header .header-hotline{
        max-width:188px!important;
        padding:8px 11px!important;
        font-size:.78rem!important;
        gap:5px!important;
      }
    }

    @media(max-width:355px){
      .simple-header.unified-header .hotline-label{display:none!important}
      .simple-header.unified-header .header-hotline{
        width:44px!important;
        height:44px!important;
        padding:0!important;
      }
    }
  `;
  document.head.appendChild(style);

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
