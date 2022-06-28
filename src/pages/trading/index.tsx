import { useRouter } from "next/router";

function Home() {
  const router = useRouter();

  router.push("/trading/PDEXTBTC");

  return <div />;
}

export default Home;
