const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'krishi-sewa-secure-kisan-secret-2026';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
app.use(express.static(path.join(__dirname)));

// Auth Token Verification Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, error: 'Authentication token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, error: 'Invalid or expired session token' });
    }
    req.user = user;
    next();
  });
}

// Optional Auth (populates req.user if token is present)
function optionalAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (!err) req.user = user;
      next();
    });
  } else {
    next();
  }
}

// ==========================================================================
// REST API ROUTES
// ==========================================================================

// 1. Health & Platform Stats
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'Krishi Sewa Full-Stack API',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime())
  });
});

app.get('/api/stats', (req, res) => {
  const stats = db.getStats();
  res.json({ success: true, stats });
});

// 2. Categories
app.get('/api/categories', (req, res) => {
  const products = db.getProducts();
  const categoryMap = {
    all: { id: 'all', label: 'All Farm Supplies', count: products.length, icon: '🌾' },
    seeds: { id: 'seeds', label: 'Certified Seeds', count: 0, icon: '🌱' },
    fertilizers: { id: 'fertilizers', label: 'Bio-Fertilizers & Nutrients', count: 0, icon: '🧪' },
    equipment: { id: 'equipment', label: 'Tools & Sprayers', count: 0, icon: '🚜' },
    protection: { id: 'protection', label: 'Crop Care & Neem', count: 0, icon: '🛡️' },
    irrigation: { id: 'irrigation', label: 'Drip & Sprinkler', count: 0, icon: '💧' }
  };

  products.forEach(p => {
    if (categoryMap[p.category]) {
      categoryMap[p.category].count++;
    }
  });

  res.json({ success: true, categories: Object.values(categoryMap) });
});

// 3. Products (Catalog CRUD)
app.get('/api/products', (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, sortBy, page = 1, limit = 50 } = req.query;
    const products = db.getProducts({ category, search, minPrice, maxPrice, sortBy });
    
    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedProducts = products.slice(startIndex, startIndex + limitNum);

    res.json({
      success: true,
      total: products.length,
      page: pageNum,
      totalPages: Math.ceil(products.length / limitNum),
      products: paginatedProducts
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/products/:id', (req, res) => {
  const product = db.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, error: 'Agri product not found' });
  }
  res.json({ success: true, product });
});

