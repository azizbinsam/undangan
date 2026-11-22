// Kelopak dan daun melayang. Tiap item punya "kedalaman" (--k) berbeda, jadi bergeser
// dengan kecepatan berbeda saat di-scroll: itu yang memberi efek parallax.
const ITEMS = [
  [5, 14, 19, 0, 0.08], [14, 20, 24, 6, 0.14], [24, 12, 17, 12, 0.05], [35, 18, 26, 3, 0.18],
  [46, 16, 21, 9, 0.1], [57, 22, 28, 15, 0.2], [66, 12, 18, 1, 0.06], [75, 17, 23, 8, 0.16],
  [84, 20, 25, 4, 0.12], [92, 13, 20, 11, 0.04], [40, 10, 30, 17, 0.09], [70, 15, 22, 2, 0.15],
];

export default function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {ITEMS.map(([l, s, dur, dl, k], i) => (
        <div key={i} className="pt" style={{ "--l": `${l}%`, "--k": k }}>
          <svg viewBox="0 0 24 24" style={{ "--s": `${s}px`, "--dur": `${dur}s`, "--dl": `-${dl}s` }}>
            {i % 2 === 0 ? (
              <path d="M12 1C18 7 18 17 12 23C6 17 6 7 12 1Z" fill={i % 4 === 0 ? "#CDB6EE" : "#A784D8"} />
            ) : (
              <g>
                <path d="M2 12C7 2 17 2 22 12C17 22 7 22 2 12Z" fill="#8FB59A" />
                <path d="M2 12H22" stroke="#6E9A7B" strokeWidth="1" />
              </g>
            )}
          </svg>
        </div>
      ))}
    </div>
  );
}
