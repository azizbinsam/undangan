# Undangan Pernikahan Digital

React + Vite. Data ada di `src/data/undangan.json` dan `src/data/amplop.json`.

## Jalankan lokal
```bash
npm install
cp .env.example .env     # isi VITE_RSVP_URL setelah Apps Script dibuat
npm run dev
```
Buka `http://localhost:5173/?to=Bapak+Budi+Santoso`

## Musik
Taruh file di `public/audio/musik.mp3` (MP3, 128 kbps, maks 3-4 MB, pakai musik bebas royalti).

## RSVP ke Google Sheets
1. Buat Google Sheet baru, lalu Extensions > Apps Script, tempel isi `apps-script/Code.gs`.
2. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone.
3. Salin URL Web App ke `.env` (`VITE_RSVP_URL=...`). Di Vercel isi di Settings > Environment Variables.
4. Setiap ubah Code.gs, buat deployment versi baru.

## Generator link tamu
Buka `/generator.html` (lokal atau setelah deploy), ketik nama, salin link atau kirim lewat WhatsApp.

## Deploy
```bash
git init && git add . && git commit -m "undangan"
git branch -M main
git remote add origin <URL-REPO>
git push -u origin main
```
Import repo di Vercel (framework Vite terdeteksi otomatis, build `npm run build`, output `dist`).

## Foto
- **Foto mempelai:** ganti file `public/img/mempelai-pria.webp` dan `mempelai-wanita.webp` (rasio 3:4 paling pas).
- **Galeri prewedding:** taruh file di `public/img/prewed/`, lalu atur di `src/data/galeri.json`.
  - **Urutan** = urutan baris di array `foto`. Pindahkan baris ke atas atau bawah untuk mengubah urutan.
  - `"lebar": true` membuat foto tampil selebar panel (tanpa ini, 2 foto berdampingan).
  - `"asli": true` menampilkan foto tanpa dipotong (cocok untuk kolase).
  - `"tampil": false` menyembunyikan foto tanpa menghapus barisnya.

## Thumbnail galeri
Grid galeri memakai versi kecil dari `public/img/prewed/kecil/<nama-file>` (lebar sekitar 640 px) supaya hemat memori di HP. Foto besar hanya dimuat saat dibuka di layar penuh. Jika thumbnail tidak ada, otomatis dipakai foto aslinya.

## Uji mode ringan
Tambahkan `?ringan=1` di link (misal `/?to=Budi&ringan=1`) untuk mematikan kelopak, bunga, awan, burung, kabut, dan parallax. Berguna untuk mencari penyebab bila halaman masih dimuat ulang di HP tertentu.
