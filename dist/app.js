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
document.querySelector('.sales-status').hidden = Boolean(checkout);
document.querySelector('[data-checkout]').addEventListener('click', () => {
  if (checkout) { window.location.assign(checkout); return; }
  showInfo('O jogo está quase começando.', 'As vendas estão em preparação. O pagamento ainda não está disponível. Volte em breve para conferir seu acesso.');
});
if (typeof config.standardDelivery === 'string' && config.standardDelivery.trim()) {
  document.querySelector('[data-delivery]').textContent = config.standardDelivery;
}
const videoUrl = safeHttpsUrl(config.gameplayVideoUrl);
if (videoUrl) {
  const video = document.createElement('video');
  video.controls = true;
  video.playsInline = true;
  video.preload = 'metadata';
  video.src = videoUrl;
  video.className = 'gameplay-video';
  video.setAttribute('aria-label', 'Vídeo do DFL 2026');
  document.querySelector('.video-placeholder').replaceWith(video);
  document.querySelector('#media-caption').textContent = 'DFL 2026 · veja o jogo em ação.';
  video.addEventListener('error', () => {
    document.querySelector('#media-caption').textContent = 'O vídeo não carregou. Tente novamente em instantes.';
  });
}
document.querySelector('#privacy-button').addEventListener('click', () => showInfo('Sua privacidade.', 'Esta página não possui cadastro nem formulário de coleta de dados. Fontes são carregadas pelo Google Fonts e a hospedagem pode registrar dados técnicos de acesso. Ao acessar o checkout, valem também as políticas desse serviço.'));
