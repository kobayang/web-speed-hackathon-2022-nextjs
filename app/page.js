import { Container } from "../src/client/foundation/components/layouts/Container";
import { Spacer } from "../src/client/foundation/components/layouts/Spacer";
import { TrimmedImage } from "../src/client/foundation/components/media/TrimmedImage";
import { Footer } from "../src/client/foundation/components/navs/Footer";
import { RecentRaceListSection } from "../src/client/foundation/pages/Top/RecentRaceListSection";
import { Top } from "../src/client/foundation/pages/Top/Top";
import { Space } from "../src/client/foundation/styles/variables";

export default async function Page() {
  return (
    <>
      <Container>
        <TrimmedImage
          width={1024}
          height={735}
          maxWidth={"100%"}
          priorityClass="main"
          src={"/assets/images/hero.webp"}
        />
        <Spacer mt={Space * 2} />
      </Container>
      <Top>
        <RecentRaceListSection />
      </Top>
    </>
  );
}
