import { useRouter } from "next/router";
import { useEffect } from "react";
import { defaultConfig } from "@orderbook/core/config";

export function useDisabledPages() {
  const router = useRouter();
  const disabled = defaultConfig.underMaintenance?.some((word) =>
    router.pathname.includes(word),
  );

  useEffect(() => {
    if (disabled) router.push(defaultConfig.mainUrl);
  }, [disabled, router]);

  return {
    disabled,
  };
}
