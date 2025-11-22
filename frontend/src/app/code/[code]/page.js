export default async function Stats({ params }) {
  const { code } = params;

  const res = await fetch(
    `https://url-shortner-3u3d.onrender.com/api/links/${code}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  if (data.error) {
    return <div style={{ padding: "40px" }}>Link not found</div>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        Stats for: {code}
      </h1>

      <p><b>URL:</b> {data.url}</p>
      <p><b>Total Clicks:</b> {data.clicks}</p>
      <p><b>Last Clicked:</b> {data.lastClicked || "Never"}</p>
    </div>
  );
}
