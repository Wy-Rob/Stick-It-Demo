export const organization = { name: "Red Rocks", school: "University of Utah", sport: "Gymnastics" };

export const BUSINESS = { id: 1, name: "Wasatch Fit Studio", category: "Fitness", city: "South Jordan", goal: "Local visibility", verified: true };
export const CATEGORIES = ["Fitness", "Healthcare", "Food", "Retail", "Auto"];

// Facts below (name, year, hometown, height, last school) come from the public 2027 roster.
// "interests" are PLACEHOLDER tags for the demo; athletes would set their own.
export const athletes = [
  { id: 1, slug: "norah-christian", name: "Norah Christian", year: "Sophomore", hometown: "Bremerton, Wash.", city: "Bremerton", state: "WA", height: "5'3\"", lastSchool: "Washington Connection Academy", interests: ["Food", "Retail"] },
  { id: 2, slug: "sage-curtis", name: "Sage Curtis", year: "Sophomore", hometown: "Riverton, Utah", city: "Riverton", state: "UT", height: "4'11\"", lastSchool: "Riverton High School", interests: ["Fitness", "Auto"] },
  { id: 3, slug: "elizabeth-gantner", name: "Elizabeth Gantner", year: "Senior", hometown: "Indianapolis, Ind.", city: "Indianapolis", state: "IN", height: "4'11\"", lastSchool: "Roncalli HS", interests: ["Healthcare", "Fitness"] },
  { id: 4, slug: "leonie-gervais", name: "Léonie Gervais", year: "Freshman", hometown: "Trois-Rivières, Quebec", city: "Trois-Rivières", state: "QC", height: "5'3\"", lastSchool: "Académie les Estacades", interests: ["Food", "Retail"] },
  { id: 5, slug: "zoe-johnson", name: "Zoe Johnson", year: "Junior", hometown: "Durham, N.C.", city: "Durham", state: "NC", height: "5'1\"", lastSchool: "Eno River Academy", interests: ["Healthcare", "Retail"] },
  { id: 6, slug: "ayla-miller", name: "Ayla Miller", year: "Freshman", hometown: "Big Lake, Minn.", city: "Big Lake", state: "MN", height: "5'2\"", lastSchool: "Big Lake High School", interests: ["Fitness", "Food"] },
  { id: 7, slug: "avery-neff", name: "Avery Neff", year: "Junior", hometown: "South Jordan, Utah", city: "South Jordan", state: "UT", height: "5'4\"", lastSchool: "Bingham High School", interests: ["Fitness", "Food"], featured: true },
  { id: 8, slug: "clara-raposo", name: "Clara Raposo", year: "Junior", hometown: "Toronto, Canada", city: "Toronto", state: "ON", height: "5'1\"", lastSchool: "Mississauga Secondary School", interests: ["Retail", "Healthcare"] },
  { id: 9, slug: "abbi-ryssman", name: "Abbi Ryssman", year: "Sophomore", hometown: "Rochester, Minn.", city: "Rochester", state: "MN", height: "5'1\"", lastSchool: "Rochester Century High School", interests: ["Food", "Auto"] },
  { id: 10, slug: "poppy-grace-stickler", name: "Poppy-Grace Stickler", year: "Junior", hometown: "Cardiff, Wales", city: "Cardiff", state: "WLS", height: "5'3\"", lastSchool: "Whitchurch High School", interests: ["Retail", "Fitness"] },
  { id: 11, slug: "bailey-stroud", name: "Bailey Stroud", year: "Sophomore", hometown: "New Palestine, Ind.", city: "New Palestine", state: "IN", height: "5'4\"", lastSchool: "Greenfield Central High School", interests: ["Auto", "Fitness"] },
  { id: 12, slug: "lilly-tubbs", name: "Lilly Tubbs", year: "Graduate", hometown: "Pflugerville, Texas", city: "Pflugerville", state: "TX", height: "5'8\"", lastSchool: "Hendrickson High School (previously Washington)", interests: ["Fitness", "Healthcare"] },
  { id: 13, slug: "arielle-ward", name: "Arielle Ward", year: "Graduate", hometown: "Frisco, Texas", city: "Frisco", state: "TX", height: "5'8\"", lastSchool: "Rock Hill High School (previously Illinois)", interests: ["Retail", "Food"] },
  { id: 14, slug: "camie-winger", name: "Camie Winger", year: "Senior", hometown: "Orem, Utah", city: "Orem", state: "UT", height: "5'3\"", lastSchool: "Timpanogos HS", interests: ["Food", "Fitness"] },
  { id: 15, slug: "ella-zirbes", name: "Ella Zirbes", year: "Senior", hometown: "Stillwater, Minn.", city: "Stillwater", state: "MN", height: "5'3\"", lastSchool: "Stillwater Area HS", interests: ["Healthcare", "Auto"] },
];

