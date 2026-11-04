import { ME, organization, paidOf, fmt } from "../../data/sampleData";
import Avatar from "../../components/Avatar";

export default function MyProfile({ store }) {
  const mine = store.contracts.filter((c) => c.athleteId === ME.id);
  const earned = mine.filter((c) => c.type === "Cash").reduce((s, c) => s + paidOf(c), 0);

  return (
    <div className="wrap">
      <div className="cover" />
      <div className="profile-head">
        <Avatar name={ME.name} size={120} src={`/images/roster/${ME.slug}.jpg`} />
        <div style={{ flex: 1, paddingBottom: 6 }}>
          <h2 style={{ marginBottom: 4 }}>{ME.name}</h2>
          <span className="pill red">{organization.name} Circle</span>
          <div className="muted">{ME.year} · {ME.hometown}</div>
        </div>
        <div className="row">
          <button className="btn small" onClick={() => store.notify("Media kit link copied (demo)")}>Share media kit</button>
          <button className="btn small primary" onClick={() => store.notify("Profile editing coming soon (demo)")}>Edit profile</button>
        </div>
      </div>

      <div className="stats">
        <div className="stat"><b>{ME.year}</b><span>Year</span></div>
        <div className="stat"><b>{mine.length}</b><span>Deals (sample)</span></div>
        <div className="stat"><b>{fmt(earned)}</b><span>Earned so far (sample)</span></div>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>About</h3>
        <p className="muted">Height {ME.height} · Last school {ME.lastSchool}</p>

        <h3>My story</h3>
        <p className="muted">
          Sample layout only. In the live product, {ME.name.split(" ")[0]} writes her own story here, or builds it
          with the AI helper from a short interview.
        </p>

        <h3>Open to (sample tags)</h3>
        <div>{ME.interests.map((i) => <span key={i} className="pill red">{i} partnerships</span>)}</div>
      </div>
    </div>
  );
}