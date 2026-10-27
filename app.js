/**
 * KRISHI SEWA (कृषि सेवा) JAVASCRIPT APPLICATION
 * Handles Agri Products Catalog, Kisan Bag, Wishlist,
 * Crop Category Filtering, Free Delivery Calculator & Farmer Checkout.
 */

// ==========================================================================
// 1. AGRICULTURAL PRODUCT CATALOG DATA (Default Seed + Live Synced via /api/products)
// ==========================================================================
let PRODUCTS = [
  {
    id: 'ks-01',
    name: 'Hybrid Wheat Seeds (HD-3086 Shresth)',
    category: 'seeds',
    categoryLabel: 'Certified Seeds',
    price: 1249,
    oldPrice: 1499,
    rating: 4.9,
    reviews: 1420,
    badge: 'TOP HARVEST',
    badgeType: 'badge-hot',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=700&q=80',
    description: 'Government certified high-tillering variety with 99.8% germination purity, rust resistance, and high chapati quality. Ideal for timely irrigated sowing.',
    colors: ['#ca8a04', '#eab308'],
    specs: ['40kg Sealed Bag', '99.8% Germination', 'Yellow Rust Resistant', 'Maturity: 140 Days']
  },
  {
    id: 'ks-02',
    name: 'Bio-Organic Vermicompost Enriched Fertilizer',
    category: 'fertilizers',
    categoryLabel: 'Bio-Fertilizers',
    price: 549,
    oldPrice: 699,
    rating: 4.8,
    reviews: 890,
    badge: '100% ORGANIC',
    badgeType: '',
    image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=700&q=80',
    description: 'Pure Eisenia Fetida earthworm castings enriched with beneficial microbes, mycorrhiza, and humic acid to rejuvenate soil texture and water retention.',
    colors: ['#451a03', '#78350f'],
    specs: ['25kg Pack', '100% Chemical Free', 'High Humic Content', 'Enriched with Trichoderma']
  },
  {
    id: 'ks-03',
    name: '16L Battery Operated Knapsack Sprayer (Dual Motor)',
    category: 'equipment',
    categoryLabel: 'Tools & Sprayers',
    price: 2299,
    oldPrice: 2899,
    rating: 4.9,
    reviews: 654,
    badge: '-21% OFF',
    badgeType: 'badge-sale',
    image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=700&q=80',
    description: 'Heavy duty rechargeable 12V 12Ah battery sprayer with stainless steel extendable lance, dual brass nozzles, and pressure regulator. Covers 4 acres per charge.',
    colors: ['#059669', '#0284c7'],
    specs: ['16 Litre Tank', '12V 12Ah Battery', 'Dual Brass Nozzles', '4-Hour Continuous Run']
  },
  {
    id: 'ks-04',
    name: 'Premium Hybrid Tomato Seeds (Arka Rakshak)',
    category: 'seeds',
    categoryLabel: 'Certified Seeds',
    price: 499,
    oldPrice: 650,
    rating: 4.9,
    reviews: 512,
    badge: 'HIGH YIELD',
    badgeType: '',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=700&q=80',
    description: 'Triple disease resistant hybrid (ToLCV, BW, and EB). High firm deep red fruits weighing 90-100g, perfect for long-distance transport and export.',
    colors: ['#dc2626', '#b91c1c'],
    specs: ['10g Pack (approx 3000 seeds)', 'Yield: 35-40 Tons/Acre', 'Triple Disease Resistant', 'Long Shelf Life']
  },
  {
    id: 'ks-05',
    name: 'Pure Cold-Pressed Neem Oil 10,000 PPM Bio-Pesticide',
    category: 'protection',
    categoryLabel: 'Crop Care',
    price: 420,
    oldPrice: 550,
    rating: 4.8,
    reviews: 430,
    badge: 'ORGANIC CERTIFIED',
    badgeType: 'badge-hot',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=700&q=80',
    description: 'Natural broad-spectrum organic insect repellent formulated with high Azadirachtin content to control whiteflies, aphids, thrips, and mites without harming bees.',
    colors: ['#65a30d', '#15803d'],
    specs: ['1 Litre Bottle', '10,000 PPM Azadirachtin', 'Water Soluble with Emulsifier', 'Zero Chemical Residue']
  },
  {
    id: 'ks-06',
    name: 'Micro-Drip Irrigation Complete Kit (1/2 Acre)',
    category: 'irrigation',
    categoryLabel: 'Irrigation',
    price: 3499,
    oldPrice: 4200,
    rating: 4.8,
    reviews: 320,
    badge: 'WATER SAVER',
    badgeType: '',
    image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=700&q=80',
    description: 'Complete high-density polyethylene micro-irrigation system with 16mm main lateral line, inline drippers, screen filter, punch tool, and end caps.',
    colors: ['#0f172a', '#1e293b'],
    specs: ['Covers 0.5 Acre', 'Saves 60% Water', 'UV Stabilized Pipes', 'Screen Filter Included']
  },
  {
    id: 'ks-07',
    name: 'Digital 4-in-1 Soil pH, Moisture & Sunlight Tester',
    category: 'equipment',
    categoryLabel: 'Tools & Sprayers',
    price: 899,
    oldPrice: 1200,
    rating: 4.7,
    reviews: 280,
    badge: 'SMART FARMING',
    badgeType: '',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=700&q=80',
    description: 'Instant electronic soil diagnostic probe measuring soil fertility, pH balance (3.5 to 9.0), moisture level, and ambient sunlight intensity.',
    colors: ['#eab308', '#84cc16'],
    specs: ['Dual High Precision Probes', 'Backlit LCD Screen', 'No Batteries Needed for pH', 'Quick 5-Second Readout']
  },
  {
    id: 'ks-08',
    name: 'NPK 19:19:19 100% Water Soluble Foliar Fertilizer',
    category: 'fertilizers',
    categoryLabel: 'Bio-Fertilizers',
    price: 680,
    oldPrice: 850,
    rating: 4.9,
    reviews: 410,
    badge: 'BESTSELLER',
    badgeType: '',
    image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=700&q=80',
    description: 'Balanced formula of Nitrogen, Phosphorus, and Potassium for vegetative growth, rapid root development, and fruit sizing. 100% drip and spray compatible.',
    colors: ['#0284c7', '#38bdf8'],
    specs: ['5kg Sealed Bag', '100% Water Soluble', 'Rapid Crop Absorption', 'Zero Sediment Clotting']
  },
  {
    id: 'ks-09',
    name: 'Manual Hand Push Seed Sower & Fertilizer Planter',
    category: 'equipment',
    categoryLabel: 'Tools & Sprayers',
    price: 1850,
    oldPrice: 2400,
    rating: 4.8,
    reviews: 512,
    badge: 'LABOUR SAVER',
    badgeType: '',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=700&q=80',
    description: 'Ergonomic stainless-steel push seeder allowing a single farmer to sow seeds and deposit fertilizer simultaneously at precise soil depths without bending down.',
    colors: ['#059669', '#ea580c'],
    specs: ['Adjustable Depth 3-8cm', 'Dual Tube (Seed + Manure)', 'Rustproof Galvanized Steel', 'Saves 70% Labour']
  },
  {
    id: 'ks-10',
    name: 'Certified Hybrid Mustard Seeds (Giriraj DRMRIJ-31)',
    category: 'seeds',
    categoryLabel: 'Certified Seeds',
    price: 620,
    oldPrice: 780,
    rating: 4.8,
    reviews: 340,
    badge: '41% OIL CONTENT',
    badgeType: 'badge-sale',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=700&q=80',
    description: 'High-performing bold mustard seeds with up to 41.5% oil content, strong resistance to white rust and Alternaria blight, and drought resilience.',
    colors: ['#facc15', '#a16207'],
    specs: ['1kg Sealed Pack', 'Yield: 10-12 Quintals/Acre', '41.5% High Oil Yield', 'Maturity: 125-130 Days']
  },
  {
    id: 'ks-11',
    name: 'Heavy-Duty Bypass Pruning Shears & Grafting Tool',
    category: 'equipment',
    categoryLabel: 'Tools & Sprayers',
    price: 499,
    oldPrice: 750,
    rating: 4.9,
    reviews: 220,
    badge: 'JAPANESE STEEL',
    badgeType: '',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=700&q=80',
    description: 'SK-5 high carbon hardened Japanese steel blades with Teflon coating, ergonomic shock-absorbing handles, and precision bypass clean cut.',
    colors: ['#dc2626', '#1e293b'],
    specs: ['SK-5 Carbon Steel Blade', 'Up to 25mm Branch Cutting', 'Safety Lock Latch', 'Non-Slip Ergonomic Grip']
  },
  {
    id: 'ks-12',
    name: 'Solar Ultrasonic Animal & Crop Pest Repeller',
    category: 'protection',
    categoryLabel: 'Crop Care',
    price: 1399,
    oldPrice: 1800,
    rating: 4.7,
    reviews: 195,
    badge: 'SOLAR POWERED',
    badgeType: 'badge-hot',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=700&q=80',
    description: 'Keep wild boars, nilgai, rodents, and birds away from standing crops using motion-activated PIR sensors, variable ultrasonic frequencies, and flashing LED lights.',
    colors: ['#166534', '#15803d'],
    specs: ['Solar Monocrystalline Panel', '30ft Detection Range', 'IP44 Weatherproof', 'Zero Harm to Animals']
  }
];

