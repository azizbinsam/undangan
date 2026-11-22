import { Fragment } from "react";

// Pemandangan pegunungan romantis (senja lilac). Lapisan bertumpuk bergerak dengan
// kecepatan berbeda saat scroll: --f (0..1 progres halaman) dan --n (px scroll) dari App.
const gunung = (p) => "M" + p.map(([x, y]) => `${x} ${y}`).join(" L") + " L1440 400 L0 400Z";
const pohon = (x, b, s) =>
  `M${x - 24 * s} ${b} L${x - 9 * s} ${b - 34 * s} L${x - 17 * s} ${b - 34 * s} L${x} ${b - 84 * s} L${x + 17 * s} ${b - 34 * s} L${x + 9 * s} ${b - 34 * s} L${x + 24 * s} ${b}Z`;

const LAPIS = [
  { c: "#cdbcf0", b: "30vh", h: "40vh", y: "-18px", x: "6px",
    p: [[0, 190], [110, 140], [210, 185], [330, 95], [450, 170], [560, 120], [690, 200], [810, 105], [930, 175], [1050, 130], [1170, 190], [1290, 115], [1440, 170]] },
  { c: "#b69be3", b: "20vh", h: "38vh", y: "-40px", x: "12px",
    p: [[0, 250], [90, 210], [200, 240], [320, 170], [430, 235], [560, 185], [660, 245], [790, 160], [900, 230], [1010, 190], [1120, 250], [1250, 175], [1350, 225], [1440, 205]] },
  { c: "#9a74d0", b: "10vh", h: "34vh", y: "-80px", x: "20px",
    p: [[0, 300], [130, 255], [250, 300], [380, 240], [500, 300], [640, 250], [760, 305], [900, 235], [1030, 300], [1160, 255], [1290, 305], [1440, 260]] },
  { c: "#6a43a6", b: "0vh", h: "30vh", y: "-120px", x: "30px",
    p: [[0, 290], [150, 262], [300, 300], [470, 258], [620, 305], [780, 265], [930, 308], [1080, 268], [1240, 310], [1440, 275]] },
];

const XS = [20, 75, 130, 190, 245, 300, 360, 420, 470, 530, 590, 650, 700, 760, 820, 880, 940, 1000, 1060, 1120, 1180, 1240, 1300, 1360, 1420];
const SK = [1.1, 0.8, 1.3, 0.9, 1.05];
const PINES = "M0 300 V268 H1440 V300Z " + XS.map((x, i) => pohon(x, 272, SK[i % 5])).join(" ");

const AWAN = [[10, 150, 120, 0, 0.75], [22, 110, 160, -60, 0.6], [34, 180, 200, -110, 0.5]];
const BURUNG = [[20, 46, 0, 1], [26, 58, -20, 0.8], [16, 70, -35, 0.65]];

export default function Scene() {
  return (
    <div className="scene" aria-hidden="true">
      <div className="langit" />
      <div className="kilau-langit" />
      <div className="surya" />
      {AWAN.map(([t, w, d, dl, o], i) => (
        <div key={i} className="awan" style={{ "--t": `${t}%`, "--w": `${w}px`, "--d": `${d}s`, "--dl": `${dl}s`, opacity: o }}>
          <svg viewBox="0 0 200 60"><g fill="#fff"><ellipse cx="60" cy="40" rx="45" ry="18" /><ellipse cx="100" cy="30" rx="40" ry="24" /><ellipse cx="142" cy="40" rx="46" ry="18" /></g></svg>
        </div>
      ))}
      {BURUNG.map(([t, d, dl, s], i) => (
        <div key={i} className="burung" style={{ "--t": `${t}%`, "--d": `${d}s`, "--dl": `${dl}s` }}>
          <svg viewBox="0 0 28 16" width={28 * s} height={16 * s}><path d="M1 12 Q8 2 14 11 Q20 2 27 12" stroke="#6b3fa0" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
        </div>
      ))}
      {LAPIS.map((l, i) => (
        <Fragment key={i}>
          <div className="lapis" style={{ "--c": l.c, "--y": l.y, "--x": l.x, bottom: l.b, height: l.h }}>
            <svg viewBox="0 0 1440 400" preserveAspectRatio="none"><path d={gunung(l.p)} fill={l.c} stroke={l.c} strokeWidth="12" strokeLinejoin="round" /></svg>
          </div>
          {i === 1 && <div className="kabut" style={{ bottom: "26vh" }} />}
          {i === 2 && <div className="kabut b" style={{ bottom: "12vh" }} />}
        </Fragment>
      ))}
      <div className="lapis" style={{ "--c": "#3a2160", "--y": "-150px", "--x": "36px", bottom: 0, height: "26vh" }}>
        <svg viewBox="0 0 1440 300" preserveAspectRatio="none"><path d={PINES} fill="#3a2160" /></svg>
      </div>
    </div>
  );
}
