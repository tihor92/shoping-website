# 🌾 Krishi Sewa (कृषि सेवा) — Complete Full-Stack Agricultural E-Commerce & Marketplace

A modern, high-yield **full-stack agricultural e-commerce platform and fair-price crop marketplace** designed for Indian farmers, agronomists, and agricultural buyers.

---

## 🌟 Key Architecture & Stack

### **Backend (Node.js + Express REST API)**
- **Server**: Express 5.x server ([`server.js`](file:///server.js)) serving REST APIs and static frontend assets.
- **Vercel Serverless Ready**: [`api/index.js`](file:///api/index.js) export with [`vercel.json`](file:///vercel.json) rewrite routes for zero-config global cloud deployment.
- **Database Engine**: Persistent JSON-backed relational storage in [`database.js`](file:///database.js) and `data/` directory.
- **Authentication**: JWT authentication with `jsonwebtoken` and `bcryptjs` password hashing.
- **Security & Standards**: CORS enabled, input validation, structured HTTP status codes, and atomic file persistence.

### **Frontend (HTML5 + Vanilla CSS3 + JavaScript)**
- **Storefront**: Certified seeds, bio-fertilizers, knapsack sprayers, micro-irrigation kits, and crop protection.
- **Live APMC Mandi & MSP Ticker**: Real-time market rates ticker comparing modal price against Government Minimum Support Price (MSP).
- **Kisan Bazaar (Farmer Direct Marketplace)**: Tab allowing farmers to list their harvested crops (Basmati Rice, Sharbati Wheat, Mustard, Soybean) directly for buyers with MSP protection.
- **Kisan Identity & Profiles**: Farmer registration, login, JWT session persistence, and order history.
- **Live Order Tracking**: Milestone tracking for orders (`Order Placed`, `Allocated at Hub`, `Quality Inspection`, `Village Doorstep Delivery`).
- **Krishi Doctor Agronomy Cell**: Interactive consultation board connecting farmers with ICAR agronomists.
- **Cart & Village Delivery**: Free village delivery calculator, multi-currency support (INR ₹, USD $, EUR €, GBP £), and coupon system (`KISAN20`, `KRISHI10`).

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server status and uptime |
| `GET` | `/api/stats` | Platform statistics (registered farmers, active orders, coverage) |
| `GET` | `/api/products` | Get products with search, category, and price filters |
| `GET` | `/api/products/:id` | Get details of a single product |
| `POST` | `/api/products` | Add a new product to inventory |
| `PUT` | `/api/products/:id` | Update product details |
| `DELETE` | `/api/products/:id` | Delete product from catalog |
| `GET` | `/api/categories` | Get category breakdown with counts |
| `GET` | `/api/mandi-rates` | Live APMC Mandi and MSP rates (optional `?state=&crop=`) |
| `GET` | `/api/farmer/crops` | Get direct harvest crop marketplace listings |
| `POST` | `/api/farmer/crops` | Post a harvested crop to Kisan Bazaar |
| `POST` | `/api/orders` | Place a verified farm order |
| `GET` | `/api/orders/:id` | Track specific order by Krishi Order ID |
| `GET` | `/api/orders` | List orders for mobile number or user |
| `POST` | `/api/auth/register` | Register a new farmer account |
| `POST` | `/api/auth/login` | Authenticate farmer and return JWT token |
| `GET` | `/api/auth/me` | Fetch authenticated user profile (`Authorization: Bearer <token>`) |
| `GET` | `/api/consultations` | Get answered agronomy consultations |
| `POST` | `/api/consultations` | Submit query to Krishi Doctor agronomy team |

---

## 🚀 How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Full-Stack Server
```bash
npm start
```
Or for development:
```bash
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Demo Credentials
- **Farmer Account**:
  - **Mobile**: `9898989898`
  - **Password**: `kisan123`
- **Admin Account**:
  - **Email**: `admin@krishisewa.org`
  - **Password**: `Kisan@2026`

---

## ☁️ Deployment on Vercel

The project is structured with [`vercel.json`](file:///vercel.json) and [`api/index.js`](file:///api/index.js) for Vercel deployment:
1. Push changes to GitHub: `git push origin main`
2. Connect your repository on [vercel.com](https://vercel.com)
3. Deploy! Both static frontend assets and the Express API serverless functions deploy automatically.
