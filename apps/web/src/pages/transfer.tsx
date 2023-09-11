import dynamic from "next/dynamic";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";

const TransferTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Transfer").then(
      (mod) => mod.TransferTemplate,
    ),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  },
);

const Transfer = () => <TransferTemplate />;

export default Transfer;
