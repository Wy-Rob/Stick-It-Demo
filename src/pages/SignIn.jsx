export default function SignIn({ onSignIn }) {
  return (
    <div className="wrap" style={{ maxWidth: 760 }}>
      <div className="hero" style={{ paddingBottom: 20 }}>
        <h1 style={{ fontSize: 44 }}>Welcome in</h1>
        <p style={{ marginBottom: 0 }}>Demo sign-in: choose how you want to continue.</p>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className="card role" onClick={() => onSignIn("athlete")}>
          <span className="pill red">Athlete</span>
          <h2>I'm an athlete</h2>
          <p className="muted">Your profile, deals and earnings.</p>
        </div>
        <div className="card role" onClick={() => onSignIn("business")}>
          <span className="pill red">Business</span>
          <h2>I'm a business</h2>
          <p className="muted">Find athletes or sponsor the whole team.</p>
        </div>
      </div>
    </div>
  );
}