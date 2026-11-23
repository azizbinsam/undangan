import { useEffect, useRef, useState } from "react";
import data from "./data/undangan.json";
import useGuest from "./hooks/useGuest.js";
import useAutoScroll from "./hooks/useAutoScroll.js";
import Cover from "./components/Cover.jsx";
import Isi from "./components/Isi.jsx";
import Music from "./components/Music.jsx";
import Nav from "./components/Nav.jsx";
import Flora from "./components/Flora.jsx";
import Petals from "./components/Petals.jsx";
import Scene from "./components/Scene.jsx";

const kurangiGerak = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function App() {
  const tamu = useGuest();
  const audio = useRef(null);
  const [cover, setCover] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [dibuka, setDibuka] = useState(false); // pemandangan halaman baru dipasang saat tombol ditekan
  const [auto, setAuto] = useState(!kurangiGerak);

  useEffect(() => {
    document.body.style.overflow = cover ? "hidden" : "";
  }, [cover]);

  // Parallax: simpan posisi scroll ke CSS variable (--p dalam px, --n angka)
  useEffect(() => {
    let sibuk = false;
    let ultimo = -100;
    let max = 0;
    const ukur = () => { max = document.documentElement.scrollHeight - window.innerHeight; };
    const set = () => {
      const y = window.scrollY;
      ultimo = y;
      if (document.documentElement.classList.contains("ringan")) { sibuk = false; return; }
      const f = max > 0 ? Math.min(1, y / max) : 0;
      // variabel hanya ditulis ke pemandangan/bunga/kelopak, bukan ke seluruh halaman
      document.querySelectorAll(".scene, .flora, .petals").forEach((el) => {
        el.style.setProperty("--n", y);
        el.style.setProperty("--f", f);
      });
      sibuk = false;
    };
    const onScroll = () => {
      if (sibuk || Math.abs(window.scrollY - ultimo) < 4) return; // lewati gerakan kecil
      sibuk = true;
      requestAnimationFrame(set);
    };
    ukur();
    set();
    const timer = setInterval(ukur, 2000);
    window.addEventListener("resize", ukur);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", ukur);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Animasi masuk: elemen [data-anim] muncul saat terlihat, dimulai setelah cover terangkat
  useEffect(() => {
    if (cover) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }),
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-anim]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [cover]);

  useAutoScroll(!cover && auto, () => setAuto(false));

  const buka = () => {
    setDibuka(true);
    document.documentElement.classList.add("anim");
    const a = audio.current;
    if (!a) return;
    a.volume = 0.6;
    a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };
  const toggleMusik = () => {
    const a = audio.current;
    if (a.paused) { a.play(); setPlaying(true); } else { a.pause(); setPlaying(false); }
  };

  return (
    <>
      <audio ref={audio} src={data.audio} loop preload="metadata" />
      {dibuka && (
        <>
          <Scene />
          <Petals />
          <Flora lift />
        </>
      )}
      <Isi data={data} tamu={tamu} />
      {!cover && <Nav />}
      {!cover && <Music playing={playing} onToggle={toggleMusik} auto={auto} onAuto={() => setAuto((a) => !a)} />}
      {cover && <Cover data={data} tamu={tamu} onOpen={buka} onDone={() => setCover(false)} />}
    </>
  );
}
