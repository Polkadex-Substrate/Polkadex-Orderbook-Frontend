import dynamic from "next/dynamic";

const WithdrawTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Withdraw").then((mod) => mod.WithdrawTemplate),
  {
    ssr: false,
  }
);
const Withdraw = () => {
  return <div />;
  <WithdrawTemplate />;
};

export default Withdraw;
