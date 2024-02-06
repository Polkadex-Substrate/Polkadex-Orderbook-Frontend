import { Tokens, Table as PolkadexTable } from "@polkadex/ux";
import { useWindowSize } from "usehooks-ts";
import { Fragment, forwardRef, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { MarketCard } from "./marketCard";
import { ResponsiveData } from "./responsiveData";

import { TablePagination } from "@/components/ui";

export type Data = (typeof fakeData)[0];

export const Table = forwardRef<HTMLDivElement, { maxHeight: string }>(
  ({ maxHeight }, ref) => {
    const [state, setState] = useState<Data | null>(null);
    const { width } = useWindowSize();
    const router = useRouter();
    const responsiveView = useMemo(() => width <= 1000, [width]);

    useEffect(() => {
      if (!responsiveView && !!state) setState(null);
    }, [responsiveView, state]);

    return (
      <Fragment>
        <ResponsiveData
          open={!!state}
          onClose={() => setState(null)}
          data={state}
        />
        <div className="flex-1 flex flex-col justify-between border-b border-secondary-base">
          <div
            className="overflow-y-hidden hover:overflow-y-auto px-3"
            style={{ maxHeight, scrollbarGutter: "stable" }}
          >
            <PolkadexTable>
              <PolkadexTable.Header>
                <PolkadexTable.Row>
                  <PolkadexTable.Head>Name</PolkadexTable.Head>
                  <PolkadexTable.Head align="right">Score</PolkadexTable.Head>
                  {!responsiveView && (
                    <>
                      <PolkadexTable.Head align="right">TVL</PolkadexTable.Head>
                      <PolkadexTable.Head align="right">APY</PolkadexTable.Head>
                      <PolkadexTable.Head align="right">
                        Volume 7d
                      </PolkadexTable.Head>
                    </>
                  )}
                  <PolkadexTable.Head align="right">
                    Volume 24h
                  </PolkadexTable.Head>
                </PolkadexTable.Row>
              </PolkadexTable.Header>
              <PolkadexTable.Body>
                {fakeData.map((value) => {
                  const responsiveProps = responsiveView && {
                    role: "button",
                    onClick: () => setState(value),
                  };
                  const props = !responsiveView
                    ? {
                        role: "button",
                        onClick: () =>
                          router.push(
                            `/analytics/${value.ticker}${value.pair}`
                          ),
                      }
                    : {};

                  return (
                    <PolkadexTable.Row
                      key={value.id}
                      {...responsiveProps}
                      {...props}
                    >
                      <PolkadexTable.Cell>
                        <MarketCard
                          marketName={`${value.ticker}/${value.pair}`}
                          icon={value.icon as keyof typeof Tokens}
                          pairIcon={value.pairIcon as keyof typeof Tokens}
                        />
                      </PolkadexTable.Cell>
                      <PolkadexTable.Cell align="right">
                        {value.score.toString()}
                      </PolkadexTable.Cell>
                      {!responsiveView && (
                        <>
                          <PolkadexTable.Cell
                            align="right"
                            className="w-[10rem]"
                          >
                            {value.tvl.toString()}
                          </PolkadexTable.Cell>
                          <PolkadexTable.Cell
                            align="right"
                            className="w-[10rem]"
                          >
                            {value.apy.toString()}
                          </PolkadexTable.Cell>
                          <PolkadexTable.Cell
                            align="right"
                            className="w-[10rem]"
                          >
                            {value.vol7d.toString()}
                          </PolkadexTable.Cell>
                        </>
                      )}
                      <PolkadexTable.Cell align="right" className="w-[10rem]">
                        {value.vol24.toString()}
                      </PolkadexTable.Cell>
                    </PolkadexTable.Row>
                  );
                })}
              </PolkadexTable.Body>
            </PolkadexTable>
          </div>
          <TablePagination ref={ref} />
        </div>
      </Fragment>
    );
  }
);
Table.displayName = "Table";
const fakeData = [
  {
    id: 1,
    ticker: "ASTR",
    icon: "ASTR",
    name: "Astar",
    pair: "USDT",
    pairIcon: "USDT",
    tvl: 75000,
    apy: 800,
    vol24: 120000,
    vol7d: 85000,
    score: 92,
  },
  {
    id: 2,
    ticker: "PDEX",
    icon: "PDEX",
    name: "Polkadex",
    pair: "USDT",
    pairIcon: "USDT",
    tvl: 60000,
    apy: 750,
    vol24: 100000,
    vol7d: 78000,
    score: 85,
  },
  {
    id: 3,
    ticker: "IBTC",
    icon: "IBTC",
    name: "InterBTC",
    pair: "USDT",
    pairIcon: "USDT",
    tvl: 85000,
    apy: 880,
    vol24: 110000,
    vol7d: 92000,
    score: 88,
  },
  {
    id: 4,
    ticker: "DOT",
    icon: "DOT",
    name: "Polkadot",
    pair: "USDT",
    pairIcon: "USDT",
    tvl: 72000,
    apy: 820,
    vol24: 95000,
    vol7d: 80000,
    score: 78,
  },
  {
    id: 5,
    ticker: "USDT",
    icon: "USDT",
    name: "Tether",
    pair: "USDT",
    pairIcon: "USDT",
    tvl: 90000,
    apy: 920,
    vol24: 130000,
    vol7d: 98000,
    score: 95,
  },
  {
    id: 6,
    ticker: "GLMR",
    icon: "GLMR",
    name: "Moonbeam",
    pair: "USDT",
    pairIcon: "USDT",
    tvl: 68000,
    apy: 780,
    vol24: 89000,
    vol7d: 75000,
    score: 82,
  },
];
