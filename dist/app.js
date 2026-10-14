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
  const attributedCheckout = window.DFL_TRACKING?.checkoutUrl(checkout) || checkout;
  document.querySelectorAll('[data-checkout]').forEach(link => { link.href = attributedCheckout; });
}
if (typeof config.standardDelivery === 'string' && config.standardDelivery.trim()) {
  document.querySelector('[data-delivery]').textContent = config.standardDelivery;
}
document.querySelector('#privacy-button').addEventListener('click', () => showInfo('Sua privacidade.', 'Usamos o Pixel da Meta para medir visitas, visualizações do produto e cliques nos botões de compra, ajudando a avaliar os anúncios. A Meta pode receber a URL acessada, identificadores de cookies e dados técnicos do navegador. Os parâmetros da campanha e do clique no anúncio são encaminhados ao checkout para relacionar o acesso à venda. Esta página não tem formulário e não envia nome, e-mail ou telefone ao Pixel. Respeitamos o sinal Global Privacy Control do navegador para desativar o Pixel nesta página. Google Fonts, LiteVideo e a hospedagem também podem receber dados técnicos de acesso. O pagamento e os eventos do checkout são processados pela Lowify, conforme suas políticas.'));
