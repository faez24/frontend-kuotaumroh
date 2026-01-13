# Kuotaumroh.id

> Multi-role platform for Umroh package sales - Alpine.js + Tailwind CSS (No build process required)

## 🚀 Quick Start

### Running Locally

```bash
# Using Node.js (recommended)
npx serve . -l 5173

# Using Python
python -m http.server 5173

# Using PHP
php -S localhost:5173
```

Then visit: http://localhost:5173

## 👥 User Roles

The platform supports 3 distinct user roles:

| Role | Description | Dashboard |
|------|-------------|-----------|
| **Agent** | Travel agents who sell Umroh packages | `/agent/dashboard.html` |
| **Freelance** | Affiliates who earn points by recruiting agents | `/freelance/dashboard.html` |
| **Admin** | Platform administrators | `/admin/dashboard.html` |

### Demo Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Agent | agent@demo.com | demo123 |
| Freelance | affiliate@demo.com | demo123 |
| Admin | (OTP-based) | 123456 |

## 📁 Project Structure

```
kuotaumroh/
├── README.md
│
├── index.html                  # Public landing page
├── login.html                  # Main login (Google OAuth)
├── 404.html                    # Error page
│
├── agent/                      # Agent Portal
│   ├── dashboard.html          # Agent dashboard
│   ├── catalog.html            # Package catalog
│   ├── order.html              # Order management
│   ├── history.html            # Transaction history
│   ├── wallet.html             # Wallet balance
│   ├── withdraw.html           # Withdrawal requests
│   ├── referrals.html          # Referral program
│   ├── profile.html            # Profile settings
│   └── login.html              # Agent login
│
├── freelance/                  # Freelance Portal
│   ├── dashboard.html          # Freelance dashboard
│   ├── invite.html             # Invite agents
│   ├── downlines.html          # Downline list
│   ├── rewards.html            # Reward catalog
│   ├── points-history.html     # Points history
│   ├── profile.html            # Profile settings
│   └── login.html              # Freelance login
│
├── admin/                      # Admin Portal
│   ├── dashboard.html          # Admin dashboard
│   ├── users.html              # User management
│   ├── transactions.html       # All transactions
│   ├── analytics.html          # Platform analytics
│   ├── packages.html           # Package management
│   ├── withdrawals.html        # Withdrawal approvals
│   ├── reward-claims.html      # Reward claim approvals
│   ├── rewards.html            # Reward management
│   └── login.html              # Admin login (OTP)
│
├── shared/                     # Shared resources
│   ├── styles.css              # CSS variables & components
│   ├── utils.js                # Utility functions
│   ├── auth.js                 # Authentication helpers
│   ├── header.js               # Shared header component
│   ├── api.js                  # API service layer
│   └── components.js           # Reusable Alpine components
│
├── public/
│   ├── images/                 # Static assets
│   ├── favicon/                # Favicon files
│   └── wilayah/                # Indonesian region data
│
└── docs/                       # Documentation
    ├── backend_integration_guide.md
    └── order_array_guideline.md
```

## 🎯 Features by Role

### Agent Features
- 📦 **Order Management** - Bulk or individual number input with provider auto-detection
- 💳 **Payment** - QRIS integration with 15-minute countdown
- 💰 **Wallet** - Balance display, transaction history, withdrawal requests
- 👥 **Referrals** - Invite other agents and earn commission
- 📊 **History** - Complete transaction history with advanced filtering

### Freelance Features
- 🎯 **Invite Agents** - Share referral link to recruit agents
- 👥 **Downlines** - View and manage recruited agents
- 🎁 **Rewards** - Redeem points for rewards
- 📈 **Points History** - Track earned and spent points
- 🔍 **Date Filtering** - Flatpickr date range picker

### Admin Features
- 👥 **User Management** - View, search, and manage all users
- 💳 **Transactions** - View all platform transactions (batch & per-number views)
- 📊 **Analytics** - Revenue metrics, top agents, monthly trends
- 📦 **Packages** - Manage package pricing and availability
- 💸 **Withdrawals** - Approve/reject withdrawal requests
- 🎁 **Reward Claims** - Approve/reject reward claims

## 🎨 Tech Stack

- **Alpine.js** - Reactive framework (15KB)
- **Tailwind CSS** - Utility-first CSS (via CDN)
- **Flatpickr** - Date range picker
- **QRCode.js** - QR code generation
- **Leaflet** - Map integration
- **No build process** - Works directly in browser

## 🔌 API Integration

All API functions are in `shared/api.js`.

### Configuration

```javascript
// shared/api.js
const API_BASE = 'https://your-api.com';
const USE_MOCK_DATA = false; // Set to false when backend is ready
```

### Key Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/orders/batch` | POST | Submit order batch |
| `/api/payments/create` | POST | Create payment transaction |
| `/api/payments/{id}/status` | GET | Check payment status |
| `/api/belidigi/package` | GET | Get package catalog |

## 🚀 Deployment

### Requirements
- Static web server (no server-side processing needed)
- Backend API endpoints implemented

### Hosting Options
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages
- Any static hosting

## 📊 Benefits

| Metric | Traditional SPA | This Approach |
|--------|-----------------|---------------|
| JS Bundle | ~150KB | ~15KB |
| Build Time | 3-10s | 0s |
| Dependencies | 60+ | 0 |
| node_modules | 60MB+ | 0MB |

## 📞 Support

For backend integration:
- Check `docs/order_array_guideline.md` for step-by-step guide
- See `docs/backend_integration_guide.md` for complete API specs
- Check browser console for detailed logs

---

© 2026 Kuotaumroh.id. All rights reserved.
