document.getElementById('year').textContent = new Date().getFullYear();

(function addThroupleHotlineLinks() {
  const hotlineHref = window.location.pathname === '/' ? '#social-tea' : '/#social-tea';
  const nav = document.querySelector('.simple-nav');

  if (nav && !nav.querySelector('[data-hotline-nav]') && !nav.querySelector('.hotline-nav-link')) {
    const guestLink = nav.querySelector('a[href="/guest/"]');
    const hotlineLink = document.createElement('a');
    hotlineLink.href = hotlineHref;
    hotlineLink.textContent = '☎️ Throuple Hotline';
    hotlineLink.setAttribute('data-hotline-nav', 'true');
    hotlineLink.className = 'hotline-nav-link';

    if (guestLink) {
      nav.insertBefore(hotlineLink, guestLink);
    } else {
      nav.appendChild(hotlineLink);
    }
  }

  const ctaRow = document.querySelector('.hero .cta-row');
  if (ctaRow && !ctaRow.querySelector('[data-hotline-cta]') && !ctaRow.querySelector('.hotline-hero-cta')) {
    const hotlineCta = document.createElement('a');
    hotlineCta.href = '#social-tea';
    hotlineCta.className = 'btn primary hotline-hero-cta';
    hotlineCta.setAttribute('data-hotline-cta', 'true');
    hotlineCta.textContent = '☎️ Send Us a Topic';
    ctaRow.appendChild(hotlineCta);
  }

  const style = document.createElement('style');
  style.textContent = `
    .simple-nav a.hotline-nav-link {
      color: #fff;
      background: linear-gradient(135deg, var(--hot-pink, #ff005d), var(--orange, #ff7a18));
      padding: .45rem .85rem;
      border-radius: 999px;
      box-shadow: 0 0 18px rgba(255,0,93,.38);
    }
    .simple-nav a.hotline-nav-link:hover {
      color: #fff;
      transform: translateY(-1px);
      box-shadow: 0 0 24px rgba(255,0,93,.58);
    }
    .hotline-hero-cta {
      animation: hotlinePulse 2.4s ease-in-out infinite;
    }
    @keyframes hotlinePulse {
      0%, 100% { box-shadow: 0 8px 24px rgba(255,0,93,.35); }
      50% { box-shadow: 0 10px 32px rgba(255,0,93,.68), 0 0 18px rgba(255,122,24,.45); }
    }
    @media(max-width:760px) {
      .simple-nav a.hotline-nav-link {
        width: 100%;
        justify-content: center;
        text-align: center;
        font-size: 1rem;
      }
    }
  `;
  document.head.appendChild(style);
})();
