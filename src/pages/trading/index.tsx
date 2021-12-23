import { useRouter } from "next/router";

function Home() {
  const router = useRouter();

  router.push("/trading/ethbtc");

  return <div />;
}

export default Home;