// ==========================================================================
// 2. CURRENCY & EXCHANGE RATES (DEFAULT: INR)
// ==========================================================================
const CURRENCIES = {
  INR: { symbol: '₹', rate: 1.0 },
  USD: { symbol: '$', rate: 0.012 },
  EUR: { symbol: '€', rate: 0.011 },
  GBP: { symbol: '£', rate: 0.0094 }
};

// ==========================================================================
// 3. APPLICATION STATE
// ==========================================================================
const state = {
  cart: JSON.parse(localStorage.getItem('krishisewa_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('krishisewa_wishlist')) || [],
  activeCategory: 'all',
  searchQuery: '',
  maxPrice: 6000,
  sortBy: 'featured',
  currency: localStorage.getItem('krishisewa_currency') || 'INR',
  theme: localStorage.getItem('krishisewa_theme') || 'dark',
  appliedPromo: null,
  quickViewProduct: null,
  quickViewQty: 1,
  quickViewColor: null,
  user: JSON.parse(localStorage.getItem('krishisewa_user')) || null,
  token: localStorage.getItem('krishisewa_token') || null,
  mandiRates: [],
  farmerListings: [],
  consultations: []
};

// ==========================================================================
// 4. DOM ELEMENTS CACHE
// ==========================================================================
const DOM = {
  html: document.documentElement,
  productsGrid: document.getElementById('products-grid'),
  emptyState: document.getElementById('empty-state'),
  displayedCount: document.getElementById('displayed-count'),
  categoryPills: document.querySelectorAll('.pill-btn'),
  desktopNavLinks: document.querySelectorAll('.nav-link'),
  mobileNavLinks: document.querySelectorAll('.mobile-nav-link'),
  searchInput: document.getElementById('global-search-input'),
  clearSearchBtn: document.getElementById('clear-search-btn'),
  priceSlider: document.getElementById('price-range-filter'),
  priceSliderDisplay: document.getElementById('price-slider-display'),
  sortSelect: document.getElementById('sort-select'),
  resetFiltersBtn: document.getElementById('reset-filters-btn'),
  currencySelect: document.getElementById('currency-select'),
  themeToggleBtn: document.getElementById('theme-toggle'),

  // Drawers & Modals
  cartDrawerOverlay: document.getElementById('cart-drawer-overlay'),
  cartToggleBtn: document.getElementById('cart-toggle-btn'),
  closeCartBtn: document.getElementById('close-cart-btn'),
  cartItemsList: document.getElementById('cart-items-list'),
  cartDrawerItemsCount: document.getElementById('cart-drawer-items-count'),
  cartCountBadge: document.getElementById('cart-count-badge'),
  cartSubtotal: document.getElementById('cart-subtotal'),
  cartDiscountRow: document.getElementById('cart-discount-row'),
  cartDiscount: document.getElementById('cart-discount'),
  cartShipping: document.getElementById('cart-shipping'),
  cartTotal: document.getElementById('cart-total'),
  shippingProgressMsg: document.getElementById('shipping-progress-msg'),
  shippingProgressFill: document.getElementById('shipping-progress-fill'),
  promoInput: document.getElementById('promo-code-input'),
  applyPromoBtn: document.getElementById('apply-promo-btn'),
  promoAppliedTag: document.getElementById('promo-applied-tag'),
  appliedPromoName: document.getElementById('applied-promo-name'),
  removePromoBtn: document.getElementById('remove-promo-btn'),

  // Wishlist
  wishlistToggleBtn: document.getElementById('wishlist-toggle-btn'),
  wishlistBadge: document.getElementById('wishlist-badge'),
  wishlistDrawerOverlay: document.getElementById('wishlist-drawer-overlay'),
  wishlistItemsList: document.getElementById('wishlist-items-list'),
  wishlistItemsCount: document.getElementById('wishlist-items-count'),
  closeWishlistBtn: document.getElementById('close-wishlist-btn'),

  // Mobile Menu
  mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
  mobileNavOverlay: document.getElementById('mobile-nav-overlay'),
  closeMobileNav: document.getElementById('close-mobile-nav'),

  // Quick View Modal
  quickViewOverlay: document.getElementById('quickview-modal-overlay'),
  closeQuickViewBtn: document.getElementById('close-quickview-btn'),
  qvMainImg: document.getElementById('qv-main-image'),
  qvBadge: document.getElementById('qv-badge'),
  qvCategory: document.getElementById('qv-category'),
  qvTitle: document.getElementById('qv-title'),
  qvStars: document.getElementById('qv-stars'),
  qvReviews: document.getElementById('qv-reviews'),
  qvPrice: document.getElementById('qv-price'),
  qvOldPrice: document.getElementById('qv-old-price'),
  qvDescription: document.getElementById('qv-description'),
  qvSpecs: document.getElementById('qv-specs'),
  qvColorPicker: document.getElementById('qv-color-picker'),
  qvQtyInput: document.getElementById('qv-qty-input'),
  qvQtyMinus: document.getElementById('qv-qty-minus'),
  qvQtyPlus: document.getElementById('qv-qty-plus'),
  qvAddCartBtn: document.getElementById('qv-add-cart-btn'),
  qvWishBtn: document.getElementById('qv-wish-btn'),

  // Checkout Modal
  checkoutStartBtn: document.getElementById('checkout-start-btn'),
  checkoutOverlay: document.getElementById('checkout-modal-overlay'),
  closeCheckoutBtn: document.getElementById('close-checkout-btn'),
  checkoutForm: document.getElementById('simulated-checkout-form'),
  checkoutStepForm: document.getElementById('checkout-step-form'),
  checkoutStepSuccess: document.getElementById('checkout-step-success'),
  coSummaryTotal: document.getElementById('co-summary-total'),
  payConfirmBtn: document.getElementById('pay-confirm-btn'),
  confirmedOrderId: document.getElementById('confirmed-order-id'),
  successItemsPreview: document.getElementById('success-items-preview'),
  continueShoppingBtn: document.getElementById('continue-shopping-btn'),

  // Mandi & Portal Modals
  openMandiBtn: document.getElementById('open-mandi-btn'),
  navMandiBtn: document.getElementById('nav-mandi-btn'),
  mandiModal: document.getElementById('mandi-modal'),
  closeMandiModal: document.getElementById('close-mandi-modal'),
  mandiTableBody: document.getElementById('mandi-table-body'),
  mandiTickerTrack: document.getElementById('mandi-ticker-track'),
  mandiStateFilter: document.getElementById('mandi-state-filter'),
  mandiCropSearch: document.getElementById('mandi-crop-search'),

  // Kisan Bazaar
  navBazaarBtn: document.getElementById('nav-bazaar-btn'),
  bazaarModal: document.getElementById('bazaar-modal'),
  closeBazaarModal: document.getElementById('close-bazaar-modal'),
  tabBrowseCrops: document.getElementById('tab-browse-crops'),
  tabListCrop: document.getElementById('tab-list-crop'),
  bazaarViewBrowse: document.getElementById('bazaar-view-browse'),
  bazaarViewPost: document.getElementById('bazaar-view-post'),
  bazaarListingsGrid: document.getElementById('bazaar-listings-grid'),
  sellCropForm: document.getElementById('sell-crop-form'),

  // Farmer Auth
  authBtn: document.getElementById('auth-btn'),
  authBtnLabel: document.getElementById('auth-btn-label'),
  authModal: document.getElementById('auth-modal'),
  closeAuthModal: document.getElementById('close-auth-modal'),
  authTabLogin: document.getElementById('auth-tab-login'),
  authTabRegister: document.getElementById('auth-tab-register'),
  authViewLogin: document.getElementById('auth-view-login'),
  authViewRegister: document.getElementById('auth-view-register'),
  authViewProfile: document.getElementById('auth-view-profile'),
  farmerLoginForm: document.getElementById('farmer-login-form'),
  farmerRegisterForm: document.getElementById('farmer-register-form'),
  farmerLogoutBtn: document.getElementById('btn-farmer-logout'),
  viewMyOrdersBtn: document.getElementById('btn-view-my-orders'),
  profName: document.getElementById('prof-name'),
  profPhone: document.getElementById('prof-phone'),
  profLoc: document.getElementById('prof-loc'),

  // Track Order
  trackOrderBtn: document.getElementById('track-order-btn'),
  trackModal: document.getElementById('track-modal'),
  closeTrackModal: document.getElementById('close-track-modal'),
  trackOrderForm: document.getElementById('track-order-form'),
  trackIdInput: document.getElementById('track-id-input'),
  trackDispId: document.getElementById('track-disp-id'),
  trackDispStatus: document.getElementById('track-disp-status'),
  trackTimeline: document.getElementById('track-timeline'),

  // Krishi Doctor
  navDoctorBtn: document.getElementById('nav-doctor-btn'),
  doctorModal: document.getElementById('doctor-modal'),
  closeDoctorModal: document.getElementById('close-doctor-modal'),
  askDoctorForm: document.getElementById('ask-doctor-form'),
  doctorQnaList: document.getElementById('doctor-qna-list'),

  // Toast Container
  toastContainer: document.getElementById('toast-container'),

  // Other CTAs
  heroShopBtn: document.getElementById('hero-shop-btn'),
  heroFeaturedBtn: document.getElementById('hero-featured-btn'),
  highlightCtaBtn: document.getElementById('highlight-cta-btn'),
  newsletterForm: document.getElementById('newsletter-form')
};

// ==========================================================================
// 5. HELPER FORMATTING FUNCTIONS
// ==========================================================================

function formatPrice(amountInINR) {
  const currentCurr = CURRENCIES[state.currency] || CURRENCIES.INR;
  const converted = amountInINR * currentCurr.rate;
  if (state.currency === 'INR') {
    return `₹${Math.round(converted).toLocaleString('en-IN')}`;
  }
  return `${currentCurr.symbol}${converted.toFixed(2)}`;
}

function saveState() {
  localStorage.setItem('krishisewa_cart', JSON.stringify(state.cart));
  localStorage.setItem('krishisewa_wishlist', JSON.stringify(state.wishlist));
  localStorage.setItem('krishisewa_currency', state.currency);
  localStorage.setItem('krishisewa_theme', state.theme);
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icon = type === 'success' ? '🌱' : 'ℹ️';
  toast.innerHTML = `<span class="toast-icon">${icon}</span> <span>${message}</span>`;
  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ==========================================================================
// 6. RENDER PRODUCTS
// ==========================================================================

function getFilteredProducts() {
  return PRODUCTS.filter(product => {
    // Category match
    const categoryMatch = state.activeCategory === 'all' || product.category === state.activeCategory;

    // Search match
    const searchMatch = !state.searchQuery || 
      product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
      product.categoryLabel.toLowerCase().includes(state.searchQuery.toLowerCase());

    // Price ceiling match
    const priceMatch = product.price <= state.maxPrice;

    return categoryMatch && searchMatch && priceMatch;
  }).sort((a, b) => {
    if (state.sortBy === 'price-low') return a.price - b.price;
    if (state.sortBy === 'price-high') return b.price - a.price;
    if (state.sortBy === 'rating') return b.rating - a.rating;
    if (state.sortBy === 'name') return a.name.localeCompare(b.name);
    return 0; // 'featured' retains curated order
  });
}

function renderProducts() {
  const filtered = getFilteredProducts();
  DOM.displayedCount.textContent = filtered.length;

  if (filtered.length === 0) {
    DOM.productsGrid.innerHTML = '';
    DOM.emptyState.style.display = 'block';
    return;
  }

  DOM.emptyState.style.display = 'none';

  DOM.productsGrid.innerHTML = filtered.map(product => {
    const isWishlisted = state.wishlist.includes(product.id);
    const badgeHtml = product.badge 
      ? `<span class="product-tag-badge ${product.badgeType}">${product.badge}</span>` 
      : '';

    const swatchesHtml = product.colors.map((color, idx) => `
      <span class="color-dot ${idx === 0 ? 'active' : ''}" style="background-color: ${color};" title="Packaging / Shade option"></span>
    `).join('');

    return `
      <article class="product-card" data-id="${product.id}">
        <div class="product-media-wrap">
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
          ${badgeHtml}
          <div class="product-quick-actions">
            <button class="action-icon-btn wish-btn ${isWishlisted ? 'is-active' : ''}" data-id="${product.id}" aria-label="Save for next harvest" title="Save for next harvest">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <button class="action-icon-btn quickview-btn" data-id="${product.id}" aria-label="Quick View" title="Quick View">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </button>
          </div>
        </div>

        <div class="product-info">
          <div class="product-category-row">
            <span class="product-cat-label">${product.categoryLabel}</span>
            <div class="product-rating">
              <span class="star">★</span>
              <span>${product.rating}</span>
              <span>(${product.reviews})</span>
            </div>
          </div>

          <h3 class="product-title quickview-btn" data-id="${product.id}">${product.name}</h3>
          <p class="product-desc-snippet">${product.description}</p>

          <div class="product-swatches">
            ${swatchesHtml}
          </div>

          <div class="product-footer-row">
            <div class="product-price-box">
              <span class="product-price">${formatPrice(product.price)}</span>
              ${product.oldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)}</span>` : ''}
            </div>

            <button class="add-cart-btn" data-id="${product.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              <span>Add to Bag</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// ==========================================================================
// 7. CART (KISAN BAG) MANAGEMENT
// ==========================================================================

function addToCart(productId, quantity = 1, selectedColor = null) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const color = selectedColor || product.colors[0];
  const existingIndex = state.cart.findIndex(item => item.id === productId && item.color === color);

  if (existingIndex > -1) {
    state.cart[existingIndex].quantity += quantity;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: color,
      quantity: quantity
    });
  }

  saveState();
  updateCartUI();
  showToast(`Added "${product.name}" to your Kisan Bag!`, 'success');
}

function updateCartQuantity(index, delta) {
  if (!state.cart[index]) return;
  state.cart[index].quantity += delta;

  if (state.cart[index].quantity <= 0) {
    state.cart.splice(index, 1);
    showToast('Item removed from Kisan Bag', 'info');
  }

  saveState();
  updateCartUI();
}

function removeCartItem(index) {
  if (!state.cart[index]) return;
  const item = state.cart[index];
  state.cart.splice(index, 1);
  saveState();
  updateCartUI();
  showToast(`Removed "${item.name}"`, 'info');
}

function updateCartUI() {
  const totalItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  DOM.cartCountBadge.textContent = totalItemCount;
  DOM.cartDrawerItemsCount.textContent = `${totalItemCount} items`;

  // Calculate costs in INR
  const subtotalINR = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discountINR = 0;

  if (state.appliedPromo) {
    discountINR = subtotalINR * state.appliedPromo.discount;
  }

  // Free village delivery threshold (₹1,500)
  const shippingThresholdINR = 1500;
  const isFreeShipping = subtotalINR >= shippingThresholdINR || totalItemCount === 0;
  const shippingCostINR = (isFreeShipping || totalItemCount === 0) ? 0 : 120;
  const totalINR = Math.max(0, subtotalINR - discountINR + shippingCostINR);

  // Update Free shipping progress
  if (totalItemCount === 0) {
    DOM.shippingProgressMsg.textContent = `Add ${formatPrice(1500)} more for FREE village delivery!`;
    DOM.shippingProgressFill.style.width = '0%';
  } else if (subtotalINR >= shippingThresholdINR) {
    DOM.shippingProgressMsg.textContent = '🎉 You unlocked FREE Village Delivery!';
    DOM.shippingProgressFill.style.width = '100%';
  } else {
    const diff = shippingThresholdINR - subtotalINR;
    DOM.shippingProgressMsg.textContent = `Add ${formatPrice(diff)} more for FREE delivery!`;
    const pct = Math.min(100, Math.round((subtotalINR / shippingThresholdINR) * 100));
    DOM.shippingProgressFill.style.width = `${pct}%`;
  }

  // Render Cart Item Cards
  if (state.cart.length === 0) {
    DOM.cartItemsList.innerHTML = `
      <div class="cart-empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
        <h4>Your Kisan Bag is empty</h4>
        <p>No agricultural seeds, fertilizers, or tools added yet.</p>
        <button class="btn btn-primary" id="cart-start-shopping-btn">Explore Farm Store</button>
      </div>
    `;

    const startBtn = document.getElementById('cart-start-shopping-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        closeCart();
        const catalog = document.getElementById('catalog-section');
        if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
      });
    }

    DOM.cartSubtotal.textContent = formatPrice(0);
    DOM.cartDiscountRow.style.display = 'none';
    DOM.cartShipping.textContent = formatPrice(0);
    DOM.cartTotal.textContent = formatPrice(0);
    return;
  }

  DOM.cartItemsList.innerHTML = state.cart.map((item, index) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h4 class="cart-item-title">${item.name}</h4>
        <div class="cart-item-meta">
          <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${item.color};vertical-align:middle;margin-right:4px;"></span>
          ${formatPrice(item.price)} each
        </div>
        <div class="qty-control-wrap">
          <button class="qty-btn" data-action="decrease" data-index="${index}">-</button>
          <span class="qty-display">${item.quantity}</span>
          <button class="qty-btn" data-action="increase" data-index="${index}">+</button>
        </div>
      </div>
      <div style="text-align: right;">
        <div class="cart-item-price">${formatPrice(item.price * item.quantity)}</div>
        <button class="cart-item-remove" data-action="remove" data-index="${index}" title="Remove item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      </div>
    </div>
  `).join('');

  // Update Summary Figures
  DOM.cartSubtotal.textContent = formatPrice(subtotalINR);
  if (state.appliedPromo && discountINR > 0) {
    DOM.cartDiscountRow.style.display = 'flex';
    DOM.cartDiscount.textContent = `-${formatPrice(discountINR)}`;
  } else {
    DOM.cartDiscountRow.style.display = 'none';
  }

  DOM.cartShipping.textContent = shippingCostINR === 0 ? 'FREE' : formatPrice(shippingCostINR);
  DOM.cartTotal.textContent = formatPrice(totalINR);
  DOM.coSummaryTotal.textContent = formatPrice(totalINR);
}

function openCart() {
  DOM.cartDrawerOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  DOM.cartDrawerOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ==========================================================================
// 8. WISHLIST MANAGEMENT
// ==========================================================================

function toggleWishlist(productId) {
  const index = state.wishlist.indexOf(productId);
  const product = PRODUCTS.find(p => p.id === productId);

  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast(`Removed from Saved Items`, 'info');
  } else {
    state.wishlist.push(productId);
    showToast(`Saved for next sowing season!`, 'success');
  }

  saveState();
  updateWishlistUI();
  renderProducts(); // refresh heart states
}

function updateWishlistUI() {
  DOM.wishlistBadge.textContent = state.wishlist.length;
  DOM.wishlistItemsCount.textContent = `${state.wishlist.length} saved`;

  const wishlistedProducts = PRODUCTS.filter(p => state.wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    DOM.wishlistItemsList.innerHTML = `
      <div class="cart-empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        <h4>Your saved wishlist is empty</h4>
        <p>Save seeds and tools here for easy reordering before sowing.</p>
      </div>
    `;
    return;
  }

  DOM.wishlistItemsList.innerHTML = wishlistedProducts.map(p => `
    <div class="cart-item">
      <img src="${p.image}" alt="${p.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h4 class="cart-item-title">${p.name}</h4>
        <span class="cart-item-price">${formatPrice(p.price)}</span>
        <button class="btn btn-outline-sm" style="margin-top: 6px; width: fit-content;" onclick="addToCart('${p.id}');">
          Move to Bag
        </button>
      </div>
      <div>
        <button class="cart-item-remove" onclick="toggleWishlist('${p.id}');" title="Remove from wishlist">
          &times;
        </button>
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// 9. QUICK VIEW MODAL
// ==========================================================================

function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  state.quickViewProduct = product;
  state.quickViewQty = 1;
  state.quickViewColor = product.colors[0];

  DOM.qvMainImg.src = product.image;
  DOM.qvMainImg.alt = product.name;
  DOM.qvBadge.textContent = product.badge || 'CERTIFIED GENUINE';
  DOM.qvBadge.style.display = product.badge ? 'inline-block' : 'none';
  DOM.qvCategory.textContent = product.categoryLabel;
  DOM.qvTitle.textContent = product.name;
  DOM.qvStars.textContent = '★'.repeat(Math.round(product.rating));
  DOM.qvReviews.textContent = `(${product.reviews} farmer reviews)`;
  DOM.qvPrice.textContent = formatPrice(product.price);
  DOM.qvOldPrice.textContent = product.oldPrice ? formatPrice(product.oldPrice) : '';
  DOM.qvDescription.textContent = product.description;
  DOM.qvQtyInput.value = '1';

  // Specs
  DOM.qvSpecs.innerHTML = product.specs.map(spec => `
    <span class="qv-spec-pill">✓ ${spec}</span>
  `).join('');

  // Variants/Colors
  DOM.qvColorPicker.innerHTML = product.colors.map((color, idx) => `
    <span class="color-dot ${idx === 0 ? 'active' : ''}" data-color="${color}" style="background-color: ${color}; width: 24px; height: 24px;" title="Option"></span>
  `).join('');

  // Wishlist heart
  const isWish = state.wishlist.includes(product.id);
  DOM.qvWishBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="${isWish ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
  `;
  DOM.qvWishBtn.classList.toggle('is-active', isWish);

  DOM.quickViewOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  DOM.quickViewOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ==========================================================================
// 10. CHECKOUT MODAL SIMULATION (VILLAGE DELIVERY)
// ==========================================================================

function openCheckout() {
  if (state.cart.length === 0) {
    showToast('Your Kisan Bag is empty! Add products first.', 'info');
    return;
  }
  closeCart();
  DOM.checkoutStepForm.style.display = 'block';
  DOM.checkoutStepSuccess.style.display = 'none';
  DOM.checkoutOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  DOM.checkoutOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

async function handleCheckoutSubmit(e) {
  e.preventDefault();
  const btn = DOM.payConfirmBtn;
  const btnText = btn.querySelector('.btn-text');
  const btnSpinner = btn.querySelector('.btn-spinner');

  btnText.style.display = 'none';
  btnSpinner.style.display = 'inline-block';
  btn.disabled = true;

  const fullName = document.getElementById('co-firstname').value.trim();
  const mobile = document.getElementById('co-lastname').value.trim();
  const email = document.getElementById('co-email').value.trim();
  const address = document.getElementById('co-address').value.trim();
  const city = document.getElementById('co-city').value.trim();
  const zip = document.getElementById('co-zip').value.trim();
  const payMethod = document.querySelector('input[name="pay-method"]:checked')?.value || 'cod';

  const orderPayload = {
    customer: {
      fullName,
      mobile,
      email,
      village: address,
      district: city,
      pin: zip
    },
    items: state.cart.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
    pricing: {
      subtotal: state.cart.reduce((s, i) => s + (i.price * i.quantity), 0),
      discount: state.appliedPromo ? Math.round(state.cart.reduce((s, i) => s + (i.price * i.quantity), 0) * state.appliedPromo.discount) : 0,
      total: state.cart.reduce((s, i) => s + (i.price * i.quantity), 0),
      currency: state.currency
    },
    paymentMethod: payMethod
  };

  let placedOrder = null;
  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        placedOrder = data.order;
      }
    }
  } catch (err) {
    console.warn('Backend order placement offline fallback:', err);
  }

  // Fallback if network or standalone offline
  if (!placedOrder) {
    placedOrder = {
      id: 'KS-' + Math.floor(100000 + Math.random() * 900000),
      items: state.cart,
      pricing: orderPayload.pricing
    };
  }

  btnText.style.display = 'inline-block';
  btnSpinner.style.display = 'none';
  btn.disabled = false;

  DOM.confirmedOrderId.textContent = '#' + placedOrder.id;

  DOM.successItemsPreview.innerHTML = `
    <h5 style="margin-bottom: 8px; font-size: 0.9rem; color: var(--accent-primary);">Order Summary (${state.cart.length} items):</h5>
    ${state.cart.map(item => `
      <div style="display:flex; justify-content:space-between; font-size: 0.85rem; margin-bottom: 4px; color: var(--text-secondary);">
        <span>${item.quantity}x ${item.name}</span>
        <span>${formatPrice(item.price * item.quantity)}</span>
      </div>
    `).join('')}
    <div style="border-top: 1px solid var(--border-strong); margin-top: 8px; padding-top: 6px; display:flex; justify-content:space-between; font-weight:700;">
      <span>Payable at Farm Delivery:</span>
      <span style="color:var(--accent-primary);">${DOM.cartTotal.textContent}</span>
    </div>
    <div style="margin-top: 12px; text-align: center;">
      <button class="btn btn-outline btn-block text-xs" style="padding: 6px 12px;" onclick="trackSpecificOrder('${placedOrder.id}')">
        📦 Live Track Order #${placedOrder.id}
      </button>
    </div>
  `;

  // Clear cart
  state.cart = [];
  state.appliedPromo = null;
  saveState();
  updateCartUI();

  DOM.checkoutStepForm.style.display = 'none';
  DOM.checkoutStepSuccess.style.display = 'block';
  showToast(`Farm order #${placedOrder.id} placed! SMS tracking sent.`, 'success');
}

// ==========================================================================
// 11. PROMO CODE HANDLING
// ==========================================================================

function applyPromoCode() {
  const code = DOM.promoInput.value.trim().toUpperCase();
  if (!code) return;

  if (code === 'KISAN20') {
    state.appliedPromo = { code: 'KISAN20', discount: 0.20 };
    DOM.appliedPromoName.textContent = 'KISAN20 (-20% Farmer Discount)';
    DOM.promoAppliedTag.style.display = 'flex';
    DOM.promoInput.value = '';
    updateCartUI();
    showToast('20% Kisan Discount Applied!', 'success');
  } else if (code === 'KRISHI10') {
    state.appliedPromo = { code: 'KRISHI10', discount: 0.10 };
    DOM.appliedPromoName.textContent = 'KRISHI10 (-10% First Order)';
    DOM.promoAppliedTag.style.display = 'flex';
    DOM.promoInput.value = '';
    updateCartUI();
    showToast('10% First Order Discount Applied!', 'success');
  } else {
    showToast('Invalid coupon. Try KISAN20 or KRISHI10', 'info');
  }
}

function removePromoCode() {
  state.appliedPromo = null;
  DOM.promoAppliedTag.style.display = 'none';
  updateCartUI();
  showToast('Coupon code removed', 'info');
}

// ==========================================================================
// 12. COUNTDOWN TIMER (SEASONAL DEALS)
// ==========================================================================
function startCountdown() {
  let secondsLeft = 14 * 3600 + 32 * 60 + 48;
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-minutes');
  const secsEl = document.getElementById('cd-seconds');

  if (!hoursEl || !minsEl || !secsEl) return;

  setInterval(() => {
    if (secondsLeft <= 0) secondsLeft = 24 * 3600;
    secondsLeft--;

    const h = Math.floor(secondsLeft / 3600);
    const m = Math.floor((secondsLeft % 3600) / 60);
    const s = secondsLeft % 60;

    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

// ==========================================================================
// 13. EVENT LISTENERS SETUP
// ==========================================================================

function setupEventListeners() {
  // Category Pill Filters
  const handleCategoryChange = (cat) => {
    state.activeCategory = cat;
    DOM.categoryPills.forEach(btn => btn.classList.toggle('active', btn.dataset.category === cat));
    DOM.desktopNavLinks.forEach(btn => btn.classList.toggle('active', btn.dataset.category === cat));
    DOM.mobileNavLinks.forEach(btn => btn.classList.toggle('active', btn.dataset.category === cat));
    renderProducts();
  };

  DOM.categoryPills.forEach(btn => {
    btn.addEventListener('click', () => handleCategoryChange(btn.dataset.category));
  });

  DOM.desktopNavLinks.forEach(btn => {
    btn.addEventListener('click', () => {
      handleCategoryChange(btn.dataset.category);
      const catalog = document.getElementById('catalog-section');
      if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
    });
  });

  DOM.mobileNavLinks.forEach(btn => {
    btn.addEventListener('click', () => {
      handleCategoryChange(btn.dataset.category);
      DOM.mobileNavOverlay.classList.remove('open');
      const catalog = document.getElementById('catalog-section');
      if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Footer category links
  document.querySelectorAll('.footer-filter-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      handleCategoryChange(link.dataset.category);
      const catalog = document.getElementById('catalog-section');
      if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Search input
  DOM.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.trim();
    DOM.clearSearchBtn.style.display = state.searchQuery ? 'block' : 'none';
    renderProducts();
  });

  DOM.clearSearchBtn.addEventListener('click', () => {
    DOM.searchInput.value = '';
    state.searchQuery = '';
    DOM.clearSearchBtn.style.display = 'none';
    renderProducts();
  });

  // Price slider
  DOM.priceSlider.addEventListener('input', (e) => {
    state.maxPrice = Number(e.target.value);
    DOM.priceSliderDisplay.textContent = formatPrice(state.maxPrice);
    renderProducts();
  });

  // Sort dropdown
  DOM.sortSelect.addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    renderProducts();
  });

  // Reset filters button
  DOM.resetFiltersBtn.addEventListener('click', () => {
    state.activeCategory = 'all';
    state.searchQuery = '';
    state.maxPrice = 6000;
    state.sortBy = 'featured';
    DOM.searchInput.value = '';
    DOM.priceSlider.value = 6000;
    DOM.priceSliderDisplay.textContent = formatPrice(6000);
    DOM.sortSelect.value = 'featured';
    DOM.categoryPills.forEach(btn => btn.classList.toggle('active', btn.dataset.category === 'all'));
    renderProducts();
  });

  // Product Grid delegated events (Add to cart, wishlist, quick view)
  DOM.productsGrid.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.add-cart-btn');
    if (addBtn) {
      const pid = addBtn.dataset.id;
      addToCart(pid);
      return;
    }

    const wishBtn = e.target.closest('.wish-btn');
    if (wishBtn) {
      const pid = wishBtn.dataset.id;
      toggleWishlist(pid);
      return;
    }

    const qvBtn = e.target.closest('.quickview-btn');
    if (qvBtn) {
      const pid = qvBtn.dataset.id;
      openQuickView(pid);
      return;
    }
  });

  // Cart Drawer Events
  DOM.cartToggleBtn.addEventListener('click', openCart);
  DOM.closeCartBtn.addEventListener('click', closeCart);
  DOM.cartDrawerOverlay.addEventListener('click', (e) => {
    if (e.target === DOM.cartDrawerOverlay) closeCart();
  });

  DOM.cartItemsList.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const action = btn.dataset.action;
    const index = parseInt(btn.dataset.index, 10);

    if (action === 'increase') updateCartQuantity(index, 1);
    if (action === 'decrease') updateCartQuantity(index, -1);
    if (action === 'remove') removeCartItem(index);
  });

  // Promo code
  DOM.applyPromoBtn.addEventListener('click', applyPromoCode);
  DOM.promoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      applyPromoCode();
    }
  });
  DOM.removePromoBtn.addEventListener('click', removePromoCode);

  // Wishlist Drawer Events
  DOM.wishlistToggleBtn.addEventListener('click', () => {
    DOM.wishlistDrawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  DOM.closeWishlistBtn.addEventListener('click', () => {
    DOM.wishlistDrawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
  });
  DOM.wishlistDrawerOverlay.addEventListener('click', (e) => {
    if (e.target === DOM.wishlistDrawerOverlay) {
      DOM.wishlistDrawerOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Quick View Events
  DOM.closeQuickViewBtn.addEventListener('click', closeQuickView);
  DOM.quickViewOverlay.addEventListener('click', (e) => {
    if (e.target === DOM.quickViewOverlay) closeQuickView();
  });

  DOM.qvQtyMinus.addEventListener('click', () => {
    if (state.quickViewQty > 1) {
      state.quickViewQty--;
      DOM.qvQtyInput.value = state.quickViewQty;
    }
  });

  DOM.qvQtyPlus.addEventListener('click', () => {
    if (state.quickViewQty < 50) {
      state.quickViewQty++;
      DOM.qvQtyInput.value = state.quickViewQty;
    }
  });

  DOM.qvColorPicker.addEventListener('click', (e) => {
    const dot = e.target.closest('.color-dot');
    if (dot) {
      DOM.qvColorPicker.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      state.quickViewColor = dot.dataset.color;
    }
  });

  DOM.qvAddCartBtn.addEventListener('click', () => {
    if (state.quickViewProduct) {
      addToCart(state.quickViewProduct.id, state.quickViewQty, state.quickViewColor);
      closeQuickView();
      openCart();
    }
  });

  DOM.qvWishBtn.addEventListener('click', () => {
    if (state.quickViewProduct) {
      toggleWishlist(state.quickViewProduct.id);
      const isWish = state.wishlist.includes(state.quickViewProduct.id);
      DOM.qvWishBtn.classList.toggle('is-active', isWish);
    }
  });

  // Checkout Events
  DOM.checkoutStartBtn.addEventListener('click', openCheckout);
  DOM.closeCheckoutBtn.addEventListener('click', closeCheckout);
  DOM.checkoutOverlay.addEventListener('click', (e) => {
    if (e.target === DOM.checkoutOverlay) closeCheckout();
  });
  DOM.checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  DOM.continueShoppingBtn.addEventListener('click', closeCheckout);

  // Mobile Menu Events
  DOM.mobileMenuToggle.addEventListener('click', () => {
    DOM.mobileNavOverlay.classList.add('open');
  });
  DOM.closeMobileNav.addEventListener('click', () => {
    DOM.mobileNavOverlay.classList.remove('open');
  });
  DOM.mobileNavOverlay.addEventListener('click', (e) => {
    if (e.target === DOM.mobileNavOverlay) DOM.mobileNavOverlay.classList.remove('open');
  });

  // Currency Picker
  DOM.currencySelect.value = state.currency;
  DOM.currencySelect.addEventListener('change', (e) => {
    state.currency = e.target.value;
    saveState();
    DOM.priceSliderDisplay.textContent = formatPrice(state.maxPrice);
    renderProducts();
    updateCartUI();
    updateWishlistUI();
    showToast(`Currency changed to ${state.currency}`, 'info');
  });

  // Theme Toggle
  DOM.html.setAttribute('data-theme', state.theme);
  DOM.themeToggleBtn.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    DOM.html.setAttribute('data-theme', state.theme);
    saveState();
    showToast(`Switched to ${state.theme} mode`, 'info');
  });

  // Hero CTAs
  DOM.heroShopBtn.addEventListener('click', () => {
    const catalog = document.getElementById('catalog-section');
    if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
  });

  DOM.heroFeaturedBtn.addEventListener('click', () => {
    state.activeCategory = 'seeds';
    handleCategoryChange('seeds');
    const catalog = document.getElementById('catalog-section');
    if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
  });

  DOM.highlightCtaBtn.addEventListener('click', () => {
    addToCart('ks-03');
    openCart();
  });

  // Newsletter / Advisory Submit
  DOM.newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const contact = document.getElementById('newsletter-email').value;
    showToast(`धन्यवाद! ${contact} has been enrolled for free crop advisory.`, 'success');
    DOM.newsletterForm.reset();
  });

  // Keyboard accessibility: ESC closes open overlay
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeWishlist();
      closeQuickView();
      closeCheckout();
      DOM.mobileNavOverlay.classList.remove('open');
    }
  });

  function closeWishlist() {
    DOM.wishlistDrawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  // ==========================================================================
  // FULL-STACK PORTAL MODAL CONTROLS & LISTENERS
  // ==========================================================================
  
  // 1. Mandi Modal
  function openMandiModal() {
    DOM.mandiModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    fetchMandiRates();
  }
  function closeMandiModal() {
    DOM.mandiModal.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (DOM.openMandiBtn) DOM.openMandiBtn.addEventListener('click', openMandiModal);
  if (DOM.navMandiBtn) DOM.navMandiBtn.addEventListener('click', openMandiModal);
  if (DOM.closeMandiModal) DOM.closeMandiModal.addEventListener('click', closeMandiModal);
  if (DOM.mandiModal) DOM.mandiModal.addEventListener('click', (e) => {
    if (e.target === DOM.mandiModal) closeMandiModal();
  });
  if (DOM.mandiStateFilter) DOM.mandiStateFilter.addEventListener('change', renderMandiTable);
  if (DOM.mandiCropSearch) DOM.mandiCropSearch.addEventListener('input', renderMandiTable);

  // 2. Kisan Bazaar Modal
  function openBazaarModal() {
    DOM.bazaarModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    fetchFarmerListings();
  }
  function closeBazaarModal() {
    DOM.bazaarModal.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (DOM.navBazaarBtn) DOM.navBazaarBtn.addEventListener('click', openBazaarModal);
  if (DOM.closeBazaarModal) DOM.closeBazaarModal.addEventListener('click', closeBazaarModal);
  if (DOM.bazaarModal) DOM.bazaarModal.addEventListener('click', (e) => {
    if (e.target === DOM.bazaarModal) closeBazaarModal();
  });

  if (DOM.tabBrowseCrops && DOM.tabListCrop) {
    DOM.tabBrowseCrops.addEventListener('click', () => {
      DOM.tabBrowseCrops.classList.add('active');
      DOM.tabListCrop.classList.remove('active');
      DOM.bazaarViewBrowse.style.display = 'block';
      DOM.bazaarViewPost.style.display = 'none';
    });
    DOM.tabListCrop.addEventListener('click', () => {
      DOM.tabListCrop.classList.add('active');
      DOM.tabBrowseCrops.classList.remove('active');
      DOM.bazaarViewBrowse.style.display = 'none';
      DOM.bazaarViewPost.style.display = 'block';
    });
  }

  if (DOM.sellCropForm) {
    DOM.sellCropForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        farmerName: document.getElementById('sell-farmer-name').value.trim(),
        farmerPhone: document.getElementById('sell-farmer-phone').value.trim(),
        cropName: document.getElementById('sell-crop-name').value.trim(),
        variety: document.getElementById('sell-crop-variety').value.trim(),
        quantityQuintals: document.getElementById('sell-quantity').value.trim(),
        pricePerQuintal: document.getElementById('sell-price').value.trim(),
        state: document.getElementById('sell-state').value,
        village: document.getElementById('sell-village').value.trim(),
        moisturePercent: document.getElementById('sell-moisture').value.trim()
      };

      try {
        const res = await fetch('/api/farmer/crops', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          showToast('Crop listed on Kisan Marketplace! खरीदार आपको संपर्क करेंगे।', 'success');
          DOM.sellCropForm.reset();
          DOM.tabBrowseCrops.click();
          fetchFarmerListings();
        } else {
          showToast(data.error || 'Failed to list crop', 'info');
        }
      } catch (err) {
        showToast('Crop listed successfully (offline sync ready)', 'success');
        DOM.sellCropForm.reset();
        DOM.tabBrowseCrops.click();
      }
    });
  }

  // 3. Farmer Auth Modal
  function openAuthModal() {
    DOM.authModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    updateAuthModalView();
  }
  function closeAuthModal() {
    DOM.authModal.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (DOM.authBtn) DOM.authBtn.addEventListener('click', openAuthModal);
  if (DOM.closeAuthModal) DOM.closeAuthModal.addEventListener('click', closeAuthModal);
  if (DOM.authModal) DOM.authModal.addEventListener('click', (e) => {
    if (e.target === DOM.authModal) closeAuthModal();
  });

  if (DOM.authTabLogin && DOM.authTabRegister) {
    DOM.authTabLogin.addEventListener('click', () => {
      DOM.authTabLogin.classList.add('active');
      DOM.authTabRegister.classList.remove('active');
      DOM.authViewLogin.style.display = 'block';
      DOM.authViewRegister.style.display = 'none';
    });
    DOM.authTabRegister.addEventListener('click', () => {
      DOM.authTabRegister.classList.add('active');
      DOM.authTabLogin.classList.remove('active');
      DOM.authViewLogin.style.display = 'none';
      DOM.authViewRegister.style.display = 'block';
    });
  }

  if (DOM.farmerLoginForm) {
    DOM.farmerLoginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const loginId = document.getElementById('login-id').value.trim();
      const password = document.getElementById('login-pass').value.trim();

      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ loginId, password })
        });
        const data = await res.json();
        if (data.success) {
          state.user = data.user;
          state.token = data.token;
          localStorage.setItem('krishisewa_user', JSON.stringify(data.user));
          localStorage.setItem('krishisewa_token', data.token);
          updateAuthHeader();
          updateAuthModalView();
          showToast(`Welcome back, ${data.user.name}! (स्वागत है)`, 'success');
        } else {
          showToast(data.error || 'Login failed. Check credentials.', 'info');
        }
      } catch (err) {
        showToast('Login error. Please check server.', 'info');
      }
    });
  }

  if (DOM.farmerRegisterForm) {
    DOM.farmerRegisterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        name: document.getElementById('reg-name').value.trim(),
        phone: document.getElementById('reg-phone').value.trim(),
        state: document.getElementById('reg-state').value,
        village: document.getElementById('reg-village').value.trim(),
        password: document.getElementById('reg-pass').value.trim()
      };

      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          state.user = data.user;
          state.token = data.token;
          localStorage.setItem('krishisewa_user', JSON.stringify(data.user));
          localStorage.setItem('krishisewa_token', data.token);
          updateAuthHeader();
          updateAuthModalView();
          showToast(`Farmer account registered! Welcome ${data.user.name}.`, 'success');
        } else {
          showToast(data.error || 'Registration failed.', 'info');
        }
      } catch (err) {
        showToast('Registration error. Please check server.', 'info');
      }
    });
  }

  if (DOM.farmerLogoutBtn) {
    DOM.farmerLogoutBtn.addEventListener('click', () => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('krishisewa_user');
      localStorage.removeItem('krishisewa_token');
      updateAuthHeader();
      updateAuthModalView();
      showToast('Logged out of Kisan account', 'info');
    });
  }

  if (DOM.viewMyOrdersBtn) {
    DOM.viewMyOrdersBtn.addEventListener('click', () => {
      closeAuthModal();
      if (state.user) {
        trackSpecificOrder(state.user.phone);
      }
    });
  }

  // 4. Order Tracking Modal
  function openTrackModal() {
    DOM.trackModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeTrackModal() {
    DOM.trackModal.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (DOM.trackOrderBtn) DOM.trackOrderBtn.addEventListener('click', openTrackModal);
  if (DOM.closeTrackModal) DOM.closeTrackModal.addEventListener('click', closeTrackModal);
  if (DOM.trackModal) DOM.trackModal.addEventListener('click', (e) => {
    if (e.target === DOM.trackModal) closeTrackModal();
  });

  if (DOM.trackOrderForm) {
    DOM.trackOrderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = DOM.trackIdInput.value.trim().replace('#', '');
      trackSpecificOrder(val);
    });
  }

  // 5. Krishi Doctor Modal
  function openDoctorModal() {
    DOM.doctorModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    fetchDoctorConsultations();
  }
  function closeDoctorModal() {
    DOM.doctorModal.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (DOM.navDoctorBtn) DOM.navDoctorBtn.addEventListener('click', openDoctorModal);
  if (DOM.closeDoctorModal) DOM.closeDoctorModal.addEventListener('click', closeDoctorModal);
  if (DOM.doctorModal) DOM.doctorModal.addEventListener('click', (e) => {
    if (e.target === DOM.doctorModal) closeDoctorModal();
  });

  if (DOM.askDoctorForm) {
    DOM.askDoctorForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        farmerName: document.getElementById('doc-farmer-name').value.trim(),
        crop: document.getElementById('doc-crop-name').value.trim(),
        question: document.getElementById('doc-question').value.trim()
      };

      try {
        const res = await fetch('/api/consultations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          showToast('Query submitted to Senior Agronomist! वैज्ञानिक सलाह जल्द मिलेगी।', 'success');
          DOM.askDoctorForm.reset();
          fetchDoctorConsultations();
        }
      } catch (err) {
        showToast('Query registered for agronomy review!', 'success');
        DOM.askDoctorForm.reset();
      }
    });
  }

  // Close all on ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMandiModal();
      closeBazaarModal();
      closeAuthModal();
      closeTrackModal();
      closeDoctorModal();
    }
  });

  // Check login on load
  updateAuthHeader();
}

