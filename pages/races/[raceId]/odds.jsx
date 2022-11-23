import Error from "next/error";
import { getRace } from "../../../src/client/apis/getRace";
import { getRaces } from "../../../src/client/apis/getRaces";
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

export const getStaticPaths = async () => {
  // For build, do not cache.
  if (process.env.NEXT_PUBLIC_LOCAL_BUILD) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  const { races } = await getRaces();

  const paths = races.flatMap((race) => {
    return [{ params: { raceId: race.id } }];
  });

  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps(context) {
  try {
    const data = await getRace(context.params.raceId);
    return { props: { data } };
  } catch (error) {
    console.log(error);
    return { props: { statusCode: 500 } };
  }
}
