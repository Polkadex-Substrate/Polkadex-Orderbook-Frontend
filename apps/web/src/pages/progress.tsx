import dynamic from "next/dynamic";
import { isPageDisabled } from "@orderbook/core/helpers";
import { defaultConfig } from "@orderbook/core/config";
import { GetServerSideProps } from "next";

const ProgressTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Progress").then(
      (mod) => mod.Progress
    ),
  {
    ssr: false,
  }
);

const Progress = () => <ProgressTemplate />;

export default Progress;

export const getServerSideProps: GetServerSideProps = async ({
  resolvedUrl,
}) => {
  const currentUrl = resolvedUrl.replace("/", "");
  const isUnderMaintenance = defaultConfig.maintenanceMode;
  const isDisabled = isPageDisabled(currentUrl, defaultConfig.underMaintenance);
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
    props: {},
  };
};
