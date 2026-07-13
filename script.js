document.getElementById('year').textContent = new Date().getFullYear();

/* Hamburger nav toggle — does not touch OneSignal */
(function () {
  var hdr = document.querySelector('.simple-header');
  var btn = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (!hdr || !btn || !nav) return;

  // Mark ready so CSS collapses the nav (JS-gated: safe fallback without JS)
  hdr.classList.add('nav-ready');

  function openNav() {
    hdr.classList.add('nav-open');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close navigation menu');
    btn.innerHTML = '&#10005;';
  }

  function closeNav() {
    hdr.classList.remove('nav-open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open navigation menu');
    btn.innerHTML = '&#9776;';
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    hdr.classList.contains('nav-open') ? closeNav() : openNav();
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (hdr.classList.contains('nav-open') && !hdr.contains(e.target)) closeNav();
  });

  // Close when a nav link is selected
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') closeNav();
  });
}());
