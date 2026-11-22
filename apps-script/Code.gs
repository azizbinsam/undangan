// Tempel di Google Sheet: Extensions > Apps Script. Lalu Deploy > New deployment > Web app
// (Execute as: Me, Who has access: Anyone). Salin URL-nya ke VITE_RSVP_URL.
const SHEET = "RSVP";

function aman(v) {
  const s = String(v || "").slice(0, 500);
  return /^[=+\-@]/.test(s) ? "'" + s : s; // cegah formula injection
}

function doPost(e) {
  const d = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActive();
  const sh = ss.getSheetByName(SHEET) || ss.insertSheet(SHEET);
  if (sh.getLastRow() === 0) sh.appendRow(["Waktu", "Nama", "Kehadiran", "Jumlah", "Ucapan"]);
  sh.appendRow([new Date(), aman(d.nama), aman(d.hadir), Number(d.jumlah) || 1, aman(d.ucapan)]);
  return ContentService.createTextOutput("ok");
}

function doGet() {
  const sh = SpreadsheetApp.getActive().getSheetByName(SHEET);
  const rows = sh ? sh.getDataRange().getValues().slice(1) : [];
  const out = rows.filter((r) => r[4]).slice(-30).reverse().map((r) => ({ nama: r[1], hadir: r[2], ucapan: r[4] }));
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}