app.post('/api/products', (req, res) => {
  try {
    const { name, category, price, description, specs, image, badge } = req.body;
    if (!name || !price) {
      return res.status(400).json({ success: false, error: 'Product name and price are required' });
    }

    const newProduct = db.createProduct({
      name,
      category,
      price,
      description,
      specs,
      image,
      badge
    });

    res.status(201).json({ success: true, message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/products/:id', (req, res) => {
  const updated = db.updateProduct(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }
  res.json({ success: true, message: 'Product updated successfully', product: updated });
});

app.delete('/api/products/:id', (req, res) => {
  const deleted = db.deleteProduct(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }
  res.json({ success: true, message: 'Product removed successfully' });
});

// 4. Mandi & MSP Live Market Rates
app.get('/api/mandi-rates', (req, res) => {
  const { state, crop } = req.query;
  const rates = db.getMandiRates(state, crop);
  res.json({
    success: true,
    count: rates.length,
    timestamp: new Date().toISOString(),
    rates
  });
});

// 5. Farmer Direct Crop Marketplace (Kisan Harvest Listings)
app.get('/api/farmer/crops', (req, res) => {
  const listings = db.getFarmerListings();
  res.json({ success: true, count: listings.length, listings });
});

app.post('/api/farmer/crops', (req, res) => {
  try {
    const { farmerName, farmerPhone, village, state, cropName, variety, quantityQuintals, pricePerQuintal } = req.body;
    if (!farmerName || !cropName || !pricePerQuintal) {
      return res.status(400).json({ success: false, error: 'Farmer name, crop name and price per quintal are required' });
    }

    const newListing = db.createFarmerListing(req.body);
    res.status(201).json({
      success: true,
      message: 'Harvest listing posted to Kisan Marketplace successfully!',
      listing: newListing
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 6. Orders & Checkout API
app.get('/api/orders', (req, res) => {
  const { user, mobile, email } = req.query;
  const filterVal = user || mobile || email;
  const orders = db.getOrders(filterVal);
  res.json({ success: true, count: orders.length, orders });
});

app.get('/api/orders/:id', (req, res) => {
  const order = db.getOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, error: 'Order not found' });
  }
  res.json({ success: true, order });
});

app.post('/api/orders', (req, res) => {
  try {
    const { customer, items, pricing, paymentMethod } = req.body;

    if (!customer || !customer.fullName || !customer.mobile || !customer.village) {
      return res.status(400).json({
        success: false,
        error: 'Complete delivery address with Full Name, Mobile, and Village/Tehsil is required'
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, error: 'Cart is empty. Add farm supplies before ordering' });
    }

    const newOrder = db.createOrder({
      customer,
      items,
      pricing,
      paymentMethod: paymentMethod || 'cod'
    });

    res.status(201).json({
      success: true,
      message: 'Farm order placed successfully! SMS tracking has been initiated.',
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.patch('/api/orders/:id/status', (req, res) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ success: false, error: 'Status is required' });
  }
  const updated = db.updateOrderStatus(req.params.id, status);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Order not found' });
  }
  res.json({ success: true, message: 'Order status updated', order: updated });
});

// 7. Farmer Authentication & Profiles
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, phone, email, password, role, state, village } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ success: false, error: 'Name, Phone and Password are required' });
    }

    const existingPhone = db.getUserByPhone(phone);
    if (existingPhone) {
      return res.status(400).json({ success: false, error: 'An account with this phone number already exists' });
    }

    const newUser = db.createUser({ name, phone, email, password, role, state, village });
    
    // Generate JWT
    const token = jwt.sign(
      { id: newUser.id, name: newUser.name, phone: newUser.phone, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      success: true,
      message: 'Farmer account created successfully',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        phone: newUser.phone,
        email: newUser.email,
        role: newUser.role,
        village: newUser.village,
        state: newUser.state
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { loginId, password } = req.body; // loginId can be phone or email
    if (!loginId || !password) {
      return res.status(400).json({ success: false, error: 'Phone/Email and Password are required' });
    }

    const user = db.getUserByPhone(loginId) || db.getUserByEmail(loginId);
    if (!user) {
      return res.status(401).json({ success: false, error: 'No account found with this phone number or email' });
    }

    const passwordValid = bcrypt.compareSync(password, user.passwordHash);
    if (!passwordValid) {
      return res.status(401).json({ success: false, error: 'Incorrect password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, name: user.name, phone: user.phone, role: user.role },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
        village: user.village,
        state: user.state
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = db.getUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, error: 'User profile not found' });
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
      village: user.village,
      state: user.state
    }
  });
});

// 8. Consultations (Krishi Doctor Q&A)
app.get('/api/consultations', (req, res) => {
  const consultations = db.getConsultations();
  res.json({ success: true, count: consultations.length, consultations });
});

app.post('/api/consultations', (req, res) => {
  try {
    const { farmerName, crop, question } = req.body;
    if (!question || !crop) {
      return res.status(400).json({ success: false, error: 'Crop name and question details are required' });
    }

    const consultation = db.createConsultation(req.body);
    res.status(201).json({
      success: true,
      message: 'Query submitted to Krishi Doctor team! Response will appear on your advisory board.',
      consultation
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Fallback to index.html for client-side navigation
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Export app for serverless deployment & run listener for local
if (process.env.NODE_ENV !== 'production' || require.main === module) {
  app.listen(PORT, () => {
    console.log(`🌾 Krishi Sewa (कृषि सेवा) Full-Stack Portal running at http://localhost:${PORT}`);
    console.log(`📡 API Endpoints live at http://localhost:${PORT}/api/products`);
    console.log(`📊 Live Mandi Rates API at http://localhost:${PORT}/api/mandi-rates`);
  });
}

module.exports = app;
