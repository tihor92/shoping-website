const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const FILES = {
  products: path.join(DATA_DIR, 'products.json'),
  users: path.join(DATA_DIR, 'users.json'),
  orders: path.join(DATA_DIR, 'orders.json'),
  mandiRates: path.join(DATA_DIR, 'mandi_rates.json'),
  farmerListings: path.join(DATA_DIR, 'farmer_listings.json'),
  consultations: path.join(DATA_DIR, 'consultations.json')
};

// Seed Products
const INITIAL_PRODUCTS = [
  {
    id: 'ks-01',
    name: 'Hybrid Wheat Seeds (HD-3086 Shresth)',
    category: 'seeds',
    categoryLabel: 'Certified Seeds',
    price: 1249,
    oldPrice: 1499,
    rating: 4.9,
    reviews: 1420,
    stock: 250,
    badge: 'TOP HARVEST',
    badgeType: 'badge-hot',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=700&q=80',
    description: 'Government certified high-tillering variety with 99.8% germination purity, rust resistance, and high chapati quality. Ideal for timely irrigated sowing.',
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
    stock: 180,
    badge: '100% ORGANIC',
    badgeType: '',
    image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=700&q=80',
    description: 'Pure Eisenia Fetida earthworm castings enriched with beneficial microbes, mycorrhiza, and humic acid to rejuvenate soil texture and water retention.',
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
    stock: 95,
    badge: '-21% OFF',
    badgeType: 'badge-sale',
    image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=700&q=80',
    description: 'Heavy duty rechargeable 12V 12Ah battery sprayer with stainless steel extendable lance, dual brass nozzles, and pressure regulator. Covers 4 acres per charge.',
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
    stock: 320,
    badge: 'HIGH YIELD',
    badgeType: '',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=700&q=80',
    description: 'Triple disease resistant hybrid (ToLCV, BW, and EB). High firm deep red fruits weighing 90-100g, perfect for long-distance transport and export.',
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
    stock: 140,
    badge: 'ORGANIC CERTIFIED',
    badgeType: 'badge-hot',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=700&q=80',
    description: 'Natural broad-spectrum organic insect repellent formulated with high Azadirachtin content to control whiteflies, aphids, thrips, and mites without harming bees.',
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
    stock: 45,
    badge: 'WATER SAVER',
    badgeType: '',
    image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=700&q=80',
    description: 'Complete high-density polyethylene micro-irrigation system with 16mm main lateral line, inline drippers, screen filter, punch tool, and end caps.',
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
    stock: 75,
    badge: 'SMART FARMING',
    badgeType: '',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=700&q=80',
    description: 'Instant electronic soil diagnostic probe measuring soil fertility, pH balance (3.5 to 9.0), moisture level, and ambient sunlight intensity.',
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
    stock: 210,
    badge: 'BESTSELLER',
    badgeType: '',
    image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=700&q=80',
    description: 'Balanced formula of Nitrogen, Phosphorus, and Potassium for vegetative growth, rapid root development, and fruit sizing. 100% drip and spray compatible.',
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
    stock: 60,
    badge: 'LABOUR SAVER',
    badgeType: '',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=700&q=80',
    description: 'Ergonomic stainless-steel push seeder allowing a single farmer to sow seeds and deposit fertilizer simultaneously at precise soil depths without bending down.',
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
    stock: 190,
    badge: '41% OIL CONTENT',
    badgeType: 'badge-sale',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=700&q=80',
    description: 'High-performing bold mustard seeds with up to 41.5% oil content, strong resistance to white rust and Alternaria blight, and drought resilience.',
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
    stock: 130,
    badge: 'JAPANESE STEEL',
    badgeType: '',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=700&q=80',
    description: 'SK-5 high carbon hardened Japanese steel blades with Teflon coating, ergonomic shock-absorbing handles, and precision bypass clean cut.',
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
    stock: 85,
    badge: 'SOLAR POWERED',
    badgeType: 'badge-hot',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=700&q=80',
    description: 'Keep wild boars, nilgai, rodents, and birds away from standing crops using motion-activated PIR sensors, variable ultrasonic frequencies, and flashing LED lights.',
    specs: ['Solar Monocrystalline Panel', '30ft Detection Range', 'IP44 Weatherproof', 'Zero Harm to Animals']
  }
];

