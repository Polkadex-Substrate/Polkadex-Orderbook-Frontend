import FAQLayout from "@polkadex/orderbook-ui/organisms/FAQLayout";
import { GettingStartedComponent } from "@polkadex/orderbook-ui/organisms";

const GettingStarted = () => {
  return <GettingStartedComponent />;
};

GettingStarted.getLayout = (page) => <FAQLayout>{page}</FAQLayout>;

export default GettingStarted;
