export const organization = { name: "Red Rocks", school: "University of Utah", sport: "Gymnastics" };

export const BUSINESS = { id: 1, name: "Wasatch Fit Studio", category: "Fitness", city: "Salt Lake City", goal: "Local visibility", verified: true };

export const CATEGORIES = ["Fitness", "Healthcare", "Food", "Retail", "Auto"];
export const CITIES = ["Salt Lake City", "Provo", "Ogden", "Boise"];

export const athletes = [
  { id: 1, name: "Maya Collins", year: "Senior", event: "All-Around", hometown: "Salt Lake City, UT", city: "Salt Lake City", interests: ["Fitness", "Food"], tier: "star", followers: 28400, hue: 350, pillars: ["Resilience", "Community", "Fitness"], story: "Sample story: a hometown gymnast who grew up cheering in the Huntsman Center and now leads the team." },
  { id: 2, name: "Tessa Brandt", year: "Junior", event: "Beam", hometown: "Provo, UT", city: "Provo", interests: ["Healthcare", "Fitness"], tier: "team", followers: 3200, hue: 8, pillars: ["Focus", "Wellness"], story: "Sample story: a pre-med student balancing the beam and the books." },
  { id: 3, name: "Lila Navarro", year: "Sophomore", event: "Floor", hometown: "Boise, ID", city: "Boise", interests: ["Food", "Retail"], tier: "team", followers: 4100, hue: 20, pillars: ["Creativity", "Joy"], story: "Sample story: known for floor routines choreographed to her own music mixes." },
  { id: 4, name: "Piper Okafor", year: "Freshman", event: "Vault", hometown: "Ogden, UT", city: "Ogden", interests: ["Auto", "Retail"], tier: "team", followers: 2100, hue: 340, pillars: ["Power", "Hustle"], story: "Sample story: a first-year powerhouse on vault with a family garage full of project cars." },
  { id: 5, name: "Reese Halvorsen", year: "Senior", event: "Bars", hometown: "Salt Lake City, UT", city: "Salt Lake City", interests: ["Retail", "Fitness"], tier: "team", followers: 5600, hue: 0, pillars: ["Leadership", "Grit"], story: "Sample story: a team captain who runs the youth clinics every spring." },
  { id: 6, name: "Nora Castillo", year: "Junior", event: "Floor", hometown: "Provo, UT", city: "Provo", interests: ["Food", "Healthcare"], tier: "team", followers: 1700, hue: 28, pillars: ["Kindness", "Nutrition"], story: "Sample story: shares healthy recipes and game-day meal prep with fans." },
];

// Team-level packages (individual deals come from Matchmaking)
export const packages = [
  { id: "community", name: "Community Partner", price: 1500, includes: "Team-wide recognition, 4 team posts, 1 group appearance" },
  { id: "gameday", name: "Game Day Partner", price: 3000, includes: "Meet-day shout-outs, fan QR offer, 6 team posts" },
  { id: "season", name: "Season Presenting Partner", price: 6000, includes: "Everything above + logo placement + season-long appearances" },
];

export const contracts = [
  { id: 1, athleteId: 1, sponsor: "Canyon Coffee Co.", type: "Cash", amount: 1200, total: 4, done: 2, obligation: "4 Instagram posts", due: "Jan 15", status: "Active" },
  { id: 2, athleteId: 1, sponsor: "Smile Dental", type: "Cash", amount: 500, total: 1, done: 0, obligation: "1 meet-day feature", due: "Feb 1", status: "Pending" },
  { id: 3, athleteId: 2, sponsor: "Smile Dental", type: "Cash", amount: 500, total: 1, done: 1, obligation: "1 post", due: "Dec 20", status: "Complete" },
];

export const fmt = (n) => "$" + Number(n).toLocaleString();
export const paidOf = (c) => Math.round((c.amount * c.done) / c.total);

export function matchScore(category, city, a) {
  let score = 20;
  const reasons = [];
  if (a.interests.includes(category)) { score += 45; reasons.push("Into " + category.toLowerCase()); }
  if (a.city === city) { score += 25; reasons.push("From " + city); }
  if (a.tier === "star") { score += 8; reasons.push("Top audience"); } else { score += 6; reasons.push("Rising voice"); }
  return { score: Math.min(score, 99), reasons };
}