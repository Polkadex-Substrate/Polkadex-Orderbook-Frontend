import { useRouter } from "next/router";

export default function Deposit() {
  const router = useRouter();
  router.push("/deposit/1");
  return <div />;
}
