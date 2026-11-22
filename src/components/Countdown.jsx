import { useEffect, useState } from "react";

const hitung = (target) => {
  const s = Math.max(0, Math.floor((new Date(target) - Date.now()) / 1000));
  return { Hari: Math.floor(s / 86400), Jam: Math.floor(s / 3600) % 24, Menit: Math.floor(s / 60) % 60, Detik: s % 60 };
};

export default function Countdown({ target }) {
  const [t, setT] = useState(() => hitung(target));
  useEffect(() => {
    const id = setInterval(() => setT(hitung(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  return (
    <div className="countdown">
      {Object.entries(t).map(([label, n]) => (
        <div key={label}>
          <b>{String(n).padStart(2, "0")}</b>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
