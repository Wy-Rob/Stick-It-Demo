import { useState } from "react";
import { athletes, BUSINESS, packages, fmt } from "../../data/sampleData";

export default function SponsorTeam({ store }) {
  const { setContracts, notify, goto } = store;
  const [mode, setMode] = useState("cash");
  const [item, setItem] = useState("Free smoothies for the team");
  const [value, setValue] = useState(1000);

  const start = (total) => {
    const share = Math.round(total / athletes.length);
    setContracts((cs) => [
      ...cs,
      ...athletes.map((a, i) => ({
        id: Date.now() + i, athleteId: a.id, sponsor: BUSINESS.name,
        type: mode === "cash" ? "Cash" : "Product", amount: share, total: 2, done: 0,
        obligation: mode === "cash" ? "2 team posts" : "Feature: " + item,
        due: "Feb 15", status: "Active",
      })),
    ]);
    notify(`Sponsorship started · ${fmt(share)} per athlete`);
    goto("My Sponsorships");
  };

  return (
    <div className="wrap">
      <h2>Sponsor the Team</h2>
      <p className="sub">One purchase supports every athlete, split evenly.</p>

      <div className="toggle">
        <button className={mode === "cash" ? "on" : ""} onClick={() => setMode("cash")}>Cash</button>
        <button className={mode === "product" ? "on" : ""} onClick={() => setMode("product")}>Products</button>
      </div>

      {mode === "cash" ? (
        <div className="grid">
          {packages.map((p) => (
            <div key={p.id} className="card deal">
              <strong style={{ fontSize: 18 }}>{p.name}</strong>
              <div className="big" style={{ fontSize: 36, color: "#fff" }}>{fmt(p.price)}</div>
              <div className="muted">{p.includes}</div>
              <div className="muted">≈ {fmt(Math.round(p.price / athletes.length))} per athlete</div>
              <button className="btn primary" onClick={() => start(p.price)}>Sponsor the team</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="card deal" style={{ maxWidth: 520 }}>
          <div><label>What will you provide?</label><input style={{ width: "100%" }} value={item} onChange={(e) => setItem(e.target.value)} /></div>
          <div><label>Estimated value ($)</label><input type="number" value={value} onChange={(e) => setValue(e.target.value)} /></div>
          <div className="muted">Shared across {athletes.length} athletes.</div>
          <button className="btn primary" onClick={() => start(Number(value) || 0)}>Sponsor with products</button>
        </div>
      )}
    </div>
  );
}