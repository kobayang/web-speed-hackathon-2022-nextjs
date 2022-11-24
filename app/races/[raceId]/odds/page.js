import { Odds } from "../../../../src/client/foundation/pages/races/Odds/Odds";
import { OddsData } from "../../../../src/client/foundation/pages/races/Odds/OddsData";
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

export default async function Page({ params: { raceId } }) {
  const data = await getRace(raceId);
  const isRaceClosed = isBefore(data.closeAt, new Date());

  return (
    <Odds raceId={raceId} data={data} isRaceClosed={isRaceClosed}>
      <OddsData raceId={raceId} isRaceClosed={isRaceClosed} />
    </Odds>
  );
}
