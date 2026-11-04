import { useState } from "react";
import { contracts as initialContracts } from "./data/sampleData";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import MyProfile from "./pages/athlete/MyProfile";
import Contracts from "./pages/athlete/Contracts";
import Earnings from "./pages/athlete/Earnings";
import Matchmaking from "./pages/business/Matchmaking";
import SponsorTeam from "./pages/business/SponsorTeam";
import MySponsorships from "./pages/business/MySponsorships";

const menus = {
  athlete: { "My Profile": MyProfile, "Contracts": Contracts, "Earnings": Earnings },
  business: { "Matchmaking": Matchmaking, "Sponsor the Team": SponsorTeam, "My Sponsorships": MySponsorships },
};

export default function App() {
  const [role, setRole] = useState(null);
  const [page, setPage] = useState("home");
  const [signinRole, setSigninRole] = useState("athlete");
  const [contracts, setContracts] = useState(initialContracts);
  const [toast, setToast] = useState("");

  const notify = (m) => { setToast(m); setTimeout(() => setToast(""), 2800); };
  const store = { contracts, setContracts, notify, goto: setPage };

  const goHome = () => { setRole(null); setPage("home"); window.scrollTo(0, 0); };
  const openSignIn = (r) => { setSigninRole(r); setPage("signin"); window.scrollTo(0, 0); };
  const signIn = (r) => { setRole(r); setPage(Object.keys(menus[r])[0]); window.scrollTo(0, 0); };

  let body;
  if (!role) {
    body = page === "signin"
      ? <SignIn key={signinRole} initialRole={signinRole} onSignIn={signIn} onBack={goHome} />
      : <Home onSignIn={() => openSignIn("athlete")} onBusiness={() => openSignIn("business")} />;
  } else {
    const Screen = menus[role][page];
    body = <Screen store={store} />;
  }

  return (
    <>
      {role && (
        <div className="topbar">
          <button className="brand" onClick={goHome}>Stick <span>It</span></button>
          <div className="tabs">
            {Object.keys(menus[role]).map((name) => (
              <button key={name} className={"tab" + (page === name ? " active" : "")} onClick={() => setPage(name)}>
                {name}
              </button>
            ))}
          </div>
          <div className="spacer" />
          <span className="demo">Demo data</span>
          <button className="btn small" onClick={goHome}>Sign out</button>
        </div>
      )}
      {body}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}