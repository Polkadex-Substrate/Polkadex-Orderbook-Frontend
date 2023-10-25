import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";

import { getServerSidePropsWithTranslations } from "@/utils";

const MigrationTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Migration").then(
      (mod) => mod.Migration
    ),
  {
    ssr: false,
  }
);

const Migration = () => {
  return (
    <MigrationTemplate
      title="Orderbook v2 migration in progress"
      footerText="Join our Telegram for more updates!"
      textButton="Join Telegram"
      buttonLink="https://t.me/Polkadex"
      dateIntimestampMs={new Date("07/31/2023")}
    />
  );
};

export default Migration;

const translations = ["molecules", "organisms", "common", "migration"];
export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithTranslations(translations);
