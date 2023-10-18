import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useDisabledPages } from "@/hooks";

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
  const { disabled } = useDisabledPages();
  if (disabled) return <div />;

  return <ResetPasswordTemplate />;
};

export default ResetPassword;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "molecules",
        "organisms",
        "common",
        "resetPassword",
      ])),
    },
  };
}
