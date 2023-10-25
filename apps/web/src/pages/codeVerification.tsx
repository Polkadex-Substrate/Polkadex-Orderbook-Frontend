import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { GetServerSideProps } from "next";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useAuth } from "@orderbook/core/providers/user/auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { defaultConfig } from "@orderbook/core/config";
import { isPageDisabled } from "@orderbook/core/helpers";

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

  if (!email) return <div />;

  return <CodeVerificationTemplate email={email} />;
};

export default CodeVerification;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  resolvedUrl,
  locale,
}) => {
  const email = query?.email;
  const translations = await serverSideTranslations(locale as string, [
    "molecules",
    "organisms",
    "common",
    "codeVerification",
  ]);

  const currentUrl = resolvedUrl.replace("/", "");
  const isUnderMaintenance =  defaultConfig.maintenanceMode;
  const isDisabled = isPageDisabled(currentUrl, defaultConfig.underMaintenance);
  if (isDisabled || isUnderMaintenance || !email) {
    const destination = isUnderMaintenance ? "/maintenance" : "/trading";
    return {
      redirect: {
        destination,
        permanent: true,
      },
      props: {
        ...translations,
      },
    };
  }
  return {
    props: {
      email,
      ...translations,
    },
  };
};
