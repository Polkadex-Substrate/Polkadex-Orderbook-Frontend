import { defaultConfig } from "@orderbook/core/config";
import { isPageDisabled } from "@orderbook/core/helpers";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSidePropsWithTranslations =
  (translationNamespaces: string[]): GetServerSideProps =>
  async ({ resolvedUrl, locale }) => {
    const translations = await serverSideTranslations(
      locale as string,
      translationNamespaces
    );

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
        props: {
          ...translations,
        },
      };
    }

    return {
      props: {
        ...translations,
      },
    };
  };
