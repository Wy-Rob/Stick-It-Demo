import { athletes, BUSINESS, fmt } from "../../data/sampleData";

export default function MySponsorships({ store }) {
  const mine = store.contracts.filter((c) => c.sponsor === BUSINESS.name);
  const invested = mine.filter((c) => c.type === "Cash").reduce((s, c) => s + c.amount, 0);
  const delivered = mine.reduce((s, c) => s + c.done, 0);
  const scans = 40 * mine.length + 25 * delivered;
  const redemptions = Math.round(scans * 0.14);

  return (
    <div className="wrap">
      <h2>My Sponsorships</h2>
      <p className="sub">What you've funded and what it's doing for you (results are sample data).</p>

      <div className="stats">
        <div className="stat"><b>{fmt(invested)}</b><span>Invested in cash</span></div>
        <div className="stat"><b>{mine.length}</b><span>Athlete partnerships</span></div>
        <div className="stat"><b>{delivered}</b><span>Deliverables completed</span></div>
        <div className="stat"><b>{scans}</b><span>QR scans (sample)</span></div>
        <div className="stat"><b>{redemptions}</b><span>Redemptions (sample)</span></div>
      </div>

      <div className="grid">
        {mine.map((c) => {
          const a = athletes.find((x) => x.id === c.athleteId);
          return (
            <div key={c.id} className="card deal">
              <div className="head"><strong>{a.name}</strong><span className="pill">{c.status}</span></div>
              <div className="muted">{c.obligation} · {c.type} · {fmt(c.amount)}</div>
              <div className="progress"><i style={{ width: (c.done / c.total) * 100 + "%" }} /></div>
              <div className="muted">{c.done} of {c.total} delivered</div>
            </div>
          );
        })}
        {mine.length === 0 && <div className="card muted">No sponsorships yet. Head to Matchmaking or Sponsor the Team.</div>}
      </div>
    </div>
  );
}