import { useState } from "react";
import Photo from "./Photo";
import { DELIVERABLES, GOALS, feeMultiplier, fmt } from "../data/sampleData";

const DUE = ["Jan 15", "Feb 1", "Feb 15", "Mar 1"];

export default function OfferModal({ a, business, onClose, onSend }) {
  const mult = feeMultiplier(a);
  const [type, setType] = useState("Cash");
  const [qty, setQty] = useState({ post: 1 });
  const [goal, setGoal] = useState(GOALS[0]);
  const [due, setDue] = useState(DUE[1]);
  const [product, setProduct] = useState("");
  const [custom, setCustom] = useState("");
  const [msg, setMsg] = useState("");

  const change = (id, d) => setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(10, (q[id] || 0) + d)) }));
  const items = DELIVERABLES.filter((d) => (qty[d.id] || 0) > 0);
  const count = items.reduce((s, d) => s + qty[d.id], 0);
  const suggested = Math.round(items.reduce((s, d) => s + qty[d.id] * d.price * mult, 0));
  const amount = custom === "" ? suggested : Math.max(0, Number(custom) || 0);
  const ok = count > 0 && amount > 0 && (type === "Cash" || product.trim());

  const send = () => {
    const list = items.map((d) => `${qty[d.id]} ${d.label}${qty[d.id] > 1 ? "s" : ""}`).join(", ");
    const obligation = type === "Product" ? `${list} for ${product.trim()}` : list;
    const text = `Goal: ${goal}.${msg.trim() ? " " + msg.trim() : ""}`;
    onSend({ type, amount, total: count, obligation, due, messages: [{ from: "sponsor", text }] });
  };

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div className="mini-photo"><Photo src={`/images/roster/${a.slug}.jpg`} name={a.name} ratio="1 / 1" /></div>
          <div style={{ flex: 1 }}>
            <div className="name">Make an offer to {a.name}</div>
            <div className="muted">{a.year} · {a.hometown}</div>
            <div className="muted">From {business.name}</div>
          </div>
          <button className="x" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <label>How will you support her?</label>
          <div className="seg" style={{ marginBottom: 18 }}>
            <button type="button" className={type === "Cash" ? "on" : ""} onClick={() => setType("Cash")}>Cash</button>
            <button type="button" className={type === "Product" ? "on" : ""} onClick={() => setType("Product")}>Products</button>
          </div>

          <label>What you're looking for (pick any)</label>
          {DELIVERABLES.map((d) => (
            <div key={d.id} className="qty-row">
              <div>
                <strong>{d.label}</strong>
                <div className="muted">{fmt(d.price * mult)} each (sample fee)</div>
              </div>
              <div className="qty">
                <button type="button" onClick={() => change(d.id, -1)}>−</button>
                <span>{qty[d.id] || 0}</span>
                <button type="button" onClick={() => change(d.id, 1)}>+</button>
              </div>
            </div>
          ))}

          <label style={{ marginTop: 16 }}>Your goal</label>
          <div className="chips" style={{ margin: "0 0 14px" }}>
            {GOALS.map((g) => (
              <button type="button" key={g} className={"chip" + (goal === g ? " on" : "")} onClick={() => setGoal(g)}>{g}</button>
            ))}
          </div>

          {type === "Product" && (
            <div className="field">
              <label>What will you provide?</label>
              <input style={{ width: "100%" }} value={product} placeholder="e.g. Free smoothies for the season" onChange={(e) => setProduct(e.target.value)} />
            </div>
          )}

          <div className="two" style={{ gap: 12 }}>
            <div className="field">
              <label>{type === "Cash" ? "Your offer ($)" : "Estimated product value ($)"}</label>
              <input type="number" min="0" style={{ width: "100%" }} value={custom === "" ? suggested : custom} onChange={(e) => setCustom(e.target.value)} />
              <div className="muted" style={{ marginTop: 4 }}>Suggested for this selection: {fmt(suggested)}</div>
            </div>
            <div className="field">
              <label>Needed by</label>
              <select style={{ width: "100%" }} value={due} onChange={(e) => setDue(e.target.value)}>
                {DUE.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div className="field">
            <label>Message (optional)</label>
            <textarea value={msg} placeholder="Tell her a little about your business and what you have in mind" onChange={(e) => setMsg(e.target.value)} />
          </div>
        </div>

        <div className="modal-foot">
          <div>
            <div className="muted">Total offer</div>
            <div className="name" style={{ fontSize: 24 }}>{fmt(amount)}{type === "Product" ? " in value" : ""}</div>
          </div>
          <div className="row">
            <button className="btn" onClick={onClose}>Cancel</button>
            <button className="btn primary" disabled={!ok} onClick={send}>Send offer</button>
          </div>
        </div>
      </div>
    </div>
  );
}