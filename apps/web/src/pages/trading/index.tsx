import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { defaultConfig } from "@orderbook/core/config";
import { LOCAL_STORAGE_ID } from "@orderbook/core/constants";
import { useMarketsProvider } from "@orderbook/core/providers/public/marketsProvider";
import { useAssetsMetaData } from "@orderbook/core/index";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";

function Home() {
  const router = useRouter();
  const persistedMarket = useMemo(
    () =>
      process.browser &&
      window.localStorage.getItem(LOCAL_STORAGE_ID.DEFAULT_MARKET),
    []
  );

  const {
    currentMarket,
    list: allMarkets,
    loading: marketLoading,
  } = useMarketsProvider();

  const { loading: assetLoading } = useAssetsMetaData();

  const findMarket = allMarkets?.find((market) => market.m === persistedMarket);

  useEffect(() => {
    if (!marketLoading && !assetLoading) {
      if (findMarket) {
        router.push(
          `/trading/${findMarket.base_ticker + findMarket.quote_ticker}`
        );
      } else {
        if (currentMarket)
          router.push(
            `/trading/${currentMarket.base_ticker + currentMarket.quote_ticker}`
          );
        else router.push(`/trading/${defaultConfig.landingPageMarket}`);
      }
    }
  }, [assetLoading, currentMarket, findMarket, marketLoading, router]);

  // Note: This could be used as masking page
  return <LoadingScreen />; // This is a temporary fix. (Showing loading indicator)
}

export default Home;
