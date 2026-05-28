const DATA = {
  slides: [
    { id:1, tag:"Best Seller",   title:"Base Set Pack",    desc:"Pull from 102 classic cards. The legendary Charizard awaits the lucky few.", img:"base-pack.webp",      bg:"linear-gradient(135deg,#1a1a2e,#2d1b4e)", packId:1 },
    { id:2, tag:"Ultra Rare",    title:"Legendary Pack",   desc:"Boosted legendary pull rates. Mewtwo EX, Rayquaza, and more await.",          img:"legendary-pack.webp", bg:"linear-gradient(135deg,#1a1500,#2d2000)", packId:6 },
    { id:3, tag:"Guaranteed",    title:"Secret Rare Box",  desc:"Every single box contains at least one secret rare holographic card.",        img:"secret.webp",         bg:"linear-gradient(135deg,#001a2e,#002d4e)", packId:8 },
    { id:4, tag:"Fan Favorite",  title:"Neo Genesis Pack", desc:"Lugia, Ho-Oh, and next-gen holographics. A new era of collecting.",           img:"neo-genesis.webp",    bg:"linear-gradient(135deg,#0f1a0f,#1a2d1a)", packId:5 }
  ],
  packs: [
    { id:1, name:"Base Set Pack",   img:"base-pack.webp",      emoji:"🔥", type:"Classic",     price:350,  cards:5, bg:"#2d1010", colors:["#ef4444","#159cdb","#0edf76"], rarity:"rare"      },
    { id:2, name:"Jungle Pack",     img:"jungle-pack.webp",    emoji:"🌿", type:"Grass / Nature",     price:350,  cards:5, bg:"#0f2d10", colors:["#22c55e","#86efac","#14532d"], rarity:"uncommon"  },
    { id:3, name:"Mega Evolution Pack",  img:"mega-evolution.webp",   emoji:"👊", type:"Mega Legendary",   price:1500,  cards:5, bg:"#1a1a10", colors:["#a8a29e","#d6d3d1","#57534e"], rarity:"legendary"  },
    { id:4, name:"Rocket Pack",     img:"team-rocket.webp",    emoji:"🖤", type:"Dark / Poison",      price:450,  cards:5, bg:"#0f0f0f", colors:["#6b7280","#374151","#111827"], rarity:"rare"      },
    { id:5, name:"Neo Genesis",     img:"neo-genesis.webp",    emoji:"🌟", type:"Psychic / Flying",   price:500,  cards:5, bg:"#1a102d", colors:["#a78bfa","#c4b5fd","#4c1d95"], rarity:"rare"      },
    { id:6, name:"Legendary Pack",  img:"legendary-pack.webp", emoji:"✨", type:"Dragon / Legendary", price:1200,  cards:5, bg:"#2d1f00", colors:["#f59e0b","#fcd34d","#ffffff"], rarity:"legendary" },
    { id:7, name:"Promo Pack",      img:"promo-pack.webp",     emoji:"🎁", type:"Normal / Special",   price:650,  cards:5, bg:"#2d0f1a", colors:["#ec4899","#f9a8d4","#831843"], rarity:"rare"      },
    { id:8, name:"Secret Rare Box", img:"secret-rare.webp",    emoji:"🌈", type:"Rainbow Rare",       price:6500, cards:36, bg:"#001a2d", colors:["#ff0000","#ff8c00","#ffd700","#00c853","#2979ff","#aa00ff"], rarity:"secret" }
  ],
  rarityLabels: { common:"Common", uncommon:"Uncommon", rare:"Rare", legendary:"Legendary ★", secret:"Secret Rare ✦" }
};

let cart = [];
let slideIndex = 0;
let slideTimer;

/* ===== US102 — SLIDESHOW ===== */
function buildSlideshow() {
  const hero = document.getElementById('hero');
  hero.innerHTML = DATA.slides.map((s, i) => `
    <div class="slide${i===0?' active':''}" style="background:${s.bg};">
      <div class="slide-text">
        <div class="slide-tag">${s.tag}</div>
        <div class="slide-title">${s.title}</div>
        <div class="slide-desc">${s.desc}</div>
        <button class="slide-cta" onclick="addToCart(${s.packId})">Add to Cart</button>
      </div>
      <div class="slide-cards">
        <img src="images/${s.img}" alt="${s.title}" />
        <img src="images/${s.img}" alt="${s.title}" />
        <img src="images/${s.img}" alt="${s.title}" />
        <img src="images/${s.img}" alt="${s.title}" />
      </div>
    </div>
  `).join('')
  + `<button class="hero-arrow hero-prev" onclick="prevSlide()">&#8249;</button>`
  + `<button class="hero-arrow hero-next" onclick="nextSlide()">&#8250;</button>`
  + `<div class="hero-dots">${DATA.slides.map((_,i)=>`<button class="dot${i===0?' active':''}" onclick="goSlide(${i})"></button>`).join('')}</div>`;
  startSlideTimer();
}

