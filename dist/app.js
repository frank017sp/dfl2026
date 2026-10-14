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
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const r = dialog.getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
});
const checkout = safeHttpsUrl(config.checkoutUrl);
if (checkout) {
  document.querySelectorAll('[data-checkout]').forEach(link => { link.href = checkout; });
}
if (typeof config.standardDelivery === 'string' && config.standardDelivery.trim()) {
  document.querySelector('[data-delivery]').textContent = config.standardDelivery;
}
document.querySelector('#privacy-button').addEventListener('click', () => showInfo('Sua privacidade.', 'Esta página não possui cadastro nem formulário de coleta de dados. Fontes são carregadas pelo Google Fonts. O vídeo usa o player LiteVideo, que pode receber dados técnicos de acesso. A hospedagem também pode registrar esses dados. Ao acessar o checkout, valem também as políticas desse serviço.'));
