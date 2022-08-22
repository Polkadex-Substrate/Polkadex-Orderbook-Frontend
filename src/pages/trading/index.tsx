import { useRouter } from "next/router";

function Home() {
  const router = useRouter();

  router.push("/trading/PDEXTDOT");

  return <div />;
}

export default Home;