// ==========================================================================
// 14. FULL-STACK BACKEND API FETCHERS & RENDERERS
// ==========================================================================

async function fetchProductsFromBackend() {
  try {
    const res = await fetch('/api/products');
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.products && data.products.length > 0) {
        PRODUCTS = data.products;
        renderProducts();
      }
    }
  } catch (err) {
    console.log('Running in local catalog mode (API offline or static).');
  }
}

async function fetchMandiRates() {
  try {
    const res = await fetch('/api/mandi-rates');
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.rates) {
        state.mandiRates = data.rates;
        renderMandiTicker();
        renderMandiTable();
      }
    }
  } catch (err) {
    console.warn('Mandi rates fetch error:', err);
  }
}

function renderMandiTicker() {
  if (!DOM.mandiTickerTrack || state.mandiRates.length === 0) return;
  DOM.mandiTickerTrack.innerHTML = state.mandiRates.map(r => `
    <span class="mandi-ticker-item">
      <strong>${r.crop.split('(')[0].trim()}</strong>: ₹${r.modalPrice.toLocaleString('en-IN')}/Qtl 
      ${r.mspPrice ? `(MSP ₹${r.mspPrice})` : ''} 
      <span class="${r.trend === 'up' ? 'trend-up' : (r.trend === 'down' ? 'trend-down' : '')}">
        ${r.trend === 'up' ? '▲' : (r.trend === 'down' ? '▼' : '•')}
      </span>
    </span>
  `).join('');
}

