# Check Foto KTP - OCR Auto Fill

Aplikasi web untuk membaca foto KTP menggunakan teknologi OCR (Optical Character Recognition) dan mengisi form secara otomatis.

## Fitur

- 📸 Upload foto KTP dengan drag & drop
- 🤖 OCR otomatis menggunakan Tesseract.js
- 📝 Auto-fill form dengan data dari KTP
- ✏️ Edit manual untuk koreksi data
- 🌓 Dark/Light mode
- 🔒 100% privasi - proses di browser
- 📱 Responsive design

## Teknologi

- Next.js 15
- TypeScript
- Tailwind CSS
- Tesseract.js (OCR)
- React Dropzone

## Instalasi

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Cara Penggunaan

1. Upload foto KTP dengan cara drag & drop atau klik area upload
2. Tunggu proses OCR selesai (progress bar akan muncul)
3. Data otomatis terisi di form sebelah kanan
4. Edit data jika diperlukan
5. Klik "Simpan Data" untuk menyimpan

## Tips Foto KTP Terbaik

- Pastikan foto jelas dan tidak buram
- Gunakan pencahayaan yang baik
- Letakkan KTP di permukaan datar
- Hindari pantulan cahaya (glare)
- Pastikan semua teks terlihat jelas

## Build Production

```bash
npm run build
npm start
```

## License

MIT
