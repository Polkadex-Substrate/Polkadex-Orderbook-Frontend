import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Deposit() {
  const router = useRouter();

  useEffect(() => {
    router.push("/deposit/PDEX");
  }, [router]);

  return <div />;
}
