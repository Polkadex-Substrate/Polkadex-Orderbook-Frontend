import { useRouter } from "next/router";

function MainWallet() {
  const router = useRouter();

  router.push("/wallet/BTC");

  return <div />;
}

export default MainWallet;
