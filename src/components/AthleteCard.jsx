import Photo from "./Photo";

export default function AthleteCard({ a, score, reasons, children }) {
  return (
    <div className="card pcard">
      <div className="photo-wrap">
        <Photo src={`/images/roster/${a.slug}.jpg`} name={a.name} />
        {score != null && <div className="badge">{score}% match</div>}
        {a.featured && <span className="star">Featured</span>}
      </div>
      <div className="pbody">
        <div className="name">{a.name}</div>
        <div className="muted">{a.year} · {a.hometown}</div>
        {reasons && <div>{reasons.map((r) => <span key={r} className="pill green">{r}</span>)}</div>}
        {children}
      </div>
    </div>
  );
}