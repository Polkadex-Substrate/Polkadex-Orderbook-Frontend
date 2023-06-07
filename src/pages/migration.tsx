import dynamic from "next/dynamic";

const MigrationTemplate = dynamic(
  () => import("@polkadex/orderbook-ui/templates/Migration").then((mod) => mod.Migration),
  {
    ssr: false,
  }
);

const Migration = () => (
  <MigrationTemplate
    title="Orderbook v2 migration in progress"
    footerText="Join our Telegram for more updates!"
    buttonLink="/"
    textButton="Join Telegram"
  />
);

export default Migration;
