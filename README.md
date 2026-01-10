# Kuotaumroh.id Agent Portal

> Alpine.js + Tailwind CSS multi-page application (No build process required)

## 🚀 Quick Start

### Running Locally

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit: http://localhost:8000

## 📁 Project Structure

```
Kuotaumroh migrate/
├── README.md                   # This file
│
├── login.html                  # Login page
├── dashboard.html              # Dashboard page
├── order.html                  # Order management
├── payment.html                # Payment page (QRIS)
├── history.html                # Transaction history
├── wallet.html                 # Wallet balance
├── withdraw.html               # Withdrawal requests
├── catalog.html                # Package catalog
├── referrals.html              # Referral management
│
├── shared/
│   ├── styles.css              # CSS variables & components
│   ├── utils.js                # Utility functions
│   ├── api.js                  # API service layer
│   └── components.js           # Reusable Alpine components
│
├── public/
│   └── images/                 # Static assets
│       ├── kabah.png
│       └── wallet.png
│
└── docs/                       # Documentation
    ├── backend_integration_guide.md
    └── order_array_guideline.md
```

## 🔌 Backend API Integration

The application requires 3 backend endpoints to function. All API functions are in `shared/api.js`.

### 1. Submit Order Batch

**Endpoint:** `POST /api/orders/batch`

**Request Format:**
```json
[
  {
    "batch_id": "BATCH-1704869400000",
    "batch_name": "Order 10/01/2026 07:43",
    "msisdn": "081234567890",
    "provider": "TELKOMSEL",
    "package_id": "pkg123",
    "schedule_date": "2026-01-15T10:30:00.000Z"
  }
]
```

**Response Format:**
```json
{
  "success": true,
  "batch_id": "BATCH-1704869400000",
  "order_count": 1,
  "message": "Order batch created successfully"
}
```

### 2. Create Payment Transaction

**Endpoint:** `POST /api/payments/create`

**Request Format:**
```json
{
  "batch_id": "BATCH-1704869400000",
  "amount": 1500000,
  "payment_method": "qris"
}
```

**Response Format:**
```json
{
  "success": true,
  "payment_id": "PAY-12345",
  "qr_code_url": "https://payment-gateway.com/qr/PAY-12345.png",
  "qr_string": "00020101021126...",
  "expires_at": "2026-01-10T08:00:00.000Z",
  "amount": 1500000
}
```

### 3. Check Payment Status

**Endpoint:** `GET /api/payments/{payment_id}/status`

**Response Format:**
```json
{
  "success": true,
  "payment_id": "PAY-12345",
  "status": "success",
  "paid_at": "2026-01-10T07:50:00.000Z",
  "amount": 1500000
}
```

### Configuration

In `shared/api.js`:

```javascript
// 1. Update your API URL
const API_BASE = 'https://your-api.com';

// 2. Disable mock mode when backend is ready
const USE_MOCK_DATA = false;
```

### Detailed Documentation

For complete implementation details, see:

- **[docs/order_array_guideline.md](docs/order_array_guideline.md)** - Complete guide for implementing the order array endpoint
- **[docs/backend_integration_guide.md](docs/backend_integration_guide.md)** - Full API integration documentation with examples

## 📚 Key Features

### Order Management
- Bulk or individual number input
- Provider auto-detection
- Package selection per provider
- Schedule activation (immediate or future date)
- Real-time validation

### Payment
- QRIS integration ready
- 15-minute countdown timer
- Auto payment status polling
- Success/expired state handling

### Wallet & Withdrawal
- Balance display
- Transaction history
- Bank account management
- Withdrawal requests

### Other Features
- Referral system with QR code
- Package catalog
- Transaction history
- Real-time profit calculation

## 🎨 Tech Stack

- **Alpine.js** - Reactive framework (15KB)
- **Tailwind CSS** - Utility-first CSS (via CDN)
- **Vanilla JavaScript** - No dependencies
- **No build process** - Works directly in browser

## 🔧 Development

### Mock Mode

The application works in mock mode without a backend:

```javascript
// shared/api.js
const USE_MOCK_DATA = true; // Mock mode enabled
```

All API functions will return simulated data. Check browser console for logs:
- 📤 Order submission
- 💳 Payment creation
- 🔍 Payment status check

### Testing the Order Flow

1. Open `order.html`
2. Add phone numbers (bulk or individual)
3. Select packages
4. Click "Konfirmasi & Bayar"
5. Check console for the output array:

```json
=== BACKEND PAYLOAD ===
[
  {
    "batch_id": "BATCH-xxx",
    "batch_name": "Order 10/01/2026 07:43",
    "msisdn": "081234567890",
    "provider": "TELKOMSEL",
    "package_id": "pkg123",
    "schedule_date": null
  }
]
======================
```

## 🚀 Deployment

### Requirements
- Static web server (no server-side processing needed)
- Backend API endpoints implemented

### Deploy Files
```bash
# Upload these files:
- All .html files
- shared/ folder
- public/ folder
```

### Hosting Options
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages
- Any static hosting

## 📊 Benefits Over React Version

| Metric | React | Alpine.js |
|--------|-------|-----------|
| JS Bundle | ~150KB | ~15KB |
| Build Time | 3-10s | 0s |
| Dependencies | 60+ | 0 |
| node_modules | 60MB+ | 0MB |

## 💡 Usage Examples

### Using Utility Functions

```javascript
// Format currency
formatRupiah(50000) // "Rp 50,000"

// Format date
formatDate(new Date()) // "15 Feb 2024"

// Phone validation
validateMsisdn('081234567890') // true
detectProvider('081234567890') // "TELKOMSEL"
```

### Using Components

```javascript
function myPageApp() {
  return {
    toast: createToast(),
    
    someAction() {
      this.toast.success('Success!', 'Data saved');
    }
  }
}
```

## 🐛 Troubleshooting

### API not working?
1. Check `USE_MOCK_DATA` setting in `shared/api.js`
2. Verify `API_BASE` URL is correct
3. Check browser console for errors

### Page not loading?
1. Run from a local server (not file://)
2. Check browser console for errors
3. Verify all script paths are correct

## � Next Steps

1. ✅ Review project structure
2. ✅ Test in mock mode (no backend needed)
3. 📖 Read [docs/order_array_guideline.md](docs/order_array_guideline.md)
4. 🔧 Implement backend endpoints
5. ⚙️ Configure API settings in `shared/api.js`
6. 🚀 Deploy to production

## 📞 Support

For backend integration help:
- Check `docs/order_array_guideline.md` for step-by-step guide
- See `docs/backend_integration_guide.md` for complete API specs
- Check browser console for detailed logs (all API calls are logged)
