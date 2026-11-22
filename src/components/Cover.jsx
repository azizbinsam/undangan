import { useState } from "react";
import Cat from "./Cat.jsx";
import Flora from "./Flora.jsx";
import Scene from "./Scene.jsx";

// fase: "masuk" (kucing jalan) -> "tiba" (teks muncul) -> "keluar" (setelah tombol ditekan)
export default function Cover({ data, tamu, onOpen, onDone }) {
  const [fase, setFase] = useState("masuk");
  const { panggilan, acara, judul } = data;

  const buka = () => {
    if (fase !== "tiba") return;
    setFase("keluar");
    onOpen(); // dipanggil di dalam klik supaya musik boleh diputar
    setTimeout(onDone, 3000);
  };

  return (
    <section className={`cover ${fase}`} aria-label="Sampul undangan">
      <Scene />
      <Flora />
      <div className="cover-text">
        <p className="rv" style={{ "--d": "0s" }}>{judul}</p>
        <h1 className="rv" style={{ "--d": ".25s" }}>
          {panggilan.wanita}
          <span className="amp">&amp;</span>
          {panggilan.pria}
        </h1>
        <p className="rv date" style={{ "--d": ".5s" }}>{acara.tanggal_lengkap}</p>
        <div className="rv guest" style={{ "--d": ".8s" }}>
          <span>Kepada Yth.</span>
          <strong>{tamu}</strong>
          <span>Mohon maaf bila ada kesalahan penulisan nama dan gelar.</span>
        </div>
        <button className="btn rv" style={{ "--d": "1.1s" }} onClick={buka} disabled={fase !== "tiba"}>
          Buka Undangan
        </button>
      </div>
      <div
        className="cat-wrap"
        onAnimationEnd={(e) => {
          if (e.target === e.currentTarget && e.animationName === "catIn") setFase("tiba");
        }}
      >
        <Cat walking={fase !== "tiba"} />
      </div>
    </section>
  );
}
