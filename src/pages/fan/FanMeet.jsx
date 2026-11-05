import { useState } from "react";
import { roster, BUSINESS, MEET_ACTIONS, fmt } from "../../data/sampleData";
import Qr from "../../components/Qr";

const line = (i) =>
  i.type === "screen" ? i.text
  : i.type === "shoutout" ? `Shout-out: ${i.text}`
  : i.type === "song" ? `Song request: ${i.text}`
  : `Cheering for ${i.who}!`;

export default function FanMeet({ store }) {
  const { meetItems, setMeetItems, notify } = store;
  const [action, setAction] = useState(MEET_ACTIONS[0].id);
  const [text, setText] = useState("");
  const [who, setWho] = useState(roster[0].name);
  const a = MEET_ACTIONS.find((x) => x.id === action);
  const approved = meetItems.filter((i) => i.status === "approved").slice(-3);
  const pending = meetItems.filter((i) => i.status === "pending");
  const ok = a.kind === "athlete" || text.trim();

  const submit = () => {
    setMeetItems((xs) => [...xs, { id: Date.now(), type: a.id, text: text.trim(), who, price: a.price, status: "pending" }]);
    setText("");
    notify("Sent for approval");
  };
  const set = (id, status) => setMeetItems((xs) => xs.map((i) => (i.id === id ? { ...i, status } : i)));

  return (
    <div className="wrap">
      <h2>At the meet</h2>
      <p className="sub">Scan the code on the big screen and be part of the night.</p>

      <div className="two" style={{ alignItems: "start" }}>
        <div>
          <div className="bigscreen">
            <div className="row" style={{ justifyContent: "space-between", flexWrap: "nowrap" }}>
              <div>
                <div style={{ fontSize: 13, letterSpacing: ".12em", textTransform: "uppercase", opacity: .8 }}>Utah Red Rocks</div>
                <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: -1 }}>Scan to join the fun</div>
              </div>
              <div className="qrbox"><Qr size={96} /></div>
            </div>
            <div className="ticker">
              {approved.length === 0 && <div className="tick">Messages from fans will show up here.</div>}
              {approved.map((i) => <div key={i.id} className="tick">{line(i)}</div>)}
            </div>
            <div style={{ fontSize: 13, opacity: .8 }}>Presented by {BUSINESS.name} (sample sponsor)</div>
          </div>
          <p className="muted" style={{ marginTop: 8 }}>Sample QR for the demo. Real codes would be unique per meet and per sponsor, so scans can be counted.</p>
        </div>

        <div className="phone">
          <strong style={{ fontSize: 18 }}>You scanned the code</strong>
          <p className="muted" style={{ margin: "4px 0 14px" }}>What would you like to do?</p>
          <div className="chips" style={{ marginBottom: 12 }}>
            {MEET_ACTIONS.map((x) => (
              <button key={x.id} className={"chip" + (action === x.id ? " on" : "")} onClick={() => setAction(x.id)}>{x.title}</button>
            ))}
          </div>
          <div className="muted" style={{ marginBottom: 10 }}>{a.desc}</div>
          {a.kind === "text" ? (
            <div className="field"><input style={{ width: "100%" }} value={text} placeholder={a.ph} maxLength={80} onChange={(e) => setText(e.target.value)} /></div>
          ) : (
            <div className="field"><select style={{ width: "100%" }} value={who} onChange={(e) => setWho(e.target.value)}>{roster.map((r) => <option key={r.id}>{r.name}</option>)}</select></div>
          )}
          <button className="btn primary" style={{ width: "100%" }} disabled={!ok} onClick={submit}>
            {a.price === 0 ? "Send for free" : `Send for ${fmt(a.price)}`}
          </button>
          <p className="muted" style={{ marginTop: 10, fontSize: 12 }}>Sample prices. Everything is reviewed before it appears. Demo checkout: no payment is taken.</p>
        </div>
      </div>

      <div className="sec"><h3 style={{ margin: 0 }}>Organizer view: waiting for approval</h3><span className="muted">{pending.length}</span></div>
      <div className="grid">
        {pending.map((i) => (
          <div key={i.id} className="card ccard offer">
            <strong>{line(i)}</strong>
            <div className="muted">{MEET_ACTIONS.find((x) => x.id === i.type).title} · {i.price ? fmt(i.price) : "Free"}</div>
            <div className="row">
              <button className="btn small primary" onClick={() => set(i.id, "approved")}>Approve</button>
              <button className="btn small" onClick={() => set(i.id, "rejected")}>Reject</button>
            </div>
          </div>
        ))}
        {pending.length === 0 && <div className="card muted">Nothing waiting. Send a message from the phone above to see it arrive here.</div>}
      </div>
    </div>
  );
}