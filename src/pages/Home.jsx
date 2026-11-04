import { useState } from "react";
import { athletes, contracts, fmt } from "../data/sampleData";
import AthleteCard from "../components/AthleteCard";

export default function Home({ onSignIn }) {
  const [event, setEvent] = useState("All");
  const events = ["All", ...new Set(athletes.map((a) => a.event))];
  const shown = athletes.filter((a) => event === "All" || a.event === event);
  const committed = contracts.reduce((s, c) => s + c.amount, 0);

  return (
    <>
      <div className="hero-photo">
        <span className="tag">Red Rocks · NIL Platform</span>
        <h1 style={{ marginTop: 18 }}>Rock the house.<br /><em>Get paid for it.</em></h1>
        <p>Every gymnast gets a professional profile. Local businesses get matched, or back the whole team. Athletes get paid.</p>
        <div className="row center">
          <button className="btn primary" onClick={onSignIn}>Sign in</button>
          <a href="#circle"><button className="btn light">Meet the Circle</button></a>
        </div>
      </div>

      <div className="wrap">
        <div className="stats">
          <div className="stat"><b>{athletes.length}</b><span>Athletes in the Circle (sample)</span></div>
          <div className="stat"><b>{contracts.length}</b><span>Active deals (sample)</span></div>
          <div className="stat"><b>{fmt(committed)}</b><span>Committed to athletes (sample)</span></div>
        </div>

        <h2 id="circle">The Red Rocks Circle</h2>
        <p className="sub">Every athlete joins automatically when their profile is created.</p>
        <div className="chips">
          {events.map((e) => (
            <button key={e} className={"chip" + (event === e ? " on" : "")} onClick={() => setEvent(e)}>{e}</button>
          ))}
        </div>
        <div className="grid">
          {shown.map((a) => <AthleteCard key={a.id} a={a} />)}
        </div>

        <h2 style={{ marginTop: 60 }}>How it works</h2>
        <p className="sub">Three steps from fan to paycheck.</p>
        <div className="grid">
          <div className="card step" data-n="1"><h3 style={{ marginTop: 0 }}>Athletes tell their story</h3><p className="muted">Profile, brand pillars and what they are open to. Added to the Circle instantly.</p></div>
          <div className="card step" data-n="2"><h3 style={{ marginTop: 0 }}>Businesses match or back the team</h3><p className="muted">Ranked matches by category and location, or one package that supports every athlete.</p></div>
          <div className="card step" data-n="3"><h3 style={{ marginTop: 0 }}>Deliverables tracked, athletes paid</h3><p className="muted">Reminders, status and earnings in one place.</p></div>
        </div>
      </div>
    </>
  );
}