import Error from "next/error";
import { Header } from "../src/client/foundation/components/navs/Header/Header";
import { Top } from "../src/client/foundation/pages/Top";
import { handleErrorToStatusCode } from "../src/errors";
import { getHero } from "./api/hero";
import { getRaces } from "./api/races";

export default function Component(props) {
  if (props.statusCode) {
    return <Error statusCode={props.statusCode} />;
  }

  return (
    <div>
      <Header />
      <Top {...props} />
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    // Fetch data from external API
    const heroData = await getHero();
    const raceData = await getRaces(context.query);
    const imageUrl = `${heroData.url}?${heroData.hash}`;

    return { props: { raceData, imageUrl } };
  } catch (error) {
    console.log(error);
    const statusCode = handleErrorToStatusCode(error);
    context.res.statusCode = statusCode;
    return { props: { statusCode } };
  }
}
