import { NestedLayout, Question } from "@polkadex/orderbook-ui/organisms";
import FAQLayout from "@polkadex/orderbook-ui/organisms/FAQLayout";

const QuestionPage = () => {
  return <Question />;
};

QuestionPage.getLayout = (page) => (
  <FAQLayout>
    <NestedLayout>{page}</NestedLayout>
  </FAQLayout>
);

export default QuestionPage;
