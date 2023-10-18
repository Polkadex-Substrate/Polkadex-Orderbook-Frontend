import dynamic from "next/dynamic";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const MaintenanceTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Maintenance").then(
      (mod) => mod.Maintenance
    ),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
const Maintenance = () => <MaintenanceTemplate />;

export default Maintenance;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "organisms",
        "common",
        "maintenance",
      ])),
    },
  };
}
