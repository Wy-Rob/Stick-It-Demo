import { useState, useEffect } from "react";
import { contracts as initialContracts, defaultProfile } from "./data/sampleData";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import MyProfile from "./pages/athlete/MyProfile";
import Contracts from "./pages/athlete/Contracts";
import Earnings from "./pages/athlete/Earnings";
import Matchmaking from "./pages/business/Matchmaking";
import SponsorTeam from "./pages/business/SponsorTeam";
import MySponsorships from "./pages/business/MySponsorships";
import FanHome from "./pages/fan/FanHome";

const menus = {
  athlete: { "My Profile": MyProfile, "Contracts": Contracts, "Earnings": Earnings },
  business: { "Sponsor the Team": SponsorTeam, "Matchmaking": Matchmaking, "My Sponsorships": MySponsorships },
  fan: { "Fan Hub": FanHome },
};

const fanTabs = [["Membership", "membership"], ["Connect", "connect"], ["At the Meet", "meet"]];

const seedMeet = [
  { id: 1, type: "screen", text: "Go Red Rocks!", who: "", price: 5, status: "approved" },
  { id: 2, type: "song", text: "Sample song request", who: "", price: 3, status: "approved" },
];

export default function App() {
  const [role, setRole] = useState(null);
  const [page, setPage] = useState("home");
  const [signinRole, setSigninRole] = useState("athlete");
  const [section, setSection] = useState("membership");
  const [contracts, setContracts] = useState(initialContracts);
  const [profile, setProfile] = useState(defaultProfile);
  const [teamDeals, setTeamDeals] = useState([]);
  const [fanRequests, setFanRequests] = useState([]);
  const [membership, setMembership] = useState(null);
  const [meetItems, setMeetItems] = useState(seedMeet);
  const [toast, setToast] = useState("");

  const notify = (m) => { setToast(m); setTimeout(() => setToast(""), 2800); };
  const store = {
    contracts, setContracts, notify, goto: setPage, profile, setProfile, teamDeals, setTeamDeals,
    fanRequests, setFanRequests, membership, setMembership, meetItems, setMeetItems,
  };

  const goHome = () => { setRole(null); setPage("home"); window.scrollTo(0, 0); };
  const openSignIn = (r) => { setSigninRole(r); setPage("signin"); window.scrollTo(0, 0); };
  const signIn = (r) => {
    setRole(r);
    setPage(Object.keys(menus[r])[0]);
    setSection("membership");
    window.scrollTo(0, 0);
  };

  const goSection = (id) => {
    setSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (role !== "fan") return;
    const ids = fanTabs.map((t) => t[1]);
    const onScroll = () => {
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) cur = id;
      }
      setSection(cur);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [role]);

  let body;
  if (!role) {
    body = page === "signin"
      ? <SignIn key={signinRole} initialRole={signinRole} onSignIn={signIn} onBack={goHome} />
      : <Home onSignIn={() => openSignIn("athlete")} onBusiness={() => openSignIn("business")} onFan={() => openSignIn("fan")} />;
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
            {role === "fan"
              ? fanTabs.map(([label, id]) => (
                  <button key={id} className={"tab" + (section === id ? " active" : "")} onClick={() => goSection(id)}>
                    {label}
                  </button>
                ))
              : Object.keys(menus[role]).map((name) => (
                  <button key={name} className={"tab" + (page === name ? " active" : "")} onClick={() => { setPage(name); window.scrollTo(0, 0); }}>
                    {name}
                  </button>
                ))}
          </div>
          <div className="spacer" />
          <span className="demo">Demo data</span>
          <button className="btn small" onClick={goHome}>Sign out</button>
        </div>
      )}
      <div className={role === "athlete" ? "themed" : ""}>{body}</div>
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}