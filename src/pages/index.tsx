import { useRouter } from "next/router";

function Home() {
  const router = useRouter();

  router.push("signIn");

  return <div />;
}

export default Home;