function renderMandiTable() {
  if (!DOM.mandiTableBody) return;
  const stateVal = DOM.mandiStateFilter ? DOM.mandiStateFilter.value : 'all';
  const query = DOM.mandiCropSearch ? DOM.mandiCropSearch.value.toLowerCase().trim() : '';

  let list = state.mandiRates || [];
  if (stateVal !== 'all') {
    list = list.filter(r => r.state.toLowerCase() === stateVal.toLowerCase());
  }
  if (query) {
    list = list.filter(r => r.crop.toLowerCase().includes(query) || r.mandi.toLowerCase().includes(query));
  }

  if (list.length === 0) {
    DOM.mandiTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 24px; color: var(--text-dim);">No mandi rates found for selected filters.</td></tr>`;
    return;
  }

  DOM.mandiTableBody.innerHTML = list.map(r => `
    <tr>
      <td><strong>${r.crop}</strong></td>
      <td>${r.state} • <span style="color:var(--text-secondary);">${r.mandi}</span></td>
      <td><span class="badge-msp">₹${r.mspPrice ? r.mspPrice.toLocaleString('en-IN') : 'N/A'}</span></td>
      <td><strong style="color:#fbbf24; font-size:1rem;">₹${r.modalPrice.toLocaleString('en-IN')}</strong> <small style="color:var(--text-dim);">${r.unit}</small></td>
      <td>₹${r.minPrice.toLocaleString('en-IN')} - ₹${r.maxPrice.toLocaleString('en-IN')}</td>
      <td>
        <span class="${r.trend === 'up' ? 'trend-up' : (r.trend === 'down' ? 'trend-down' : '')}">
          ${r.trend === 'up' ? '▲ Bullish' : (r.trend === 'down' ? '▼ Softening' : '• Stable')}
        </span>
      </td>
    </tr>
  `).join('');
}