// Seed Mandi & MSP Rates
const INITIAL_MANDI_RATES = [
  {
    id: 'mr-01',
    crop: 'Wheat (गेहूं - Sharbati)',
    state: 'Madhya Pradesh',
    mandi: 'Sehore APMC',
    modalPrice: 2850,
    minPrice: 2600,
    maxPrice: 3100,
    mspPrice: 2275,
    unit: '₹ / Quintal',
    trend: 'up',
    updatedAt: '2026-10-27'
  },
  {
    id: 'mr-02',
    crop: 'Paddy / Rice (Basmati 1121)',
    state: 'Punjab',
    mandi: 'Khanna Mandi',
    modalPrice: 4200,
    minPrice: 3950,
    maxPrice: 4450,
    mspPrice: 2320,
    unit: '₹ / Quintal',
    trend: 'up',
    updatedAt: '2026-10-27'
  },
  {
    id: 'mr-03',
    crop: 'Mustard (सरसों)',
    state: 'Rajasthan',
    mandi: 'Bharatpur APMC',
    modalPrice: 5650,
    minPrice: 5400,
    maxPrice: 5850,
    mspPrice: 5650,
    unit: '₹ / Quintal',
    trend: 'stable',
    updatedAt: '2026-10-27'
  },
  {
    id: 'mr-04',
    crop: 'Cotton (कपास - Medium Staple)',
    state: 'Gujarat',
    mandi: 'Rajkot APMC',
    modalPrice: 7420,
    minPrice: 7100,
    maxPrice: 7650,
    mspPrice: 7121,
    unit: '₹ / Quintal',
    trend: 'up',
    updatedAt: '2026-10-27'
  },
  {
    id: 'mr-05',
    crop: 'Soybean (सोयाबीन - Yellow)',
    state: 'Maharashtra',
    mandi: 'Latur Mandi',
    modalPrice: 4890,
    minPrice: 4600,
    maxPrice: 5100,
    mspPrice: 4892,
    unit: '₹ / Quintal',
    trend: 'down',
    updatedAt: '2026-10-27'
  },
  {
    id: 'mr-06',
    crop: 'Red Onion (प्याज - Nasik Grade A)',
    state: 'Maharashtra',
    mandi: 'Lasalgaon APMC',
    modalPrice: 2450,
    minPrice: 1900,
    maxPrice: 2900,
    mspPrice: 2100,
    unit: '₹ / Quintal',
    trend: 'up',
    updatedAt: '2026-10-27'
  },
  {
    id: 'mr-07',
    crop: 'Potato (आलू - Kufri Jyoti)',
    state: 'Uttar Pradesh',
    mandi: 'Agra APMC',
    modalPrice: 1650,
    minPrice: 1400,
    maxPrice: 1850,
    mspPrice: 1500,
    unit: '₹ / Quintal',
    trend: 'stable',
    updatedAt: '2026-10-27'
  },
  {
    id: 'mr-08',
    crop: 'Chana / Chickpea (चना काबुली)',
    state: 'Madhya Pradesh',
    mandi: 'Indore Mandi',
    modalPrice: 6100,
    minPrice: 5850,
    maxPrice: 6350,
    mspPrice: 5440,
    unit: '₹ / Quintal',
    trend: 'up',
    updatedAt: '2026-10-27'
  }
];

