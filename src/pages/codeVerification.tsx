import dynamic from "next/dynamic";

const CodeVerificationTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/CodeVerification").then(
      (mod) => mod.CodeVerificationTemplate
    ),
  {
    ssr: false,
  }
);
const CodeVerification = () => <CodeVerificationTemplate />;

export default CodeVerification;
