import { useEffect, useState } from "react";
import Icon from "./Icon.jsx";
import Judul from "./Judul.jsx";

const URL_RSVP = import.meta.env.VITE_RSVP_URL;

export default function Rsvp({ tamu }) {
  const [form, setForm] = useState({ nama: tamu === "Tamu Undangan" ? "" : tamu, hadir: "Hadir", jumlah: "1", ucapan: "" });
  const [status, setStatus] = useState("idle"); // idle | kirim | ok | gagal
  const [daftar, setDaftar] = useState([]);
  const [muatStatus, setMuatStatus] = useState("idle"); // idle | ok | gagal

  const muat = () => {
    if (!URL_RSVP) {
      console.warn("VITE_RSVP_URL belum diisi: daftar ucapan tidak dimuat");
      return;
    }
    fetch(URL_RSVP)
      .then((r) => r.json())
      .then((d) => {
        if (!Array.isArray(d)) throw new Error("Respons bukan daftar ucapan");
        setDaftar(d);
        setMuatStatus("ok");
      })
      .catch((e) => {
        console.error("Gagal memuat ucapan:", e);
        setMuatStatus("gagal");
      });
  };
  useEffect(muat, []);

  const ubah = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const kirim = async (e) => {
    e.preventDefault();
    if (!URL_RSVP) {
      setStatus("gagal");
      return;
    }
    setStatus("kirim");
    try {
      // text/plain + no-cors: cara paling andal memanggil Apps Script dari browser
      await fetch(URL_RSVP, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body: JSON.stringify(form) });
      setStatus("ok");
      setDaftar((d) => form.ucapan ? [{ nama: form.nama, hadir: form.hadir, ucapan: form.ucapan }, ...d] : d);
    } catch {
      setStatus("gagal");
    }
  };

  return (
    <section className="sec" id="rsvp">
      <Judul icon="cek">Konfirmasi Kehadiran</Judul>
      {status === "ok" ? (
        <p className="lead">Terima kasih, konfirmasi Anda sudah kami terima.</p>
      ) : (
        <form className="card form" data-anim="zoom" onSubmit={kirim}>
          <label><span className="lb"><Icon name="user" size={16} />Nama</span>
            <input name="nama" value={form.nama} onChange={ubah} required maxLength={60} />
          </label>
          <label><span className="lb"><Icon name="cek" size={16} />Kehadiran</span>
            <select name="hadir" value={form.hadir} onChange={ubah}>
              <option>Hadir</option>
              <option>Tidak Hadir</option>
              <option>Masih Ragu</option>
            </select>
          </label>
          <label><span className="lb"><Icon name="users" size={16} />Jumlah tamu</span>
            <select name="jumlah" value={form.jumlah} onChange={ubah}>
              {[1, 2, 3, 4, 5].map((n) => <option key={n}>{n}</option>)}
            </select>
          </label>
          <label><span className="lb"><Icon name="chat" size={16} />Ucapan dan doa</span>
            <textarea name="ucapan" value={form.ucapan} onChange={ubah} rows="3" maxLength={300} />
          </label>
          <button className="btn" disabled={status === "kirim"}><Icon name="kirim" size={18} />{status === "kirim" ? "Mengirim..." : "Kirim Konfirmasi"}</button>
          {status === "gagal" && <p className="err">Belum terkirim. Periksa koneksi, lalu coba lagi.</p>}
        </form>
      )}
      {daftar.length > 0 && (
        <ul className="ucapan">
          {daftar.map((u, i) => (
            <li key={i}>
              <strong>{u.nama}</strong> <em>{u.hadir}</em>
              <p>{u.ucapan}</p>
            </li>
          ))}
        </ul>
      )}
      {daftar.length === 0 && muatStatus === "ok" && <p className="kosong">Belum ada ucapan. Jadilah yang pertama mendoakan kami.</p>}
      {muatStatus === "gagal" && <p className="kosong">Daftar ucapan belum bisa dimuat.</p>}
    </section>
  );
}
