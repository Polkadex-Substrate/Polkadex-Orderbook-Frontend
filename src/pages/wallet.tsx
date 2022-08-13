import dynamic from "next/dynamic";

const WalletTemplate = dynamic(
  () => import("@orderbook/v3/ui/templates/Wallet").then((mod) => mod.WalletTemplate),
  {
    ssr: false,
  }
);
const Wallet = () => <WalletTemplate />;

export default Wallet;
