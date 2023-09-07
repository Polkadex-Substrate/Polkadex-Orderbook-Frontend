import dynamic from "next/dynamic";

import { useDisabledPages } from "@/hooks";

const ResetPasswordTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/ResetPassword").then(
      (mod) => mod.ResetPasswordTemplate,
    ),
  {
    ssr: false,
  },
);
const ResetPassword = () => {
  const { disabled } = useDisabledPages();
  if (disabled) return <div />;

  return <ResetPasswordTemplate />;
};

export default ResetPassword;
