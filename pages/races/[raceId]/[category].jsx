import Error from "next/error";
import { getRace } from "../../../src/client/apis/getRace";
import { Header } from "../../../src/client/foundation/components/navs/Header/Header";
import { Odds } from "../../../src/client/foundation/pages/races/Odds/Odds";
import { RaceCard } from "../../../src/client/foundation/pages/races/RaceCard/RaceCard";
import { RaceResult } from "../../../src/client/foundation/pages/races/RaceResult/RaceResult";

export default function Component(props) {
  if (props.statusCode) {
    return <Error statusCode={props.statusCode} />;
  }
  return (
    <div>
      <Header />
      {props.category === "odds" && <Odds {...props} />}
      {props.category === "race-card" && <RaceCard {...props} />}
      {props.category === "result" && <RaceResult {...props} />}
    </div>
  );
}

// export const getStaticPaths = async () => {
//   const { races } = await getRaces();

//   const paths = races.flatMap((race) => {
//     return [
//       { params: { raceId: race.id, category: "odds" } },
//       { params: { raceId: race.id, category: "race-card" } },
//       { params: { raceId: race.id, category: "result" } },
//     ];
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// };

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export async function getStaticProps(context) {
  try {
    const category = context.params.category;
    if (!["odds", "race-card", "result"].includes(category)) {
      throw new Error("Invalid category.");
    }
    const data = await getRace(context.params.raceId);
    return { props: { data, category }, revalidate: 60 };
  } catch (error) {
    console.log(error);
    return { props: { statusCode: 500 } };
  }
}
