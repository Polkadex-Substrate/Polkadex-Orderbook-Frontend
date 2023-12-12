import { GetServerSideProps } from "next";

import { getServerSidePropsWithTranslations } from "@/utils";
import { LandingTemplate } from "@/ui/templates";

const Home = () => <LandingTemplate />;

export default Home;

const translations = ["molecules", "organisms", "common", "landing"];
export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithTranslations(translations);
