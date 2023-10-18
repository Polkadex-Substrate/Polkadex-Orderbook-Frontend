import dynamic from "next/dynamic";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const ErrorTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Error").then(
      (mod) => mod.ErrorTemplate
    ),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
const NotFound = () => <ErrorTemplate />;

export default NotFound;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "molecules",
        "organisms",
        "common",
        "error",
      ])),
    },
  };
}
