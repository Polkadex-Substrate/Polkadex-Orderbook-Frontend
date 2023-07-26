import { useMarketsProvider } from "@polkadex/orderbook/providers/public/marketsProvider/useMarketsProvider";

function Home() {
  console.log("home page");
  const { currentMarket } = useMarketsProvider();
  console.log(currentMarket, "current market");

  return <div />;
}

export default Home;
