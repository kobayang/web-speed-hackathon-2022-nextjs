import { useMemo } from "react";
import { Top } from "../src/client/foundation/pages/Top/Top";
import { isSameDay } from "../src/client/foundation/utils/DateUtils";

async function getRaces() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/races`, {
    next: { revalidate: 60 },
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
  return <Top raceData={raceData} />;
}
