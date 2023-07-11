// TODO: Add types

import dynamic from "next/dynamic";
import { GetStaticProps } from "next";

import { useDisabledPages } from "../../hooks/useDisabledPages";

import FAQLayout from "@polkadex/orderbook-ui/organisms/FAQLayout";
import { introductionSection } from "@polkadex/orderbook/graphql/pages";
import client from "@polkadex/orderbook/graphql/client";

const FaqTemplate = dynamic(
  () => import("@polkadex/orderbook-ui/templates").then((mod) => mod.FaqTemplate),
  {
    ssr: false,
  }
);
const Faq = (props) => {
  const { disabled } = useDisabledPages();
  if (disabled) return <div />;

  return <FaqTemplate {...props} />;
};

export const getStaticProps: GetStaticProps = async () => {
  let data = {};

  try {
    const { faq }: any = await client.request(introductionSection);
    data = faq.data.attributes;
    return {
      props: {
        ...data,
      },
    };
  } catch (error) {
    console.log("Error", error, data);
    return {
      props: {
        ...data,
      },
    };
  }
};

Faq.getLayout = (page) => {
  const pageMessage = page?.props?.blocks?.[0];
  const pageQuickAccess = page?.props?.blocks?.[3];

  return (
    <FAQLayout pageMessage={pageMessage} pageQuickAccess={pageQuickAccess}>
      {page}
    </FAQLayout>
  );
};

export default Faq;
