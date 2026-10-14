/* Site events only. Checkout and approved payments are tracked by Lowify. */
(function () {
  'use strict';
  if (window.DFL_TRACKING) return;

  const config = window.DFL_CONFIG || {};
  const pixelId = String(config.metaPixelId || '');
  const allowedParameters = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id', 'fbclid'];
  const privacyRestricted = navigator.globalPrivacyControl === true;
  const enabled = /^[0-9]{5,25}$/.test(pixelId)
    && Array.isArray(config.trackingHosts)
    && config.trackingHosts.includes(window.location.hostname)
    && !privacyRestricted;

  function checkoutUrl(value) {
    try {
      const target = new URL(value);
      if (target.protocol !== 'https:') return null;
      if (privacyRestricted) return target.href;
      const source = new URLSearchParams(window.location.search);
      allowedParameters.forEach(key => {
        const parameter = source.get(key);
        const maxLength = key === 'fbclid' ? 500 : 200;
        if (parameter && parameter.length <= maxLength && !/[\x00-\x1F\x7F]/.test(parameter)) {
          target.searchParams.set(key, parameter);
        }
      });
      return target.href;
    } catch { return null; }
  }

  window.DFL_TRACKING = Object.freeze({ checkoutUrl });
  if (!enabled) return;

  // Official asynchronous queue: a slow or blocked Pixel never delays checkout.
  if (!window.fbq) {
    const fbq = window.fbq = function () {
      if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
      else fbq.queue.push(arguments);
    };
    if (!window._fbq) window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
  }

  // Explicit events prevent automatic button detection from inflating conversions.
  window.fbq('set', 'autoConfig', false, pixelId);
  window.fbq('init', pixelId);
  const sent = new Set();
  const product = {
    content_ids: [String(config.productId)],
    content_name: config.productName,
    content_type: 'product',
    value: config.productValue,
    currency: config.currency
  };

  function trackOnce(name, data, custom) {
    if (sent.has(name)) return;
    sent.add(name);
    window.fbq(custom ? 'trackSingleCustom' : 'trackSingle', pixelId, name, data);
  }

  function pageViewed() {
    if (document.visibilityState === 'hidden') return;
    trackOnce('PageView', {});
    trackOnce('ViewContent', product);
  }
  pageViewed();
  document.addEventListener('visibilitychange', pageViewed);

  document.querySelectorAll('[data-checkout]').forEach(link => {
    const clicked = event => {
      if (event.defaultPrevented || (event.type === 'auxclick' && event.button !== 1)) return;
      if (event.type === 'click' && event.button > 0) return;
      trackOnce('CheckoutClick', { ...product, cta_position: link.dataset.ctaPosition || 'site' }, true);
    };
    link.addEventListener('click', clicked);
    link.addEventListener('auxclick', clicked);
  });
})();
