import { useRouter } from "next/router";
import { useEffect } from "react";
import { defaultConfig } from "@orderbook/core/config";

function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push(defaultConfig.mainUrl);
  }, [router]);

  return <div />;
}

export default Home;
