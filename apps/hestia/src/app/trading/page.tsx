import { RedirectType, permanentRedirect } from "next/navigation";

import { defaultConfig } from "@/config";

export default function Page() {
  const defaultPage = defaultConfig.landingPageMarket;
  permanentRedirect(`/trading/${defaultPage}`, "push" as RedirectType);
}
