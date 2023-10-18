import { defaultConfig } from "@orderbook/core/config";
import { isPageDisabled } from "@orderbook/core/helpers";
import { GetServerSideProps } from "next";

export const getServerSidePropsRedirect =
  (redirectTo: string): GetServerSideProps =>
  async ({ resolvedUrl }) => {
    const currentUrl = resolvedUrl.replace("/", "");
    const isUnderMaintenance = defaultConfig.maintenanceMode;
    const isDisabled = isPageDisabled(
      currentUrl,
      defaultConfig.underMaintenance
    );

    if (isDisabled || isUnderMaintenance) {
      const destination = isUnderMaintenance
        ? "/maintenance"
        : defaultConfig.mainUrl;

      return {
        redirect: {
          destination,
          permanent: true,
        },
        props: {},
      };
    }
    return {
      redirect: {
        destination: redirectTo,
        permanent: true,
      },
      props: {},
    };
  };
