import { useState } from "react";
import { fmt, paidOf, ME } from "../../data/sampleData";

const addMsg = (c, from, text) => ({ ...c, messages: [...(c.messages || []), { from, text }] });

function Thread({ c, onSend }) {
  const [text, setText] = useState("");
  const msgs = c.messages || [];
  const go = () => {
    const t = text.trim();
    if (!t) return;
    onSend(c.id, t);
    setText("");
  };
  return (
    <div className="thread">
      <div className="msgs">
        {msgs.length === 0 && <div className="muted">No messages yet.</div>}
        {msgs.map((m, i) => <div key={i} className={"msg " + m.from}>{m.text}</div>)}
      </div>
      <div className="row" style={{ flexWrap: "nowrap" }}>
        <input style={{ flex: 1 }} value={text} placeholder="Write a message"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && go()} />
        <button className="btn small primary" onClick={go}>Send</button>
      </div>
    </div>
  );
}

export default function Contracts({ store }) {
  const { contracts, setContracts, notify } = store;
  const mine = contracts.filter((c) => c.athleteId === ME.id);
  const [chatOpen, setChatOpen] = useState(null);
  const [counterFor, setCounterFor] = useState(null);
  const [amt, setAmt] = useState("");
  const [note, setNote] = useState("");

  const update = (id, fn) => setContracts((cs) => cs.map((c) => (c.id === id ? fn(c) : c)));

  const active = mine.filter((c) => c.status === "Active");
  const offers = mine.filter((c) => c.status === "Pending" || c.status === "Countered");
  const finished = mine.filter((c) => c.status === "Complete");
  const todos = active.filter((c) => c.done < c.total);
  const newOffers = mine.filter((c) => c.status === "Pending").length;

  const deliver = (id) => {
    update(id, (c) => {
      const done = Math.min(c.total, c.done + 1);
      return { ...c, done, status: done >= c.total ? "Complete" : "Active" };
    });
    notify("Deliverable submitted. Earnings updated.");
  };

  const accept = (id) => {
    update(id, (c) => addMsg({ ...c, status: "Active" }, "system", "Offer accepted"));
    notify("Offer accepted");
  };

  const decline = (id) => {
    update(id, (c) => addMsg({ ...c, status: "Declined" }, "system", "Offer declined"));
    notify("Offer declined");
  };

  const openCounter = (c) => { setCounterFor(c.id); setAmt(String(c.amount)); setNote(""); };

  const sendCounter = (id) => {
    const value = Math.max(0, Number(amt) || 0);
    update(id, (c) => addMsg({ ...c, status: "Countered", counter: value }, "athlete",
      `Counter offer: ${fmt(value)}${note.trim() ? ". " + note.trim() : ""}`));
    setCounterFor(null);
    notify("Counter offer sent");
    setTimeout(() => update(id, (c) => addMsg(c, "sponsor", "(Demo reply) Thanks, we're reviewing your counter.")), 1500);
  };

  const sponsorAccepts = (id) => {
    update(id, (c) => addMsg({ ...c, amount: c.counter ?? c.amount, status: "Active", counter: undefined },
      "system", "Sponsor accepted your counter"));
    notify("Counter accepted (demo)");
  };

  const send = (id, text) => {
    update(id, (c) => addMsg(c, "athlete", text));
    setTimeout(() => update(id, (c) => addMsg(c, "sponsor", "(Demo reply) Thanks, got your message.")), 1400);
  };

  const toggleChat = (id) => setChatOpen(chatOpen === id ? null : id);

  return (
    <div className="wrap">
      <h2>Contracts and offers</h2>
      <p className="sub">Everything you owe, everything on the table, in one place.</p>

      <div className="stats" style={{ marginTop: 0 }}>
        <div className="stat"><b>{todos.length}</b><span>To do</span></div>
        <div className="stat"><b>{newOffers}</b><span>New offers</span></div>
        <div className="stat"><b>{active.length}</b><span>Active deals</span></div>
      </div>

      <div className="card todo">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h3 style={{ margin: 0 }}>To do</h3>
          <span className="pill red">{todos.length} open</span>
        </div>
        {todos.length === 0 && <p className="muted" style={{ marginTop: 10 }}>You're all caught up.</p>}
        {todos.map((c) => (
          <div key={c.id} className="todo-row">
            <div>
              <strong>{c.obligation}</strong>
              <div className="muted">{c.sponsor} · due {c.due} · {c.total - c.done} left</div>
            </div>
            <button className="btn small primary" onClick={() => deliver(c.id)}>Mark done</button>
          </div>
        ))}
      </div>

      <div className="sec"><h3 style={{ margin: 0 }}>Active deals</h3><span className="muted">{active.length}</span></div>
      <div className="grid">
        {active.map((c) => (
          <div key={c.id} className="card ccard">
            <div className="row" style={{ justifyContent: "space-between" }}>
              <strong style={{ fontSize: 17 }}>{c.sponsor}</strong>
              <span className="pill">{c.type}</span>
            </div>
            <div className="muted">{c.obligation} · due {c.due}</div>
            <div className="progress"><i style={{ width: (c.done / c.total) * 100 + "%" }} /></div>
            <div className="muted">{c.done} of {c.total} delivered · {fmt(paidOf(c))} of {fmt(c.amount)}{c.type === "Product" ? " in value" : " paid"}</div>
            <div className="row">
              <button className="btn small primary" onClick={() => deliver(c.id)}>Mark one done</button>
              <button className="btn small" onClick={() => toggleChat(c.id)}>Messages ({(c.messages || []).length})</button>
            </div>
            {chatOpen === c.id && <Thread c={c} onSend={send} />}
          </div>
        ))}
        {active.length === 0 && <div className="card muted">No active deals yet. Accept an offer below to get started.</div>}
      </div>

      <div className="sec"><h3 style={{ margin: 0 }}>Offers and messages</h3><span className="muted">{offers.length}</span></div>
      <div className="grid">
        {offers.map((c) => {
          const waiting = c.status === "Countered";
          return (
            <div key={c.id} className={"card ccard " + (waiting ? "wait" : "offer")}>
              <div className="row" style={{ justifyContent: "space-between" }}>
                <strong style={{ fontSize: 17 }}>{c.sponsor}</strong>
                <span className={"pill " + (waiting ? "" : "gold")}>{waiting ? "Waiting on sponsor" : "New offer"}</span>
              </div>
              <div className="big" style={{ fontSize: 30 }}>
                {fmt(waiting ? c.counter : c.amount)}{c.type === "Product" ? " value" : ""}
              </div>
              {waiting && <div className="muted">Your counter. Their offer was {fmt(c.amount)}.</div>}
              <div className="muted">{c.obligation} · due {c.due} · {c.type}</div>

              {!waiting && counterFor !== c.id && (
                <div className="row">
                  <button className="btn small primary" onClick={() => accept(c.id)}>Accept</button>
                  <button className="btn small" onClick={() => openCounter(c)}>Counter</button>
                  <button className="btn small" onClick={() => decline(c.id)}>Decline</button>
                  <button className="btn small" onClick={() => toggleChat(c.id)}>Messages ({(c.messages || []).length})</button>
                </div>
              )}

              {counterFor === c.id && (
                <div className="counter-form">
                  <div><label>Your price ($)</label><input type="number" min="0" style={{ width: "100%" }} value={amt} onChange={(e) => setAmt(e.target.value)} /></div>
                  <div><label>Note (optional)</label><input style={{ width: "100%" }} value={note} placeholder="e.g. Can we do 3 posts instead?" onChange={(e) => setNote(e.target.value)} /></div>
                  <div className="row">
                    <button className="btn small primary" onClick={() => sendCounter(c.id)}>Send counter</button>
                    <button className="btn small" onClick={() => setCounterFor(null)}>Cancel</button>
                  </div>
                </div>
              )}

              {waiting && (
                <div className="row">
                  <button className="btn small" onClick={() => toggleChat(c.id)}>Messages ({(c.messages || []).length})</button>
                  <button className="btn small" onClick={() => sponsorAccepts(c.id)}>Demo: sponsor accepts</button>
                </div>
              )}

              {chatOpen === c.id && <Thread c={c} onSend={send} />}
            </div>
          );
        })}
        {offers.length === 0 && <div className="card muted">No open offers right now.</div>}
      </div>

      {finished.length > 0 && (
        <>
          <div className="sec"><h3 style={{ margin: 0 }}>Completed</h3><span className="muted">{finished.length}</span></div>
          <div className="grid">
            {finished.map((c) => (
              <div key={c.id} className="card ccard wait">
                <div className="row" style={{ justifyContent: "space-between" }}>
                  <strong>{c.sponsor}</strong><span className="pill green">Complete</span>
                </div>
                <div className="muted">{c.obligation} · {fmt(c.amount)}{c.type === "Product" ? " value" : " paid"}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}