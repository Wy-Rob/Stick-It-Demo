import Photo from "../components/Photo";
import { roster, partners, packages, fmt } from "../data/sampleData";

export default function Home({ onSignIn, onBusiness }) {
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
          <h2>You're a bigger part of Red Rocks than you realize.</h2>
          <p className="sub" style={{ maxWidth: 680 }}>
            Every business that shows up, big or small, helps power the gymnasts and the Utes as a whole. And your name goes right along with them.
          </p>

          <div className="grid">
            <div className="card"><h3 style={{ marginTop: 0 }}>Be seen by the community</h3><p className="muted">Authentic content from athletes and recognition at home meets put your business in front of people who care about Utah.</p></div>
            <div className="card"><h3 style={{ marginTop: 0 }}>Back the whole program</h3><p className="muted">One partnership supports every gymnast, with money or with your products. It all goes toward the team.</p></div>
            <div className="card"><h3 style={{ marginTop: 0 }}>Know what it's doing</h3><p className="muted">Simple results show you what your support brought in, so you can see the difference you're making.</p></div>
          </div>

          <h3 style={{ marginTop: 40 }}>Pick a way to partner</h3>
          <div className="grid">
            {packages.map((p) => (
              <div key={p.id} className="card deal">
                <strong style={{ fontSize: 18 }}>{p.name}</strong>
                <div className="big" style={{ fontSize: 34 }}>{fmt(p.price)}</div>
                <div className="muted">{p.includes}</div>
              </div>
            ))}
          </div>
          <p className="muted" style={{ marginTop: 10 }}>Sample pricing for the demo.</p>
          <div style={{ marginTop: 22 }}>
            <button className="btn primary big-btn" onClick={onBusiness}>Get started as a business</button>
          </div>
        </div>
      </section>

      <div className="fine">Student demo with sample data. Not an official University of Utah site.</div>
    </>
  );
}