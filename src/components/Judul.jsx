import Icon from "./Icon.jsx";

// Judul bagian: lencana ikon bulat + judul + garis emas. Tanpa children = lencana saja.
export default function Judul({ icon, children }) {
  return (
    <div className="judul" data-anim="up">
      <span className="lencana"><Icon name={icon} size={26} /></span>
      {children && <h2>{children}</h2>}
    </div>
  );
}