function goSlide(n) {
  document.querySelectorAll('.slide').forEach((el,i) => el.classList.toggle('active', i===n));
  document.querySelectorAll('.dot').forEach((el,i) => el.classList.toggle('active', i===n));
  slideIndex = n;
  resetSlideTimer();
}
function nextSlide() { goSlide((slideIndex+1) % DATA.slides.length); }
function prevSlide() { goSlide((slideIndex - 1 + DATA.slides.length) % DATA.slides.length); }
function startSlideTimer() { slideTimer = setInterval(nextSlide, 3800); }
function resetSlideTimer() { clearInterval(slideTimer); startSlideTimer(); }

/* ===== US103 — PRODUCT LIST ===== */
function buildProducts() {
  document.getElementById('productsGrid').innerHTML = DATA.packs.map(p => `
    <div class="product-card">
      <div class="card-img" style="background:${p.bg};">
        <img src="images/${p.img}" alt="${p.name}" style="width:80px; height:80px; object-fit:contain;" />
        <span class="card-rarity-badge rb-${p.rarity}">${DATA.rarityLabels[p.rarity]}</span>
      </div>
      <div class="card-body">
        <div class="card-name">${p.name}</div>
        <div class="card-type">${p.type}</div>
        <div class="card-colors">${p.colors.map(c=>`<span class="color-dot" style="background:${c}" title="${c}"></span>`).join('')}</div>
        <div class="card-bottom">
          <span class="card-price">₱${p.price.toLocaleString()}</span>
          <span class="card-n">${p.cards} cards</span>
        </div>
        <button class="atc-btn" onclick="addToCart(${p.id})">+ Add to Cart</button>
      </div>
    </div>
  `).join('');
}

/* ===== US105 — ADD TO CART ===== */
function addToCart(id) {
  const pack = DATA.packs.find(p => p.id === id);
  if (!pack) return;
  const existing = cart.find(x => x.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...pack, qty: 1 });
  updateCartUI();
  showToast(pack.emoji, `<b>${pack.name}</b> added to cart!`);
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else updateCartUI();
}

/* ===== US104 — CART MODAL ===== */
function updateCartUI() {
  const total = cart.reduce((s,x) => s + x.qty, 0);
  const badge = document.getElementById('cartBadge');
  badge.textContent = total;
  badge.style.display = total > 0 ? 'flex' : 'none';

  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');

  if (!cart.length) {
    body.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">🎴</div>
        <div class="empty-cart-title">Your cart is empty</div>
        <div class="empty-cart-sub">Add some packs to get started!</div>
      </div>`;
    footer.style.display = 'none';
  } else {
    body.innerHTML = cart.map(x => `
      <div class="cart-item">
        <div class="ci-emoji" style="background:${x.bg}">
          <img src="images/${x.img}" alt="${x.name}" style="width:32px; height:32px; object-fit:contain;" />
        </div>
        <div class="ci-info">
          <div class="ci-name">${x.name}</div>
          <div class="ci-type">${x.type}</div>
          <div class="ci-qty-row">
            <button class="qty-btn" onclick="changeQty(${x.id},-1)">−</button>
            <span class="qty-val">${x.qty}</span>
            <button class="qty-btn" onclick="changeQty(${x.id},1)">+</button>
          </div>
        </div>
        <span class="ci-price">₱${(x.price * x.qty).toLocaleString()}</span>
        <button class="ci-rm" onclick="removeFromCart(${x.id})" aria-label="Remove">✕</button>
      </div>
    `).join('');
    const sum = cart.reduce((s,x) => s + x.price * x.qty, 0);
    document.getElementById('cartTotal').textContent = '₱' + sum.toLocaleString();
    footer.style.display = 'block';
  }
}

function toggleCart() {
  document.getElementById('cartOverlay').classList.toggle('open');
}
function handleOverlayClick(e) {
  if (e.target === document.getElementById('cartOverlay')) toggleCart();
}

function launchConfetti() {
  const colors = ['#f0c040','#ef4444','#3b82f6','#22c55e','#a78bfa','#ec4899','#38bdf8'];
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:99999;overflow:hidden;';
  document.body.appendChild(container);

  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 10 + 6;
    const left = Math.random() * 100;
    const delay = Math.random() * 1.5;
    const duration = Math.random() * 2 + 2;
    const rotate = Math.random() * 360;

    piece.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      left: ${left}%;
      top: -20px;
      opacity: 1;
      animation: confettiFall ${duration}s ${delay}s ease-in forwards;
      transform: rotate(${rotate}deg);
    `;
    container.appendChild(piece);
  }

  setTimeout(() => container.remove(), 7000);
}

function checkout() {
  const sum = cart.reduce((s,x) => s + x.price * x.qty, 0);
  const total = sum.toLocaleString();
  cart = [];
  updateCartUI();
  toggleCart();
  launchConfetti(); // ← WALA ITO SA IYO
  showToast('🎉', `Order placed! Total: ₱${total}. Thank you for ordering, your package is on the way!`);
}

/* ===== US105 — TOAST ===== */
function showToast(emoji, name) {
  const wrap = document.getElementById('toastContainer');
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<span class="toast-icon">${emoji}</span><span>${name}</span>`;
  wrap.appendChild(t);
  setTimeout(() => t.remove(), 7000);
}

/* ===== INIT ===== */
buildSlideshow();
buildProducts();
updateCartUI();