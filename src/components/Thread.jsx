import { useState } from "react";

export default function Thread({ messages, onSend, placeholder = "Write a message" }) {
  const [text, setText] = useState("");
  const go = () => {
    const t = text.trim();
    if (!t) return;
    onSend(t);
    setText("");
  };
  return (
    <div className="thread">
      <div className="msgs">
        {messages.length === 0 && <div className="muted">No messages yet.</div>}
        {messages.map((m, i) => <div key={i} className={"msg " + m.from}>{m.text}</div>)}
      </div>
      <div className="row" style={{ flexWrap: "nowrap" }}>
        <input style={{ flex: 1 }} value={text} placeholder={placeholder}
          onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && go()} />
        <button className="btn small primary" onClick={go}>Send</button>
      </div>
    </div>
  );
}