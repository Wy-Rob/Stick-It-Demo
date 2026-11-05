import { useState } from "react";
import { athletes, BUSINESS, ORGANIZER, fmt } from "../../data/sampleData";
import Thread from "../../components/Thread";

export default function MySponsorships({ store }) {
  const { contracts, teamDeals, setTeamDeals, goto } = store;
  const [open, setOpen] = useState(null);
  const mine = contracts.filter((c) => c.sponsor === BUSINESS.name);
  const delivered = mine.reduce((s, c) => s + c.done, 0);
  const scans = 40 * (mine.length + teamDeals.length) + 25 * delivered;
  const redemptions = Math.round(scans * 0.14);

  const update = (id, fn) => setTeamDeals((ds) => ds.map((d) => (d.id === id ? fn(d) : d)));
  const send = (id, text) => {
    update(id, (d) => ({ ...d, messages: [...d.messages, { from: "me", text }] }));
    setTimeout(() => update(id, (d) => ({
      ...d,
      status: d.status === "Inquiry sent" ? "In conversation" : d.status,
      messages: [...d.messages, { from: "organizer", text: "(Demo reply) Thanks! I'll check with the team and follow up." }],
    })), 1400);
  };
  const confirm = (id) => update(id, (d) => ({
    ...d, status: "Confirmed", messages: [...d.messages, { from: "system", text: "The organizer confirmed the plan" }],
  }));

  return (
    <div className="wrap">
      <h2>My Sponsorships</h2>
      <p className="sub">Your team partnerships and athlete deals in one place (results are sample data).</p>

      <div className="stats">
        <div className="stat"><b>{teamDeals.length}</b><span>Team partnerships</span></div>
        <div className="stat"><b>{mine.length}</b><span>Athlete partnerships</span></div>
        <div className="stat"><b>{scans}</b><span>QR scans (sample)</span></div>
        <div className="stat"><b>{redemptions}</b><span>Redemptions (sample)</span></div>
      </div>

      <div className="sec"><h3 style={{ margin: 0 }}>Team partnerships</h3><span className="muted">{teamDeals.length}</span></div>
      <div className="grid">
        {teamDeals.map((d) => (
          <div key={d.id} className="card ccard">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <strong style={{ fontSize: 17 }}>{d.type}</strong>
              <span className={"pill " + (d.status === "Confirmed" ? "green" : "gold")}>{d.status}</span>
            </div>
            <div className="muted">Budget: {d.budget} · Timing: {d.timeline}</div>
            <div className="muted">With: {ORGANIZER.name}</div>
            <div className="row">
              <button className="btn small primary" onClick={() => setOpen(open === d.id ? null : d.id)}>Messages ({d.messages.length})</button>
              {d.status !== "Confirmed" && <button className="btn small" onClick={() => confirm(d.id)}>Demo: organizer confirms</button>}
            </div>
            {open === d.id && <Thread messages={d.messages} onSend={(t) => send(d.id, t)} placeholder="Message the organizer" />}
          </div>
        ))}
        {teamDeals.length === 0 && (
          <div className="card muted">
            No team partnerships yet. <button className="linkbtn" onClick={() => goto("Sponsor the Team")}>Start one</button>
          </div>
        )}
      </div>

      <div className="sec"><h3 style={{ margin: 0 }}>Athlete partnerships</h3><span className="muted">{mine.length}</span></div>
      <div className="grid">
        {mine.map((c) => {
          const a = athletes.find((x) => x.id === c.athleteId);
          return (
            <div key={c.id} className="card deal">
              <div className="head"><strong>{a ? a.name : "Athlete"}</strong><span className="pill">{c.status}</span></div>
              <div className="muted">{c.obligation} · {c.type} · {fmt(c.amount)}</div>
              <div className="progress"><i style={{ width: (c.done / c.total) * 100 + "%" }} /></div>
              <div className="muted">{c.done} of {c.total} delivered</div>
            </div>
          );
        })}
        {mine.length === 0 && <div className="card muted">No athlete deals yet. Head to Matchmaking to make an offer.</div>}
      </div>
    </div>
  );
}