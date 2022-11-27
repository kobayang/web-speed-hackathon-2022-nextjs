import { Suspense } from "react";
import { RecentRaceListSection } from "../../src/client/foundation/pages/Top/RecentRaceListSection";
import { Top } from "../../src/client/foundation/pages/Top/Top";

async function getRaces() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/races`);

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({ params: { date } }) {
  const raceData = await getRaces(date);
  return <Top races={raceData.races} date={date} />;
}
