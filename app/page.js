import { Top } from "../src/client/foundation/pages/Top/Top";
import { isSameDay } from "../src/client/foundation/utils/DateUtils";

async function getRaces() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/races`);

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const date = new Date();
  const raceData = await getRaces();

  const todayRaces =
    raceData != null
      ? [...raceData.races]
          .sort(
            (/** @type {Model.Race} */ a, /** @type {Model.Race} */ b) =>
              new Date(a.startAt).getTime - new Date(b.startAt).getTime()
          )
          .filter((/** @type {Model.Race} */ race) =>
            isSameDay(race.startAt, date)
          )
      : [];

  return <Top todayRaces={todayRaces} />;
}
