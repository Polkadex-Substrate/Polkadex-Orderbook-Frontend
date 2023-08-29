import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

import { defaultConfig } from "@polkadex/orderbook-config";
import { LOCAL_STORAGE_ID } from "@polkadex/web-constants";
import { useMarketsProvider } from "@polkadex/orderbook/providers/public/marketsProvider/useMarketsProvider";
import { useAssetsProvider } from "@polkadex/orderbook/providers/public/assetsProvider";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";

function Home() {
  const router = useRouter();
  const persistedMarket = useMemo(
    () => process.browser && window.localStorage.getItem(LOCAL_STORAGE_ID.DEFAULT_MARKET),
    []
  );

  const {
    currentMarket,
    list: allMarkets,
    loading: marketLoading,
    onSetCurrentMarketIfUnset,
  } = useMarketsProvider();

  const { loading: assetLoading } = useAssetsProvider();

  const findMarket = allMarkets?.find((market) => market.m === persistedMarket);

  useEffect(() => {
    if (!marketLoading && !assetLoading) {
      if (findMarket) {
        router.push(`/trading/${findMarket.base_ticker + findMarket.quote_ticker}`);
      } else {
        if (currentMarket)
          router.push(`/trading/${currentMarket.base_ticker + currentMarket.quote_ticker}`);
        else router.push(`/trading/${defaultConfig.landingPageMarket}`);
      }
    }
  }, [
    router,
    persistedMarket,
    currentMarket,
    marketLoading,
    assetLoading,
    findMarket,
    onSetCurrentMarketIfUnset,
    allMarkets,
  ]);

  // Note: This could be used as masking page
  return <LoadingScreen />; // This is a temporary fix. (Showing loading indicator)
}

export default Home;
