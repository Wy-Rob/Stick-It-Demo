import { useState } from "react";

const COPY = {
  athlete: { sub: "Manage your profile, deals and earnings.", email: "School email", ph: "athlete@utah.edu", note: "You'll be added to the Red Rocks Circle once your profile is set up." },
  business: { sub: "Back the team or find your match.", email: "Work email", ph: "hello@wasatchfit.com", note: "Businesses are verified before matching begins." },
  fan: { sub: "Connect with athletes, join the membership and be part of game night.", email: "Email", ph: "fan@example.com", note: "Family memberships are held by a parent or guardian." },
};

export default function SignIn({ onSignIn, onBack, initialRole = "athlete" }) {
  const [role, setRole] = useState(initialRole);
  const c = COPY[role];

  const submit = (e) => { e.preventDefault(); onSignIn(role); };

  return (
    <div className="auth-page">
      <div className="auth-nav">
        <button className="brand-over auth-brand" onClick={onBack}>Stick <span>It</span></button>
        <button className="auth-back" onClick={onBack}>← Back to home</button>
      </div>

      <div className="auth-card">
        <span className="tag tag-dark">Utah Red Rocks Gymnastics</span>
        <h2 className="auth-title">Welcome in</h2>
        <p className="auth-sub">{c.sub}</p>

        <div className="seg three">
          <button type="button" className={role === "athlete" ? "on" : ""} onClick={() => setRole("athlete")}>Athlete</button>
          <button type="button" className={role === "business" ? "on" : ""} onClick={() => setRole("business")}>Business</button>
          <button type="button" className={role === "fan" ? "on" : ""} onClick={() => setRole("fan")}>Fan</button>
        </div>

        <form onSubmit={submit}>
          {role === "business" && (
            <div className="field"><label>Business name</label><input defaultValue="Wasatch Fit Studio" /></div>
          )}
          <div className="field"><label>{c.email}</label><input key={role} type="email" defaultValue={c.ph} /></div>
          <div className="field"><label>Password</label><input type="password" defaultValue="demo1234" /></div>
          <button className="btn primary auth-submit" type="submit">Continue as {role}</button>
        </form>

        <p className="auth-note">{c.note}</p>
        <p className="auth-demo">Demo sign-in. No real account needed.</p>
      </div>
    </div>
  );
}