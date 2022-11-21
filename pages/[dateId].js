import Error from "next/error";
import { getRaces } from "../src/client/apis/getRaces";
import { Header } from "../src/client/foundation/components/navs/Header/Header";
import { Top } from "../src/client/foundation/pages/Top";

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

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export async function getStaticProps(context) {
  try {
    const raceData = await getRaces();
    return { props: { raceData, date: context.params.dateId }, revalidate: 10 };
  } catch (error) {
    console.log(error);
    return { props: { statusCode: 500 } };
  }
}