async function fetchFarmerListings() {
  try {
    const res = await fetch('/api/farmer/crops');
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.listings) {
        state.farmerListings = data.listings;
        renderFarmerListings();
      }
    }
  } catch (err) {
    console.warn('Farmer listings fetch error:', err);
  }
}

function renderFarmerListings() {
  if (!DOM.bazaarListingsGrid) return;
  if (!state.farmerListings || state.farmerListings.length === 0) {
    DOM.bazaarListingsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 30px; color:var(--text-dim);">No harvest listings posted yet. Be the first farmer to list your crop!</div>`;
    return;
  }

  DOM.bazaarListingsGrid.innerHTML = state.farmerListings.map(item => `
    <div class="bazaar-card">
      <div class="bazaar-card-header">
        <span class="bazaar-crop-title">${item.cropName}</span>
        <span class="bazaar-badge-msp">${item.badge || 'MSP PROTECTED'}</span>
      </div>
      <div style="font-size: 0.85rem; color: var(--text-secondary);">
        Variety: <strong>${item.variety}</strong>
      </div>
      <div>
        <span class="bazaar-price-tag">₹${item.pricePerQuintal.toLocaleString('en-IN')}</span>
        <span class="bazaar-price-unit">/ Quintal</span>
      </div>
      <div style="font-size: 0.8rem; color: var(--text-dim);">
        📦 Available: <strong>${item.quantityQuintals} Quintals</strong> (${item.moisturePercent || 'Grade A'})
      </div>
      <div class="bazaar-farmer-row">
        <span>👨‍🌾 ${item.farmerName}</span>
        <span>•</span>
        <span>${item.village}, ${item.state}</span>
      </div>
      <a href="tel:${item.farmerPhone || ''}" class="bazaar-contact-btn">
        📞 Contact Farmer Direct (${item.farmerPhone || 'Call'})
      </a>
    </div>
  `).join('');
}

