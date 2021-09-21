import { useRouter } from "next/router";

function Home() {
  const router = useRouter();

  router.push("trading/dashbtc");

  return null;
}

export default Home;
