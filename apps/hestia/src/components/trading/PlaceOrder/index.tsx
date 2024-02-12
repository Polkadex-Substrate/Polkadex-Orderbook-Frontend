"use client";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { Tabs } from "@polkadex/ux";
import { Market } from "@orderbook/core/utils/orderbookService/types";
import {
  tryUnlockTradeAccount,
  decimalPlaces,
  trimFloat,
} from "@orderbook/core/helpers";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";
import { useFunds } from "@orderbook/core/hooks";

import { LimitOrder } from "./Limit";
import { MarketOrder } from "./Market";
import { Unlock } from "./unlock";

type Props = { market?: Market };

export const PlaceOrder = forwardRef<HTMLDivElement, Props>(
  ({ market }, ref) => {
    const formRef = useRef<HTMLFormElement | null>(null);
    const [isPasswordProtected, setIsPasswordProtected] = useState(false);
    const { selectedAccount } = useConnectWalletProvider();
    const { getFreeProxyBalance } = useFunds();

    const pricePrecision =
      (market && decimalPlaces(market.price_tick_size)) || 0;
    const qtyPrecision = (market && decimalPlaces(market.qty_step_size)) || 0;

    const [availableQuoteAmount, availableBaseAmount] = useMemo(() => {
      const quoteAmount = trimFloat({
        value: getFreeProxyBalance(market?.quoteAsset?.id || "-1"),
        digitsAfterDecimal: pricePrecision,
      });
      const baseAmount = trimFloat({
        value: getFreeProxyBalance(market?.baseAsset?.id || "-1"),
        digitsAfterDecimal: qtyPrecision,
      });
      return [+quoteAmount, +baseAmount];
    }, [
      getFreeProxyBalance,
      market?.baseAsset?.id,
      market?.quoteAsset?.id,
      pricePrecision,
      qtyPrecision,
    ]);

    useEffect(() => {
      tryUnlockTradeAccount(selectedAccount);
      setIsPasswordProtected(Boolean(selectedAccount?.isLocked));
    }, [selectedAccount]);

    return (
      <Tabs defaultValue="limit">
        <div className="flex items-center justify-between border-b border-primary">
          <Tabs.List className="px-2 py-3">
            <Tabs.Trigger value="limit">Limit</Tabs.Trigger>
            <Tabs.Trigger value="market">Market</Tabs.Trigger>
            <Tabs.Trigger value="stopLimit" disabled>
              Stop Limit
            </Tabs.Trigger>
          </Tabs.List>
        </div>

        <div ref={ref} className="min-h-[18rem]">
          {isPasswordProtected ? (
            <div className="[&>form>div>div>div>div]:w-[20rem]">
              <Unlock
                onAction={(e) => {
                  formRef?.current?.dispatchEvent(
                    new Event("submit", { cancelable: true, bubbles: true })
                  );
                }}
                tempBrowserAccount={selectedAccount}
              />
            </div>
          ) : (
            <>
              <Tabs.Content
                value="limit"
                id="placeOrderContent"
                className="flex flex-1 flex-col gap-1 border-l border-l-primary bg-level-0 p-2"
              >
                <LimitOrder
                  market={market}
                  availableBaseAmount={availableBaseAmount}
                  availableQuoteAmount={availableQuoteAmount}
                />
              </Tabs.Content>
              <Tabs.Content
                value="market"
                id="placeOrderContent"
                className="flex flex-1 flex-col gap-1 border-l border-l-primary bg-level-0 p-2"
              >
                <MarketOrder
                  market={market}
                  availableBaseAmount={availableBaseAmount}
                  availableQuoteAmount={availableQuoteAmount}
                />
              </Tabs.Content>
            </>
          )}
        </div>
      </Tabs>
    );
  }
);
PlaceOrder.displayName = "PlaceOrder";
