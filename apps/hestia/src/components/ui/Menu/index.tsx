import { useWindowSize } from "usehooks-ts";
import classNames from "classnames";
import { useEffect, useState } from "react";

import { Card } from "./card";

export const Menu = () => {
  const [state, setState] = useState(false);
  const { width } = useWindowSize();

  const responsiveView = width <= 1050;
  const responsiveProps = responsiveView && {
    role: "button",
    onClick: () => {
      setState(true);
    },
  };

  useEffect(() => {
    if (!responsiveView && state) setState(false);
  }, [responsiveView, state]);

  return (
    <aside
      className={classNames(
        "flex sticky top-0",
        state && "fixed top-0 left-0 h-full z-[2]"
      )}
    >
      <div
        {...responsiveProps}
        style={{ scrollbarGutter: "stable" }}
        className={classNames(
          "flex flex-col justify-between py-2 border-r border-secondary-base bg-level-1 z-20 overflow-y-hidden hover:overflow-y-auto",
          responsiveProps && !state
            ? "max-w-[2.8rem] overflow-x-hidden"
            : "min-w-[14rem]"
        )}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <Card icon="RiWalletLine" href="/balances">
              Balances
            </Card>
            <Card icon="RiFileListLine" href="/history">
              History
            </Card>
            <Card icon="RiCoinLine" href="/rewards" newBadge>
              Rewards
            </Card>
            <Card icon="RiArrowUpDownLine" href="/">
              Bridge
            </Card>
            <Card icon="RiRouteLine" href="/">
              Swap
            </Card>
            <Card icon="RiArrowLeftRightLine" href="/transfer">
              Transfer
            </Card>
          </div>
        </div>
        <div className="flex flex-col">
          <Card icon="RiArchiveStackLine" href="/">
            Legal Links
          </Card>
          <Card icon="RiStarLine" href="/">
            Listings
          </Card>
          <Card icon="RiCustomerServiceLine" href="/">
            Help Center
          </Card>
        </div>
      </div>
      {responsiveView && state && (
        <div
          className="fixed z-10 bg-overlay-3 h-screen w-screen overflow-hidden"
          role="button"
          onClick={() => setState(!state)}
        />
      )}
    </aside>
  );
};
