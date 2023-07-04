import HomeLayout from "@polkadex/orderbook-ui/organisms/HomeLayout";

const Home = () => {
  return <div>Home page screen</div>;
};

Home.getLayout = (page) => <HomeLayout>{page}</HomeLayout>;

export default Home;
