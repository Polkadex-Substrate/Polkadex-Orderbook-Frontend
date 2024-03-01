import { Button, Drawer } from "@polkadex/ux";
import { Fragment, useEffect, useState, forwardRef } from "react";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { Market } from "@orderbook/core/utils/orderbookService/types";

import { PlaceOrder } from ".";

import { ResponsiveProfile } from "@/components/ui/Header/Profile/responsiveProfile";

export const ResponsiveInteraction = forwardRef<
  HTMLDivElement,
  { isResponsive?: boolean; market?: Market }
>(({ isResponsive, market }, ref) => {
  const [buy, setBuy] = useState(false);
  const [sell, setSell] = useState(false);

  const { browserAccountPresent, extensionAccountPresent } =
    useConnectWalletProvider();
  const { onToogleConnectTrading } = useSettingsProvider();

  useEffect(() => {
    if (!isResponsive && (buy || sell)) {
      setBuy(false);
      setSell(false);
    }
  }, [buy, isResponsive, sell]);

  return (
    <Fragment>
      <Drawer open={buy || sell} onOpenChange={buy ? setBuy : setSell}>
        <Drawer.Content>
          <PlaceOrder isBuy={buy} isResponsive={isResponsive} market={market} />
        </Drawer.Content>
      </Drawer>
      <div
        ref={ref}
        className="flex flex-col gap-4 bg-level-1 border-t border-primary py-3 px-2 fixed bottom-0 left-0 w-full"
      >
        <ResponsiveProfile
          browserAccountPresent={browserAccountPresent}
          extensionAccountPresent={extensionAccountPresent}
        />
        {browserAccountPresent ? (
          <div className="flex gap-2 items-center w-full">
            <Button.Solid
              appearance="danger"
              className="flex-1"
              onClick={() => setBuy(true)}
            >
              Buy
            </Button.Solid>
            <Button.Solid
              appearance="success"
              className="flex-1"
              onClick={() => setSell(true)}
            >
              Sell
            </Button.Solid>
          </div>
        ) : (
          <Button.Solid
            type="button"
            appearance="secondary"
            onClick={() => onToogleConnectTrading(true)}
          >
            Connect Trading Account
          </Button.Solid>
        )}
      </div>
    </Fragment>
  );
});
ResponsiveInteraction.displayName = "ResponsiveInteraction";
