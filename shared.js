// NeonKey shared UI: nav, footer, gift-card faces, cart (localStorage), drawer, toasts, reveals.
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const byId = id => CARDS.find(c => c.id === id);
const tt = n => 'TT$' + Number(n).toLocaleString('en-US');
const fromPrice = c => Math.min(...c.denoms.map(d => d.ttd));

function cardArt(c, val = '', tag = 'DIGITAL CODE') {
  return `<div class="gc" style="--c1:${c.c1};--c2:${c.c2}${c.fg ? `;--fg:${c.fg}` : ''}"><span class="nm">${c.short}</span><span class="tg">${tag}</span>${val ? `<span class="val">${val}</span>` : ''}</div>`;
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
    <a class="logo" href="index.html"><i class="ti ti-key"></i>Neon<b>Key</b></a>
    <nav class="links">${L.map(([h, t]) => `<a href="${h}" class="${active === t ? 'on' : ''}">${t}</a>`).join('')}</nav>
    <span class="sp"></span>
    <a class="owner-link" href="owner.html">Owner view</a>
    <button class="cartbtn" id="openCart" aria-label="Open cart"><i class="ti ti-shopping-bag"></i><span class="n" id="cartN"></span></button>
    <button class="cartbtn burger" id="burger" aria-label="Menu"><i class="ti ti-menu-2"></i></button>
  </div></header>
  <div class="mnav" id="mnav">${L.map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}<a href="owner.html">Owner view</a></div>
  <div class="scrim" id="scrim"></div>
  <aside class="drawer" id="drawer" aria-label="Cart"><div class="dh"><h3>Your cart</h3><button class="btn btn-g btn-sm" id="closeCart">Close</button></div><div class="items" id="cartItems"></div>
    <div class="df" id="cartFoot"><div class="tot"><span>Total</span><span id="cartTot"></span></div>
    <a class="btn btn-p" href="checkout.html">Checkout</a><button class="btn btn-g" id="waCart"><i class="ti ti-brand-whatsapp"></i>Order on WhatsApp instead</button></div></aside>
  <div class="toast" id="toast"></div>
  <a class="fab" href="https://wa.me/${WA}?text=${encodeURIComponent('Hi NeonKey! I have a question about a digital card.')}" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="ti ti-brand-whatsapp"></i></a>`);
  document.body.insertAdjacentHTML('beforeend', `
  <footer><div class="wrap"><div class="cols">
    <div><a class="logo" href="index.html"><i class="ti ti-key"></i>Neon<b>Key</b></a>
      <p class="muted" style="margin-top:16px;max-width:34ch">Digital game cards for Trinidad & Tobago. Pay in TT$ with online banking, get your code in minutes.</p></div>
    <div><h5>Shop</h5><a href="card.html?id=psn">PlayStation</a><a href="card.html?id=xbox">Xbox</a><a href="card.html?id=vbucks">V-Bucks</a><a href="card.html?id=roblox">Roblox</a></div>
    <div><h5>Help</h5><a href="help.html">How it works</a><a href="help.html#redeem">Redeem guides</a><a href="help.html#policies">Policies</a><a href="track.html">Track an order</a></div>
    <div><h5>Contact</h5><a href="https://wa.me/${WA}" target="_blank" rel="noopener">WhatsApp</a><a href="#">Instagram</a><a href="owner.html">Owner view</a></div>
  </div><div class="foot-base"><span>© 2026 NeonKey, Trinidad & Tobago. Concept build, not a real store. Card names belong to their owners.</span><a class="credit" href="https://wa.me/18682591409" target="_blank" rel="noopener">Concept site by <b>Portside Digital</b></a></div></div></footer>`);
  $('#openCart').onclick = openCart; $('#closeCart').onclick = closeCart; $('#scrim').onclick = closeCart;
  $('#burger').onclick = () => $('#mnav').classList.toggle('open');
  $('#waCart').onclick = () => {
    const ls = Cart.lines(); if (!ls.length) return;
    const msg = 'Hi NeonKey! I want to order:\n' + ls.map(l => `• ${l.qty} × ${l.c.name} ${l.d.label}: ${tt(l.sum)}`).join('\n') + `\nTotal: ${tt(Cart.total())}\nI'll pay by online banking.`;
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');
  };
  renderCart(); reveals();
}
function openCart() { $('#drawer').classList.add('open'); $('#scrim').classList.add('open'); }
function closeCart() { $('#drawer').classList.remove('open'); $('#scrim').classList.remove('open'); }
function renderCart() {
  const n = $('#cartN'); if (!n) return;
  n.textContent = Cart.count() || '';
  const ls = Cart.lines();
  $('#cartItems').innerHTML = ls.length ? ls.map(l => `<div class="ci">${cardArt(l.c)}<div><h4>${l.c.name}</h4><small>${l.d.label} · ${tt(l.d.ttd)} each</small><br><span class="qty"><button data-q="-1" data-k="${l.id}|${l.value}">−</button><span>${l.qty}</span><button data-q="1" data-k="${l.id}|${l.value}">+</button></span></div><div><div class="pr">${tt(l.sum)}</div><button class="rm" data-rm="${l.id}|${l.value}">Remove</button></div></div>`).join('')
    : `<div class="empty"><i class="ti ti-shopping-bag"></i><p style="margin-top:12px">Your cart is empty.<br>Pick a card to get started.</p></div>`;
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
