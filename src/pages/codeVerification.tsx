import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { useDisabledPages } from "../hooks/useDisabledPages";
import { useAuth } from "../providers/user/auth";

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
  const email = router?.query?.email as string;
  const {
    authInfo: { isAuthenticated: hasUser },
  } = useProfile();

  const { userConfirmed } = useAuth();

  if ((hasUser && userConfirmed) || !email) router.push("/trading");

  if (disabled || !email) return <div />;

  return <CodeVerificationTemplate email={email} />;
};

export default CodeVerification;