// Seed Farmer Direct Marketplace Harvest Listings
const INITIAL_FARMER_LISTINGS = [
  {
    id: 'crop-101',
    farmerName: 'Baldev Singh Dhillon',
    farmerPhone: '+91 98765 43210',
    village: 'Samrala, Ludhiana',
    state: 'Punjab',
    cropName: 'Basmati Rice 1121 Export Grade',
    variety: 'Pusa 1121 Extra Long Grain',
    quantityQuintals: 150,
    pricePerQuintal: 4350,
    mspProtected: true,
    harvestDate: 'October 2026',
    moisturePercent: '11.8%',
    status: 'ACTIVE',
    badge: 'MSP VERIFIED',
    createdAt: '2026-10-25T10:00:00Z'
  },
  {
    id: 'crop-102',
    farmerName: 'Rameshwar Patidar',
    farmerPhone: '+91 98234 11223',
    village: 'Pipaliya, Ujjain',
    state: 'Madhya Pradesh',
    cropName: 'Organic Soybean (Yellow)',
    variety: 'JS-2034 Certified Non-GMO',
    quantityQuintals: 80,
    pricePerQuintal: 4950,
    mspProtected: true,
    harvestDate: 'October 2026',
    moisturePercent: '10.5%',
    status: 'ACTIVE',
    badge: '100% ORGANIC',
    createdAt: '2026-10-26T14:30:00Z'
  },
  {
    id: 'crop-103',
    farmerName: 'Suresh Chandra Sharma',
    farmerPhone: '+91 94140 88765',
    village: 'Deeg, Bharatpur',
    state: 'Rajasthan',
    cropName: 'High-Oil Mustard (सरसों)',
    variety: 'Giriraj Bold Grade',
    quantityQuintals: 110,
    pricePerQuintal: 5750,
    mspProtected: true,
    harvestDate: 'September 2026',
    moisturePercent: '7.8%',
    status: 'ACTIVE',
    badge: 'HIGH OIL 42%',
    createdAt: '2026-10-27T08:15:00Z'
  }
];

// Seed Sample User
const INITIAL_USERS = [
  {
    id: 'usr-admin-1',
    name: 'Krishi Sewa Administrator',
    email: 'admin@krishisewa.org',
    phone: '9876543210',
    passwordHash: bcrypt.hashSync('Kisan@2026', 10),
    role: 'admin',
    state: 'New Delhi',
    village: 'IARI Pusa Campus',
    createdAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'usr-farmer-1',
    name: 'Ramesh Patel (किसान)',
    email: 'ramesh.farmer@krishisewa.org',
    phone: '9898989898',
    passwordHash: bcrypt.hashSync('kisan123', 10),
    role: 'farmer',
    state: 'Gujarat',
    village: 'Anand Taluka, Kheda',
    createdAt: '2026-02-15T00:00:00Z'
  }
];

// Seed Sample Orders
const INITIAL_ORDERS = [
  {
    id: 'KS-882910',
    customer: {
      fullName: 'Ramesh Patel',
      mobile: '9898989898',
      email: 'ramesh.farmer@krishisewa.org',
      state: 'Gujarat',
      district: 'Anand',
      village: 'Vasad Road, Gam Samarkha',
      pin: '388306',
      notes: 'Call before delivery. Farm gate is near tube well #3.'
    },
    items: [
      {
        id: 'ks-01',
        name: 'Hybrid Wheat Seeds (HD-3086 Shresth)',
        price: 1249,
        quantity: 2
      },
      {
        id: 'ks-02',
        name: 'Bio-Organic Vermicompost Enriched Fertilizer',
        price: 549,
        quantity: 1
      }
    ],
    pricing: {
      subtotal: 3047,
      discount: 609,
      shipping: 0,
      total: 2438,
      currency: 'INR',
      promoCode: 'KISAN20'
    },
    paymentMethod: 'cod',
    paymentStatus: 'Pending Inspection on Delivery',
    orderStatus: 'Confirmed',
    trackingTimeline: [
      { step: 'Order Placed', time: '2026-10-27 10:15 AM', done: true },
      { step: 'Allocated at Regional Krishi Hub', time: '2026-10-27 12:40 PM', done: true },
      { step: 'Quality Inspection & Dispatch', time: 'In Progress', done: false },
      { step: 'Village Doorstep Delivery', time: 'Expected Tomorrow', done: false }
    ],
    createdAt: '2026-10-27T10:15:00Z'
  }
];

