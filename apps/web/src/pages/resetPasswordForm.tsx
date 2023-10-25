import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "@orderbook/core/providers/user/auth";
import { GetServerSideProps } from "next";

import { getServerSidePropsWithTranslations } from "@/utils";

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
  const {
    forgotPassword: { email },
  } = useAuth();
  const hasEmail = !!email;

  useEffect(() => {
    if (!hasEmail) router.push("/signIn");
  }, [router, hasEmail]);

  if (!hasEmail) return <div />;
  return <ResetPasswordFormTemplate />;
};

export default ResetPasswordForm;

const translations = ["molecules", "organisms", "common", "resetPasswordForm"];
export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithTranslations(translations);
