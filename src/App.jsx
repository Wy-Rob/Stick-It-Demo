import { useState } from "react";
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

  if (!role) {
    return page === "signin"
      ? <SignIn onSignIn={(r) => { setRole(r); setPage(Object.keys(menus[r])[0]); }} />
      : <Home onGetStarted={() => setPage("signin")} />;
  }

  const Screen = menus[role][page];
  return (
    <div style={{ padding: 20 }}>
      <nav style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        {Object.keys(menus[role]).map((name) => (
          <button key={name} onClick={() => setPage(name)}>{name}</button>
        ))}
        <button onClick={() => { setRole(null); setPage("home"); }}>Sign out</button>
      </nav>
      <Screen />
    </div>
  );
}