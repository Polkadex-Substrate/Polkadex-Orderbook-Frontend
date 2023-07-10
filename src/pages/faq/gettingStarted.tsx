import { GettingStartedComponent } from "@polkadex/orderbook-ui/organisms";
import FAQLayout from "@polkadex/orderbook-ui/organisms/FAQLayout";

const GettingStarted = () => {
  return <GettingStartedComponent />;
};

GettingStarted.getLayout = (page) => <FAQLayout>{page}</FAQLayout>;

export default GettingStarted;
