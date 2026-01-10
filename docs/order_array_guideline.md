# Order Array Implementation Guide

## Quick Overview

When a user clicks "Konfirmasi & Bayar" on the order page, the frontend sends an **array of order items** to your backend endpoint `POST /api/orders/batch`.

## Array Structure

Each item in the array represents **one phone number with one package**:

```json
[
  {
    "batch_id": "BATCH-1704869400000",
    "batch_name": "Order 10/01/2026 07:43",
    "msisdn": "081234567890",
    "provider": "TELKOMSEL",
    "package_id": "pkg123",
    "schedule_date": "2026-01-15T10:30:00.000Z"
  },
  {
    "batch_id": "BATCH-1704869400000",
    "batch_name": "Order 10/01/2026 07:43",
    "msisdn": "081298765432",
    "provider": "INDOSAT",
    "package_id": "pkg456",
    "schedule_date": null
  }
]
```

## Field Definitions

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `batch_id` | String | Unique ID for this batch of orders | `"BATCH-1704869400000"` |
| `batch_name` | String | Human-readable batch name | `"Order 10/01/2026 07:43"` |
| `msisdn` | String | Phone number (normalized format) | `"081234567890"` |
| `provider` | String | Telecom provider | `"TELKOMSEL"`, `"INDOSAT"`, `"XL"`, `"AXIS"`, `"TRI"`, `"SMARTFREN"` |
| `package_id` | String | Reference to your package catalog | `"pkg123"` |
| `schedule_date` | String/null | ISO 8601 datetime or null | `"2026-01-15T10:30:00.000Z"` or `null` |

### Important Notes

- **`batch_id`**: Same for all items in one order submission
- **`msisdn`**: Always starts with `0` (e.g., `0812...`), not `+62` or `62`
- **`schedule_date`**: 
  - `null` = activate immediately
  - ISO datetime = activate at specific time
- **Array length**: Can be 1 to 1000+ items depending on order size

## Real-World Examples

### Example 1: Immediate Activation (Bulk Order)
User orders 3 packages for 3 different numbers, all to be activated immediately:

```json
[
  {
    "batch_id": "BATCH-1704869400000",
    "batch_name": "Order 10/01/2026 07:43",
    "msisdn": "081234567890",
    "provider": "TELKOMSEL",
    "package_id": "pkg-simpati-5gb-30d",
    "schedule_date": null
  },
  {
    "batch_id": "BATCH-1704869400000",
    "batch_name": "Order 10/01/2026 07:43",
    "msisdn": "085612345678",
    "provider": "INDOSAT",
    "package_id": "pkg-indosat-10gb-30d",
    "schedule_date": null
  },
  {
    "batch_id": "BATCH-1704869400000",
    "batch_name": "Order 10/01/2026 07:43",
    "msisdn": "087798765432",
    "provider": "XL",
    "package_id": "pkg-xl-8gb-30d",
    "schedule_date": null
  }
]
```

### Example 2: Scheduled Activation
User wants packages activated on specific date/time (e.g., for umroh departure):

```json
[
  {
    "batch_id": "BATCH-1704869500000",
    "batch_name": "Order 10/01/2026 08:15",
    "msisdn": "081234567890",
    "provider": "TELKOMSEL",
    "package_id": "pkg-simpati-umroh-20gb",
    "schedule_date": "2026-01-15T10:30:00.000Z"
  },
  {
    "batch_id": "BATCH-1704869500000",
    "batch_name": "Order 10/01/2026 08:15",
    "msisdn": "081298765432",
    "provider": "TELKOMSEL",
    "package_id": "pkg-simpati-umroh-20gb",
    "schedule_date": "2026-01-15T10:30:00.000Z"
  }
]
```

### Example 3: Mixed (Some Immediate, Some Scheduled)
This won't happen in practice - all items in a batch have the same schedule_date.

## Backend Implementation Steps

### Step 1: Receive Array

```javascript
// Express.js example
app.post('/api/orders/batch', async (req, res) => {
  const orderItems = req.body; // Array of order items
  
  // Validate array
  if (!Array.isArray(orderItems) || orderItems.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Invalid request: orderItems must be a non-empty array'
    });
  }
  
  // ... continue processing
});
```

### Step 2: Validate Each Item

