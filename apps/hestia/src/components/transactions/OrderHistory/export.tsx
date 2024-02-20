import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { exportOrderHistory } from "@orderbook/core/helpers";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useSessionProvider } from "@orderbook/core/providers/user/sessionProvider";
import { Button } from "@polkadex/ux";
import { useState } from "react";
import CSVLink from "react-csv-downloader";

const csvColumns = [
  "orderId",
  "date",
  "pair",
  "type",
  "price",
  "amount",
  "filled",
  "status",
  "fee",
].map((c) => ({
  id: c,
}));

export const Export = () => {
  const exportedFileName = `Order_History_${new Date().getTime()}_Polkadex_Orderbook`;
  const [loading, setLoading] = useState(false);
  const {
    selectedAddresses: { tradeAddress },
  } = useProfile();
  const { dateFrom, dateTo } = useSessionProvider();
  const { onHandleAlert, onHandleError, onHandleNotification } =
    useSettingsProvider();

  const prepareData = async () => {
    setLoading(true);
    onHandleNotification({
      type: "Information",
      message: "Gettting data ready...",
    });
    try {
      const allOrderHistory = await exportOrderHistory(
        tradeAddress,
        dateFrom,
        dateTo
      );
      onHandleAlert("Order history exported successfully...");
      return allOrderHistory?.map((order) => {
        const isSell = order.side === "Ask";
        const type = `${order.type}/${isSell ? "SELL" : "BUY"}`;
        const feeTicker = !isSell
          ? order.market.baseAsset.ticker
          : order.market.quoteAsset.ticker;
        return {
          orderId: order.orderId,
          date: order.timestamp.toLocaleString().replaceAll(",", ""),
          pair: order.market.name,
          type,
          price: String(order.price),
          amount: order.quantity,
          filled: order.filledQuantity,
          status: order.status,
          fee: `${order.fee} ${feeTicker}`,
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
      <Button.Outline appearance="secondary" size="sm" disabled={loading}>
        <ArrowDownTrayIcon className="w-4 h-4 inline-block mr-1" />
        {loading ? "Exporting..." : "Export"}
      </Button.Outline>
    </CSVLink>
  );
};
