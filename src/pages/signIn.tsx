import dynamic from "next/dynamic";

import { useDisabledPages } from "../hooks/useDisabledPages";

const SignInTemplate = dynamic(
  () => import("@polkadex/orderbook-ui/templates/SignIn").then((mod) => mod.SignInTemplate),
  {
    ssr: false,
  }
);
const SignIn = () => {
  const { disabled } = useDisabledPages();
  if (disabled) return <div />;

  return <SignInTemplate />;
};

export default SignIn;
