import { Header } from "../../../src/client/foundation/components/navs/Header/Header";
import { RaceCard } from "../../../src/client/foundation/pages/races/RaceCard/RaceCard";
import Error from "next/error";
import { getRace } from "../../api/races/[raceId]";

export default function Component(props) {
  if (props.statusCode) {
    return <Error statusCode={props.statusCode} />;
  }
  return (
    <div>
      <Header />
      <RaceCard {...props} />
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const data = await getRace(context.query);
    return { props: { data } };
  } catch (error) {
    const statusCode = handleErrorToStatusCode(error);
    context.res.statusCode = statusCode;
    return { props: { statusCode } };
  }
}
