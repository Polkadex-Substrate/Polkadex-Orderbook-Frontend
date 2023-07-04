import { Feedback } from "@polkadex/orderbook-ui/organisms";
import HomeLayout from "@polkadex/orderbook-ui/organisms/HomeLayout";

const FeedbackForm = () => {
  return <Feedback />;
};

FeedbackForm.getLayout = (page) => <HomeLayout>{page}</HomeLayout>;

export default FeedbackForm;
