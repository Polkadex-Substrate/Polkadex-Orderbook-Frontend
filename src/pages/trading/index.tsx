import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

import { defaultConfig } from "@polkadex/orderbook-config";
import { LOCAL_STORAGE_ID } from "@polkadex/web-constants";
import { useMarketsProvider } from "@polkadex/orderbook/providers/public/marketsProvider/useMarketsProvider";

function Home() {
  const router = useRouter();
  const persistedMarket = useMemo(
    () => process.browser && window.localStorage.getItem(LOCAL_STORAGE_ID.DEFAULT_MARKET),
    []
  );
  const { currentMarket } = useMarketsProvider();

  useEffect(() => {
    if (currentMarket)
      router.push(`${currentMarket.base_ticker + currentMarket.quote_ticker}`);
    else router.push(`/trading/${defaultConfig.landingPageMarket}`);
  }, [router, persistedMarket, currentMarket]);

  return <div />;
}

export default Home;
