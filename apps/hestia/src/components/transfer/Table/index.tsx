import { Tokens, Typography, Table as PolkadexTable } from "@polkadex/ux";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useWindowSize } from "usehooks-ts";
import { Fragment, forwardRef, useEffect, useMemo, useState } from "react";

import { TokenCard } from "@/components/ui/ReadyToUse";

export type Data = (typeof fakeData)[0];

export const Table = forwardRef<HTMLDivElement, { maxHeight: string }>(
  ({ maxHeight }, ref) => {
    const [state, setState] = useState<Data | null>(null);
    const { width } = useWindowSize();

    const responsiveView = useMemo(() => width <= 800, [width]);

    useEffect(() => {
      if (!responsiveView && !!state) setState(null);
    }, [responsiveView, state]);

    return (
      <Fragment>
        <div className="flex-1 flex flex-col justify-between border-b border-secondary-base">
          <div
            className="overflow-y-hidden hover:overflow-y-auto px-3"
            style={{ maxHeight, scrollbarGutter: "stable" }}
          >
            <PolkadexTable>
              <PolkadexTable.Header className="[&_th]:border-none">
                <PolkadexTable.Row className="border-none">
                  <PolkadexTable.Head>Token</PolkadexTable.Head>
                  <PolkadexTable.Head>Status</PolkadexTable.Head>
                  {!responsiveView && (
                    <>
                      <PolkadexTable.Head>Amount</PolkadexTable.Head>
                      <PolkadexTable.Head>Fees</PolkadexTable.Head>
                      <PolkadexTable.Head align="right">
                        From/To
                      </PolkadexTable.Head>
                      <PolkadexTable.Head align="right">
                        Date
                      </PolkadexTable.Head>
                    </>
                  )}
                </PolkadexTable.Row>
              </PolkadexTable.Header>
              <PolkadexTable.Body className="[&_tr]:border-none border-none">
                {fakeData.map((value) => {
                  const responsiveProps = responsiveView && {
                    role: "button",
                    onClick: () => setState(value),
                  };
                  return (
                    <PolkadexTable.Row key={value.id} {...responsiveProps}>
                      <PolkadexTable.Cell>
                        <TokenCard
                          tokenName={value.name}
                          ticker={value.ticker}
                          icon={value.icon as keyof typeof Tokens}
                        />
                      </PolkadexTable.Cell>
                      <PolkadexTable.Cell>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-success-base" />
                          <Typography.Text appearance="success">
                            {value.status}
                          </Typography.Text>
                        </div>
                      </PolkadexTable.Cell>
                      {!responsiveView && (
                        <>
                          <PolkadexTable.Cell>
                            {value.amount.toString()}
                          </PolkadexTable.Cell>
                          <PolkadexTable.Cell>
                            {value.fee.toString()}
                          </PolkadexTable.Cell>
                          <PolkadexTable.Cell className="flex justify-end ">
                            <div className="flex items-center gap-2">
                              <Typography.Text>Funding account</Typography.Text>
                              <div className="flex items-center justify-center bg-level-1 w-6 h-6 rounded-md">
                                <ArrowRightIcon className="w-4 h-4 text-primary" />
                              </div>
                              <Typography.Text>Trading account</Typography.Text>
                            </div>
                          </PolkadexTable.Cell>
                          <PolkadexTable.Cell align="right">
                            {new Date(value.date).toLocaleString().toString()}
                          </PolkadexTable.Cell>
                        </>
                      )}
                    </PolkadexTable.Row>
                  );
                })}
              </PolkadexTable.Body>
            </PolkadexTable>
          </div>
        </div>
      </Fragment>
    );
  }
);
Table.displayName = "Table";

const fakeData = [
  {
    id: 2,
    ticker: "ASTR",
    icon: "ASTR",
    name: "Astar",
    date: Date.now(),
    status: "Confirmed",
    amount: 100.0,
    fee: 0.0,
    from: {
      name: "Orderbook",
      address: "esqjzD3B...vHEyFVov",
    },
    to: {
      name: "Trading account",
    },
  },
  {
    id: 1,
    ticker: "ASTR",
    icon: "ASTR",
    name: "Astar",
    date: Date.now(),
    status: "Confirmed",
    amount: 200.0,
    fee: 0.0,
    from: {
      name: "Orderbook",
      address: "esqjzD3B...vHEyFVov",
    },
    to: {
      name: "Trading account",
    },
  },
  {
    id: 4,
    ticker: "ASTR",
    icon: "ASTR",
    name: "Astar",
    date: Date.now(),
    status: "Confirmed",
    amount: 200.0,
    fee: 0.0,
    from: {
      name: "Orderbook",
      address: "esqjzD3B...vHEyFVov",
    },
    to: {
      name: "Trading account",
    },
  },
  {
    id: 10,
    ticker: "ASTR",
    icon: "ASTR",
    name: "Astar",
    date: Date.now(),
    status: "Confirmed",
    amount: 200.0,
    fee: 0.0,
    from: {
      name: "Orderbook",
      address: "esqjzD3B...vHEyFVov",
    },
    to: {
      name: "Trading account",
    },
  },
  {
    id: 30,
    ticker: "ASTR",
    icon: "ASTR",
    name: "Astar",
    date: Date.now(),
    status: "Confirmed",
    amount: 200.0,
    fee: 0.0,
    from: {
      name: "Orderbook",
      address: "esqjzD3B...vHEyFVov",
    },
    to: {
      name: "Trading account",
    },
  },
  {
    id: 90,
    ticker: "ASTR",
    icon: "ASTR",
    name: "Astar",
    date: Date.now(),
    status: "Confirmed",
    amount: 200.0,
    fee: 0.0,
    from: {
      name: "Orderbook",
      address: "esqjzD3B...vHEyFVov",
    },
    to: {
      name: "Trading account",
    },
  },
  {
    id: 110,
    ticker: "ASTR",
    icon: "ASTR",
    name: "Astar",
    date: Date.now(),
    status: "Confirmed",
    amount: 200.0,
    fee: 0.0,
    from: {
      name: "Orderbook",
      address: "esqjzD3B...vHEyFVov",
    },
    to: {
      name: "Trading account",
    },
  },
];
