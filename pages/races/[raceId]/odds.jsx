import Error from "next/error";
import { Header } from "../../../src/client/foundation/components/navs/Header/Header";
import { Odds } from "../../../src/client/foundation/pages/races/Odds/Odds";
import { handleErrorToStatusCode } from "../../../src/errors";
import { getRace } from "../../api/races/[raceId]";

export default function Component(props) {
  if (props.statusCode) {
    return <Error statusCode={props.statusCode} />;
  }
  return (
    <div>
      <Header />
      <Odds {...props} />
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const data = await getRace(context.query);
    return { props: { data } };
  } catch (error) {
    console.log(error);
    const statusCode = handleErrorToStatusCode(error);
    context.res.statusCode = statusCode;
    return { props: { statusCode } };
  }
}