export const roster = athletes;
export const ME = athletes.find((a) => a.slug === "avery-neff");
export const CITIES = [...new Set(athletes.map((a) => a.city))].sort();

export const partners = ["Canyon Coffee Co.", "Smile Dental", "Wasatch Fit Studio", "Summit Auto", "Red Rock Bakery"];

export const packages = [
  { id: "community", name: "Community Partner", price: 1500, includes: "Team-wide recognition, 4 team posts, 1 group appearance" },
  { id: "gameday", name: "Game Day Partner", price: 3000, includes: "Meet-day shout-outs, fan QR offer, 6 team posts" },
  { id: "season", name: "Season Presenting Partner", price: 6000, includes: "Everything above + logo placement + season-long appearances" },
];

// SAMPLE deals for demo purposes only (fictional sponsors and amounts)
export const contracts = [
  { id: 1, athleteId: 7, sponsor: "Canyon Coffee Co.", type: "Cash", amount: 1200, total: 4, done: 2, obligation: "4 Instagram posts", due: "Jan 15", status: "Active",
    messages: [{ from: "sponsor", text: "Excited to partner! Posts can go up any time before Jan 15." }] },
  { id: 2, athleteId: 7, sponsor: "Smile Dental", type: "Cash", amount: 500, total: 1, done: 0, obligation: "1 meet-day feature", due: "Feb 1", status: "Pending",
    messages: [{ from: "sponsor", text: "We'd love you at our family night. Does this offer work?" }] },
  { id: 3, athleteId: 7, sponsor: "Red Rock Bakery", type: "Product", amount: 300, total: 2, done: 1, obligation: "2 posts for free pastries", due: "Jan 30", status: "Active",
    messages: [] },
  { id: 4, athleteId: 7, sponsor: "Summit Auto", type: "Cash", amount: 800, total: 2, done: 0, obligation: "2 Instagram posts", due: "Feb 10", status: "Pending",
    messages: [{ from: "sponsor", text: "Happy to adjust the dates if you're busy with meets." }] },
  { id: 5, athleteId: 7, sponsor: "Utah Valley Smoothies", type: "Product", amount: 250, total: 2, done: 0, obligation: "2 posts for free smoothies", due: "Feb 20", status: "Pending",
    messages: [] },
];

export const notifications = [];

export const fmt = (n) => "$" + Number(n).toLocaleString();
export const paidOf = (c) => Math.round((c.amount * c.done) / c.total);

export function matchScore(category, city, a) {
  const stateOfCity = athletes.find((x) => x.city === city)?.state;
  let score = 20;
  const reasons = [];
  if (a.interests.includes(category)) { score += 45; reasons.push("Open to " + category.toLowerCase() + " partners"); }
  if (a.city === city) { score += 25; reasons.push("From " + city); }
  else if (stateOfCity && a.state === stateOfCity) { score += 10; reasons.push("Same state"); }
  score += a.featured ? 8 : 6;
  return { score: Math.min(score, 99), reasons };
}
// Demo assumptions: dollars per 1,000 followers for one sponsored post. Replace with real market data.
export const PLATFORMS = [
  { key: "instagram", label: "Instagram", rate: 8 },
  { key: "tiktok", label: "TikTok", rate: 6 },
  { key: "youtube", label: "YouTube", rate: 10 },
  { key: "x", label: "X", rate: 3 },
];

// Placeholder follower counts. The athlete enters her own.
export const defaultProfile = {
  about: "",
  story: "",
  interests: ["Fitness", "Food"],
  followers: { instagram: 10000, tiktok: 5000, youtube: 1000, x: 500 },
  photo: "",
};

