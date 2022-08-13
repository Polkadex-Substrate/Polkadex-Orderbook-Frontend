import dynamic from "next/dynamic";

const ConnectToPhone = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/ConnectToPhone").then(
      (mod) => mod.ConnectToPhone
    ),
  {
    ssr: false,
  }
);
const SignUp = () => <ConnectToPhone />;

export default SignUp;
