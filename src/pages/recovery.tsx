import dynamic from "next/dynamic";

const RecoveryTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Recovery").then((mod) => mod.RecoveryTemplate),
  {
    ssr: false,
  }
);
const Recovery = () => <RecoveryTemplate />;

export default Recovery;
