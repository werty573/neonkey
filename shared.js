// NeonKey shared UI: nav, footer, gift-card art, cart (localStorage), drawer, toasts, live-orders ticker, reveals.
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const byId = id => CARDS.find(c => c.id === id);
const tt = n => 'TT$' + Number(n).toLocaleString('en-US');
const fromPrice = c => Math.min(...c.denoms.map(d => d.ttd));

// simple brand-neutral glyphs (no trademarked logos)
const GLYPH = {
  ps: '<svg viewBox="0 0 60 60" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M16 6l9 15H7z"/><circle cx="44" cy="16" r="9"/><path d="M8 37l16 16M24 37L8 53"/><rect x="36" y="37" width="16" height="16" rx="2"/></svg>',
  xbox: '<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="24" fill="none" stroke="#fff" stroke-width="4"/><path d="M18 14c8 4 12 10 12 10s4-6 12-10M14 44c6-10 16-18 16-18s10 8 16 18" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>',
  switch: '<svg viewBox="0 0 60 60" fill="none" stroke="#fff" stroke-width="4"><rect x="8" y="6" width="20" height="48" rx="10"/><rect x="32" y="6" width="20" height="48" rx="10"/><circle cx="18" cy="20" r="4" fill="#fff"/><circle cx="42" cy="38" r="4" fill="#fff"/></svg>',
  v: '<svg viewBox="0 0 60 60"><path d="M8 8h14l8 26 8-26h14L36 54H24z" fill="#fff"/></svg>',
  roblox: '<svg viewBox="0 0 60 60"><rect x="12" y="12" width="36" height="36" rx="4" transform="rotate(15 30 30)" fill="#fff"/><rect x="25" y="25" width="10" height="10" transform="rotate(15 30 30)" fill="#33343A"/></svg>',
  diamond: '<svg viewBox="0 0 60 60"><path d="M30 54L6 24l9-14h30l9 14z" fill="#fff"/><path d="M6 24h48M22 10l8 44 8-44" stroke="#FF6A00" stroke-width="2.5" fill="none"/></svg>',
  razer: '<svg viewBox="0 0 60 60" fill="none" stroke="#44D62C" stroke-width="4"><circle cx="30" cy="30" r="22"/><circle cx="30" cy="30" r="12"/><path d="M30 8v10M30 42v10M8 30h10M42 30h10"/></svg>',
  apple: '<svg viewBox="0 0 60 60"><circle cx="30" cy="34" r="20" fill="#fff"/><path d="M30 14c2-6 7-9 12-9-1 6-6 9-12 9z" fill="#fff"/></svg>',
  amazon: '<svg viewBox="0 0 60 60" fill="none" stroke="#FF9900" stroke-width="5" stroke-linecap="round"><path d="M8 34c14 10 30 10 44 0"/><path d="M44 30l8 4-4 8"/></svg>',
  n: '<svg viewBox="0 0 60 60"><path d="M14 6h10l12 30V6h10v48H36L24 24v30H14z" fill="#E50914"/></svg>',
  shein: '<svg viewBox="0 0 60 60" fill="none" stroke="#fff" stroke-width="4" stroke-linejoin="round"><path d="M14 20h32l-3 32H17z"/><path d="M22 20c0-8 16-8 16 0"/></svg>',
};
function cardArt(c, val = '', tag = 'DIGITAL CODE') {
  return `<div class="gc" style="--c1:${c.c1};--c2:${c.c2};--c3:${c.c3}"><span class="tg">${tag}</span><span class="chipx"></span><span class="gl">${GLYPH[c.glyph]}</span><span class="nm">${c.short}</span>${val ? `<span class="val">${val}</span>` : ''}</div>`;
}

// ---------- cart ----------
const Cart = {
  get() { try { return JSON.parse(localStorage.getItem('nk_cart') || '[]'); } catch { return []; } },
  set(v) { try { localStorage.setItem('nk_cart', JSON.stringify(v)); } catch {} renderCart(); },
  add(id, value, qty = 1) {
    const c = Cart.get(), k = c.find(x => x.id === id && x.value === value);
    if (k) k.qty += qty; else c.push({ id, value, qty });
    Cart.set(c);
  },
  lines() {
    return Cart.get().map(x => { const c = byId(x.id), d = c && c.denoms.find(d => d.value === x.value); return c && d ? { ...x, c, d, sum: d.ttd * x.qty } : null; }).filter(Boolean);
  },
  total() { return Cart.lines().reduce((s, l) => s + l.sum, 0); },
  count() { return Cart.get().reduce((s, x) => s + x.qty, 0); },
};
const Orders = {
  all() { try { return JSON.parse(localStorage.getItem('nk_orders') || '[]'); } catch { return []; } },
  save(o) { const a = Orders.all().filter(x => x.id !== o.id); a.unshift(o); try { localStorage.setItem('nk_orders', JSON.stringify(a.slice(0, 30))); } catch {} },
  get(id) { return Orders.all().find(o => o.id === id); },
};

