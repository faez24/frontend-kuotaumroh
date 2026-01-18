# API Migration Plan - apiUrl() Implementation

## Tujuan
Menerapkan pola `apiUrl()` dan `apiFetch()` dari `config.js` ke semua API request di project ini.

## Pola yang Benar

### ❌ Pola Lama (Salah)
```javascript
const response = await fetch('agents', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
});
```

### ✅ Pola Baru (Benar)
```javascript
const response = await apiFetch(apiUrl('agents'), {
  method: 'POST',
  body: JSON.stringify(data)
});
```

## File yang Perlu Diupdate

### 1. admin/users.html
- Line 1755: `fetch('freelances'` → `apiFetch(apiUrl('freelances')`
- Line 1891: `fetch('agents'` → `apiFetch(apiUrl('agents')`
- Line 1958: `fetch('affiliates')` → `apiFetch(apiUrl('affiliates'))`
- Line 1971: `fetch('freelances')` → `apiFetch(apiUrl('freelances'))`
- Line 2000: `fetch(\`freelances/${user.id}/deactivate\`` → `apiFetch(apiUrl(\`freelances/${user.id}/deactivate\`)`
- Line 2023: `fetch(\`agents/${user.id}/reject\`` → `apiFetch(apiUrl(\`agents/${user.id}/reject\`)`
- Line 2033: `fetch(\`agents/${user.id}/deactivate\`` → `apiFetch(apiUrl(\`agents/${user.id}/deactivate\`)`
- Line 2066: `fetch(\`freelances/${user.id}/activate\`` → `apiFetch(apiUrl(\`freelances/${user.id}/activate\`)`
- Line 2099: `fetch(\`agents/${user.id}/approve\`` → `apiFetch(apiUrl(\`agents/${user.id}/approve\`)`
- Line 2112: `fetch(\`agents/${user.id}/approve\`` → `apiFetch(apiUrl(\`agents/${user.id}/approve\`)`
- Line 2122: `fetch(\`agents/${user.id}/activate\`` → `apiFetch(apiUrl(\`agents/${user.id}/activate\`)`
- Line 2157: `fetch(\`agents/${user.id}/approve\`` → `apiFetch(apiUrl(\`agents/${user.id}/approve\`)`
- Line 2169: `fetch(\`agents/${user.id}/approve\`` → `apiFetch(apiUrl(\`agents/${user.id}/approve\`)`
- Line 2186: `fetch(\`agents/${user.id}/activate\`` → `apiFetch(apiUrl(\`agents/${user.id}/activate\`)`
- Line 2211: `fetch(\`agents/${user.id}/reject\`` → `apiFetch(apiUrl(\`agents/${user.id}/reject\`)`
- Line 2220: `fetch(\`agents/${user.id}/deactivate\`` → `apiFetch(apiUrl(\`agents/${user.id}/deactivate\`)`

### 2. signup.html
- Line 1183: `fetch('agents'` → `apiFetch(apiUrl('agents')`

### 3. ref.html
- Line 53: `fetch('affiliates'` → `apiFetch(apiUrl('affiliates')`
- Line 64: `fetch('freelances'` → `apiFetch(apiUrl('freelances')`

### 4. freelance/downlines.html
- Line 1073: `fetch(\`${this.getCollectionName()}\`` → `apiFetch(apiUrl(this.getCollectionName()))`
- Line 1085: `fetch(nestedUrl` → `apiFetch(apiUrl(nestedUrl))`
- Line 1090: `fetch(\`${collection}/${this.freelanceId}\`` → `apiFetch(apiUrl(\`${collection}/${this.freelanceId}\`))`
- Line 1099: `fetch('agents'` → `apiFetch(apiUrl('agents')`
- Line 1194: `fetch(\`${collection}/${this.freelanceId}/agents\`` → `apiFetch(apiUrl(\`${collection}/${this.freelanceId}/agents\`))`
- Line 1200: `fetch('agents'` → `apiFetch(apiUrl('agents')`

### 5. freelance/dashboard.html
- Line 393: `fetch(\`${this.getCollectionName()}\`` → `apiFetch(apiUrl(this.getCollectionName()))`
- Line 418: `fetch(url` → `apiFetch(apiUrl(url))`
- Line 424: `fetch(\`${collection}\`` → `apiFetch(apiUrl(collection))`
- Line 435: `fetch(nestedUrl` → `apiFetch(apiUrl(nestedUrl))`
- Line 447: `fetch('agents'` → `apiFetch(apiUrl('agents')`

### 6. agent/profile.html
- Line 383: `fetch(\`agents/${this.agentId}\`` → `apiFetch(apiUrl(\`agents/${this.agentId}\`))`

### 7. agent/dashboard.html
- Line 350: `fetch(\`agents/${this.agentId}\`` → `apiFetch(apiUrl(\`agents/${this.agentId}\`))`

### 8. dash/test/index.html
- Line 25: `fetch('affiliates'` → `apiFetch(apiUrl('affiliates')`
- Line 37: `fetch('freelances'` → `apiFetch(apiUrl('freelances')`

### 9. callback.html
- Perlu diperiksa line 74

## Catatan Penting

1. **Headers Default**: `apiFetch()` sudah menyediakan headers default:
   - `Accept: application/json`
   - `Content-Type: application/json`
   
   Jadi tidak perlu menambahkan headers ini lagi kecuali ada kebutuhan khusus.

2. **FormData**: Jika menggunakan FormData, jangan gunakan `apiFetch()` karena Content-Type harus auto-detect. Gunakan `fetch()` biasa dengan `apiUrl()`:
   ```javascript
   const formData = new FormData();
   formData.append('field', value);
   const response = await fetch(apiUrl('endpoint'), {
     method: 'POST',
     headers: { 'Accept': 'application/json' },
     body: formData
   });
   ```

3. **External APIs**: Jangan gunakan `apiUrl()` untuk:
   - Nominatim (OpenStreetMap)
   - wilayah.id API
   - File lokal (provinces.json, dll)

## Status
- [x] admin/users.html ✅ DONE
- [x] signup.html ✅ DONE
- [x] ref.html ✅ DONE
- [x] agent/profile.html ✅ DONE
- [x] agent/dashboard.html ✅ DONE
- [x] dash/test/index.html ✅ DONE
- [x] callback.html ✅ DONE
- [x] freelance/downlines.html ✅ DONE
- [x] freelance/dashboard.html ✅ DONE

## ✅ MIGRATION COMPLETE! (9/9 files)
