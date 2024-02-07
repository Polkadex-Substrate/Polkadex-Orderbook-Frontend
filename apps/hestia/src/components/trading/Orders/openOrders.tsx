import { useOpenOrders } from "@orderbook/core/hooks";
import { Skeleton } from "@polkadex/ux";

import { Table } from "./table";

export const OpenOrders = ({ market }: { market: string }) => {
  const { isLoading } = useOpenOrders(market);

  return (
    <div className="flex-1 flex flex-col gap-3 p-3">
      {new Array(8).fill("").map((_, i) => (
        <Skeleton key={i} loading className="flex-1 w-full h-5" />
      ))}
    </div>
  );
};
