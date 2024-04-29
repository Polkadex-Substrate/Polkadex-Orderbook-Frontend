import { RedirectType, permanentRedirect } from "next/navigation";

export default function Page() {
  permanentRedirect(`/thea/DOT`, "push" as RedirectType);
}
