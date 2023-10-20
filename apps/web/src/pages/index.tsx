import dynamic from "next/dynamic";

import LoadingScreen from "@/ui/molecules/LoadingScreen";

const LandingTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Landing").then(
      (mod) => mod.LandingTemplate
    ),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
const Home = () => <LandingTemplate />;

export default Home;
