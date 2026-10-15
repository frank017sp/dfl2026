'use strict';
(() => {
  const template = document.querySelector('template[data-deferred-video]');
  if (!template) return;
  const container = template.parentElement;
  const mount = () => {
    if (template.isConnected) template.replaceWith(template.content.cloneNode(true));
  };
  if (!('IntersectionObserver' in window)) {
    mount();
    return;
  }
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      observer.disconnect();
      mount();
    }
  }, {rootMargin: '300px 0px'});
  observer.observe(container);
})();
