# Multi-User Type Architecture Reorganization Plan

> **Project**: Kuotaumroh.id  
> **Date**: January 2026  
> **Status**: Planning Phase

## Overview

Restructure the project to support 3 user types: **Admin**, **Freelancer (Affiliate)**, and **Agent** (current) with role-based dashboards and access control.

**Key Principle**: `index.html` remains as **public-facing landing page** (no login required).

---

## User Types & Data Models

### 1. Agent (Current Users)
**Purpose**: Travel agencies that sell packages to customers

**Core Profile:**
- **ID**: Unique Identifier
- **Name**: Full Name
- **Email**: Google Account Email (Primary Auth)
- **Phone**: Contact Number
- **Travel Name**: Business Name
- **Travel Type**: Type of Travel (Umroh/Haji/Both)
- **Location**: Province, City, Subdistrict, Full Address
- **Coordinates**: Latitude/Longitude
- **Register Date**: Timestamp
- **Upline ID**: Reference to Freelancer who recruited (nullable)

**Financial Data:**
- **Wallet Balance**: Available funds
- **Pending Withdrawal**: Funds in process
- **Transaction History**: Order & payment logs

**Access:**
- Create and manage orders
- View order history
- Manage wallet and withdrawals
- View personal profile

**Dashboard Features:**
- Order statistics
- Wallet balance
- Recent orders
- Quick order creation

---

### 2. Freelancer / Affiliate (NEW)
**Purpose**: Promoter who recruits Agents to earn incentives (points-based rewards)

**Core Profile:**
- **ID**: Unique Identifier
- **Name**: Full Name (e.g., "Jane Doe")
- **Email**: Google Account Email (Primary Auth)
- **Phone**: Contact Number
- **Location**: City/Region
- **Register Date**: Timestamp