```javascript
// Validate required fields
for (const item of orderItems) {
  if (!item.batch_id || !item.msisdn || !item.provider || !item.package_id) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields',
      item: item
    });
  }
  
  // Validate package exists in your catalog
  const package = await PackageModel.findById(item.package_id);
  if (!package) {
    return res.status(400).json({
      success: false,
      error: `Package not found: ${item.package_id}`,
      item: item
    });
  }
}
```

### Step 3: Save to Database

```javascript
// Example database schema
const orderBatch = {
  batch_id: orderItems[0].batch_id,
  batch_name: orderItems[0].batch_name,
  created_at: new Date(),
  total_items: orderItems.length,
  status: 'pending_payment'
};

await OrderBatch.create(orderBatch);

// Save individual items
for (const item of orderItems) {
  await OrderItem.create({
    batch_id: item.batch_id,
    msisdn: item.msisdn,
    provider: item.provider,
    package_id: item.package_id,
    schedule_date: item.schedule_date,
    status: 'pending',
    created_at: new Date()
  });
}
```

### Step 4: Return Success Response

```javascript
return res.json({
  success: true,
  batch_id: orderItems[0].batch_id,
  order_count: orderItems.length,
  message: 'Order batch created successfully'
});
```

## Complete Backend Example

```javascript
app.post('/api/orders/batch', async (req, res) => {
  try {
    const orderItems = req.body;
    
    // 1. Validate
    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request format'
      });
    }
    
    const batchId = orderItems[0].batch_id;
    const batchName = orderItems[0].batch_name;
    
    // 2. Check for duplicates
    const existingBatch = await OrderBatch.findOne({ batch_id: batchId });
    if (existingBatch) {
      return res.status(409).json({
        success: false,
        error: 'Batch already exists'
      });
    }
    
    // 3. Validate packages
    for (const item of orderItems) {
      const packageExists = await Package.findById(item.package_id);
      if (!packageExists) {
        return res.status(400).json({
          success: false,
          error: `Invalid package_id: ${item.package_id}`
        });
      }
    }
    
    // 4. Create batch
    await OrderBatch.create({
      batch_id: batchId,
      batch_name: batchName,
      total_items: orderItems.length,
      status: 'pending_payment',
      created_at: new Date()
    });
    
    // 5. Create items
    const createdItems = await OrderItem.insertMany(
      orderItems.map(item => ({
        batch_id: item.batch_id,
        msisdn: item.msisdn,
        provider: item.provider,
        package_id: item.package_id,
        schedule_date: item.schedule_date,
        status: 'pending',
        created_at: new Date()
      }))
    );
    
    // 6. Return success
    return res.json({
      success: true,
      batch_id: batchId,
      order_count: createdItems.length,
      message: 'Order batch created successfully'
    });
    
  } catch (error) {
    console.error('Error creating order batch:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});
```

## Testing

### Test Request (Using cURL)

```bash
curl -X POST https://your-api.com/api/orders/batch \
  -H "Content-Type: application/json" \
  -d '[
    {
      "batch_id": "BATCH-TEST-001",
      "batch_name": "Test Order",
      "msisdn": "081234567890",
      "provider": "TELKOMSEL",
      "package_id": "pkg123",
      "schedule_date": null
    }
  ]'
```

### Test Request (Using Postman)

1. Method: `POST`
2. URL: `https://your-api.com/api/orders/batch`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
[
  {
    "batch_id": "BATCH-TEST-001",
    "batch_name": "Test Order",
    "msisdn": "081234567890",
    "provider": "TELKOMSEL",
    "package_id": "pkg123",
    "schedule_date": null
  }
]
```

## Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `orderItems is not an array` | Wrong request format | Ensure request body is an array `[...]` |
| `Package not found` | Invalid `package_id` | Check package exists in your database |
| `Batch already exists` | Duplicate submission | Check batch_id uniqueness |
| `Missing required fields` | Incomplete data | Validate all required fields present |

## Next Steps After Implementation

1. ✅ Implement `POST /api/orders/batch` endpoint
2. Test with sample data
3. Integrate with payment creation (next endpoint)
4. Update frontend: Set `USE_MOCK_DATA = false` in `shared/api.js`
5. Test end-to-end flow

## Support

- See [backend_integration_guide.md](file:///Users/iqbalzia/.gemini/antigravity/brain/edfbe276-acd9-4748-831b-6325e3800adb/backend_integration_guide.md) for complete API documentation
- Check browser console logs for actual payloads being sent
- Look for logs prefixed with `📤 MOCK: Submitting order batch`
