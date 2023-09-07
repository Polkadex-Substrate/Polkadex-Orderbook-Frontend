import dynamic from "next/dynamic";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";

const ErrorTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Error").then(
      (mod) => mod.ErrorTemplate,
    ),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  },
);
const NotFound = () => <ErrorTemplate />;

export default NotFound;
