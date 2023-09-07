import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "@orderbook/core/providers/user/auth";

import { useDisabledPages } from "@/hooks";

const ResetPasswordFormTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/ResetPasswordForm").then(
      (mod) => mod.ResetPasswordFormTemplate,
    ),
  {
    ssr: false,
  },
);
const ResetPasswordForm = () => {
  const router = useRouter();
  const { disabled } = useDisabledPages();
  const {
    forgotPassword: { email },
  } = useAuth();
  const hasEmail = !!email;

  useEffect(() => {
    if (!hasEmail) router.push("/signIn");
  }, [router, hasEmail]);

  if (!hasEmail || disabled) return <div />;
  return <ResetPasswordFormTemplate />;
};

export default ResetPasswordForm;
