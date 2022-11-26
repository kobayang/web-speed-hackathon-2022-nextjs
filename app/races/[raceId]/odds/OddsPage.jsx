import { Odds } from "../../../../src/client/foundation/pages/races/Odds/Odds";
import { isBefore } from "../../../../src/client/foundation/utils/DateUtils";

async function getRace(uuid) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/races/${uuid}`
  );

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function OddsPage({ raceId, children }) {
  const data = await getRace(raceId);
  const isRaceClosed = isBefore(data.closeAt, new Date());

  return (
    <Odds raceId={raceId} data={data} isRaceClosed={isRaceClosed}>
      {children}
    </Odds>
  );
}
