import { contracts } from "../../data/sampleData";

export default function Earnings() {
  const mine = contracts.filter((c) => c.athleteId === 1);
  const total = mine.reduce((sum, c) => sum + c.paid, 0);
  const pending = mine.reduce((sum, c) => sum + (c.amount - c.paid), 0);
  return (
    <div>
      <h2>Your Earnings</h2>
      <p><strong>Paid so far:</strong> ${total}</p>
      <p><strong>Still to come:</strong> ${pending}</p>
      <ul>
        {mine.map((c) => (
          <li key={c.id}>{c.sponsor}: ${c.paid} of ${c.amount} ({c.status})</li>
        ))}
      </ul>
    </div>
  );
}
