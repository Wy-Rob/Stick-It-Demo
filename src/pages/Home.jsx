export default function Home({ onGetStarted }) {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Stick It</h1>
      <p>Where Red Rocks athletes and local businesses team up.</p>
      <button onClick={onGetStarted}>Sign In</button>
    </div>
  );
}
