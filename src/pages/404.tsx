import dynamic from "next/dynamic";

const ErrorTemplate = dynamic(
  () => import("@polkadex/orderbook-ui/templates/Error").then((mod) => mod.ErrorTemplate),
  {
    ssr: false,
  }
);
const NotFound = () => <ErrorTemplate />;

export default NotFound;
