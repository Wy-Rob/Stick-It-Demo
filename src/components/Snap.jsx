import { useState } from "react";

export default function Snap({ n, ratio }) {
  const [bad, setBad] = useState(false);
  return (
    <div className="snap" style={ratio ? { aspectRatio: ratio } : undefined}>
      {!bad
        ? <img src={`/images/community/community-${n}.jpg`} alt="Red Rocks community moment" onError={() => setBad(true)} />
        : <div className="snap-ph">Community photo {n}</div>}
    </div>
  );
}