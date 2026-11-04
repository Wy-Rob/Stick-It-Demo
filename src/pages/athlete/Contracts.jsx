import { fmt, paidOf, ME } from "../../data/sampleData";

export default function Contracts({ store }) {
  const { contracts, setContracts, notify } = store;
  const mine = contracts.filter((c) => c.athleteId === ME.id);

  const accept = (id) => {
    setContracts((cs) => cs.map((c) => (c.id === id ? { ...c, status: "Active" } : c)));
    notify("Deal accepted");
  };
  const deliver = (id) => {
    setContracts((cs) => cs.map((c) => {
      if (c.id !== id) return c;
      const done = Math.min(c.total, c.done + 1);
      return { ...c, done, status: done >= c.total ? "Complete" : c.status };
    }));
    notify("Deliverable submitted · earnings updated");
  };

  const alerts = [
    ...mine.filter((c) => c.status === "Pending").map((c) => ({ k: "n" + c.id, red: true, t: `New offer from ${c.sponsor} · ${fmt(c.amount)}` })),
    ...mine.filter((c) => c.status === "Active").map((c) => ({ k: "d" + c.id, red: false, t: `${c.total - c.done} deliverable(s) due ${c.due} for ${c.sponsor}` })),
  ];

  return (
    <div className="wrap">
      <h2>Contracts</h2>
      <p className="sub">Your deals, deliverables and deadlines.</p>

      {alerts.map((a) => <div key={a.k} className={"banner" + (a.red ? " red" : "")}>{a.t}</div>)}

      <h3>Your deals</h3>
      <div className="grid">
        {mine.map((c) => (
          <div key={c.id} className="card deal">
            <div className="head">
              <strong>{c.sponsor}</strong>
              <span className={"pill " + (c.status === "Complete" ? "green" : c.status === "Pending" ? "gold" : "red")}>{c.status}</span>
            </div>
            <div className="muted">{c.obligation} · due {c.due} · {c.type}</div>
            <div className="progress"><i style={{ width: (c.done / c.total) * 100 + "%" }} /></div>
            <div className="muted">{c.done} of {c.total} delivered · {fmt(paidOf(c))} of {fmt(c.amount)}{c.type === "Product" ? " in value" : " paid"}</div>
            {c.status === "Pending" && <button className="btn small primary" onClick={() => accept(c.id)}>Accept deal</button>}
            {c.status === "Active" && <button className="btn small" onClick={() => deliver(c.id)}>Mark one deliverable done</button>}
          </div>
        ))}
        {mine.length === 0 && <div className="card muted">No deals yet.</div>}
      </div>
    </div>
  );
}