import { range, without } from "lodash-es";
import { Spacer } from "../../../components/layouts/Spacer";
import { Heading } from "../../../components/typographies/Heading";
import { Space } from "../../../styles/variables";
import { OddsRankingList } from "./internal/OddsRankingList";
import { mapKey } from "./internal/OddsTable/mapkey";
import { OddsTable } from "./internal/OddsTable/OddsTable";
import { OddsTableData } from "./internal/OddsTable/OddsTableData";

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

const firstKey = 1;

export async function OddsData({ raceId, isRaceClosed }) {
  const raceWithOddsData = await getRaceWithOdds(raceId);

  const entries = raceWithOddsData.entries;
  const odds = raceWithOddsData.trifectaOdds;

  const headNumbers = without(range(1, entries.length + 1), firstKey);
  const oddsMap = odds
    .filter((item) => item.key[0] === firstKey)
    .reduce((acc, cur) => {
      const [, second, third] = cur.key;
      acc[mapKey(second, third)] = cur;
      return acc;
    }, {});

  return (
    <>
      <OddsTable
        entries={entries}
        odds={odds}
        isRaceClosed={isRaceClosed}
      >
        <OddsTableData
          isRaceClosed={isRaceClosed}
          headNumbers={headNumbers}
          oddsMap={oddsMap}
        />
      </OddsTable>
      <Spacer mt={Space * 4} />
      <Heading as="h2">人気順</Heading>
      <Spacer mt={Space * 2} />
      <OddsRankingList odds={odds} isRaceClosed={isRaceClosed} />
    </>
  );
}
