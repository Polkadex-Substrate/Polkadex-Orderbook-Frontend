import { useRouter } from "next/router";

function Home() {
  const router = useRouter();

  router.push("/trading/pdgsdx");

  return <div />;
}

export default Home;
