import { Footer } from "../../../../src/client/foundation/components/navs/Footer";
import { RaceCard } from "../../../../src/client/foundation/pages/races/RaceCard/RaceCard";

async function getRace(uuid) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/races/${uuid}/race-card`
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
  return (
    <>
      <RaceCard data={data} raceId={raceId} />
      <Footer />
    </>
  );
}
