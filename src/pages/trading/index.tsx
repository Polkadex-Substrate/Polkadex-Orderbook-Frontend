import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

import { defaultConfig } from "@polkadex/orderbook-config";
import { LOCAL_STORAGE_ID } from "@polkadex/web-constants";

function Home() {
  const router = useRouter();
  const persistedMarket = useMemo(
    () => process.browser && window.localStorage.getItem(LOCAL_STORAGE_ID.DEFAULT_MARKET),
    []
  );

  useEffect(() => {
    router.push(`/trading/${defaultConfig.landingPageMarket}`);
  }, [router, persistedMarket]);

  return <div />;
}

export default Home;
