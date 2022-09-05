import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Withdraw() {
  const router = useRouter();

  useEffect(() => {
    router.push("/withdraw/PDEX");
  }, [router]);

  return <div />;
}
