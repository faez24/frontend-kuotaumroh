# ✅ KONFIGURASI API TERPUSAT - SELESAI!

## 📝 Ringkasan

Konfigurasi API terpusat telah berhasil dibuat! Sekarang Anda hanya perlu mengganti URL API di **SATU FILE** saja (`shared/config.js`) dan semua file HTML akan otomatis menggunakan URL baru.

## 🎯 File yang Sudah Dibuat

### 1. **shared/config.js** ⭐ FILE UTAMA
   - Berisi konfigurasi `API_BASE_URL`, `API_URL`, dan `STORAGE_URL`
   - Helper functions: `apiUrl()`, `storageUrl()`, `apiFetch()`
   - **INI SATU-SATUNYA FILE YANG PERLU DIEDIT SAAT GANTI URL API**

### 2. Dokumentasi
   - `shared/CONFIG_README.md` - Dokumentasi lengkap
   - `shared/QUICK_REFERENCE.md` - Panduan cepat
   - `shared/CONFIG_SUMMARY.md` - Status dan checklist
   - `shared/README.md` - Overview folder shared

### 3. Contoh & Tools
   - `shared/config-example.html` - Contoh interaktif
   - `add-config-to-all.ps1` - Script PowerShell (opsional)
   - `migration-helper.js` - Node.js scanner (opsional)

## ✅ File HTML yang Sudah Diupdate

Berikut file yang sudah ditambahkan `<script src="../shared/config.js"></script>`:

1. ✅ `admin/users.html`
2. ✅ `signup.html`
3. ✅ `freelance/dashboard.html`
4. ✅ `freelance/downlines.html`
5. ✅ `ref.html`
6. ✅ `callback.html`
7. ✅ `agent/dashboard.html`
8. ✅ `index.html`
9. ✅ `login.html`

## 📋 File HTML yang Masih Perlu Diupdate

File-file berikut masih perlu ditambahkan `config.js` secara manual:

### Admin
- [ ] `admin/analytics.html`
- [ ] `admin/dashboard.html`
- [ ] `admin/login.html`
- [ ] `admin/packages.html`
- [ ] `admin/profile.html`
- [ ] `admin/reward-claims.html`
- [ ] `admin/rewards.html`
- [ ] `admin/transactions.html`
- [ ] `admin/travel-agent-modal.html`
- [ ] `admin/withdrawals.html`

### Agent
- [ ] `agent/catalog.html`
- [ ] `agent/history.html`
- [ ] `agent/index.html`
- [ ] `agent/order.html`
- [ ] `agent/profile.html`
- [ ] `agent/referrals.html`
- [ ] `agent/wallet.html`
- [ ] `agent/withdraw.html`

### Freelance
- [ ] `freelance/invite.html`
- [ ] `freelance/login.html`
- [ ] `freelance/points-history.html`
- [ ] `freelance/profile.html`
- [ ] `freelance/rewards.html`

### Lainnya
- [ ] `checkout.html`
- [ ] `404.html`
- [ ] `dash/test/index.html`

## 🚀 Cara Menambahkan ke File Lain

### Langkah 1: Buka file HTML yang ingin diupdate

### Langkah 2: Cari bagian `<head>` dan tambahkan sebelum script lain:

```html
<head>
  <!-- ... favicon, fonts, dll ... -->
  
  <!-- Shared CSS -->
  <link rel="stylesheet" href="../shared/styles.css">
  
  <!-- ⚠️ PENTING: Load config.js PERTAMA sebelum script lain -->
  <script src="../shared/config.js"></script>
  
  <!-- Script lain setelah config.js -->
  <script src="../shared/utils.js"></script>
  <script src="../shared/header.js"></script>
</head>
```

**CATATAN:** 
- Untuk file di root folder (seperti `index.html`, `login.html`), gunakan `src="shared/config.js"`
- Untuk file di subfolder (seperti `admin/`, `agent/`, `freelance/`), gunakan `src="../shared/config.js"`

### Langkah 3: Ganti hardcoded URL (opsional tapi direkomendasikan)

Cari dan ganti:
```javascript
// ❌ SEBELUM
fetch('http://127.0.0.1:8000/api/agents')

// ✅ SESUDAH
fetch(apiUrl('agents'))
```

## 🔧 Cara Mengganti URL API

### Development → Production

Edit file `shared/config.js`:

```javascript
// DEVELOPMENT (saat ini)
const API_BASE_URL = 'http://127.0.0.1:8000';

// PRODUCTION (saat deploy)
const API_BASE_URL = 'https://api.kuotaumroh.id';
```

**Selesai!** Semua file yang sudah load `config.js` akan otomatis pakai URL baru. 🎉

## 📖 Dokumentasi

- **Panduan Lengkap**: Buka `shared/CONFIG_README.md`
- **Quick Start**: Buka `shared/QUICK_REFERENCE.md`
- **Contoh Interaktif**: Buka `shared/config-example.html` di browser

## ✨ Keuntungan

1. ✅ **Ganti URL sekali saja** - Edit 1 file, semua terupdate
2. ✅ **Mudah deploy** - Tinggal ganti `API_BASE_URL`
3. ✅ **Kode lebih bersih** - Tidak ada hardcoded URL
4. ✅ **Konsisten** - Semua file pakai URL yang sama
5. ✅ **Mudah maintenance** - Centralized configuration

## 🎯 Next Steps

1. ✅ **File config sudah dibuat dan siap digunakan**
2. ⏳ **Update file HTML yang tersisa** (lihat checklist di atas)
3. ⏳ **Test semua fungsi** untuk memastikan API masih berfungsi
4. ⏳ **Deploy ke production** dengan mengganti `API_BASE_URL`

## 💡 Tips

- File yang sudah load `config.js` bisa langsung pakai `apiUrl()`, `storageUrl()`, dan `apiFetch()`
- Jangan lupa selalu load `config.js` **SEBELUM** script lain
- Test di development sebelum deploy ke production
- Gunakan `shared/config-example.html` untuk belajar cara penggunaan

---

**Status**: ✅ Ready to Use  
**Tanggal**: 2026-01-18  
**Maintenance**: Update `API_BASE_URL` di `shared/config.js` saat deploy

🎉 **Selamat! Konfigurasi API terpusat sudah siap digunakan!**