function shell(active = '') {
  const L = [['index.html', 'Store'], ['index.html#cards', 'All cards'], ['help.html', 'How it works'], ['track.html', 'Track order']];
  document.body.insertAdjacentHTML('afterbegin', `
  <header class="nav"><div class="wrap">
    <a class="logo" href="index.html"><i><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"><circle cx="8" cy="12" r="4"/><path d="M12 12h9M18 12v4M21 12v3"/></svg></i>Neon<b>Key</b></a>
    <nav class="links">${L.map(([h, t]) => `<a href="${h}" class="${active === t ? 'on' : ''}">${t}</a>`).join('')}</nav>
    <span class="sp"></span>
    <a class="btn btn-g btn-sm owner-link" href="owner.html"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Owner view</a>
    <button class="cartbtn" id="openCart" aria-label="Open cart"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2l2.4 11h10.2L20 8H7"/><circle cx="9.5" cy="19.5" r="1.4"/><circle cx="16.5" cy="19.5" r="1.4"/></svg><span class="n" id="cartN"></span></button>
    <button class="cartbtn burger" id="burger" aria-label="Menu"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
  </div></header>
  <div class="mnav" id="mnav">${L.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}<a href="owner.html">Owner view</a></div>
  <div class="scrim" id="scrim"></div>
  <aside class="drawer" id="drawer" aria-label="Cart"><div class="dh"><h3>Your cart</h3><button class="btn btn-g btn-sm" id="closeCart">Close</button></div><div class="items" id="cartItems"></div>
    <div class="df" id="cartFoot"><div class="tot"><span>Total <small>· codes by email + WhatsApp</small></span><span id="cartTot"></span></div>
    <a class="btn btn-p" href="checkout.html">Checkout · pay with online banking</a><button class="btn btn-wa" id="waCart"><svg width="20" height="20" viewBox="0 0 24 24" fill="#062E16"><path d="M12 3.2a8.8 8.8 0 0 0-7.5 13.3L3.3 21l4.6-1.2A8.8 8.8 0 1 0 12 3.2z"/></svg>Or order on WhatsApp</button></div></aside>
  <div class="toast" id="toast"></div>
  <div class="ticker" id="ticker"></div>
  <a class="fab" href="https://wa.me/${WA}?text=${encodeURIComponent('Hi NeonKey! I have a question about a digital card.')}" target="_blank" rel="noopener" aria-label="WhatsApp"><svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M12 3.2a8.8 8.8 0 0 0-7.5 13.3L3.3 21l4.6-1.2A8.8 8.8 0 1 0 12 3.2zm5 12.3c-.2.6-1.2 1.2-1.8 1.3-.5 0-1 .2-3.4-.7-2.9-1.1-4.7-4-4.8-4.2-.1-.2-1.1-1.5-1.1-3s.8-2.1 1-2.4c.3-.3.6-.4.8-.4h.6c.2 0 .5 0 .7.5l.9 2.2c.1.2.1.4 0 .6l-.4.6-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.2 1.4 2.5 1.5.3.1.5.1.7-.1l.9-1.1c.2-.3.4-.2.7-.1l2.1 1c.3.1.5.2.5.4.1.2.1.8-.1 1.5z"/></svg></a>`);
  document.body.insertAdjacentHTML('beforeend', `
  <footer><div class="wrap"><div class="cols">
    <div><a class="logo" href="index.html"><i><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"><circle cx="8" cy="12" r="4"/><path d="M12 12h9M18 12v4M21 12v3"/></svg></i>Neon<b>Key</b></a>
      <p class="muted" style="margin-top:16px;max-width:34ch">Digital game cards and gift codes for Trinidad & Tobago. Pay in TT$ with online banking, get your code in minutes.</p></div>
    <div><h5>Shop</h5><a href="card.html?id=psn">PlayStation</a><a href="card.html?id=xbox">Xbox</a><a href="card.html?id=vbucks">V-Bucks</a><a href="card.html?id=roblox">Roblox</a></div>
    <div><h5>Help</h5><a href="help.html">How it works</a><a href="help.html#redeem">Redeem guides</a><a href="help.html#policies">Policies</a><a href="track.html">Track an order</a></div>
    <div><h5>Contact</h5><a href="https://wa.me/${WA}" target="_blank" rel="noopener">WhatsApp</a><a href="#">Instagram</a><a href="owner.html">Owner view (demo)</a></div>
  </div><div class="foot-base"><span>© 2026 NeonKey · Online based in Trinidad & Tobago · Concept build, not a real store. Brand names belong to their owners.</span><a class="credit" href="https://wa.me/18682591409" target="_blank" rel="noopener">Concept site by <b>Portside Digital</b></a></div></div></footer>`);
  $('#openCart').onclick = openCart; $('#closeCart').onclick = closeCart; $('#scrim').onclick = closeCart;
  $('#burger').onclick = () => $('#mnav').classList.toggle('open');
  $('#waCart').onclick = () => {
    const ls = Cart.lines(); if (!ls.length) return;
    const msg = 'Hi NeonKey! I want to order:\n' + ls.map(l => `• ${l.qty} × ${l.c.name} ${l.d.label}: ${tt(l.sum)}`).join('\n') + `\nTotal: ${tt(Cart.total())}\nI'll pay by online banking.`;
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');
  };
  renderCart(); ticker(); reveals();
}
function openCart() { $('#drawer').classList.add('open'); $('#scrim').classList.add('open'); }
function closeCart() { $('#drawer').classList.remove('open'); $('#scrim').classList.remove('open'); }
function renderCart() {
  const n = $('#cartN'); if (!n) return;
  n.textContent = Cart.count() || '';
  const ls = Cart.lines();
  $('#cartItems').innerHTML = ls.length ? ls.map(l => `<div class="ci">${cardArt(l.c)}<div><h4>${l.c.name}</h4><small>${l.d.label} · ${tt(l.d.ttd)} each</small><br><span class="qty"><button data-q="-1" data-k="${l.id}|${l.value}">−</button><span>${l.qty}</span><button data-q="1" data-k="${l.id}|${l.value}">+</button></span></div><div><div class="pr">${tt(l.sum)}</div><button class="rm" data-rm="${l.id}|${l.value}">Remove</button></div></div>`).join('')
    : `<div class="empty"><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#6E6A98" stroke-width="1.6"><path d="M3 4h2l2.4 11h10.2L20 8H7"/></svg><p style="margin-top:12px">Your cart is empty.<br>Pick a card to get started.</p></div>`;
  $('#cartFoot').style.display = ls.length ? '' : 'none';
  $('#cartTot').textContent = tt(Cart.total());
  $$('[data-q]').forEach(b => b.onclick = () => { const [id, v] = b.dataset.k.split('|'); const c = Cart.get(); const x = c.find(x => x.id === id && x.value === +v); x.qty += +b.dataset.q; Cart.set(c.filter(x => x.qty > 0)); });
  $$('[data-rm]').forEach(b => b.onclick = () => { const [id, v] = b.dataset.rm.split('|'); Cart.set(Cart.get().filter(x => !(x.id === id && x.value === +v))); });
}
let toastT;
function toast(html) { const t = $('#toast'); t.innerHTML = html; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2600); }
function ticker() {
  const el = $('#ticker'); if (!el || document.body.dataset.noticker) return;
  let k = Math.floor(Math.random() * FEED.length);
  const show = () => {
    const [who, id, what] = FEED[k++ % FEED.length], c = byId(id), mins = 1 + (k * 7) % 14;
    el.innerHTML = `${cardArt(c)}<div><b>${who}</b><small>got ${c.short} ${what} · ${mins} min ago</small></div><span class="dot"></span>`;
    el.classList.add('on'); setTimeout(() => el.classList.remove('on'), 4200);
  };
  setTimeout(show, 3500); setInterval(show, 11000);
}
function reveals() {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  $$('.rv').forEach(el => io.observe(el));
}
const newOrderId = () => 'NK-' + (1000 + Math.floor(Math.random() * 9000));
