import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const AccessDeniedTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/AccessDenied").then(
      (mod) => mod.AccessDeniedTemplate
    ),
  {
    ssr: false,
  }
);

const AccessDenied = () => <AccessDeniedTemplate />;

export default AccessDenied;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "molecules",
        "organisms",
        "common",
        "accessDenied",
      ])),
    },
  };
}
