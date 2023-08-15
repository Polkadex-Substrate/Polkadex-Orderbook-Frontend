import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { GetServerSideProps } from "next";

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
const CodeVerification = ({ email }: { email?: string }) => {
  const { disabled } = useDisabledPages();
  const router = useRouter();
  const {
    authInfo: { isAuthenticated: hasUser },
  } = useProfile();

  const { userConfirmed } = useAuth();

  const shouldRedirect = useMemo(
    () => (hasUser && userConfirmed) || !email,
    [hasUser, userConfirmed, email]
  );

  useEffect(() => {
    if (shouldRedirect) router.push("/trading");
  }, [shouldRedirect, router]);

  if (disabled || !email) return <div />;

  return <CodeVerificationTemplate email={email} />;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const email = query?.email;
  if (!email)
    return {
      redirect: {
        destination: "/trading",
        permanent: true,
      },
      props: {},
    };

  return {
    props: {
      email,
    },
  };
};
export default CodeVerification;
