import Photo from "./Photo";

export default function AthleteCard({ a, score, reasons, children }) {
  return (
    <div className="card pcard">
      <div className="photo-wrap">
        <Photo src={`/images/athlete-${a.id}.jpg`} name={a.name} />
        {score != null && <div className="badge">{score}% match</div>}
        {a.tier === "star" && <span className="star">Featured</span>}
      </div>
      <div className="pbody">
        <div className="name">{a.name}</div>
        <div className="muted">{a.event} · {a.year} · {a.hometown}</div>
        <div className="muted">Instagram {(a.followers / 1000).toFixed(1)}k (sample)</div>
        <div>{a.pillars.map((p) => <span key={p} className="pill">{p}</span>)}</div>
        {reasons && <div>{reasons.map((r) => <span key={r} className="pill green">{r}</span>)}</div>}
        {children}
      </div>
    </div>
  );
}