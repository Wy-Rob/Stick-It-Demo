import { athletes, organization, paidOf, fmt } from "../../data/sampleData";
import Avatar from "../../components/Avatar";

export default function MyProfile({ store }) {
  const me = athletes[0];
  const mine = store.contracts.filter((c) => c.athleteId === me.id);
  const earned = mine.filter((c) => c.type === "Cash").reduce((s, c) => s + paidOf(c), 0);
  return (
    <div className="wrap">
      <div className="cover" />
      <div className="profile-head">  
        <Avatar name={me.name} size={120} src="/images/athlete-1.jpg" />
        <div style={{ flex: 1, paddingBottom: 6 }}>
          <h2 style={{ marginBottom: 4 }}>{me.name}</h2>
          <span className="pill red">{organization.name} Circle</span>
          <span className="pill green">Verified</span>
          <div className="muted">{me.year} · {me.event} · {me.hometown}</div>
        </div>
        <div className="row">
          <button className="btn small" onClick={() => store.notify("Media kit link copied (demo)")}>Share media kit</button>
          <button className="btn small primary" onClick={() => store.notify("Profile editing coming soon (demo)")}>Edit profile</button>
        </div>
      </div>

      <div className="stats">
        <div className="stat"><b>{(me.followers / 1000).toFixed(1)}K</b><span>Followers (sample)</span></div>
        <div className="stat"><b>{mine.length}</b><span>Deals</span></div>
        <div className="stat"><b>{fmt(earned)}</b><span>Earned so far</span></div>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>My story</h3>
        <p>{me.story}</p>
        <h3>Brand pillars</h3>
        <div>{me.pillars.map((p) => <span key={p} className="pill red">{p}</span>)}</div>
        <h3>Open to</h3>
        <div>{me.interests.map((i) => <span key={i} className="pill">{i} partnerships</span>)}</div>
      </div>
    </div>
  );
}