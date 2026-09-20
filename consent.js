/* Basic consent: the Google tag is not loaded until analytics is accepted. */
(() => {
  'use strict';
  const cookieName = 'apexiar_consent';
  const tagId = 'GT-M398J42C';
  const scriptUrl = document.currentScript.src;
  const policyUrl = new URL('cookies.html', scriptUrl).href;
  let loaded = false;
  let returnFocus = null;
  const readChoice = () => {
    const value = document.cookie.split('; ').find(item => item.startsWith(cookieName + '='))?.split('=')[1];
    return value === 'v1.accept' ? 'accept' : value === 'v1.reject' ? 'reject' : null;
  };
  const clearAnalyticsCookies = () => {
    const domains = location.hostname.split('.');
    const scopes = ['', ...domains.map((_, i) => domains.slice(i).join('.')).filter(domain => domain.includes('.')).flatMap(domain => [domain, '.' + domain])];
    const paths = ['/', ...location.pathname.split('/').slice(0, -1).map((_, i, parts) => parts.slice(0, i + 1).join('/') || '/')];
    document.cookie.split(';').map(item => item.trim().split('=')[0]).filter(name => /^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name)).forEach(name => {
      scopes.forEach(domain => paths.forEach(path => {
        document.cookie = `${name}=; Max-Age=0; Path=${path};${domain ? ' Domain=' + domain + ';' : ''} SameSite=Lax`;
      }));
    });
  };
  const loadAnalytics = () => {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    window.gtag('config', tagId, { allow_google_signals: false, allow_ad_personalization_signals: false });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + tagId;
    document.head.appendChild(script);
  };
  const init = () => {
    const panel = document.createElement('section');
    panel.className = 'cookie-panel';
    panel.setAttribute('aria-labelledby', 'cookie-heading');
    panel.hidden = true;
    panel.innerHTML = `<div class="cookie-panel__copy"><h2 id="cookie-heading">Your cookie choices</h2><p>We use a necessary cookie to remember your choice for 12 months. With your permission, Google Analytics helps us understand site usage. You can reject analytics and still use the website.</p><a href="${policyUrl}">Read our cookie policy</a><p class="cookie-panel__status" role="status"></p></div><div class="cookie-panel__actions"><button type="button" data-choice="reject">Reject analytics</button><button type="button" data-choice="accept">Accept analytics</button><button type="button" data-cookie-close hidden>Close settings</button></div>`;
    document.body.appendChild(panel);
    const close = panel.querySelector('[data-cookie-close]');
    const status = panel.querySelector('[role="status"]');
    const hide = () => { panel.hidden = true; returnFocus?.focus(); returnFocus = null; };
    panel.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => {
      const choice = button.dataset.choice;
      document.cookie = `${cookieName}=v1.${choice}; Max-Age=31536000; Path=/; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
      if (choice === 'reject') {
        clearAnalyticsCookies();
        if (loaded) {
          window.gtag('consent', 'update', { analytics_storage: 'denied' });
          // Reload discards the already-loaded tag; it stays unloaded on the next page.
          location.reload();
          return;
        }
      } else loadAnalytics();
      if (readChoice() !== choice) {
        status.textContent = 'Your browser did not save this choice. It applies to this page only; you may be asked again on your next visit.';
        close.hidden = false;
      } else hide();
    }));
    close.addEventListener('click', hide);
    document.querySelectorAll('[data-cookie-settings]').forEach(button => {
      button.hidden = false;
      button.addEventListener('click', () => {
        returnFocus = button;
        close.hidden = false;
        panel.hidden = false;
        status.textContent = readChoice() === 'accept' ? 'Analytics is currently accepted. Rejecting analytics will reload this page to stop the active tag.' : 'Analytics is currently off.';
        panel.querySelector('[data-choice="reject"]').focus();
      });
    });
    const choice = readChoice();
    if (choice === 'accept') loadAnalytics();
    else { clearAnalyticsCookies(); panel.hidden = choice === 'reject'; }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
