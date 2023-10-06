import dynamic from "next/dynamic";
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
