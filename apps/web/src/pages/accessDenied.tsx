import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";

import { getServerSidePropsWithTranslations } from "@/utils";

const AccessDeniedTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/AccessDenied").then(
      (mod) => mod.AccessDeniedTemplate
    ),
  {
    ssr: false,
  }
);

const AccessDenied = () => <AccessDeniedTemplate />;

export default AccessDenied;

const translations = ["molecules", "organisms", "common", "accessDenied"];
export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithTranslations(translations);
