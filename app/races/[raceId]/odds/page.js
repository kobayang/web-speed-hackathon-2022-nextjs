import { Suspense } from "react";

import { OddsData } from "../../../../src/client/foundation/pages/races/Odds/OddsData";

import { OddsPage } from "./OddsPage";

export default async function Page({ params: { raceId } }) {
  return (
    <OddsPage raceId={raceId}>
      <Suspense>
        <OddsData raceId={raceId} />
      </Suspense>
    </OddsPage>
  );
}
