import { RedirectType, permanentRedirect } from "next/navigation";

import { defaultConfig } from "@/config";

export default function Page() {
  const defaultPage = defaultConfig.defaultTransferToken;
  permanentRedirect(`/transfer/${defaultPage}`, "push" as RedirectType);
}