export function estimateWorth(followers) {
  const perPost = PLATFORMS.reduce((s, p) => s + ((followers[p.key] || 0) / 1000) * p.rate, 0);
  const reach = PLATFORMS.reduce((s, p) => s + (followers[p.key] || 0), 0);
  return {
    reach,
    perPost: Math.round(perPost),
    low: Math.round(perPost * 0.6),
    high: Math.round(perPost * 1.5),
    monthly: Math.round(perPost * 4),
  };
}
// SAMPLE fee menu. Athletes would set their own rates in the live product.
export const DELIVERABLES = [
  { id: "post", label: "Instagram post", price: 150 },
  { id: "story", label: "Story set", price: 75 },
  { id: "tiktok", label: "TikTok video", price: 150 },
  { id: "meet", label: "Meet-day feature", price: 250 },
  { id: "appearance", label: "In-person appearance", price: 300 },
];

export const GOALS = ["Local awareness", "Foot traffic", "Social content", "Community goodwill"];

export const feeMultiplier = (a) => (a.featured ? 2 : 1);
export const TEAM_TYPES = [
  { id: "gear", title: "Team gear", desc: "Warm-ups, bags, practice wear or branded items for the roster." },
  { id: "fundraising", title: "Team fundraising", desc: "Back a fundraiser, match donations or host a drive." },
  { id: "event", title: "Event sponsorship", desc: "Sponsor a home meet night, a preview or a community clinic." },
  { id: "support", title: "Team support", desc: "Meals, travel, recovery or everyday needs." },
  { id: "community", title: "Community and outreach", desc: "Youth clinics, school visits and service days." },
  { id: "custom", title: "Something else", desc: "Have a different idea? Tell the organizer." },
];

export const ORGANIZER = { name: "Red Rocks Team Organizer", role: "Your point of contact for team partnerships" };
export const BUDGETS = ["Under $500", "$500 to $1,500", "$1,500 to $5,000", "$5,000 or more", "Product donation", "Not sure yet"];
export const TIMELINES = ["This season", "Home meet in January", "Next month", "Flexible"];
// SAMPLE prices and perks. Athletes and Red Rocks would set the real ones.
export const FAN_EXPERIENCES = [
  { id: "shoutout", title: "Video shout-out", desc: "A short personal video message.", price: 35 },
  { id: "autograph", title: "Signed autograph", desc: "A signed card or photo.", price: 25 },
  { id: "meet", title: "Meet and greet", desc: "A few minutes together at a home meet.", price: 60 },
  { id: "social", title: "Social shout-out", desc: "A mention on her story or feed.", price: 20 },
];

export const MEMBER_TIERS = [
  { id: "fan", name: "Supporter", price: 8, tag: "For every Red Rocks fan",
    perks: ["Digital member card and badge", "First look at ticket and event offers", "Behind-the-scenes team content", "Member discount on team gear"] },
  { id: "family", name: "Fan", price: 20, tag: "For dads, daughters and families", pop: true,
    perks: ["Everything in Supporter", "Walk the floor before select meets", "Member family nights", "Junior member kit", "Meet the team at members' events"] },
  { id: "all", name: "All Access", price: 50, tag: "For the biggest fans",
    perks: ["Everything in Fan", "Private member events", "Watch a practice day", "Name on the Members wall", "Priority on individual experiences"] },
];

export const MEMBER_EVENTS = [
  { title: "Floor walk before the January home opener", when: "Date to be confirmed (sample)" },
  { title: "Fan family night", when: "Date to be confirmed (sample)" },
  { title: "Members' meet and greet", when: "Date to be confirmed (sample)" },
];

export const MEET_ACTIONS = [
  { id: "screen", title: "Message on the big screen", desc: "Birthdays, proposals, signs of support.", price: 5, kind: "text", ph: "Happy birthday Emma!" },
  { id: "shoutout", title: "Announcer shout-out", desc: "Read aloud between rotations.", price: 10, kind: "text", ph: "Shout-out to the Johnson family!" },
  { id: "song", title: "Song request", desc: "Pick the music between events.", price: 3, kind: "text", ph: "Song and artist" },
  { id: "cheer", title: "Cheer for an athlete", desc: "A free cheer that lights up the screen.", price: 0, kind: "athlete" },
];