import dynamic from "next/dynamic";
import { GetStaticProps } from "next";

import { useDisabledPages } from "../../hooks/useDisabledPages";

import { introductionSection } from "@polkadex/orderbook/graphql/pages";
import client from "@polkadex/orderbook/graphql/pages/client";

const FaqTemplate = dynamic(
  () => import("@polkadex/orderbook-ui/templates").then((mod) => mod.FaqTemplate),
  {
    ssr: false,
  }
);
const Faq = (props) => {
  const { disabled } = useDisabledPages();
  if (disabled) return <div />;

  return <FaqTemplate />;
};

export const getStaticProps: GetStaticProps = async () => {
  const { faq }: { faq: any } = await client.request(introductionSection);
  const data = faq?.data?.attributes ?? {};
  return {
    props: {
      ...data,
    },
  };
};
export default Faq;
