import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { defaultConfig } from "@orderbook/core/config";
import { LOCAL_STORAGE_ID } from "@orderbook/core/constants";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";
import { getFromStorage, isValidJson } from "@orderbook/core/helpers";

function Home() {
  const router = useRouter();
  const persistedMarket = useMemo(() => {
    const market = getFromStorage(LOCAL_STORAGE_ID.DEFAULT_MARKET);
    return market && isValidJson(market)
      ? JSON.parse(market)?.name
      : defaultConfig.landingPageMarket;
  }, []);

  useEffect(() => {
    router.push(`/trading/${persistedMarket}`);
  }, [persistedMarket, router]);

  // Note: This could be used as masking page
  return <LoadingScreen />; // This is a temporary fix. (Showing loading indicator)
}

export default Home;
