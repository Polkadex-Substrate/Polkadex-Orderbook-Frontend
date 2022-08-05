import { useRouter } from "next/router";

export default function Deposit() {
  const router = useRouter();
  router.push("/deposit/PDEX");
  return <div />;
}
