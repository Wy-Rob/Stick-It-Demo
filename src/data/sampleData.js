export const athletes = [
  { id: 1, name: "Sample Athlete A", year: "Senior", event: "All-Around", hometown: "Salt Lake City, UT",
    story: "Placeholder story about her journey in the sport.", followers: 25000, tier: "star" , interests: ["Fitness"]},
  { id: 2, name: "Sample Athlete B", year: "Junior", event: "Beam", hometown: "Provo, UT",
    story: "Placeholder story.", followers: 3000, tier: "team" , interests: ["Fitness"]},
  { id: 3, name: "Sample Athlete C", year: "Sophomore", event: "Floor", hometown: "Boise, ID",
    story: "Placeholder story.", followers: 1800, tier: "team" , interests: ["Fitness"]},
];

export const packages = [
  { id: "team", name: "Community Partner", price: 1500, includes: "Team-wide recognition, 4 posts, 1 group appearance" },
  { id: "star", name: "Star Feature", price: 2500, includes: "2 posts, 1 meet-day feature, 1 appearance" },
  { id: "local", name: "Hometown Spotlight", price: 500, includes: "1 post and a thank-you story" },
];

export const sponsors = [
  { id: 1, name: "Sample Local Gym", type: "Fitness" },
  { id: 2, name: "Sample Dental Office", type: "Healthcare" },
];

export const results = [
  { sponsorId: 1, scans: 120, redemptions: 18, renewed: true },
];
export const businesses = [
  { id: 1, name: "Sample Local Gym", category: "Fitness", city: "Salt Lake City", goal: "Local visibility", verified: true },
  { id: 2, name: "Sample Dental Office", category: "Healthcare", city: "Provo", goal: "New families", verified: true },
];

export const contracts = [
  { id: 1, athleteId: 1, sponsor: "Sample Local Gym", amount: 1200, status: "Active",
    due: "2027-01-15", obligation: "2 Instagram posts", paid: 600 },
  { id: 2, athleteId: 1, sponsor: "Sample Dental Office", amount: 500, status: "Pending",
    due: "2027-02-01", obligation: "1 meet-day feature", paid: 0 },
];

export const notifications = [
  { id: 1, athleteId: 1, text: "Post due in 3 days for Sample Local Gym" },
  { id: 2, athleteId: 1, text: "New sponsor request from Sample Dental Office" },
];

// Simple fit score: more points for matching interests and city
export function matchScore(business, athlete) {
  let score = 0;
  if (athlete.interests?.includes(business.category)) score += 50;
  if (athlete.hometown?.includes(business.city)) score += 30;
  if (athlete.tier === "team") score += 10; // keeps smaller-audience athletes visible
  return score;
}