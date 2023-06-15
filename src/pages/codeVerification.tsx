import dynamic from "next/dynamic";

import { useDisabledPages } from "../hooks/useDisabledPages";

const CodeVerificationTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/CodeVerification").then(
      (mod) => mod.CodeVerificationTemplate
    ),
  {
    ssr: false,
  }
);
const CodeVerification = () => {
  const { disabled } = useDisabledPages();
  if (disabled) return <div />;

  return <CodeVerificationTemplate />;
};

export default CodeVerification;
