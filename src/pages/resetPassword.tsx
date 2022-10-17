import dynamic from "next/dynamic";

const ResetPasswordTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/ResetPassword").then(
      (mod) => mod.ResetPasswordTemplate
    ),
  {
    ssr: false,
  }
);
const ResetPassword = () => <ResetPasswordTemplate />;

export default ResetPassword;
