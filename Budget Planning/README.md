# Budget Planner - Perencanaan Anggaran

Aplikasi perencanaan anggaran minimalis dengan desain hitam putih yang elegan, dibuat menggunakan Next.js dan TypeScript.

## 🎨 Fitur Utama

### 1. **Desain Minimalis Black & White**
- Antarmuka bersih dengan palet warna hitam dan putih
- Tipografi yang jelas dan mudah dibaca
- Fokus pada konten tanpa distraksi visual

### 2. **Manajemen Anggaran Lengkap**
- **Pendapatan**: Kelola berbagai sumber pendapatan
- **Pengeluaran**: Kategorisasi pengeluaran berdasarkan jenis
- **Perbandingan**: Bandingkan rencana vs aktual
- **Ringkasan**: Lihat total pendapatan, pengeluaran, dan saldo

### 3. **Fitur Interaktif**
- ✅ Navigasi antar bulan dengan tombol prev/next
- ✅ Tabel yang dapat di-expand/collapse per kategori
- ✅ Modal untuk menambah item pendapatan/pengeluaran
- ✅ Perhitungan otomatis selisih dan persentase tabungan
- ✅ Progress bar tingkat tabungan

### 4. **Kategori Anggaran**

#### Pendapatan:
- Pendapatan Utama (Gaji)
- Pendapatan Tambahan (Freelance)
- Pendapatan Pasif (Investasi)

#### Pengeluaran:
- Kebutuhan Pokok (Sewa, Listrik, Air, Internet, Belanja)
- Transportasi (Bensin, Parkir, Tol)
- Kesehatan (Asuransi, Obat-obatan)
- Hiburan (Makan di Luar, Streaming, Hobi)
- Tabungan & Investasi

## 🚀 Cara Menjalankan

### Development Mode
```bash
npm run dev
```

Buka browser dan akses: `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## 📁 Struktur Proyek

```
budget-planning/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── AddItemModal.tsx     # Modal untuk tambah item
│   ├── BudgetSummary.tsx    # Ringkasan anggaran
│   ├── BudgetTable.tsx      # Tabel anggaran
│   └── MonthSelector.tsx    # Selector bulan
├── data/
│   └── sampleData.ts        # Data contoh
├── lib/
│   └── utils.ts             # Utility functions
└── types/
    └── budget.ts            # TypeScript types
```

## 💡 Cara Menggunakan

### 1. Menambah Pendapatan
- Klik tombol **"+ PENDAPATAN"** di header
- Isi form dengan detail pendapatan
- Pilih kategori yang sesuai
- Klik **"TAMBAH"**

### 2. Menambah Pengeluaran
- Klik tombol **"+ PENGELUARAN"** di header
- Isi form dengan detail pengeluaran
- Pilih kategori yang sesuai
- Klik **"TAMBAH"**

### 3. Navigasi Bulan
- Gunakan tombol **←** untuk bulan sebelumnya
- Gunakan tombol **→** untuk bulan berikutnya

### 4. Melihat Detail Kategori
- Klik pada kategori untuk expand/collapse
- Lihat detail item dalam kategori
- Cek selisih antara rencana dan aktual

## 📊 Fitur Perhitungan

### Ringkasan Otomatis
- **Total Pendapatan**: Jumlah semua pendapatan aktual
- **Total Pengeluaran**: Jumlah semua pengeluaran aktual
- **Saldo**: Pendapatan - Pengeluaran
- **Tingkat Tabungan**: (Saldo / Pendapatan) × 100%

### Indikator Visual
- Progress bar menunjukkan tingkat tabungan
- Target: 20% dari pendapatan
- Status Surplus/Defisit dengan badge

### Variance Tracking
- Setiap item menampilkan selisih (Aktual - Rencana)
- Warna berbeda untuk over/under budget
- Format mata uang Rupiah (IDR)

## 🎯 Tips Penggunaan

1. **Target Tabungan**: Usahakan tingkat tabungan minimal 20%
2. **Review Bulanan**: Periksa selisih antara rencana dan aktual
3. **Kategorisasi**: Gunakan kategori yang konsisten
4. **Update Rutin**: Perbarui jumlah aktual secara berkala

## 🛠️ Teknologi

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Format**: Indonesian Rupiah (IDR)

## 📝 Catatan

- Data saat ini disimpan di state (tidak persisten)
- Untuk production, integrasikan dengan database
- Semua perhitungan dilakukan secara real-time
- Format mata uang menggunakan standar Indonesia

## 🎨 Design Philosophy

Aplikasi ini mengadopsi prinsip desain minimalis:
- **Clarity**: Informasi yang jelas dan mudah dipahami
- **Simplicity**: Antarmuka sederhana tanpa elemen berlebihan
- **Functionality**: Fokus pada fungsi, bukan dekorasi
- **Contrast**: Penggunaan hitam-putih untuk kontras maksimal

---

Dibuat dengan ❤️ menggunakan Next.js
