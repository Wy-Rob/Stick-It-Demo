import { fmt, paidOf, ME } from "../../data/sampleData";

export default function Earnings({ store }) {
  const mine = store.contracts.filter((c) => c.athleteId === ME.id);
  const cash = mine.filter((c) => c.type === "Cash");
  const paid = cash.reduce((s, c) => s + paidOf(c), 0);
  const upcoming = cash.filter((c) => c.status === "Active").reduce((s, c) => s + (c.amount - paidOf(c)), 0);
  const pipeline = cash.filter((c) => c.status === "Pending").reduce((s, c) => s + c.amount, 0);
  const inKind = mine.filter((c) => c.type === "Product").reduce((s, c) => s + c.amount, 0);

  return (
    <div className="wrap">
      <h2>Earnings</h2>
      <p className="sub">Paid as deliverables are completed (sample data, payouts would run through the department's payment system).</p>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="muted">Paid so far</div>
        <div className="big">{fmt(paid)}</div>
      </div>

      <div className="stats">
        <div className="stat"><b>{fmt(upcoming)}</b><span>Still to earn on active deals</span></div>
        <div className="stat"><b>{fmt(pipeline)}</b><span>Pending offers</span></div>
        <div className="stat"><b>{fmt(inKind)}</b><span>In-kind product value</span></div>
      </div>

      <h3>By deal</h3>
      <div className="grid">
        {mine.map((c) => (
          <div key={c.id} className="card deal">
            <div className="head"><strong>{c.sponsor}</strong><span className="pill">{c.type}</span></div>
            <div className="progress"><i style={{ width: (c.done / c.total) * 100 + "%" }} /></div>
            <div className="muted">{fmt(paidOf(c))} of {fmt(c.amount)} · {c.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}