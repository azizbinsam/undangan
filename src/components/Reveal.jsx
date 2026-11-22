// Bungkus elemen supaya animasi masuk (up | left | right | zoom) saat terlihat di layar.
export default function Reveal({ anim = "up", delay = 0, as: Tag = "div", className, children }) {
  return (
    <Tag className={className} data-anim={anim} style={{ "--d": `${delay}s` }}>
      {children}
    </Tag>
  );
}
