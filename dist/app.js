'use strict';
const config = window.DFL_CONFIG || {};
const dialog = document.querySelector('#info-dialog');
function showInfo(title, text) {
  document.querySelector('#dialog-title').textContent = title;
  document.querySelector('#dialog-text').textContent = text;
  dialog.showModal();
}
function safeHttpsUrl(value) {
  try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; } catch { return null; }
}
document.querySelectorAll('.dialog-close,.dialog-done').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
const checkout = safeHttpsUrl(config.checkoutUrl);
document.querySelector('.sales-status').hidden = Boolean(checkout);
document.querySelectorAll('[data-checkout]').forEach(button => button.addEventListener('click', () => {
  if (checkout) { window.location.assign(checkout); return; }
  showInfo('O jogo está quase começando.', 'As vendas estão em preparação. O pagamento ainda não está disponível. Volte em breve para conferir o checkout e as informações de entrega.');
}));
document.querySelectorAll('[data-support]').forEach(button => button.addEventListener('click', () => {
  const number = String(config.whatsappNumber || '').replace(/\D/g, '');
  if (/^55\d{10,11}$/.test(number)) {
    window.location.assign('https://wa.me/' + number + '?text=' + encodeURIComponent('Olá! Quero tirar uma dúvida sobre a compatibilidade e a entrega do DFL 2026.'));
    return;
  }
  showInfo('Papo reto sobre seu Android.', 'Os requisitos mínimos e o canal de atendimento serão disponibilizados antes da abertura das vendas. Confira essas informações antes de realizar o pagamento.');
}));
document.querySelectorAll('[data-config]').forEach(element => {
  const value = config[element.dataset.config];
  if (typeof value === 'string' && value.trim()) element.textContent = value;
});
if (config.standardDelivery) {
  document.querySelector('[data-delivery]').textContent = config.standardDelivery;
  document.querySelectorAll('.faq-items details')[2].querySelector('p').textContent = 'O jogo custa R$ 5. ' + config.standardDelivery + ' Receber o acesso imediatamente pelo WhatsApp, após a confirmação do pagamento, é opcional e custa mais R$ 3. Com o adicional, o total é R$ 8.';
}
if (config.minimumAndroid && config.minimumRam && config.requiredStorage) {
  document.querySelector('.faq-items details p').textContent = 'A proposta é ser leve para Android, mas o desempenho varia conforme o aparelho. Requisitos: ' + config.minimumAndroid + ', ' + config.minimumRam + ' de RAM e ' + config.requiredStorage + ' livres. Confira essas informações antes de comprar.';
}
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab, focus = false) {
  tabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  });
  if (focus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', event => {
    const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length : event.key === 'ArrowLeft' ? (index + tabs.length - 1) % tabs.length : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : null;
    if (next !== null) { event.preventDefault(); selectTab(tabs[next], true); }
  });
});
const videoUrl = safeHttpsUrl(config.gameplayVideoUrl);
if (videoUrl) {
  const video = document.createElement('video');
  video.controls = true;
  video.playsInline = true;
  video.preload = 'metadata';
  video.src = videoUrl;
  video.setAttribute('aria-label', 'Demonstração real do DFL 2026');
  video.style.cssText = 'width:100%;height:auto;max-height:510px;object-fit:contain;border:1px solid #5e7048;border-radius:12px;align-self:center';
  document.querySelector('.hero-art').replaceWith(video);
}
document.querySelector('#privacy-button').addEventListener('click', () => showInfo('Sua privacidade.', 'Esta página não possui cadastro nem formulário de coleta de dados. Fontes são carregadas pelo Google Fonts e a hospedagem pode registrar dados técnicos de acesso. Ao acessar um checkout ou o WhatsApp, valem também as políticas desses serviços.'));
