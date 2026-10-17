import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';

const source = fs.readFileSync(new URL('../dist/tracking.js', import.meta.url), 'utf8');
const configSource = fs.readFileSync(new URL('../dist/config.js', import.meta.url), 'utf8');

function browser({hostname = 'jogueagora.vercel.app', search = '', gpc = false, hidden = false, existingPixel = false} = {}) {
  const scripts = [], calls = [], documentEvents = {};
  const links = ['video-principal', 'oferta'].map(position => ({
    dataset: {ctaPosition: position}, handlers: {},
    addEventListener(name, fn) { this.handlers[name] = fn; }
  }));
  const document = {
    visibilityState: hidden ? 'hidden' : 'visible',
    head: {appendChild(script) { scripts.push(script); }},
    createElement() { return {}; },
    addEventListener(name, fn) { documentEvents[name] = fn; },
    querySelectorAll() { return links; }
  };
  const window = {location: {hostname, search}};
  if (existingPixel) window.fbq = (...args) => calls.push(args);
  const context = vm.createContext({window, document, navigator: {globalPrivacyControl: gpc}, URL, URLSearchParams});
  vm.runInContext(configSource, context);
  vm.runInContext(source, context);
  const events = () => Array.from(window.fbq?.queue || calls, args => Array.from(args)).filter(args => /^trackSingle/.test(args[0]));
  return {window, context, scripts, events, document, documentEvents, links};
}

test('production records one PageView and ViewContent using the Lowify product and gross price', () => {
  const b = browser();
  assert.equal(b.scripts.length, 1);
  assert.deepEqual(b.events().map(e => e[2]), ['PageView', 'ViewContent']);
  assert.equal(b.events()[1][1], '814178168360082');
  assert.equal(b.events()[1][3].content_ids[0], '63073');
  assert.equal(b.events()[1][3].value, 6.9);
  assert.equal(b.events()[1][3].currency, 'BRL');
  vm.runInContext(source, b.context);
  b.documentEvents.visibilitychange();
  assert.equal(b.events().length, 2);
  assert.equal(b.scripts.length, 1);
});

test('hidden pages wait until visible and do not count focus changes as new visits', () => {
  const b = browser({hidden: true});
  assert.equal(b.events().length, 0);
  b.document.visibilityState = 'visible';
  b.documentEvents.visibilitychange();
  b.documentEvents.visibilitychange();
  assert.equal(b.events().length, 2);
});

test('clicks never emit Purchase or duplicate the native Lowify InitiateCheckout', () => {
  const b = browser({search: '?status=paid&payment=approved&value=999'});
  b.links[0].handlers.auxclick({type: 'auxclick', button: 2});
  assert.equal(b.events().length, 2);
  b.links[1].handlers.click({type: 'click', button: 0});
  b.links[0].handlers.click({type: 'click', button: 0});
  assert.deepEqual(b.events().map(e => e[2]), ['PageView', 'ViewContent', 'CheckoutClick']);
  assert.equal(b.events()[2][3].cta_position, 'oferta');
  assert.equal(b.events()[2][0], 'trackSingleCustom');
});

test('middle click and keyboard activation track without preventing navigation', () => {
  const middle = browser();
  middle.links[0].handlers.auxclick({type: 'auxclick', button: 1});
  assert.equal(middle.events().at(-1)[2], 'CheckoutClick');
  const keyboard = browser();
  keyboard.links[0].handlers.click({type: 'click', button: 0, detail: 0});
  assert.equal(keyboard.events().at(-1)[2], 'CheckoutClick');
});

test('only campaign parameters pass to checkout; product, price and private fields cannot be replaced', () => {
  const b = browser({search: '?utm_source=facebook&utm_campaign=DFL&utm_content=criativo1&fbclid=test-click&product_id=wrong&value=0&email=private%40example.com&redirect=https://example.com'});
  const url = new URL(b.window.DFL_TRACKING.checkoutUrl('https://pay.lowify.com.br/checkout?product_id=dkLHsa'));
  assert.equal(url.host, 'pay.lowify.com.br');
  assert.equal(url.searchParams.get('product_id'), 'dkLHsa');
  assert.equal(url.searchParams.get('utm_content'), 'criativo1');
  assert.equal(url.searchParams.get('fbclid'), 'test-click');
  for (const key of ['value', 'email', 'redirect']) assert.equal(url.searchParams.has(key), false);
  assert.equal(b.window.DFL_TRACKING.checkoutUrl('javascript:alert(1)'), null);
});

test('oversized and control-character parameters are discarded', () => {
  const b = browser({search: '?utm_source=one%0Atwo&utm_medium=' + 'x'.repeat(201)});
  assert.equal(b.window.DFL_TRACKING.checkoutUrl('https://pay.lowify.com.br/checkout?product_id=dkLHsa'), 'https://pay.lowify.com.br/checkout?product_id=dkLHsa');
});

test('local and Vercel preview visits never pollute production events', () => {
  for (const hostname of ['localhost', '127.0.0.1', 'dfl2026-preview.vercel.app']) {
    const b = browser({hostname});
    assert.equal(b.scripts.length, 0);
    assert.equal(b.events().length, 0);
  }
});

test('GPC disables the Pixel and campaign forwarding without breaking checkout', () => {
  const b = browser({gpc: true, search: '?fbclid=test&utm_campaign=DFL'});
  assert.equal(b.scripts.length, 0);
  assert.equal(b.events().length, 0);
  assert.equal(b.window.DFL_TRACKING.checkoutUrl('https://pay.lowify.com.br/checkout?product_id=dkLHsa'), 'https://pay.lowify.com.br/checkout?product_id=dkLHsa');
});

test('an existing Meta SDK is reused and events target only this Pixel', () => {
  const b = browser({existingPixel: true});
  assert.equal(b.scripts.length, 0);
  assert.equal(b.events().length, 2);
  assert.ok(b.events().every(e => e[1] === '814178168360082'));
});
