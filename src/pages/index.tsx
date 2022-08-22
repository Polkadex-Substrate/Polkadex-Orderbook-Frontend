import { useRouter } from "next/router";

import { defaultConfig } from "@polkadex/orderbook-config";

function Home() {
  const router = useRouter();

  router.push("/trading/" + defaultConfig.landingPageMarket);

  return <div />;
}

export default Home;
