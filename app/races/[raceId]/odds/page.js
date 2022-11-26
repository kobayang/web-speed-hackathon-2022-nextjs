import { Suspense } from "react";
import { Footer } from "../../../../src/client/foundation/components/navs/Footer";

import { OddsData } from "../../../../src/client/foundation/pages/races/Odds/OddsData";
import { OddsPage } from "./OddsPage";

export default function Page({ params: { raceId } }) {
  return (
    <>
      <OddsPage raceId={raceId}>
        <Suspense>
          <OddsData raceId={raceId} />
        </Suspense>
      </OddsPage>
      <Footer />
    </>
  );
}
