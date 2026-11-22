const c = (x, y, r) => `M${x - r} ${y} a${r} ${r} 0 1 0 ${2 * r} 0 a${r} ${r} 0 1 0 ${-2 * r} 0z`;

const P = {
  buku: ["M12 6c-2-1.5-5-2-8-1.5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-13c-3-.5-6 0-8 1.5z", "M12 6v13"],
  hati: ["M12 21s-7-4.6-9.3-9A5.3 5.3 0 0 1 12 6.3 5.3 5.3 0 0 1 21.3 12C19 16.4 12 21 12 21z"],
  kalender: ["M4 6h16v14H4z", "M4 10h16", "M8 3v4", "M16 3v4"],
  pin: ["M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z", c(12, 10, 2.5)],
  cek: [c(12, 12, 9), "M8 12l3 3 5-6"],
  amplop: ["M3 6h18v13H3z", "M3 7l9 7 9-7"],
  cincin: [c(8.5, 15, 5), c(15.5, 15, 5), "M12 3.5l2 2.5-2 2.5-2-2.5z"],
  pesta: ["M4 20l5-14 9 9z", "M13 3v3", "M19 6l-2 2", "M21 12h-3"],
  kilau: ["M12 3l1.8 4.6L18.5 9.5l-4.7 1.9L12 16l-1.8-4.6L5.5 9.5l4.7-1.9z", "M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"],
  jam: [c(12, 12, 9), "M12 7v5l3 2"],
  peta: ["M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z", "M9 4v14", "M15 6v14"],
  user: [c(12, 8, 4), "M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"],
  users: [c(9, 8, 3.5), "M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6", c(17, 9, 3), "M17 14c3 0 4.8 2 4.8 5"],
  chat: ["M4 5h16v11H9l-5 4z"],
  kirim: ["M3 11l18-8-8 18-2-8z", "M11 13l10-10"],
  salin: ["M9 9h11v11H9z", "M5 15V4h11"],
  bank: ["M3 10l9-6 9 6", "M5 10v8", "M9 10v8", "M15 10v8", "M19 10v8", "M3 20h18"],
  dompet: ["M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "M3 7V6a2 2 0 0 1 2-2h12", "M16 13.5h3"],
  kamera: ["M4 8h3l2-3h6l2 3h3v11H4z", c(12, 13.5, 3.5)],
  kiri: ["M15 5l-7 7 7 7"],
  kanan: ["M9 5l7 7-7 7"],
  tutup: ["M6 6l12 12", "M18 6L6 18"],
  gift: ["M4 10h16v10H4z", "M3 7h18v3H3z", "M12 7v13", "M12 7c-2-4-6-3-5 0", "M12 7c2-4 6-3 5 0"],
};

export default function Icon({ name, size = 24, className, fill }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {P[name].map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}
