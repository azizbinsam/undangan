import { useState } from "react";
import { createPortal } from "react-dom";
import galeri from "../data/galeri.json";
import Reveal from "./Reveal.jsx";
import Judul from "./Judul.jsx";
import Lightbox from "./Lightbox.jsx";

// Urutan foto = urutan di src/data/galeri.json
export default function Galeri() {
  const [buka, setBuka] = useState(null);
  const foto = galeri.foto.filter((f) => f.tampil !== false);
  const go = (d) => setBuka((i) => (i + d + foto.length) % foto.length);

  return (
    <section className="sec" id="galeri">
      <Judul icon="kamera">{galeri.judul}</Judul>
      <Reveal delay={0.1}><p className="lead">{galeri.keterangan}</p></Reveal>
      <div className="galeri">
        {foto.map((f, i) => (
          <Reveal key={f.src} anim={i % 2 ? "right" : "left"} delay={(i % 2) * 0.12} className={`sel ${f.lebar ? "lebar" : ""} ${f.asli ? "asli" : ""}`}>
            <button className="polaroid" style={{ "--r": `${i % 2 ? 1.6 : -1.6}deg` }} onClick={() => setBuka(i)} aria-label={`Perbesar foto ${i + 1}`}>
              <img src={f.src} alt={f.alt} loading="lazy" />
            </button>
          </Reveal>
        ))}
      </div>
      {/* portal: panel kaca (backdrop-filter) akan mengurung elemen fixed bila tidak dipindah ke body */}
      {buka !== null && createPortal(<Lightbox foto={foto} index={buka} onClose={() => setBuka(null)} onGo={go} />, document.body)}
    </section>
  );
}
