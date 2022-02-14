import { useRouter } from "next/router";

function Home() {
  const router = useRouter();

  router.push("/v2/trading/pdgsdx");

  return <div />;
}

export default Home;
