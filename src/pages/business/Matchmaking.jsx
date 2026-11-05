import { useState } from "react";
import { athletes, BUSINESS, CATEGORIES, CITIES, matchScore, feeMultiplier, fmt } from "../../data/sampleData";
import AthleteCard from "../../components/AthleteCard";
import OfferModal from "../../components/OfferModal";

export default function Matchmaking({ store }) {
  const { contracts, setContracts, notify } = store;
  const [category, setCategory] = useState(BUSINESS.category);
  const [city, setCity] = useState(BUSINESS.city);
  const [target, setTarget] = useState(null);

  const ranked = athletes
    .map((a) => ({ a, ...matchScore(category, city, a) }))
    .sort((x, y) => y.score - x.score);

  const existing = (a) => contracts.find((c) => c.athleteId === a.id && c.sponsor === BUSINESS.name);

  const send = (a, o) => {
    setContracts((cs) => [...cs, {
      id: Date.now(), athleteId: a.id, sponsor: BUSINESS.name, type: o.type, amount: o.amount,
      total: o.total, done: 0, obligation: o.obligation, due: o.due, status: "Pending", messages: o.messages,
    }]);
    notify(`Offer sent to ${a.name}`);
    setTarget(null);
  };

  return (
    <div className="wrap">
      <h2>Matchmaking</h2>
      <p className="sub">The 2027 Red Rocks, ranked by fit for your business.</p>

      <div className="card row" style={{ marginBottom: 12 }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <strong>{BUSINESS.name}</strong> <span className="pill green">Verified</span>
          <div className="muted">Goal: {BUSINESS.goal}</div>
        </div>
        <div><label>What we are about</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></div>
        <div><label>Where we are</label>
          <select value={city} onChange={(e) => setCity(e.target.value)}>{CITIES.map((c) => <option key={c}>{c}</option>)}</select></div>
      </div>
      <p className="muted" style={{ marginBottom: 20 }}>
        Interest tags and fees are placeholders for the demo. Athletes set their own once they join.
      </p>

      <div className="grid">
        {ranked.map(({ a, score, reasons }) => {
          const ex = existing(a);
          return (
            <AthleteCard key={a.id} a={a} score={score} reasons={reasons}>
              <div className="muted">Posts from {fmt(150 * feeMultiplier(a))} (sample)</div>
              <button className="btn small primary" disabled={!!ex} onClick={() => setTarget(a)}>
                {ex ? (ex.status === "Pending" ? "Offer sent" : "Partnered") : "Make offer"}
              </button>
            </AthleteCard>
          );
        })}
      </div>

      {target && <OfferModal a={target} business={BUSINESS} onClose={() => setTarget(null)} onSend={(o) => send(target, o)} />}
    </div>
  );
}