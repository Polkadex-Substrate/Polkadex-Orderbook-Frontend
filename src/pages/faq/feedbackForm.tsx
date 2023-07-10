import { ReactNode } from "react";

import { Feedback } from "@polkadex/orderbook-ui/organisms";
import FAQLayout from "@polkadex/orderbook-ui/organisms/FAQLayout";

const FeedbackForm = () => {
  return <Feedback />;
};

FeedbackForm.getLayout = (page: ReactNode) => <FAQLayout>{page}</FAQLayout>;

export default FeedbackForm;
