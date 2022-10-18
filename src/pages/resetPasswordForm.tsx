import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useReduxSelector } from "../hooks/useReduxSelector";
import { selectForgotPasswordEmail } from "../modules/user/auth";

const ResetPasswordFormTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/ResetPasswordForm").then(
      (mod) => mod.ResetPasswordFormTemplate
    ),
  {
    ssr: false,
  }
);
const ResetPasswordForm = () => {
  const router = useRouter();
  const hasEmail = !!useReduxSelector(selectForgotPasswordEmail)?.length;

  useEffect(() => {
    if (!hasEmail) router.push("/signIn");
  }, [router, hasEmail]);

  if (!hasEmail) return <div />;
  return <ResetPasswordFormTemplate />;
};

export default ResetPasswordForm;
