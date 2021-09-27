import { useRouter } from "next/router";

function Home() {
  const router = useRouter();

  router.push("trading/btcusd");

  return <div />;
}

export default Home;
