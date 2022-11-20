import Error from "next/error";
import { getRace } from "../../../src/client/apis/getRace";
import { Header } from "../../../src/client/foundation/components/navs/Header/Header";
import { Odds } from "../../../src/client/foundation/pages/races/Odds/Odds";

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
    const data = await getRace(context.query.raceId);
    return { props: { data } };
  } catch (error) {
    console.log(error);
    return { props: { statusCode: 500 } };
  }
}
