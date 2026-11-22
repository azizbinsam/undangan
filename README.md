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
