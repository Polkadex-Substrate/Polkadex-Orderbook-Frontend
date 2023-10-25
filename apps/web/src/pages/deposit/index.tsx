import { GetServerSideProps } from "next";

import { getServerSidePropsRedirect } from "@/utils";

export default function Deposit() {
  return <div />;
}

export const getServerSideProps: GetServerSideProps =
  getServerSidePropsRedirect("/deposit/PDEX");
