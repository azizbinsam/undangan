import { useEffect } from "react";

const SPEED = 38; // px per detik (pelan)

// Gulir otomatis berbasis waktu (bukan per frame), jadi kecepatan tetap stabil.
// Berhenti 5 detik bila pengunjung menyentuh/scroll, dan tidak jalan saat mengisi form.
// Tidak membaca layout tiap frame (tinggi halaman di-cache) supaya tidak patah-patah.
export default function useAutoScroll(aktif, onEnd) {
  useEffect(() => {
    if (!aktif) return;
    let raf;
    let last = performance.now();
    let pos = window.scrollY;
    let tunggu = last + 4000; // beri waktu membaca bagian pembuka
    let sinkron = true; // baca posisi scroll saat mulai jalan
    let max = 0;
    const ukur = () => { max = document.documentElement.scrollHeight - window.innerHeight; };
    ukur();
    const timer = setInterval(ukur, 2000);
    window.addEventListener("resize", ukur);
    const jeda = () => { tunggu = performance.now() + 5000; };
    const ev = ["wheel", "touchstart", "touchmove", "keydown", "mousedown"];
    ev.forEach((e) => window.addEventListener(e, jeda, { passive: true }));

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const el = document.activeElement;
      const mengetik = el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
      if (now < tunggu || mengetik || document.hidden) {
        sinkron = true;
      } else {
        if (sinkron) { pos = window.scrollY; sinkron = false; }
        pos += SPEED * dt;
        if (pos >= max - 1) {
          window.scrollTo(0, max);
          onEnd();
          return;
        }
        window.scrollTo(0, pos);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(timer);
      window.removeEventListener("resize", ukur);
      ev.forEach((e) => window.removeEventListener(e, jeda));
    };
  }, [aktif]);
}
