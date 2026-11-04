import { useState } from "react";

export default function Avatar({ name, size = 56, src }) {
  const [bad, setBad] = useState(false);
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2);
  const box = { width: size, height: size, fontSize: size * 0.36 };
  if (src && !bad) {
    return <img className="avatar" src={src} alt={name} onError={() => setBad(true)} style={box} />;
  }
  return <div className="avatar" style={box}>{initials}</div>;
}