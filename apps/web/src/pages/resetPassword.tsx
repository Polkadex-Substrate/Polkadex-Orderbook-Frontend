import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";

import { getServerSidePropsWithTranslations } from "@/utils";

const ResetPasswordTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/ResetPassword").then(
      (mod) => mod.ResetPasswordTemplate
    ),
  {
    ssr: false,
  }
);
const ResetPassword = () => {
  return <ResetPasswordTemplate />;
};

export default ResetPassword;

const translations = ["molecules", "organisms", "common", "resetPassword"];
export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithTranslations(translations);
