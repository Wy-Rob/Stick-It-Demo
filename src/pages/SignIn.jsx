export default function SignIn({ onSignIn }) {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>Sign in as</h2>
      <button onClick={() => onSignIn("athlete")}>Athlete</button>{" "}
      <button onClick={() => onSignIn("business")}>Business</button>
    </div>
  );
}