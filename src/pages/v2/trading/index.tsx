import { useRouter } from "next/router";

function Home() {
  const router = useRouter();

  router.push("/v2/trading/PDEXTBTC");

  return <div />;
}

export default Home;
