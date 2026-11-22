import { useEffect, useRef } from "react";
import Icon from "./Icon.jsx";

// Penampil foto layar penuh: tombol panah, geser (swipe), keyboard, dan Esc untuk menutup.
export default function Lightbox({ foto, index, onClose, onGo }) {
  const awalX = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onGo(1);
      if (e.key === "ArrowLeft") onGo(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const f = foto[index];
  const klik = (fn) => (e) => { e.stopPropagation(); fn(); };

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Galeri foto"
      onClick={onClose}
      onTouchStart={(e) => { awalX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (awalX.current == null) return;
        const dx = e.changedTouches[0].clientX - awalX.current;
        awalX.current = null;
        if (Math.abs(dx) > 50) onGo(dx < 0 ? 1 : -1);
      }}
    >
      <button className="lb-tutup" onClick={klik(onClose)} aria-label="Tutup"><Icon name="tutup" size={22} /></button>
      <img key={index} src={f.src} alt={f.alt} onClick={(e) => e.stopPropagation()} />
      {foto.length > 1 && (
        <>
          <button className="lb-nav kiri" onClick={klik(() => onGo(-1))} aria-label="Foto sebelumnya"><Icon name="kiri" size={24} /></button>
          <button className="lb-nav kanan" onClick={klik(() => onGo(1))} aria-label="Foto berikutnya"><Icon name="kanan" size={24} /></button>
        </>
      )}
      <p className="lb-hitung">{index + 1} / {foto.length}</p>
    </div>
  );
}
