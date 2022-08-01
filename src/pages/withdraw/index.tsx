import { useRouter } from "next/router";

export default function Withdraw() {
  const router = useRouter();
  router.push("/withdraw/1");
  return <div />;
}
