import { useState } from "react";

export default function Photo({ src, name, ratio = "4 / 5" }) {
  const [bad, setBad] = useState(!src);
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  return (
    <div className="photo" style={{ aspectRatio: ratio }}>
      {!bad
        ? <img src={src} alt={name} onError={() => setBad(true)} />
        : <div className="ph">{initials}</div>}
    </div>
  );
}