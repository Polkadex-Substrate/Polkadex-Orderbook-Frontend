import dynamic from "next/dynamic";

const AssetsTemplate = dynamic(
  () => import("@polkadex/orderbook-ui/templates/Assets").then((mod) => mod.AssetsTemplate),
  {
    ssr: false,
  }
);
const Assets = () => <AssetsTemplate />;

export default Assets;
