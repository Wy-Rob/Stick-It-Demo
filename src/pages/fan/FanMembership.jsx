import { useState } from "react";
import { MEMBER_TIERS, MEMBER_EVENTS, fmt } from "../../data/sampleData";
import Snap from "../../components/Snap";

export default function FanMembership({ store }) {
  const { membership, setMembership, notify } = store;
  const [members, setMembers] = useState(500);
  const [avg, setAvg] = useState(15);
  const tier = MEMBER_TIERS.find((t) => t.id === membership);
  const annual = members * avg * 12;

  const join = (t) => { setMembership(t.id); notify(`Welcome to ${t.name}!`); };

  return (
    <div className="wrap">
      <div className="two" style={{ alignItems: "center", marginBottom: 30 }}>
        <div>
          <span className="pill red">Red Rocks Membership</span>
          <h1 style={{ fontSize: "clamp(34px,5vw,56px)", margin: "12px 0" }}>Every little Red Rocks dream.</h1>
          <p className="sub" style={{ marginBottom: 0 }}>Become a member and get closer to the team. Walk the floor, join family nights and be part of the story, all by joining the team you love.</p>
        </div>
        <Snap n={8} ratio="4 / 3" />
      </div>

      {tier && (
        <div style={{ marginBottom: 30 }}>
          <div className="memcard">
            <div className="muted" style={{ color: "rgba(255,255,255,.8)" }}>Utah Red Rocks Gymnastics</div>
            <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: -1, margin: "10px 0 4px" }}>{tier.name}</div>
            <div>Sample Member · Season 2027</div>
            <button className="btn small light" style={{ marginTop: 16 }} onClick={() => { setMembership(null); notify("Membership canceled (demo)"); }}>Cancel membership</button>
          </div>
        </div>
      )}

      <div className="grid">
        {MEMBER_TIERS.map((t) => (
          <div key={t.id} className={"card tier" + (t.pop ? " pop" : "")}>
            {t.pop && <span className="pill red">Most loved</span>}
            <strong style={{ fontSize: 22 }}>{t.name}</strong>
            <div className="muted">{t.tag}</div>
            <div className="big" style={{ fontSize: 38 }}>{fmt(t.price)}<span className="muted"> /month</span></div>
            <ul>{t.perks.map((p) => <li key={p}>{p}</li>)}</ul>
            <button className={"btn " + (membership === t.id ? "" : "primary")} disabled={membership === t.id} onClick={() => join(t)}>
              {membership === t.id ? "Your plan" : membership ? "Switch to this plan" : "Join"}
            </button>
          </div>
        ))}
      </div>
      <p className="muted" style={{ marginTop: 12 }}>
        Sample prices and perks. Floor access and events depend on what Red Rocks approves. Family memberships are held by a parent or guardian. Demo checkout: no payment is taken.
      </p>

      <h3 style={{ marginTop: 34 }}>Member events (sample)</h3>
      <div className="grid">
        {MEMBER_EVENTS.map((ev) => (
          <div key={ev.title} className="card"><strong>{ev.title}</strong><div className="muted">{ev.when}</div></div>
        ))}
      </div>

      <section className="band" style={{ marginTop: 40, borderRadius: 22 }}>
        <div className="wrap" style={{ padding: "30px 26px" }}>
          <h3 style={{ marginTop: 0 }}>What membership could mean for the program</h3>
          <p className="muted">Illustrative math to explore, not a forecast. Replace these with real figures from Red Rocks.</p>
          <div className="two" style={{ margin: "14px 0" }}>
            <div>
              <label>Members: {members.toLocaleString()}</label>
              <input type="range" min="50" max="3000" step="50" value={members} onChange={(e) => setMembers(Number(e.target.value))} style={{ width: "100%", padding: 0, border: 0 }} />
            </div>
            <div>
              <label>Average per member each month ($)</label>
              <input type="number" min="0" value={avg} onChange={(e) => setAvg(Math.max(0, Number(e.target.value) || 0))} style={{ width: "100%" }} />
            </div>
          </div>
          <div className="big">{fmt(annual)}<span className="muted" style={{ fontSize: 18 }}> a year</span></div>
          <p className="muted">{members.toLocaleString()} members × {fmt(avg)} × 12 months. Recurring support the team can plan around.</p>
        </div>
      </section>
    </div>
  );
}