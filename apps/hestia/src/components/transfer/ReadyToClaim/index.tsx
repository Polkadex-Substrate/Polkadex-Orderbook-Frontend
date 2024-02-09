import {
  Skeleton,
  GenericMessage,
  Accordion,
  Tokens,
  Button,
} from "@polkadex/ux";
import { forwardRef, useMemo, useState } from "react";
import { useTransactions } from "@orderbook/core/hooks";
import { useProfile } from "@orderbook/core/providers/user/profile";
import {
  WithdrawGroup,
  WithdrawGroupItem,
  getFundingAccountDetail,
} from "@orderbook/core/helpers";
import { useExtensionAccounts } from "@polkadex/react-providers";
import { intlFormat } from "date-fns";

import { Table } from "./table";

import { FilteredAssetProps } from "@/hooks";
import { BatchCard } from "@/components/ui/ReadyToUse";
export interface ReadyToClaimProps extends WithdrawGroupItem {
  token: {
    name: string;
    ticker: string;
    assetId: string;
  };
  wallets: {
    fromWalletType: string;
    fromWalletName: string;
    fromWalletAddress: string;
    toWalletType: string;
  };
}

export interface ReadyToClaimDataProps extends Omit<WithdrawGroup, "items"> {
  items: ReadyToClaimProps[];
}

export const ReadyToClaim = forwardRef<
  HTMLDivElement,
  { maxHeight: string; selectedAsset: FilteredAssetProps }
>(({ maxHeight, selectedAsset }) => {
  console.log("....");
  const [showSelectedCoins, setShowSelectedCoins] = useState<boolean>(false);

  const { selectedAddresses } = useProfile();
  const { extensionAccounts } = useExtensionAccounts();
  const { loading, readyWithdrawals } = useTransactions();

  const { mainAddress } = selectedAddresses;
  const fundingWallet = useMemo(
    () => getFundingAccountDetail(mainAddress, extensionAccounts),
    [extensionAccounts, mainAddress]
  );

  const readyWithdrawalsData = useMemo(
    () =>
      readyWithdrawals.map((e) => {
        const items = e.items?.map((e) => {
          const token = e.asset;
          return {
            ...e,
            time: intlFormat(
              new Date(e.time),
              {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              },
              { locale: "EN" }
            ),
            token: {
              ticker: token?.ticker,
              name: token?.name,
              assetId: token?.id,
            },
            wallets: {
              fromWalletType: "Trading Account",
              fromWalletName: fundingWallet?.name ?? "",
              fromWalletAddress: fundingWallet?.address ?? "",
              toWalletType: "Funding Account",
            },
          };
        });
        return {
          ...e,
          items,
        } as ReadyToClaimDataProps;
      }),
    [readyWithdrawals, fundingWallet?.name, fundingWallet?.address]
  );

  const data = useMemo(() => {
    if (!showSelectedCoins) return readyWithdrawalsData;

    return readyWithdrawalsData.filter(({ items, id, sid }) => {
      const filteredItems = items.filter((item) => {
        const assetName = item.asset?.name;
        return assetName === selectedAsset?.name && item;
      });
      return (
        filteredItems.length && {
          id,
          sid,
          items: filteredItems,
        }
      );
    });
  }, [readyWithdrawalsData, selectedAsset?.name, showSelectedCoins]);

  if (loading)
    return (
      <div className="flex-1 flex flex-col gap-3 p-3">
        {new Array(8).fill("").map((_, i) => (
          <Skeleton key={i} loading className="h-5" />
        ))}
      </div>
    );
  return (
    <div className="flex-1 flex flex-col">
      {data.length ? (
        <div className="flex-1 flex flex-col justify-between border-b border-secondary-base min-h-40">
          <div
            className="overflow-y-hidden hover:overflow-y-auto px-3"
            style={{ maxHeight, scrollbarGutter: "stable" }}
          >
            <Accordion type="multiple">
              {data.map((value) => {
                const tickersSet = new Set(
                  value.items.map((v) => v.asset.ticker)
                );
                const icons = Array.from(tickersSet);
                const totalAmountSum =
                  icons.length === 1 &&
                  value.items.reduce(
                    (acc, curr) => acc + Number(curr.amount),
                    0
                  );

                const transactionsNum = `${value.items.length} Transactions`;
                const totalAmount = totalAmountSum
                  ? `(${totalAmountSum} ${icons[0]})`
                  : "";

                return (
                  <Accordion.Item value={value.id.toString()} key={value.id}>
                    <Accordion.Trigger className=" items-center py-4 border-b border-primary">
                      <div className="flex items-center justify-between flex-1">
                        <BatchCard
                          icons={icons as (keyof typeof Tokens)[]}
                          title={`Batch ${value.sid}`}
                          description={`${transactionsNum} ${totalAmount}`}
                        />
                        <Button.Solid
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.alert("Clicked");
                          }}
                        >
                          Claim tokens
                        </Button.Solid>
                      </div>

                      <Accordion.Icon />
                    </Accordion.Trigger>
                    <Accordion.Content className="border-b border-primary bg-level-1">
                      <Table data={value.items} />
                    </Accordion.Content>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          </div>
        </div>
      ) : (
        <GenericMessage
          title="No result found"
          illustration="NoResultFound"
          className="bg-level-1"
        />
      )}
    </div>
  );
});
ReadyToClaim.displayName = "ReadyToClaim";
