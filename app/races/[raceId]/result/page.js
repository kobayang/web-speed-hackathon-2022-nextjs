import { RaceResult } from "../../../../src/client/foundation/pages/races/RaceResult/RaceResult";
// import { getRaces } from "../../../../src/client/apis/getRaces";

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
  return <RaceResult data={data} raceId={raceId} />;
}
