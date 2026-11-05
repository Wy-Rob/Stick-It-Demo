export default function Qr({ size = 120 }) {
  const N = 21;
  let s = 7;
  const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const finder = (x, y) => (x < 7 && y < 7) || (x >= N - 7 && y < 7) || (x < 7 && y >= N - 7);
  const cells = [];
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++)
      if (!finder(x, y) && rnd() > 0.5) cells.push(<rect key={x + "-" + y} x={x} y={y} width="1" height="1" />);
  const corners = [[0, 0], [N - 7, 0], [0, N - 7]];
  return (
    <svg width={size} height={size} viewBox={`0 0 ${N} ${N}`} shapeRendering="crispEdges" role="img" aria-label="Sample QR code">
      <rect width={N} height={N} fill="#fff" />
      <g fill="#000">{cells}</g>
      {corners.map(([x, y]) => (
        <g key={x + "," + y}>
          <rect x={x} y={y} width="7" height="7" fill="#000" />
          <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
          <rect x={x + 2} y={y + 2} width="3" height="3" fill="#000" />
        </g>
      ))}
    </svg>
  );
}