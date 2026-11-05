import { useState } from "react";
import { ME, organization, CATEGORIES, PLATFORMS, estimateWorth, fmt } from "../../data/sampleData";
import Avatar from "../../components/Avatar";

const n = (v) => Number(v).toLocaleString();

export default function MyProfile({ store }) {
  const { profile, setProfile, notify } = store;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);

  const startEdit = () => { setDraft(profile); setEditing(true); };
  const cancel = () => setEditing(false);
  const save = () => { setProfile(draft); setEditing(false); notify("Profile saved"); };

  const toggleInterest = (c) =>
    setDraft((d) => ({
      ...d,
      interests: d.interests.includes(c) ? d.interests.filter((x) => x !== c) : [...d.interests, c],
    }));
  const setFollowers = (key, v) =>
    setDraft((d) => ({ ...d, followers: { ...d.followers, [key]: Math.max(0, Number(v) || 0) } }));
  const onPhoto = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) setDraft((d) => ({ ...d, photo: URL.createObjectURL(f) }));
  };

  const shown = editing ? draft : profile;
  const est = estimateWorth(shown.followers);
  const photo = shown.photo || `/images/roster/${ME.slug}.jpg`;
  const maxF = Math.max(1, ...PLATFORMS.map((p) => shown.followers[p.key] || 0));

  return (
    <div className="wrap">
      <div className="profile-head">
        <Avatar name={ME.name} size={120} src={photo} />
        <div style={{ flex: 1 }}>
          <h2 style={{ marginBottom: 6, fontSize: 34 }}>{ME.name}</h2>
          <span className="pill red">{organization.name} Circle</span>
          <div className="muted">{ME.year} · {ME.hometown}</div>
        </div>
        <div className="row">
          {!editing && <button className="btn small primary" onClick={startEdit}>Edit profile</button>}
          {editing && (
            <>
              <label className="btn small" style={{ cursor: "pointer", margin: 0 }}>
                Change photo
                <input type="file" accept="image/*" onChange={onPhoto} style={{ display: "none" }} />
              </label>
              <button className="btn small" onClick={cancel}>Cancel</button>
              <button className="btn small primary" onClick={save}>Save</button>
            </>
          )}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <h3 style={{ marginTop: 0 }}>About</h3>
        {editing
          ? <textarea value={draft.about} placeholder="A short intro for sponsors" onChange={(e) => setDraft({ ...draft, about: e.target.value })} />
          : <p className="muted">{profile.about || "Add a short intro so sponsors get to know you."}</p>}
        <p className="muted" style={{ marginTop: 8 }}>Height {ME.height} · Last school {ME.lastSchool}</p>

        <h3>My story</h3>
        {editing
          ? <textarea value={draft.story} placeholder="Tell your story in your own words" onChange={(e) => setDraft({ ...draft, story: e.target.value })} />
          : <p className="muted">{profile.story || "Tell your story in your own words. Sponsors read this first."}</p>}

        <h3>Open to</h3>
        {editing ? (
          <div className="chips" style={{ marginBottom: 0 }}>
            {CATEGORIES.map((c) => (
              <button key={c} className={"chip" + (draft.interests.includes(c) ? " on" : "")} onClick={() => toggleInterest(c)}>{c}</button>
            ))}
          </div>
        ) : (
          <div>
            {profile.interests.length === 0 && <span className="muted">Pick the kinds of partners you'd like.</span>}
            {profile.interests.map((i) => <span key={i} className="pill red">{i} partnerships</span>)}
          </div>
        )}
      </div>

      <div className="two">
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Your reach</h3>
          <p className="muted">Total audience: <strong style={{ color: "#111" }}>{n(est.reach)}</strong></p>
          {PLATFORMS.map((p) => (
            <div key={p.key} className="reach-row">
              <span>{p.label}</span>
              <div className="progress"><i style={{ width: ((shown.followers[p.key] || 0) / maxF) * 100 + "%" }} /></div>
              {editing
                ? <input type="number" min="0" value={draft.followers[p.key]} onChange={(e) => setFollowers(p.key, e.target.value)} />
                : <strong style={{ textAlign: "right" }}>{n(shown.followers[p.key] || 0)}</strong>}
            </div>
          ))}
          <p className="muted" style={{ marginTop: 10 }}>
            Sample numbers. Athletes enter their own follower counts{editing ? ", and the estimate updates as you type." : "."}
          </p>
        </div>

        <div className="worth">
          <div className="muted">Estimated value of one sponsored post on each platform</div>
          <div className="big">{fmt(est.low)} to {fmt(est.high)}</div>
          <p className="muted" style={{ marginTop: 6 }}>Midpoint {fmt(est.perPost)} · about {fmt(est.monthly)} a month at four posts</p>
          <div style={{ marginTop: 16 }}>
            {PLATFORMS.map((p) => (
              <div key={p.key} className="row" style={{ justifyContent: "space-between", padding: "5px 0", borderTop: "1px solid rgba(255,255,255,.18)" }}>
                <span>{p.label}</span>
                <strong>{fmt(Math.round(((shown.followers[p.key] || 0) / 1000) * p.rate))}</strong>
              </div>
            ))}
          </div>
          <p className="muted" style={{ marginTop: 14, fontSize: 12 }}>
            Demo estimate: followers divided by 1,000, times a sample rate per platform (Instagram $8, TikTok $6, YouTube $10, X $3), shown as a range of 0.6x to 1.5x. Real value also depends on engagement and the sponsor, so this is a starting baseline, not a guarantee.
          </p>
        </div>
      </div>
    </div>
  );
}