// Seed Consultations (Krishi Doctor Q&A)
const INITIAL_CONSULTATIONS = [
  {
    id: 'qna-01',
    farmerName: 'Dharmendra Yadav',
    crop: 'Wheat (गेहूं)',
    question: 'How do I identify and manage yellow rust at early tillering stage?',
    advice: 'Spray Propiconazole 25% EC @ 1ml per litre water or Tebuconazole 25.9% EC. Apply when morning dew clears. Avoid excess urea application.',
    expertName: 'Dr. V. K. Joshi (Senior Agronomist, ICAR)',
    status: 'ANSWERED',
    createdAt: '2026-10-26T09:30:00Z'
  },
  {
    id: 'qna-02',
    farmerName: 'Gurpreet Singh',
    crop: 'Mustard (सरसों)',
    question: 'What is the ideal dose of sulphur per acre for increasing oil content?',
    advice: 'Apply Bentonite Sulphur (90% S) @ 10-12 kg per acre at time of final land preparation. It improves oil synthesis and enhances cold resistance.',
    expertName: 'Dr. Ananya Ray (Soil Scientist)',
    status: 'ANSWERED',
    createdAt: '2026-10-27T08:00:00Z'
  }
];

// Helper functions for reading and writing JSON files safely
function readJson(filePath, defaultValue) {
  try {
    if (!fs.existsSync(filePath)) {
      writeJson(filePath, defaultValue);
      return defaultValue;
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return defaultValue;
  }
}

function writeJson(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    return false;
  }
}

// Initialize database files with seed data
function initDb() {
  if (!fs.existsSync(FILES.products)) writeJson(FILES.products, INITIAL_PRODUCTS);
  if (!fs.existsSync(FILES.mandiRates)) writeJson(FILES.mandiRates, INITIAL_MANDI_RATES);
  if (!fs.existsSync(FILES.farmerListings)) writeJson(FILES.farmerListings, INITIAL_FARMER_LISTINGS);
  if (!fs.existsSync(FILES.users)) writeJson(FILES.users, INITIAL_USERS);
  if (!fs.existsSync(FILES.orders)) writeJson(FILES.orders, INITIAL_ORDERS);
  if (!fs.existsSync(FILES.consultations)) writeJson(FILES.consultations, INITIAL_CONSULTATIONS);
}

