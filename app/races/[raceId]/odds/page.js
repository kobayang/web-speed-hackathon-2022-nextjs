import { Suspense } from "react";
import { getRaces } from "../../../../src/client/apis/getRaces";
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

// export async function generateStaticParams() {
//   if (process.env.NEXT_PUBLIC_LOCAL_BUILD) {
//     return [];
//   }
//   const { races } = await getRaces();

//   return races.map((race) => ({
//     raceId: race.id,
//   }));
// }

export default async function Page({ params: { raceId } }) {
  const data = await getRace(raceId);
  const isRaceClosed = isBefore(data.closeAt, new Date());

  return (
    <Odds raceId={raceId} data={data} isRaceClosed={isRaceClosed}>
      <Suspense fallback={null}>
        <OddsData raceId={raceId} isRaceClosed={isRaceClosed} />
      </Suspense>
    </Odds>
  );
}
