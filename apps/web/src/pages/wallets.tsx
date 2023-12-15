import { GetServerSideProps } from "next";

import { getServerSidePropsWithTranslations } from "@/utils";

const Wallets = () => {
  return <h1>Wallets page</h1>;
};

export default Wallets;

const translations = ["molecules", "organisms", "common", "settings"];
export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithTranslations(translations);
