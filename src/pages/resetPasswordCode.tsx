import dynamic from "next/dynamic";

const ResetPasswordCodeTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/ResetPasswordCode").then(
      (mod) => mod.ResetPasswordCodeTemplate
    ),
  {
    ssr: false,
  }
);
const ResetPasswordCode = () => <ResetPasswordCodeTemplate />;

export default ResetPasswordCode;
