import { useState } from "react";
import { roster, BUSINESS, TEAM_TYPES, ORGANIZER, BUDGETS, TIMELINES } from "../../data/sampleData";
import Photo from "../../components/Photo";
import Snap from "../../components/Snap";

export default function SponsorTeam({ store }) {
  const { setTeamDeals, notify, goto } = store;
  const [type, setType] = useState(TEAM_TYPES[0].id);
  const [details, setDetails] = useState("");
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [timeline, setTimeline] = useState(TIMELINES[0]);
  const chosen = TEAM_TYPES.find((t) => t.id === type);

  const send = () => {
    const id = Date.now();
    const summary = `${chosen.title}. Budget: ${budget}. Timing: ${timeline}.`;
    setTeamDeals((ds) => [...ds, {
      id, sponsor: BUSINESS.name, type: chosen.title, budget, timeline, status: "Inquiry sent",
      messages: [
        { from: "me", text: `${summary} ${details.trim()}` },
        { from: "system", text: "Sent to the team organizer" },
      ],
    }]);
    setTimeout(() => setTeamDeals((ds) => ds.map((d) => d.id === id ? {
      ...d, status: "In conversation",
      messages: [...d.messages, { from: "organizer", text: "(Demo reply) Thanks for reaching out! I'll go over this with the team and follow up with a few options." }],
    } : d)), 2500);
    notify("Sent to the team organizer");
    goto("My Sponsorships");
    window.scrollTo(0, 0);
  };

  return (
    <>
      <section className="sponsor-hero">
        <span className="tag">Partner with Utah Red Rocks Gymnastics</span>
        <h1>Who rocks the house?</h1>
        <p>With you behind them, they do. Every partner, big or small, helps power the team on and off the floor.</p>
        <a href="#partner"><button className="btn primary big-btn">Start a partnership</button></a>
      </section>

      <div className="strip-wrap">
        <div className="strip">
          {roster.map((a) => (
            <div key={a.slug}>
              <Photo src={`/images/roster/${a.slug}.jpg`} name={a.name} />
              <div className="strip-name">{a.name}</div>
            </div>
          ))}
        </div>
      </div>

      <section className="pattern-bg anchor" id="partner">
        <div className="wrap">
          <h2>How would you like to support the team?</h2>
          <p className="sub">Pick what fits, tell us a little more, and the team organizer will take it from there.</p>

          <div className="grid" style={{ marginBottom: 14 }}>
            {TEAM_TYPES.map((t) => (
              <button key={t.id} className={"type-card" + (type === t.id ? " on" : "")} onClick={() => setType(t.id)}>
                <strong>{t.title}</strong>
                <div className="muted">{t.desc}</div>
              </button>
            ))}
          </div>

          <div className="form-row">
            <div className="card">
              <div className="org">
                <div className="org-badge">RR</div>
                <div>
                  <strong>{ORGANIZER.name}</strong> <span className="pill">Sample contact</span>
                  <div className="muted">{ORGANIZER.role}. They coordinate everything between you and the team.</div>
                </div>
              </div>

              <div className="form-cols">
                <div className="field">
                  <label>Tell the organizer about your idea ({chosen.title.toLowerCase()})</label>
                  <textarea value={details} placeholder="What would you like to do, and what does your business hope to get out of it?" onChange={(e) => setDetails(e.target.value)} />
                </div>
                <div>
                  <div className="field"><label>Rough budget</label>
                    <select style={{ width: "100%" }} value={budget} onChange={(e) => setBudget(e.target.value)}>{BUDGETS.map((b) => <option key={b}>{b}</option>)}</select></div>
                  <div className="field"><label>Timing</label>
                    <select style={{ width: "100%" }} value={timeline} onChange={(e) => setTimeline(e.target.value)}>{TIMELINES.map((t) => <option key={t}>{t}</option>)}</select></div>
                  <button className="btn primary" style={{ width: "100%" }} disabled={!details.trim()} onClick={send}>Send to the team organizer</button>
                </div>
              </div>

              <p className="muted" style={{ marginTop: 10 }}>
                Prefer to work with specific athletes? <button className="linkbtn" onClick={() => goto("Matchmaking")}>Find your match</button>
              </p>
            </div>

            <div className="media-slot">
              <Snap n={3} />
              <div className="media-cap">Red Rocks in the community</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}