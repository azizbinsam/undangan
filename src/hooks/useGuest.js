// Ambil nama tamu dari link: https://domain.com/?to=Bapak+Budi+Santoso
export default function useGuest() {
  const raw = new URLSearchParams(window.location.search).get("to") || "";
  const nama = raw.replace(/\s+/g, " ").trim().slice(0, 60);
  return nama || "Tamu Undangan";
}
