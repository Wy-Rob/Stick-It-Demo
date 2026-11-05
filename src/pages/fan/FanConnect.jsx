import { useState } from "react";
import { roster, FAN_EXPERIENCES, feeMultiplier, fmt } from "../../data/sampleData";
import AthleteCard from "../../components/AthleteCard";
import Photo from "../../components/Photo";

export default function FanConnect({ store }) {
  const { fanRequests, setFanRequests, notify } = store;
  const [target, setTarget] = useState(null);
  const [exp, setExp] = useState(FAN_EXPERIENCES[0].id);
  const [forWho, setForWho] = useState("");
  const [note, setNote] = useState("");

  const e = FAN_EXPERIENCES.find((x) => x.id === exp);
  const price = target ? e.price * feeMultiplier(target) : 0;

  const open = (a) => { setTarget(a); setExp(FAN_EXPERIENCES[0].id); setForWho(""); setNote(""); };

  const request = () => {
    setFanRequests((rs) => [{
      id: Date.now(), athlete: target.name, slug: target.slug, exp: e.title, price,
      forWho: forWho.trim(), note: note.trim(), status: "Requested",
    }, ...rs]);
    notify(`Request sent to ${target.name}`);
    setTarget(null);
  };

  const fulfill = (id) => setFanRequests((rs) => rs.map((r) => (r.id === id ? { ...r, status: "Delivered" } : r)));

  return (
    <div className="wrap">
      <h2>Connect with the team</h2>
      <p className="sub">A shout-out, an autograph or a few minutes together. Pick your favorite gymnast.</p>

      {fanRequests.length > 0 && (
        <>
          <div className="sec"><h3 style={{ margin: 0 }}>Your requests</h3><span className="muted">{fanRequests.length}</span></div>
          <div className="grid" style={{ marginBottom: 28 }}>
            {fanRequests.map((r) => (
              <div key={r.id} className="card ccard">
                <div className="row" style={{ justifyContent: "space-between" }}>
                  <strong>{r.exp}</strong>
                  <span className={"pill " + (r.status === "Delivered" ? "green" : "gold")}>{r.status}</span>
                </div>
                <div className="muted">From {r.athlete} · for {r.forWho} · {fmt(r.price)}</div>
                {r.note && <div className="muted">"{r.note}"</div>}
                {r.status === "Requested" && <button className="btn small" onClick={() => fulfill(r.id)}>Demo: athlete fulfills</button>}
              </div>
            ))}
          </div>
        </>
      )}

      <div className="grid">
        {roster.map((a) => (
          <AthleteCard key={a.id} a={a}>
            <div className="muted">Experiences from {fmt(20 * feeMultiplier(a))} (sample)</div>
            <button className="btn small primary" onClick={() => open(a)}>Connect</button>
          </AthleteCard>
        ))}
      </div>
      <p className="muted" style={{ marginTop: 16 }}>Sample prices. Athletes set their own, and requests follow department NIL rules. Demo checkout: no payment is taken.</p>

      {target && (
        <div className="modal-bg" onClick={() => setTarget(null)}>
          <div className="modal" onClick={(ev) => ev.stopPropagation()}>
            <div className="modal-head">
              <div className="mini-photo"><Photo src={`/images/roster/${target.slug}.jpg`} name={target.name} ratio="1 / 1" /></div>
              <div style={{ flex: 1 }}>
                <div className="name">Connect with {target.name}</div>
                <div className="muted">{target.year} · {target.hometown}</div>
              </div>
              <button className="x" onClick={() => setTarget(null)}>✕</button>
            </div>
            <div className="modal-body">
              <label>Choose an experience</label>
              {FAN_EXPERIENCES.map((x) => (
                <button key={x.id} className={"type-card" + (exp === x.id ? " on" : "")} style={{ width: "100%", marginBottom: 8 }} onClick={() => setExp(x.id)}>
                  <div className="row" style={{ justifyContent: "space-between", flexWrap: "nowrap" }}>
                    <strong>{x.title}</strong><strong>{fmt(x.price * feeMultiplier(target))}</strong>
                  </div>
                  <div className="muted">{x.desc}</div>
                </button>
              ))}
              <div className="field" style={{ marginTop: 14 }}>
                <label>Who is it for?</label>
                <input style={{ width: "100%" }} value={forWho} placeholder="Name of the fan or friend" onChange={(ev) => setForWho(ev.target.value)} />
              </div>
              <div className="field">
                <label>Anything she should know? (optional)</label>
                <textarea value={note} placeholder="A birthday, a big win, a favorite routine" onChange={(ev) => setNote(ev.target.value)} />
              </div>
            </div>
            <div className="modal-foot">
              <div>
                <div className="muted">Total</div>
                <div className="name" style={{ fontSize: 24 }}>{fmt(price)}</div>
              </div>
              <div className="row">
                <button className="btn" onClick={() => setTarget(null)}>Cancel</button>
                <button className="btn primary" disabled={!forWho.trim()} onClick={request}>Send request</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}