import { Header } from "../../../src/client/foundation/components/navs/Header/Header";
import { RaceResult } from "../../../src/client/foundation/pages/races/RaceResult/RaceResult";
import Error from "next/error";
import { getRace } from "../../../src/client/apis/getRace";

export default function Component(props) {
  if (props.statusCode) {
    return <Error statusCode={props.statusCode} />;
  }
  return (
    <div>
      <Header />
      <RaceResult {...props} />
    </div>
  );
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export async function getStaticProps(context) {
  try {
    const data = await getRace(context.params.raceId);
    return { props: { data }, revalidate: 10 };
  } catch (error) {
    console.log(error);
    return { props: { statusCode: 500 } };
  }
}
