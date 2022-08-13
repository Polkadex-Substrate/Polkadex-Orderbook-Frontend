import dynamic from "next/dynamic";

const SignTemplate = dynamic(
  () => import("@polkadex/orderbook-ui/templates/Sign").then((mod) => mod.SignTemplate),
  {
    ssr: false,
  }
);
const Sign = () => <SignTemplate />;

export default Sign;
