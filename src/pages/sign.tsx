import dynamic from "next/dynamic";

import { useDisabledPages } from "../hooks/useDisabledPages";

const SignTemplate = dynamic(
  () => import("@polkadex/orderbook-ui/templates/Sign").then((mod) => mod.SignTemplate),
  {
    ssr: false,
  }
);
const Sign = () => {
  const { disabled } = useDisabledPages();
  if (disabled) return <div />;

  return <SignTemplate />;
};

export default Sign;
