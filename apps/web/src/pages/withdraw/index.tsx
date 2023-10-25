import { GetServerSideProps } from "next";

import { getServerSidePropsRedirect } from "@/utils";

export default function Withdraw() {
  return <div />;
}
export const getServerSideProps: GetServerSideProps =
  getServerSidePropsRedirect("/withdraw/PDEX");
