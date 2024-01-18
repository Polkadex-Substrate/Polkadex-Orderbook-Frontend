import { GetServerSideProps } from "next";
import { defaultConfig } from "@orderbook/core/config";

function Home() {
  return <></>;
}

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const destination = `trading/${defaultConfig.landingPageMarket}`;
  return { redirect: { destination, permanent: true }, props: {} };
};
