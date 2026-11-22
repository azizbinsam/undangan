import { useState } from "react";
import Icon from "./Icon.jsx";
import Judul from "./Judul.jsx";
import amplop from "../data/amplop.json";

export default function Amplop() {
  const [buka, setBuka] = useState(false);
  const [tersalin, setTersalin] = useState("");

  const salin = async (nomor) => {
    try {
      await navigator.clipboard.writeText(nomor);
    } catch {
      const el = document.createElement("textarea");
      el.value = nomor;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      el.remove();
    }
    setTersalin(nomor);
    setTimeout(() => setTersalin(""), 2000);
  };

  return (
    <section className="sec alt" id="amplop">
      <Judul icon="amplop">{amplop.judul}</Judul>
      <p className="lead" data-anim="up">{amplop.keterangan}</p>
      {!buka ? (
        <div data-anim="zoom"><button className="btn" onClick={() => setBuka(true)}><Icon name="gift" size={18} />Kirim Tanda Kasih</button></div>
      ) : (
        <div className="cards">
          {amplop.rekening.map((r) => (
            <div className="card rek" key={r.nomor}>
              <div className="bank-ikon"><Icon name={r.bank === "DANA" ? "dompet" : "bank"} size={26} /></div>
              <h3>{r.bank}</h3>
              <p className="nomor">{r.nomor}</p>
              <p>a.n. {r.nama}</p>
              <button className={`btn ghost ${tersalin === r.nomor ? "ok" : ""}`} onClick={() => salin(r.nomor)}>
                <Icon name={tersalin === r.nomor ? "cek" : "salin"} size={18} />{tersalin === r.nomor ? "Tersalin" : "Salin nomor"}
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