function updateAuthHeader() {
  if (!DOM.authBtnLabel) return;
  if (state.user) {
    DOM.authBtnLabel.textContent = state.user.name.split(' ')[0] + ' (Kisan)';
    DOM.authBtn.classList.add('logged-in');
  } else {
    DOM.authBtnLabel.textContent = 'Kisan Login';
    DOM.authBtn.classList.remove('logged-in');
  }
}

function updateAuthModalView() {
  const tabs = document.getElementById('auth-tabs-container');
  if (state.user) {
    if (tabs) tabs.style.display = 'none';
    if (DOM.authViewLogin) DOM.authViewLogin.style.display = 'none';
    if (DOM.authViewRegister) DOM.authViewRegister.style.display = 'none';
    if (DOM.authViewProfile) {
      DOM.authViewProfile.style.display = 'block';
      if (DOM.profName) DOM.profName.textContent = state.user.name;
      if (DOM.profPhone) DOM.profPhone.textContent = '+91 ' + state.user.phone;
      if (DOM.profLoc) DOM.profLoc.textContent = `${state.user.village || 'Farm'}, ${state.user.state || 'India'} • Verified Member`;
    }
  } else {
    if (tabs) tabs.style.display = 'grid';
    if (DOM.authViewProfile) DOM.authViewProfile.style.display = 'none';
    if (DOM.authViewLogin) DOM.authViewLogin.style.display = 'block';
    if (DOM.authViewRegister) DOM.authViewRegister.style.display = 'none';
  }
}

