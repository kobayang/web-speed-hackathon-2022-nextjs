import { RecentRaceListSectionClient } from "./RecentRaceListSectionClient";

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

export async function RecentRaceListSection({ date }) {
  const raceData = await getRaces();
  return <RecentRaceListSectionClient date={date} races={raceData.races} />;
}
