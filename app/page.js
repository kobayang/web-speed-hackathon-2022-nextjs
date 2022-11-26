import { Suspense } from "react";
import { RecentRaceListSection } from "../src/client/foundation/pages/Top/RecentRaceListSection";
import { Top } from "../src/client/foundation/pages/Top/Top";

export default async function Page() {
  return (
    <main>
      <Top>
        <Suspense>
          <RecentRaceListSection />
        </Suspense>
      </Top>
    </main>
  );
}
