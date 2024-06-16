import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { Button, Tooltip, Typography } from "@polkadex/ux";
import { useState } from "react";
import CSVLink from "react-csv-downloader";
import { RiDownload2Line } from "@remixicon/react";

import { formatedDate } from "@/helpers";

const csvColumns = [
  "sourceChain",
  "destinationChain",
  "assetTicker",
  "status",
  "amount",
  "from",
  "hash",
  "date",
].map((c) => ({
  id: c,
}));

export const Export = ({ data, address }: { data: any[]; address: string }) => {
  const exportedFileName = `Bridge_${new Date().getTime()}_Polkadex_Thea`;
  const [loading, setLoading] = useState(false);
  const { onHandleAlert, onHandleError } = useSettingsProvider();

  const prepareData = async () => {
    try {
      onHandleAlert("Bridge history exported successfully...");
      return data?.map((item) => {
        const date = formatedDate(new Date(item.timestamp), false);

        return {
          sourceChain: item.from?.name ?? "",
          destinationChain: item.to?.name ?? "",
          assetTicker: item.asset?.ticker ?? "",
          status: item.status,
          amount: item.amount.toString(),
          from: address,
          hash: item.hash,
          date,
        };
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CSVLink
      columns={csvColumns}
      datas={prepareData}
      filename={exportedFileName}
      handleError={(e) =>
        onHandleError(`Some error occured: ${(e as Error).message}`)
      }
    >
      <Tooltip>
        <Tooltip.Trigger asChild>
          <Button.Outline appearance="secondary" size="sm" disabled={loading}>
            <RiDownload2Line className="w-4 h-4 inline-block mr-1" />
            {loading ? "Exporting..." : "Export"}
          </Button.Outline>
        </Tooltip.Trigger>
        <Tooltip.Content side="left" className="px-2 py-1">
          <Typography.Text size="sm" appearance="primary">
            * Last 6 months
          </Typography.Text>
        </Tooltip.Content>
      </Tooltip>
    </CSVLink>
  );
};
