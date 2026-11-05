import { roster, partners, TEAM_TYPES } from "../data/sampleData";
import Photo from "../components/Photo";
import Snap from "../components/Snap";

export default function Home({ onSignIn, onBusiness, onFan }) {
  return (
    <>
      <section className="hero-full">
        <div className="nav-over">
          <span className="brand-over">Stick <span>It</span></span>
          <button className="btn small light" onClick={onSignIn}>Sign in</button>
        </div>
        <div className="hero-copy">
          <span className="tag">Utah Red Rocks Gymnastics</span>
          <h1 style={{ marginTop: 18 }}>Rock the house.</h1>
          <p>Where Red Rocks gymnasts and the businesses behind them grow together.</p>
          <button className="btn primary big-btn" onClick={onSignIn}>Get started</button>
        </div>
        <a className="scroll-hint" href="#roster">↓</a>
      </section>

      <section className="partners">
        <div className="label muted">Proud partners (sample)</div>
        <div className="partner-row">
          {partners.map((p) => <span key={p} className="partner">{p}</span>)}
        </div>
      </section>

      <section className="wrap" id="roster">
        <h2>The 2027 Red Rocks</h2>
        <p className="sub">Meet the team.</p>
        <div className="grid roster-grid">
          {roster.map((a) => (
            <div key={a.slug} className="card pcard">
              <Photo src={`/images/roster/${a.slug}.jpg`} name={a.name} />
              <div className="pbody">
                <div className="name">{a.name}</div>
                <div className="muted">{a.year} · {a.hometown}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <div className="flank">
            <Snap n={1} />
            <div>
              <h2>You're a bigger part of Red Rocks than you realize.</h2>
              <p className="sub">Every business that shows up, big or small, helps power the gymnasts and the program as a whole. And your name goes right along with them.</p>
              <div className="stack">
                <div className="card"><h3 style={{ marginTop: 0 }}>Be part of the community</h3><p className="muted">A crowd that fills the arena and a team rooted in Utah. Partnering puts you inside that community, not just in front of it.</p></div>
                <div className="card"><h3 style={{ marginTop: 0 }}>Back the whole program</h3><p className="muted">Team gear, fundraisers, events and everyday support. A team organizer shapes it with you so it fits what the team needs.</p></div>
                <div className="card"><h3 style={{ marginTop: 0 }}>Grow together</h3><p className="muted">Athletes build their own brands and earn from it, and your business is part of the story.</p></div>
              </div>
            </div>
            <Snap n={2} />
          </div>
        </div>
      </section>

      <section className="wrap">
        <h2>Ways to show up for the team</h2>
        <p className="sub">Pick what fits your business. A team organizer works out the details with you.</p>
        <div className="grid">
          {TEAM_TYPES.map((t) => (
            <div key={t.id} className="type-card" style={{ cursor: "default" }}>
              <strong>{t.title}</strong>
              <div className="muted">{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 0 }}>
        <h2>Out in the community</h2>
        <p className="sub">Red Rocks shows up for Utah, and partners show up with them.</p>
        <div className="photo-band">
          <Snap n={5} />
          <Snap n={6} />
          <Snap n={7} />
        </div>
      </section>

      <section className="band">
        <div className="wrap" style={{ textAlign: "center" }}>
          <h2>Who rocks the house?</h2>
          <p className="sub" style={{ maxWidth: 560, margin: "0 auto 24px" }}>With you behind them, they do. Start a conversation with the team organizer today.</p>
          <div className="row center">
            <button className="btn primary big-btn" onClick={onBusiness}>Get started as a business</button>
            <button className="btn big-btn" onClick={onFan}>Join as a fan</button>
          </div>
        </div>
      </section>

      <div className="fine">Student demo with sample data. Not an official University of Utah site.</div>
    </>
  );
}