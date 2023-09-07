import FAQLayout from "@polkadex/orderbook-ui/organisms/FAQLayout";

const Home = () => {
  return <div>Home page screen</div>;
};

Home.getLayout = (page) => <FAQLayout>{page}</FAQLayout>;

export default Home;
