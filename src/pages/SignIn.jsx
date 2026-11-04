import { useState } from "react";

export default function SignIn({ onSignIn, onBack, initialRole = "athlete" }) {
  const [role, setRole] = useState(initialRole);
  const isAthlete = role === "athlete";

  const submit = (e) => {
    e.preventDefault();
    onSignIn(role);
  };

  return (
    <div className="auth-page">
      <div className="auth-nav">
        <button className="brand-over auth-brand" onClick={onBack}>Stick <span>It</span></button>
        <button className="auth-back" onClick={onBack}>← Back to home</button>
      </div>

      <div className="auth-card">
        <span className="tag tag-dark">Utah Red Rocks Gymnastics</span>
        <h2 className="auth-title">Welcome in</h2>
        <p className="auth-sub">
          {isAthlete
            ? "Manage your profile, deals and earnings."
            : "Find your fit or back the whole team."}
        </p>

        <div className="seg">
          <button type="button" className={isAthlete ? "on" : ""} onClick={() => setRole("athlete")}>Athlete</button>
          <button type="button" className={!isAthlete ? "on" : ""} onClick={() => setRole("business")}>Business</button>
        </div>

        <form onSubmit={submit}>
          {!isAthlete && (
            <div className="field">
              <label>Business name</label>
              <input defaultValue="Wasatch Fit Studio" />
            </div>
          )}
          <div className="field">
            <label>{isAthlete ? "School email" : "Work email"}</label>
            <input type="email" defaultValue={isAthlete ? "athlete@utah.edu" : "hello@wasatchfit.com"} />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" defaultValue="demo1234" />
          </div>

          <button className="btn primary auth-submit" type="submit">
            Continue as {isAthlete ? "athlete" : "business"}
          </button>
        </form>

        <p className="auth-note">
          {isAthlete
            ? "You'll be added to the Red Rocks Circle once your profile is set up."
            : "Businesses are verified before matching begins."}
        </p>
        <p className="auth-demo">Demo sign-in. No real account needed.</p>
      </div>
    </div>
  );
}