/* ?claim: the hearing check running inside the $500 claim flow (an iframe on product pages).
   Only acts when the URL has ?claim, so check.tellyhear.com.au and /audiogram-test are untouched.
   Everything the person sees is the check's own page and code; this only:
     1. swaps the welcome photo for the claim photo (Lachlan with Micah) and frames it in the panel,
     2. starts at step 2 (headphones or speakers), as if Begin was pressed, with no animation
        (the claim flow plays the same sweep itself, then fades this page in on top),
     3. hands the X back to the claim flow,
     (The results page's own $500 buttons post 'done' under ?claim: the check's code does that.)
   Talks to the claim flow with postMessage: { th: 'claim', type: 'ready' | 'close' | 'done' }.
   Relies on: #at, #atWelcome, #atwBegin, .atw-side, .atw-bg, .atx. */
(function () {
  var q = new URLSearchParams(location.search);
  if (!q.has('claim')) return;
  // Same rule as the check's own claim code: claim mode only counts when the page framing us is one
  // of TellyHear's own (or localhost while building; ?dev on its own tab for testing), and every
  // message goes to that exact origin, never '*'. Anywhere else this file does nothing.
  var ALLOWED = /^https:\/\/((www|check)\.)?tellyhear\.com\.au$|^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;
  var parentOrigin = (function () {
    if (window.parent === window) return q.has('dev') ? location.origin : '';
    try {
      var anc = location.ancestorOrigins;
      var o = anc && anc.length ? anc[0] : (document.referrer ? new URL(document.referrer).origin : '');
      return ALLOWED.test(o) ? o : '';
    } catch (e) { return ''; }
  })();
  if (!parentOrigin) return;
  var post = function (type) { try { window.parent.postMessage({ th: 'claim', type: type }, parentOrigin); } catch (e) {} };
  var html = document.documentElement;
  html.classList.add('th-claim');

  var css = document.createElement('style');
  css.textContent = [
    'html.th-claim-instant *, html.th-claim-instant *::before, html.th-claim-instant *::after { transition: none !important; animation: none !important; }',
    'html.th-claim .atw-bg { object-position: 55% 30% !important; }',
    'html.th-claim .atdev { display: none !important; }'
  ].join('\n');
  document.head.appendChild(css);

  // Frame the claim photo in the panel: put the focus point (Lachlan) in the middle of the panel.
  // Same sums as the claim flow, so both line up exactly.
  var FOCUS_X = 0.6, POS_X = 0.55;
  // ?pw = the claim flow's photo width, so the photo here is cropped and framed exactly like it
  var PW = parseInt(q.get('pw') || '0', 10) || 0;
  function setPan() {
    var root = document.getElementById('at'), w = document.getElementById('atWelcome');
    var side = w && w.querySelector('.atw-side'), img = w && w.querySelector('.atw-bg');
    if (!root || !side || !img) return;
    if (PW) { img.style.width = PW + 'px'; img.style.maxWidth = 'none'; } // the site caps images at 100%
    var W = PW || side.clientWidth, H = side.clientHeight;
    var ar = (img.naturalWidth || 1600) / (img.naturalHeight || 1200);
    var rw = Math.max(W, H * ar), ox = (W - rw) * POS_X;
    var panel = Math.min(520, Math.max(340, window.innerWidth * 0.3));
    root.style.setProperty('--pan', Math.round(panel / 2 - (ox + rw * FOCUS_X)) + 'px');
  }
  window.addEventListener('resize', setPan);

  function start() {
    var w = document.getElementById('atWelcome'), begin = document.getElementById('atwBegin');
    if (!w || !begin) { post('ready'); return; }
    setPan();
    html.classList.add('th-claim-instant');
    begin.click();
    // the check swaps in "Headphones or speakers?" after ~430ms; then normal animations again
    setTimeout(function () { html.classList.remove('th-claim-instant'); post('ready'); }, 650);
  }
  function init() {
    var w = document.getElementById('atWelcome'), img = w && w.querySelector('.atw-bg');
    if (!img) { post('ready'); return; }
    img.removeAttribute('srcset');
    img.addEventListener('load', function once() { img.removeEventListener('load', once); start(); });
    img.src = (q.get('photo') || '/general/lachie patient.webp');
  }

  // The X belongs to the claim flow while embedded.
  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest ? e.target.closest('#atwX, .atx') : null;
    if (!t) return;
    e.preventDefault(); e.stopImmediatePropagation();
    post('close');
  }, true);

  // dev: the claim flow's dev panel drives this page's own dev jumps (this page's panel is hidden under ?claim)
  window.addEventListener('message', function (e) {
    if (e.origin !== parentOrigin || e.source !== window.parent) return; // only the claim flow that frames us
    var d = e.data; if (!d || d.th !== 'claim-dev' || !d.jump) return;
    var b = document.querySelector('.atdev button[data-k="' + String(d.jump).replace(/"/g, '') + '"]');
    if (b) b.click();
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
