import { useEffect, useState } from "react";

const ITEMS = [
  ["beranda", "Beranda", "M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"],
  ["mempelai", "Mempelai", "M12 21s-7-4.6-9.3-9A5.3 5.3 0 0 1 12 6.3 5.3 5.3 0 0 1 21.3 12C19 16.4 12 21 12 21z"],
  ["acara", "Acara", "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4"],
  ["lokasi", "Lokasi", "M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"],
  ["rsvp", "RSVP", "M4 5h16v11H9l-5 4z"],
  ["amplop", "Hadiah", "M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7c-2-4-6-3-5 0M12 7c2-4 6-3 5 0"],
];

export default function Nav() {
  const [aktif, setAktif] = useState("beranda");

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setAktif(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ITEMS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const pergi = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <nav className="nav" aria-label="Navigasi bagian">
      {ITEMS.map(([id, label, d]) => (
        <button key={id} className={aktif === id ? "on" : ""} onClick={() => pergi(id)} aria-current={aktif === id ? "true" : undefined}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
          {label}
        </button>
      ))}
    </nav>
  );
}
