import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { useDisabledPages } from "../hooks/useDisabledPages";

import { useProfile } from "@polkadex/orderbook/providers/user/profile";

const CodeVerificationTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/CodeVerification").then(
      (mod) => mod.CodeVerificationTemplate
    ),
  {
    ssr: false,
  }
);
const CodeVerification = () => {
  const { disabled } = useDisabledPages();
  const router = useRouter();

  const {
    authInfo: { isAuthenticated: hasUser },
  } = useProfile();

  if (hasUser) router.push("/trading");

  if (disabled) return <div />;

  return <CodeVerificationTemplate />;
};

export default CodeVerification;
