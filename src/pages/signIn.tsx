import dynamic from "next/dynamic";

const SignInTemplate = dynamic(
  () => import("@polkadex/orderbook-ui/templates/SignIn").then((mod) => mod.SignInTemplate),
  {
    ssr: false,
  }
);
const SignIn = () => <SignInTemplate />;

export default SignIn;
