import { Top } from "../src/client/foundation/pages/Top/Top";

async function getRaces() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/races`, {
    next: { revalidate: 600 },
  });

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const raceData = await getRaces();
  const races =
    raceData != null
      ? raceData.races.sort(
          (a, b) => new Date(a.startAt).getTime - new Date(b.startAt).getTime()
        )
      : [];

  return <Top races={races} />;
}
