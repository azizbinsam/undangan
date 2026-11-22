// Bunga di 4 pojok: tumbuh saat muncul, goyang pelan, kelopak berdenyut, daun mengibas.
// Posisi bergeser halus mengikuti scroll (parallax) lewat CSS variable --n.
const Flower = ({ x, y, r, c, d = 0 }) => (
  <g transform={`translate(${x} ${y})`}>
    <g className="mekar" style={{ animationDelay: `${d}s` }}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cy={-r * 0.58} rx={r * 0.4} ry={r * 0.62} fill={c} transform={`rotate(${a})`} />
      ))}
      <circle r={r * 0.24} fill="#E3BE6F" />
    </g>
  </g>
);

const Leaf = ({ x, y, a, s = 1, c = "#8FB59A", d = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
    <path className="daun" style={{ animationDelay: `${d}s` }} d="M0 0 C10 -13 30 -13 40 0 C30 13 10 13 0 0Z" fill={c} />
  </g>
);

function Cluster() {
  const stem = { stroke: "#6E9A7B", strokeWidth: 3, fill: "none", strokeLinecap: "round" };
  return (
    <svg viewBox="0 0 170 170" className="tumbuh">
      <g className="goyang">
        <path d="M0 62 C38 58 68 88 80 150" {...stem} />
        <path d="M62 0 C58 38 88 68 150 80" {...stem} />
        <Leaf x={14} y={62} a={20} s={0.8} />
        <Leaf x={52} y={80} a={95} s={0.9} c="#6E9A7B" d={0.5} />
        <Leaf x={72} y={112} a={70} s={0.8} d={1} />
        <Leaf x={78} y={140} a={110} s={0.7} c="#6E9A7B" d={1.5} />
        <Leaf x={64} y={8} a={75} s={0.8} d={0.3} />
        <Leaf x={80} y={48} a={15} s={0.9} c="#6E9A7B" d={0.8} />
        <Leaf x={110} y={70} a={30} s={0.7} d={1.2} />
        <Leaf x={134} y={78} a={20} s={0.6} c="#6E9A7B" d={1.8} />
        <Flower x={34} y={34} r={24} c="#CDB6EE" />
        <Flower x={50} y={86} r={13} c="#B99BE6" d={0.6} />
        <Flower x={84} y={54} r={11} c="#E3D3F7" d={1.1} />
        <Flower x={112} y={68} r={14} c="#A784D8" d={0.3} />
        <Flower x={150} y={80} r={8} c="#8B5CC8" d={0.9} />
        <Flower x={80} y={148} r={8} c="#CDB6EE" d={1.4} />
      </g>
    </svg>
  );
}

export default function Flora({ lift }) {
  return (
    <div className={`flora ${lift ? "lift" : ""}`} aria-hidden="true">
      {["tl", "tr", "bl", "br"].map((k) => (
        <div key={k} className={`corner ${k}`}>
          <div className="par"><Cluster /></div>
        </div>
      ))}
    </div>
  );
}
