import { useState } from "react";
import { athletes, BUSINESS, CATEGORIES, CITIES, matchScore, fmt } from "../../data/sampleData";
import AthleteCard from "../../components/AthleteCard";

export default function Matchmaking({ store }) {
  const { contracts, setContracts, notify } = store;
  const [category, setCategory] = useState(BUSINESS.category);
  const [city, setCity] = useState(BUSINESS.city);

  const ranked = athletes
    .map((a) => ({ a, ...matchScore(category, city, a) }))
    .sort((x, y) => y.score - x.score);

  const existing = (a) => contracts.find((c) => c.athleteId === a.id && c.sponsor === BUSINESS.name);
  const priceOf = (a) => (a.featured ? 2500 : 500);

  const offer = (a) => {
    setContracts((cs) => [...cs, {
      id: Date.now(), athleteId: a.id, sponsor: BUSINESS.name, type: "Cash", amount: priceOf(a),
      total: a.featured ? 3 : 1, done: 0,
      obligation: a.featured ? "2 posts + 1 meet-day feature" : "1 post + thank-you story",
      due: "Feb 1", status: "Pending",
    }]);
    notify(`Offer sent to ${a.name}`);
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
        Interest tags and offer prices are placeholders for the demo. Athletes set their own once they join.
      </p>

      <div className="grid">
        {ranked.map(({ a, score, reasons }) => {
          const ex = existing(a);
          return (
            <AthleteCard key={a.id} a={a} score={score} reasons={reasons}>
              <button className="btn small primary" disabled={!!ex} onClick={() => offer(a)}>
                {ex ? (ex.status === "Pending" ? "Offer sent" : "Partnered") : `Send offer · ${fmt(priceOf(a))}`}
              </button>
            </AthleteCard>
          );
        })}
      </div>
    </div>
  );
}