import { Spacer } from "../../../components/layouts/Spacer";
import { Heading } from "../../../components/typographies/Heading";
import { Space } from "../../../styles/variables";
import { OddsRankingList } from "./internal/OddsRankingList";
import { OddsTable } from "./internal/OddsTable";

async function getRaceWithOdds(uuid) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/api/races/${uuid}/odds`
  );

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function OddsData({ raceId, isRaceClosed }) {
  const raceWithOddsData = await getRaceWithOdds(raceId);
  return (
    <>
      <OddsTable
        entries={raceWithOddsData.entries}
        odds={raceWithOddsData.trifectaOdds}
        isRaceClosed={isRaceClosed}
      />
      <Spacer mt={Space * 4} />
      <Heading as="h2">人気順</Heading>
      <Spacer mt={Space * 2} />
      <OddsRankingList
        odds={raceWithOddsData.trifectaOdds}
        isRaceClosed={isRaceClosed}
      />
    </>
  );
}
