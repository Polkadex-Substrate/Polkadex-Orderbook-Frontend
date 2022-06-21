import { useRouter } from "next/router";

function Home() {
  const router = useRouter();

  router.push("/v3/trading/PDEXTBTC");

  return <div />;
}

export default Home;