**Affiliate Data:**
- **Referral Code/Link**: Primary tool for recruiting (e.g., `kuotaumroh.id/ref/jane`)
- **Downlines**: List of Agents recruited (linked via Agent's `Upline ID`)

**Points & Rewards (Replaces Monetary Incentive):**
- **Points Balance**: Current available points
- **Total Points Earned**: Lifetime points accumulator
- **Point History**: Logs of points earned (e.g., "+50 points for Agent Signup")

**Reward Claims:**
- **Claims**: List of reward redemption requests
  - **Claim ID**
  - **Reward Item**: (e.g., "Samsung A55", "Rp 500k OVO", etc.)
  - **Status**: `PENDING` | `APPROVED` | `REJECTED`
  - **Request Date**
  - **Process Date**
  - **Admin Check**: Who validated it

**Dashboard (UI Elements):**
- **Sharing Tools**:
  - **Invite Link**: Quick copy button (e.g., `kuotaumroh.id/ref/jane`)
  - **QR Code**: Auto-generated QR for face-to-face recruitment
- **Achievement Card**:
  - **Nearest Reward**: "X points more to get [Reward Name]"
  - **Action Button**: "Lihat Hadiah Lainnya" (Browse Rewards)
- **Quick Stats**:
  - **Total Recruited Agents**: Count of downlines
  - **Pending Rewards**: Count of claims waiting for approval

**Access:**
- View downlines (recruited agents)
- View points balance and history
- Browse reward catalog
- Submit reward claims
- View personal profile

---

### 3. Admin / Superuser (NEW)
**Purpose**: Platform manager with full access

**Authentication:**
- **Phone Number**: Primary identifier for Login (not Google)
- **OTP Secret**: For verifying login (if needed, or handled by provider)
- **Role**: `ADMIN` | `SUPER_ADMIN`

**Capabilities (Access Rights):**
- **User Management**: View/Edit/Ban Agents and Freelancers
- **Financials**: 
  - Approve/Reject Withdrawals (Agents)
  - **Reward Management**: Validate Freelancer reward claims (Approve/Reject)
- **Reward Catalog**: Create/Edit available rewards and point costs
- **View Global Revenue**: Platform-wide financial analytics
- **Katalog Paket**: Manage provider packages (Price, Name, Active/Inactive), CRUD operations
- **Transactions**: 
  - **Per Batch View**: Grouped by Order ID
  - **Per Number View**: Individual line items/MSISDN logs

**Dashboard Features:**
- Key metrics cards (total users, orders, revenue)
- Charts (orders over time, revenue trends, user growth)
- Recent activities feed (across all users)
- Quick actions (approve withdrawal, validate claim)
- System alerts and notifications
- Pending items count (withdrawals, reward claims)

---

## Proposed Directory Structure

```
/
├── index.html                    # PUBLIC: Landing page (no auth required)
├── login.html                    # Universal login (role detection)
├── signup.html                   # Universal signup (with role selection)
├── 404.html                      # Error page
│
├── shared/                       # Shared resources
│   ├── utils.js                  # Utility functions (includes auth helpers)
│   ├── api.js                    # API integration
│   ├── styles.css                # Common styles
│   └── navigation.js             # Dynamic navigation based on role
│
├── public/                       # Assets (UNCHANGED)
│   └── ...
│
├── agent/                        # Agent-specific pages
│   ├── dashboard.html            # Agent dashboard
│   ├── order.html                # Create orders
│   ├── history.html              # Order history
│   ├── withdraw.html             # Withdrawals
│   ├── wallet.html               # Wallet
│   └── profile.html              # Profile
│
├── freelance/                    # Freelancer (Affiliate) pages
│   ├── dashboard.html            # Affiliate dashboard
│   ├── downlines.html            # View recruited agents
│   ├── rewards.html              # Reward catalog & claims
│   ├── points-history.html       # Point earning history
│   └── profile.html              # Profile
│
└── admin/                        # Admin-specific pages
    ├── dashboard.html            # Admin dashboard
    ├── users.html                # Manage users (agents/freelancers)
    ├── transactions.html         # View all transactions (batch & number view)
    ├── withdrawals.html          # Approve/reject agent withdrawals
    ├── reward-claims.html        # Approve/reject freelancer reward claims
    ├── reward-catalog.html       # Manage reward items & point costs
    ├── packages.html             # Manage provider packages (CRUD)
    └── analytics.html            # Global revenue & analytics
```

---

## Data Models (JSON Examples)

### Freelancer (Affiliate)

```javascript
{
  id: "FRL-001",
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "081234567890",
  location: "Jakarta",
  registerDate: "2026-01-15T10:00:00Z",
  referralCode: "jane",
  referralLink: "kuotaumroh.id/ref/jane",
  
  // Points
  pointsBalance: 500,
  totalPointsEarned: 1250,
  
  // Downlines (Agent IDs)
  downlines: ["AGT-001", "AGT-002", "AGT-003"]
}
```

### Point History Entry

```javascript
{
  id: "PH-001",
  freelancerId: "FRL-001",
  type: "EARNED", // EARNED | SPENT
  amount: 50,
  description: "Agent Signup: Ahmad Fauzi",
  timestamp: "2026-01-15T12:00:00Z",
  referenceId: "AGT-001" // Related agent ID
}
```

### Reward Claim

```javascript
{
  id: "CLM-001",
  freelancerId: "FRL-001",
  rewardId: "RWD-001",
  rewardName: "Samsung Galaxy A55",
  pointsCost: 5000,
  status: "PENDING", // PENDING | APPROVED | REJECTED
  requestDate: "2026-01-20T09:00:00Z",
  processDate: null,
  processedBy: null, // Admin ID
  notes: ""
}
```

### Reward Catalog Item

```javascript
{
  id: "RWD-001",
  name: "Samsung Galaxy A55",
  description: "Smartphone Samsung Galaxy A55 256GB",
  pointsCost: 5000,
  image: "/public/rewards/samsung-a55.jpg",
  stock: 10,
  active: true
}
```

### Admin User

```javascript
{
  id: "ADM-001",
  phone: "081234567890",
  name: "Super Admin",
  role: "SUPER_ADMIN", // ADMIN | SUPER_ADMIN
  createdAt: "2026-01-01T00:00:00Z",
  lastLogin: "2026-01-20T08:00:00Z"
}
```

---

## API Endpoints

### Freelancer Endpoints

```
GET /api/freelance/dashboard
Response: { pointsBalance, totalPointsEarned, downlinesCount, pendingClaims, nearestReward }

GET /api/freelance/downlines
Response: [ { agent list } ]

GET /api/freelance/points-history
Response: [ { point history entries } ]

GET /api/freelance/rewards
Response: [ { available rewards } ]

POST /api/freelance/rewards/claim
Body: { rewardId }
Response: { claimId, status }

GET /api/freelance/claims
Response: [ { claim history } ]
```

### Admin Endpoints

```
GET /api/admin/dashboard
Response: { stats, recentActivities, pendingItems }

GET /api/admin/users
Query: { role?, status?, page, limit }
Response: { users, total, page }

PUT /api/admin/users/:id
Body: { status, notes }
Response: { user }

GET /api/admin/transactions
Query: { view: 'batch' | 'number', page, limit }
Response: { transactions, total }

GET /api/admin/withdrawals
Response: [ { pending withdrawals } ]

PUT /api/admin/withdrawals/:id
Body: { action: 'approve' | 'reject', notes }
Response: { withdrawal }

GET /api/admin/reward-claims
Response: [ { pending claims } ]

PUT /api/admin/reward-claims/:id
Body: { action: 'approve' | 'reject', notes }
Response: { claim }

# Reward Catalog Management
GET /api/admin/rewards
POST /api/admin/rewards
PUT /api/admin/rewards/:id
DELETE /api/admin/rewards/:id

# Package Management
GET /api/admin/packages
POST /api/admin/packages
PUT /api/admin/packages/:id
DELETE /api/admin/packages/:id
```

---

## Authentication Flow

### Agent & Freelancer
- **Method**: Google OAuth
- **Flow**: Login → Google Auth → Role Detection → Redirect to Dashboard

### Admin
- **Method**: Phone + OTP
- **Flow**: Enter Phone → Receive OTP → Verify → Redirect to Admin Dashboard

```javascript
// Role-based redirect after login
function redirectToDashboard() {
  const role = getUserRole();
  const dashboards = {
    'admin': '/admin/dashboard.html',
    'freelance': '/freelance/dashboard.html',
    'agent': '/agent/dashboard.html'
  };
  window.location.href = dashboards[role] || '/login.html';
}
```

---

## Navigation by Role

### Agent Navigation
- Dashboard
- Order
- History
- Withdraw
- Profil

### Freelancer Navigation
- Dashboard
- Downlines
- Rewards
- Riwayat Poin
- Profil

### Admin Navigation
- Dashboard
- Users
- Transactions
- Withdrawals
- Reward Claims
- Paket
- Analytics

---

## Implementation Phases

### Phase 1: File Reorganization (2-3 hours)
- Create role directories
- Move agent files
- Update path references
- Create public landing page

### Phase 2: Authentication Updates (3-4 hours)
- Add role management to utils.js
- Update login.html (Google + Phone/OTP)
- Update signup.html (role selection)

### Phase 3: Create Dashboards (20-25 hours)
- Agent dashboard (move existing): 1-2 hours
- Freelancer dashboard (new): 8-10 hours
- Admin dashboard (new): 12-15 hours

### Phase 4: Access Control (2-3 hours)
- Page-level role guards
- Feature-level permissions

### Phase 5: Testing & Documentation (6-9 hours)
- Test all user flows
- Update documentation

**Total Estimated Time**: 35-48 hours

---

## Testing Checklist

### Agent Access
- [ ] Login redirects to `/agent/dashboard.html`
- [ ] All agent pages accessible
- [ ] Cannot access freelance or admin pages
- [ ] All features work (order, history, withdraw)

### Freelancer Access
- [ ] Login redirects to `/freelance/dashboard.html`
- [ ] Can view downlines list
- [ ] Points balance displays correctly
- [ ] Can browse rewards catalog
- [ ] Can submit reward claims
- [ ] QR code generation works
- [ ] Copy referral link works
- [ ] Cannot access agent or admin pages

### Admin Access
- [ ] Login via phone+OTP works
- [ ] Redirects to `/admin/dashboard.html`
- [ ] Can view all users (agents + freelancers)
- [ ] Can approve/reject withdrawals
- [ ] Can approve/reject reward claims
- [ ] Can manage reward catalog
- [ ] Can manage packages
- [ ] Transactions view works (batch & number)
- [ ] Analytics display correctly

---

## Questions/Decisions Needed

1. **Points conversion rate?**
   - e.g., 1 agent signup = ? points

2. **Initial reward catalog?**
   - List of reward items and point costs

3. **Admin creation method?**
   - Backend seeding vs invitation system

4. **OTP provider for admin login?**
   - SMS gateway selection

---

**Last Updated**: January 11, 2026  
**Status**: Awaiting Approval  
**Next Step**: Review and approve plan, then begin Phase 1