// Database Operations
const db = {
  initDb,

  // Products
  getProducts(filters = {}) {
    let products = readJson(FILES.products, INITIAL_PRODUCTS);

    if (filters.category && filters.category !== 'all') {
      products = products.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
    }

    if (filters.search) {
      const q = filters.search.toLowerCase().trim();
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.categoryLabel && p.categoryLabel.toLowerCase().includes(q)) ||
        (p.specs && p.specs.some(s => s.toLowerCase().includes(q)))
      );
    }

    if (filters.maxPrice) {
      const max = parseFloat(filters.maxPrice);
      if (!isNaN(max)) {
        products = products.filter(p => p.price <= max);
      }
    }

    if (filters.minPrice) {
      const min = parseFloat(filters.minPrice);
      if (!isNaN(min)) {
        products = products.filter(p => p.price >= min);
      }
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-low':
          products.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          products.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          products.sort((a, b) => b.rating - a.rating);
          break;
        case 'alpha-asc':
          products.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          break;
      }
    }

    return products;
  },

  getProductById(id) {
    const products = readJson(FILES.products, INITIAL_PRODUCTS);
    return products.find(p => p.id === id) || null;
  },

  createProduct(product) {
    const products = readJson(FILES.products, INITIAL_PRODUCTS);
    const newProduct = {
      id: product.id || `ks-${Date.now().toString().slice(-4)}`,
      name: product.name,
      category: product.category || 'seeds',
      categoryLabel: product.categoryLabel || 'Agri Supplies',
      price: Number(product.price) || 0,
      oldPrice: Number(product.oldPrice) || (Number(product.price) * 1.2),
      rating: 4.8,
      reviews: 1,
      stock: Number(product.stock) || 50,
      badge: product.badge || 'VERIFIED SELLER',
      badgeType: product.badgeType || '',
      image: product.image || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=700&q=80',
      description: product.description || '',
      specs: product.specs || ['Government Certified', 'High Purity', 'Standard Grade']
    };
    products.unshift(newProduct);
    writeJson(FILES.products, products);
    return newProduct;
  },

  updateProduct(id, updates) {
    const products = readJson(FILES.products, INITIAL_PRODUCTS);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return null;

    products[index] = { ...products[index], ...updates };
    writeJson(FILES.products, products);
    return products[index];
  },

  deleteProduct(id) {
    let products = readJson(FILES.products, INITIAL_PRODUCTS);
    const beforeLen = products.length;
    products = products.filter(p => p.id !== id);
    if (products.length !== beforeLen) {
      writeJson(FILES.products, products);
      return true;
    }
    return false;
  },

  // Mandi & MSP Rates
  getMandiRates(state = null, crop = null) {
    let rates = readJson(FILES.mandiRates, INITIAL_MANDI_RATES);
    if (state && state !== 'all') {
      rates = rates.filter(r => r.state.toLowerCase() === state.toLowerCase());
    }
    if (crop) {
      rates = rates.filter(r => r.crop.toLowerCase().includes(crop.toLowerCase()));
    }
    return rates;
  },

  // Farmer Marketplace Crop Listings
  getFarmerListings() {
    return readJson(FILES.farmerListings, INITIAL_FARMER_LISTINGS);
  },

  createFarmerListing(listing) {
    const listings = readJson(FILES.farmerListings, INITIAL_FARMER_LISTINGS);
    const newListing = {
      id: `crop-${Date.now().toString().slice(-4)}`,
      farmerName: listing.farmerName || 'Verified Kisan',
      farmerPhone: listing.farmerPhone || '',
      village: listing.village || '',
      state: listing.state || 'All India',
      cropName: listing.cropName,
      variety: listing.variety || 'Commercial Grade',
      quantityQuintals: Number(listing.quantityQuintals) || 10,
      pricePerQuintal: Number(listing.pricePerQuintal) || 2000,
      mspProtected: Boolean(listing.mspProtected ?? true),
      harvestDate: listing.harvestDate || 'Current Season',
      moisturePercent: listing.moisturePercent || 'Standard (<12%)',
      status: 'ACTIVE',
      badge: 'FARM FRESH',
      createdAt: new Date().toISOString()
    };
    listings.unshift(newListing);
    writeJson(FILES.farmerListings, listings);
    return newListing;
  },

  // Users & Auth
  getUsers() {
    return readJson(FILES.users, INITIAL_USERS);
  },

  getUserByPhone(phone) {
    const users = readJson(FILES.users, INITIAL_USERS);
    return users.find(u => u.phone === phone) || null;
  },

  getUserByEmail(email) {
    const users = readJson(FILES.users, INITIAL_USERS);
    return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  getUserById(id) {
    const users = readJson(FILES.users, INITIAL_USERS);
    return users.find(u => u.id === id) || null;
  },

  createUser(userData) {
    const users = readJson(FILES.users, INITIAL_USERS);
    const passwordHash = bcrypt.hashSync(userData.password || 'kisan123', 10);
    const newUser = {
      id: `usr-${Date.now().toString().slice(-6)}`,
      name: userData.name,
      email: userData.email || `${userData.phone}@krishisewa.org`,
      phone: userData.phone,
      passwordHash,
      role: userData.role || 'farmer',
      state: userData.state || 'India',
      village: userData.village || '',
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    writeJson(FILES.users, users);
    return newUser;
  },

  // Orders
  getOrders(userPhoneOrEmail = null) {
    const orders = readJson(FILES.orders, INITIAL_ORDERS);
    if (!userPhoneOrEmail) return orders;
    return orders.filter(o => 
      o.customer?.mobile === userPhoneOrEmail || 
      o.customer?.email?.toLowerCase() === userPhoneOrEmail.toLowerCase()
    );
  },

  getOrderById(id) {
    const orders = readJson(FILES.orders, INITIAL_ORDERS);
    return orders.find(o => o.id === id) || null;
  },

  createOrder(orderData) {
    const orders = readJson(FILES.orders, INITIAL_ORDERS);
    const orderId = `KS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: orderId,
      customer: orderData.customer,
      items: orderData.items || [],
      pricing: orderData.pricing || {
        subtotal: 0,
        discount: 0,
        shipping: 0,
        total: 0,
        currency: 'INR'
      },
      paymentMethod: orderData.paymentMethod || 'cod',
      paymentStatus: orderData.paymentMethod === 'cod' ? 'Pay upon Delivery & Inspection' : 'Prepaid (UPI/Card)',
      orderStatus: 'Confirmed',
      trackingTimeline: [
        { step: 'Order Placed & Certified', time: new Date().toLocaleString(), done: true },
        { step: 'Allocated at Regional Krishi Hub', time: 'Dispatched to Fulfillment Hub', done: true },
        { step: 'Quality Inspection & Dispatch', time: 'In Progress', done: false },
        { step: 'Village Doorstep Delivery', time: 'Expected 2-3 Days', done: false }
      ],
      createdAt: new Date().toISOString()
    };
    orders.unshift(newOrder);
    writeJson(FILES.orders, orders);
    return newOrder;
  },

  updateOrderStatus(id, status) {
    const orders = readJson(FILES.orders, INITIAL_ORDERS);
    const order = orders.find(o => o.id === id);
    if (!order) return null;
    order.orderStatus = status;
    writeJson(FILES.orders, orders);
    return order;
  },

  // Consultations (Krishi Doctor Q&A)
  getConsultations() {
    return readJson(FILES.consultations, INITIAL_CONSULTATIONS);
  },

  createConsultation(data) {
    const consultations = readJson(FILES.consultations, INITIAL_CONSULTATIONS);
    const newConsultation = {
      id: `qna-${Date.now().toString().slice(-4)}`,
      farmerName: data.farmerName || 'Kisan Mitra',
      crop: data.crop || 'General Crop Care',
      question: data.question,
      advice: data.advice || 'Our Senior Agronomist has received your query. Detailed organic and chemical management guidelines will be sent to your mobile via SMS.',
      expertName: 'Dr. Krishi Sewa Agronomy Cell',
      status: 'UNDER_REVIEW',
      createdAt: new Date().toISOString()
    };
    consultations.unshift(newConsultation);
    writeJson(FILES.consultations, consultations);
    return newConsultation;
  },

  // Platform Statistics
  getStats() {
    const products = readJson(FILES.products, INITIAL_PRODUCTS);
    const orders = readJson(FILES.orders, INITIAL_ORDERS);
    const listings = readJson(FILES.farmerListings, INITIAL_FARMER_LISTINGS);
    const mandiRates = readJson(FILES.mandiRates, INITIAL_MANDI_RATES);
    const users = readJson(FILES.users, INITIAL_USERS);

    return {
      totalProducts: products.length,
      totalOrders: orders.length,
      totalFarmerListings: listings.length,
      totalMandiRatesTracked: mandiRates.length,
      totalRegisteredFarmers: users.filter(u => u.role === 'farmer').length + 65240, // realistic active community scale
      statesCovered: 18,
      satisfactionRate: '99.4%'
    };
  }
};

// Initialize DB on file load
db.initDb();

module.exports = db;
