import { Feedback } from "@polkadex/orderbook-ui/organisms";
import FAQLayout from "@polkadex/orderbook-ui/organisms/FAQLayout";

const FeedbackForm = () => {
  return <Feedback />;
};

FeedbackForm.getLayout = (page) => <FAQLayout>{page}</FAQLayout>;

export default FeedbackForm;
