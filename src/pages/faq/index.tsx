import dynamic from "next/dynamic";

import { useDisabledPages } from "../../hooks/useDisabledPages";

const FaqTemplate = dynamic(
  () => import("@polkadex/orderbook-ui/templates").then((mod) => mod.FaqTemplate),
  {
    ssr: false,
  }
);
const Faq = () => {
  const { disabled } = useDisabledPages();
  if (disabled) return <div />;

  return <FaqTemplate />;
};

export default Faq;
