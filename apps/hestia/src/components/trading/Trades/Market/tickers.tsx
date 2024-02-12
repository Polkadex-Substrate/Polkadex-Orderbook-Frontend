import { Typography } from "@polkadex/ux";
import classNames from "classnames";
import React from "react";

export const Tickers = ({
  tickers,
  activeTicker,
  onChangeTicker,
}: {
  tickers: string[];
  activeTicker: string;
  onChangeTicker: (v: string) => void;
}) => {
  return (
    <div className="flex sticky bottom-0 justify-between items-center p-2 bg-level-1 border-t border-primary">
      <ul className=" list-none flex items-center gap-2">
        {tickers.map((marketTicker) => {
          const active = marketTicker === activeTicker;
          return (
            <li
              key={marketTicker}
              role="button"
              onClick={() => onChangeTicker(marketTicker)}
              className={classNames(
                active && "bg-level-4",
                "px-1 rounded-sm uppercase hover:bg-level-2 cursor-pointer transition-colors duration-300"
              )}
            >
              <Typography.Text
                size="xs"
                bold
                appearance={active ? "base" : "secondary"}
              >
                {marketTicker}
              </Typography.Text>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
