import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { defaultConfig } from "@orderbook/core/config";
import { LOCAL_STORAGE_ID } from "@orderbook/core/constants";
import { useAssetsMetaData, useMarketsData } from "@orderbook/core/hooks";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";
import { getCurrentMarket } from "@orderbook/core/index";

function Home() {
  const router = useRouter();
  const persistedMarket = useMemo(
    () =>
      process.browser &&
      window.localStorage.getItem(LOCAL_STORAGE_ID.DEFAULT_MARKET),
    []
  );
  const { loading: assetLoading } = useAssetsMetaData();

  const { loading: marketLoading, list } = useMarketsData();
  const currentMarket = getCurrentMarket(list, persistedMarket as string);

  useEffect(() => {
    if (!marketLoading && !assetLoading) {
      if (currentMarket)
        router.push(
          `/trading/${
            currentMarket.baseAsset.ticker + currentMarket.quoteAsset.ticker
          }`
        );
      else router.push(`/trading/${defaultConfig.landingPageMarket}`);
    }
  }, [assetLoading, currentMarket, marketLoading, router]);

  // Note: This could be used as masking page
  return <LoadingScreen />; // This is a temporary fix. (Showing loading indicator)
}

export default Home;
