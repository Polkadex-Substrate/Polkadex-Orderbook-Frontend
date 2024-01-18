import { useRouter } from "next/router";
import { useEffect } from "react";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";
import { getMarketUrl } from "@orderbook/core/helpers";
import { GetServerSideProps } from "next";

import { getServerSidePropsWithTranslations } from "@/utils";

function Home() {
  const router = useRouter();

  useEffect(() => {
    const marketUrl = getMarketUrl();
    router.push(marketUrl);
  }, [router]);

  // Note: This could be used as masking page
  return <LoadingScreen />; // This is a temporary fix. (Showing loading indicator)
}

export default Home;

const translations = ["common"];
export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithTranslations(translations);
