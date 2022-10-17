import dynamic from "next/dynamic";

const ResetPasswordFormTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/ResetPasswordForm").then(
      (mod) => mod.ResetPasswordFormTemplate
    ),
  {
    ssr: false,
  }
);
const ResetPasswordForm = () => <ResetPasswordFormTemplate />;

export default ResetPasswordForm;