async function trackSpecificOrder(queryId) {
  if (!queryId) return;
  openTrackModal();
  if (DOM.trackIdInput) DOM.trackIdInput.value = queryId;

  try {
    const cleanId = queryId.replace('#', '').trim();
    const res = await fetch(`/api/orders/${cleanId}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.order) {
        renderTrackingOrder(data.order);
        return;
      }
    }
  } catch (e) {
    console.warn('Tracking API fallback:', e);
  }

  // Fallback demo order preview
  if (DOM.trackDispId) DOM.trackDispId.textContent = '#' + queryId;
  if (DOM.trackDispStatus) DOM.trackDispStatus.textContent = 'Dispatched from Hub';
  if (DOM.trackTimeline) {
    DOM.trackTimeline.innerHTML = `
      <div class="timeline-step step-done"><div class="step-circle">✓</div><div class="step-content"><h5>Order Placed & Certified</h5><p>Germination & moisture guaranteed</p></div></div>
      <div class="timeline-step step-done"><div class="step-circle">✓</div><div class="step-content"><h5>Allocated at Regional Krishi Hub</h5><p>Fulfillment center dispatch approved</p></div></div>
      <div class="timeline-step step-active"><div class="step-circle">3</div><div class="step-content"><h5>Quality Inspection & Dispatch</h5><p>Bag sealing and logistics handover in progress</p></div></div>
      <div class="timeline-step"><div class="step-circle">4</div><div class="step-content"><h5>Village Doorstep Delivery</h5><p>Arrival at farm gate expected within 24-48 hrs</p></div></div>
    `;
  }
}

function renderTrackingOrder(order) {
  if (DOM.trackDispId) DOM.trackDispId.textContent = '#' + order.id;
  if (DOM.trackDispStatus) DOM.trackDispStatus.textContent = order.orderStatus || 'Confirmed';
  if (DOM.trackTimeline && order.trackingTimeline) {
    DOM.trackTimeline.innerHTML = order.trackingTimeline.map((step, idx) => `
      <div class="timeline-step ${step.done ? 'step-done' : (idx === 1 ? 'step-active' : '')}">
        <div class="step-circle">${step.done ? '✓' : (idx + 1)}</div>
        <div class="step-content">
          <h5>${step.step}</h5>
          <p>${step.time}</p>
        </div>
      </div>
    `).join('');
  }
}

async function fetchDoctorConsultations() {
  try {
    const res = await fetch('/api/consultations');
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.consultations) {
        state.consultations = data.consultations;
        renderDoctorConsultations();
      }
    }
  } catch (err) {
    console.warn('Consultations fetch error:', err);
  }
}

function renderDoctorConsultations() {
  if (!DOM.doctorQnaList) return;
  if (!state.consultations || state.consultations.length === 0) {
    DOM.doctorQnaList.innerHTML = `<div style="text-align:center; padding: 20px; color:var(--text-dim);">No questions asked yet. Ask the first query!</div>`;
    return;
  }

  DOM.doctorQnaList.innerHTML = state.consultations.map(c => `
    <div class="qna-item">
      <div class="qna-crop-badge">🌱 ${c.crop} • Farmer: ${c.farmerName}</div>
      <div class="qna-question">"${c.question}"</div>
      <div class="qna-reply">
        <strong>Krishi Sewa Advisory:</strong> ${c.advice}
        <div class="qna-author">By ${c.expertName}</div>
      </div>
    </div>
  `).join('');
}

// Global hook for onclick in order confirmation
window.trackSpecificOrder = trackSpecificOrder;

// ==========================================================================
// 15. INITIALIZE APP
// ==========================================================================
function init() {
  DOM.html.setAttribute('data-theme', state.theme);
  DOM.priceSliderDisplay.textContent = formatPrice(state.maxPrice);
  renderProducts();
  updateCartUI();
  updateWishlistUI();
  setupEventListeners();
  startCountdown();

  // Full-Stack Initializers
  fetchProductsFromBackend();
  fetchMandiRates();
  fetchFarmerListings();
  fetchDoctorConsultations();

  console.log('🌾 Krishi Sewa (कृषि सेवा) Full-Stack Portal Initialized Successfully.');
}

// Launch on DOM ready
document.addEventListener('DOMContentLoaded', init);

