import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import classNames from "classnames";
import { useTransactionsProvider } from "@orderbook/core/providers/user/transactionsProvider";
import { intlFormat } from "date-fns";
import { useAssetsProvider } from "@orderbook/core/providers/public/assetsProvider";
import { useProfile } from "@orderbook/core/providers/user/profile";
import {
  useExtensionWallet,
  userMainAccountDetails,
} from "@orderbook/core/providers/user/extensionWallet";
import { Tab } from "@headlessui/react";

import { columns } from "./columns";
import * as S from "./styles";
import * as T from "./types";
import { WithdrawHistorySkeleton } from "./skeleton";

import { Checkbox, EmptyData, Search } from "@/ui/molecules";
import { Icons } from "@/ui/atoms";

export const WithdrawHistory = () => {
  const { deposits, loading: isTransactionsFetching } =
    useTransactionsProvider();

  const { selectedAccount } = useProfile();
  const { allAccounts } = useExtensionWallet();

  const { mainAddress } = selectedAccount;
  const { selectGetAsset } = useAssetsProvider();

  const fundingWallet = useMemo(
    () => userMainAccountDetails(mainAddress, allAccounts),
    [allAccounts, mainAddress]
  );

  const data = useMemo(
    () =>
      deposits.map((e) => {
        const token = selectGetAsset(e.asset);
        return {
          stid: e.stid,
          snapshot_id: e.snapshot_id,
          amount: e.amount,
          fee: e.fee,
          main_account: e.main_account,
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
          status: e.status,
          txn_type: e.txn_type,
          token: {
            ticker: token?.symbol,
            name: token?.name,
          },
          wallets: {
            fromWalletName: fundingWallet?.account?.meta?.name ?? "",
            fromWalletAddress: fundingWallet?.account?.address ?? "",
            toWalletType: "Trading Account",
          },
        } as T.Props;
      }),
    [
      deposits,
      selectGetAsset,
      fundingWallet?.account?.meta?.name,
      fundingWallet?.account?.address,
    ]
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <S.Wrapper>
      <S.Header>
        <h3>History</h3>
      </S.Header>
      <Tab.Group>
        <S.Container>
          <S.Title>
            <S.TabList>
              <S.TabItem>Pending</S.TabItem>
              <S.TabItem>Ready to claim</S.TabItem>
              <S.TabItem>Claimed</S.TabItem>
            </S.TabList>
            <S.TitleWrapper>
              <Search isFull placeholder="Search" />
              <Checkbox labelProps={{ style: { whiteSpace: "nowrap" } }}>
                Show only selected token
              </Checkbox>
            </S.TitleWrapper>
          </S.Title>
          <Tab.Panels>
            <Tab.Panel>
              <S.Table>
                <div />
              </S.Table>
            </Tab.Panel>
            <Tab.Panel>
              <div />
            </Tab.Panel>
            <Tab.Panel>
              <div />
            </Tab.Panel>
          </Tab.Panels>
        </S.Container>
      </Tab.Group>
    </S.Wrapper>
  );
};
