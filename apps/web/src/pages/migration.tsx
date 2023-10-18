import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useDisabledPages } from "@/hooks";

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
  const { disabled } = useDisabledPages();
  if (disabled) return <div />;

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

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "molecules",
        "organisms",
        "common",
        "migration",
      ])),
    },
  };
}
