// Kucing SVG: state "walking" (jalan, kaki bergantian) atau diam (duduk manis, ekor tetap goyang)
const FUR = "#FBE8D0";
const SHADE = "#F0D2AE";
const PURPLE = "#8B5CC8";

function Leg({ x, shade, cls }) {
  return (
    <g className={`leg ${cls}`} style={{ transformOrigin: `${x + 7}px 118px` }}>
      <rect x={x} y="112" width="14" height="40" rx="7" fill={shade ? SHADE : FUR} />
      <ellipse cx={x + 7} cy="150" rx="8" ry="5" fill={shade ? SHADE : FUR} />
      <ellipse cx={x + 7} cy="151" rx="3.2" ry="2" fill="#F4A6C0" />
    </g>
  );
}

export default function Cat({ walking }) {
  return (
    <svg className={`cat ${walking ? "walking" : "sit"}`} viewBox="0 0 240 170" role="img" aria-label="Kucing lucu">
      <ellipse cx="120" cy="160" rx="82" ry="7" fill="#2D1B47" opacity=".14" />
      <g className="bob">
        <g className="tail" style={{ transformOrigin: "56px 100px" }}>
          <path d="M56 102 C18 100 10 60 34 42" stroke={FUR} strokeWidth="15" fill="none" strokeLinecap="round" />
          <path d="M30 50 C28 46 30 44 34 42" stroke={PURPLE} strokeWidth="15" fill="none" strokeLinecap="round" />
        </g>
        <Leg x={68} shade cls="b" />
        <Leg x={140} shade cls="b" />
        <ellipse cx="110" cy="100" rx="60" ry="33" fill={FUR} />
        <path d="M78 76 q6 10 2 22 M96 70 q6 10 3 24 M114 70 q6 10 3 24" stroke="#CDB6EE" strokeWidth="6" strokeLinecap="round" fill="none" />
        <Leg x={88} cls="a" />
        <Leg x={156} cls="a" />
        <g className="head" style={{ transformOrigin: "178px 80px" }}>
          <polygon points="152,58 154,24 178,46" fill={FUR} />
          <polygon points="182,46 206,24 208,60" fill={FUR} />
          <polygon points="157,50 158,34 170,45" fill="#F4A6C0" />
          <polygon points="190,45 202,34 203,52" fill="#F4A6C0" />
          <circle cx="180" cy="78" r="33" fill={FUR} />
          <path d="M168 48 q12 -6 24 0" stroke="#CDB6EE" strokeWidth="5" strokeLinecap="round" fill="none" />
          <g className="eyes">
            <ellipse cx="168" cy="78" rx="5" ry="7" fill="#2D1B47" />
            <ellipse cx="194" cy="78" rx="5" ry="7" fill="#2D1B47" />
            <circle cx="170" cy="75" r="2" fill="#fff" />
            <circle cx="196" cy="75" r="2" fill="#fff" />
          </g>
          <circle cx="158" cy="90" r="6" fill="#F4A6C0" opacity=".6" />
          <circle cx="204" cy="90" r="6" fill="#F4A6C0" opacity=".6" />
          <path d="M177 88 h8 l-4 5z" fill="#E88AAE" />
          <path d="M181 93 q-4 6 -9 3 M181 93 q4 6 9 3" stroke="#2D1B47" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M150 88 l-16 -3 M150 94 l-16 3 M212 88 l16 -3 M212 94 l16 3" stroke="#B9A58B" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <g>
          <polygon points="150,110 128,98 128,122" fill={PURPLE} />
          <polygon points="150,110 172,98 172,122" fill={PURPLE} />
          <circle cx="150" cy="110" r="7" fill="#6B3FA0" />
        </g>
      </g>
    </svg>
  );
}
