import Countdown from "./Countdown.jsx";
import Amplop from "./Amplop.jsx";
import Rsvp from "./Rsvp.jsx";
import Reveal from "./Reveal.jsx";
import Judul from "./Judul.jsx";
import Galeri from "./Galeri.jsx";
import Icon from "./Icon.jsx";

function Pemisah() {
  return (
    <Reveal anim="zoom">
      <div className="pemisah"><span /><Icon name="kilau" size={22} /><span /></div>
    </Reveal>
  );
}

function Mempelai({ p, anim }) {
  return (
    <div className="mempelai">
      <Reveal anim="zoom">
        <div className="arch"><img src={p.foto} alt={p.nama} loading="lazy" /></div>
      </Reveal>
      <Reveal anim={anim} delay={0.15}>
        <h3>{p.nama}</h3>
        <p>{p.urutan_anak} dari<br />{p.orang_tua}</p>
      </Reveal>
    </div>
  );
}

function KartuAcara({ a, ikon, kelas, anim, delay }) {
  return (
    <Reveal anim={anim} delay={delay}>
      <div className={`kartu ${kelas}`}>
        <div className="kartu-atas"><span className="kartu-ikon"><Icon name={ikon} size={30} /></span></div>
        <h3>{a.nama}</h3>
        <p className="jam"><Icon name="jam" size={18} />{a.waktu}</p>
        <p className="ket">{a.keterangan}</p>
      </div>
    </Reveal>
  );
}

export default function Isi({ data, tamu }) {
  const { pembukaan, mempelai, acara, lokasi, panggilan } = data;
  return (
    <main className="isi">
      <header className="hero" id="beranda">
        <Reveal><p className="hero-judul">{data.judul}</p></Reveal>
        <Reveal anim="zoom" delay={0.15}>
          <h1>{panggilan.wanita}<span className="amp">&amp;</span>{panggilan.pria}</h1>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="hero-tgl"><Icon name="kalender" size={18} />{acara.tanggal_lengkap}</p>
        </Reveal>
      </header>

      <section className="sec" id="pembuka">
        <Judul icon="buku" />
        <Reveal><p className="salam">Assalamu'alaikum Warahmatullahi Wabarakatuh</p></Reveal>
        <Reveal delay={0.15}><p className="lead">{data.pengantar}</p></Reveal>
        <Reveal anim="zoom" delay={0.3}>
          <blockquote>
            <p className="arab" lang="ar" dir="rtl">{pembukaan.arab}</p>
            <p>{pembukaan.arti}</p>
            <cite>{pembukaan.surah} ayat {pembukaan.ayat}</cite>
          </blockquote>
        </Reveal>
      </section>

      <Pemisah />
      <section className="sec alt" id="mempelai">
        <Judul icon="hati">Mempelai</Judul>
        <Mempelai p={mempelai.wanita} anim="left" />
        <Reveal anim="zoom">
          <div className="dengan-wrap"><Icon name="hati" size={26} fill className="denyut" /><p className="dengan">{mempelai.penghubung}</p></div>
        </Reveal>
        <Mempelai p={mempelai.pria} anim="right" />
      </section>

      <Pemisah />
      <Galeri />

      <Pemisah />
      <section className="sec alt" id="acara">
        <Judul icon="kalender">Hari Bahagia</Judul>
        <Reveal delay={0.1}><p className="tanggal">{acara.tanggal_lengkap}</p></Reveal>
        <Reveal anim="zoom" delay={0.2}><Countdown target={acara.mulai_iso} /></Reveal>
        <div className="cards dua">
          <KartuAcara a={acara.akad} ikon="cincin" kelas="akad" anim="left" delay={0} />
          <KartuAcara a={acara.resepsi} ikon="pesta" kelas="resepsi" anim="right" delay={0.15} />
        </div>
      </section>

      <Pemisah />
      <section className="sec alt" id="lokasi">
        <Judul icon="peta">Lokasi</Judul>
        <Reveal anim="zoom" delay={0.1}>
          <div className="radar"><i /><i /><Icon name="pin" size={36} /></div>
        </Reveal>
        <Reveal delay={0.15}><h3 className="tempat">{lokasi.nama}</h3></Reveal>
        <Reveal delay={0.25}><p className="lead">{lokasi.alamat}</p></Reveal>
        <Reveal anim="zoom" delay={0.35}>
          <a className="btn" href={lokasi.maps} target="_blank" rel="noopener noreferrer"><Icon name="peta" size={18} />Buka Google Maps</a>
        </Reveal>
      </section>

      <Pemisah />
      <Rsvp tamu={tamu} />
      <Pemisah />
      <Amplop />
      <Pemisah />

      <section className="sec penutup">
        <Judul icon="hati" />
        <Reveal><p className="lead">{data.undangan}</p></Reveal>
        <Reveal delay={0.15}><p className="lead">{data.penutup.ucapan}</p></Reveal>
        <Reveal delay={0.3}><p className="salam">{data.penutup.salam}</p></Reveal>
        <Reveal anim="zoom" delay={0.45}>
          <p className="keluarga">Kami yang berbahagia<br />{data.keluarga.mempelai_wanita}<br />{data.keluarga.mempelai_pria}</p>
        </Reveal>
      </section>
    </main>
  );
}
