import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
const LandingTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Landing").then(
      (mod) => mod.LandingTemplate
    ),
  {
    ssr: false,
  }
);
const Home = () => <LandingTemplate />;

export default Home;
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "molecules",
        "organisms",
        "common",
        "landing",
      ])),
    },
  };
}
