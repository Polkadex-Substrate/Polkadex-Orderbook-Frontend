import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import * as S from "./styles";
import * as T from "./types";

import { Dropdown, Icon } from "@polkadex/orderbook-ui/molecules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  selectHasUser,
  selectTransactionData,
  transactionsFetch,
} from "@polkadex/orderbook-modules";
import { getSymbolFromAssetId } from "@polkadex/orderbook/helpers/assetIdHelpers";
import { selectGetAsset } from "@polkadex/orderbook/modules/public/assets";

const History = () => {
  const dispatch = useDispatch();
  const route = useRouter();
  const getAsset = useReduxSelector(selectGetAsset);
  const [selected, setSelected] = useState("All");
  const transactionsHistory = useReduxSelector(selectTransactionData);
  const transactionHistory = transactionsHistory.sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );
  const userLoggedIn = useReduxSelector(selectHasUser);

  // const getValue = (values: Deposits[] | UserWithdraws[], isDeposit = false) => {
  //   return values?.map((item) => {
  //     return {
  //       ...item,
  //       isDeposit: isDeposit,
  //     };
  //   });
  // };

  // const selectedValue = useMemo(() => {
  //   switch (selected) {
  //     case "Deposits":
  //       return getValue(depositHistory, true);
  //     case "Withdrawals":
  //       return getValue(withdrawHistory);
  //     default:
  //       return [
  //         ...(getValue(depositHistory, true) || []),
  //         ...(getValue(withdrawHistory) || []),
  //       ];
  //   }
  // }, [depositHistory, withdrawHistory, selected]);

  // console.log(selectedValue);
  useEffect(() => {
    if (userLoggedIn) {
      dispatch(transactionsFetch());
    }
  }, [userLoggedIn, dispatch]);

  return (
    <S.Wrapper>
      <S.Title>
        <h2>History</h2>
        <S.TitleWrapper>
          <Dropdown
            direction="bottomRight"
            isClickable
            header={<FiltersHeader selected={selected} />}>
            <Filters handleChange={setSelected} />
          </Dropdown>
          <S.TitleIconWrapper>
            <Icon name="Calendar" size="extraSmall" />
          </S.TitleIconWrapper>
          <S.TitleIconWrapper>
            <Icon name="Search" stroke="text" size="extraSmall" />
          </S.TitleIconWrapper>
        </S.TitleWrapper>
      </S.Title>
      <S.Content>
        {transactionHistory?.length ? (
          transactionHistory.map((value) => (
            <Card
              key={value.time}
              date={new Date(value.time).toLocaleString()}
              address={value.main_account}
              amount={`${value.amount} ${getAsset(value.asset).symbol}`}
              status={value.status}
              isDeposit={value.txn_type === "DEPOSIT"}
            />
          ))
        ) : (
          <EmptyData />
        )}
      </S.Content>
    </S.Wrapper>
  );
};

export const Card = ({ date, amount, address, status, isDeposit }: T.HistoryProps) => (
  <S.Card>
    <S.CardLeft>
      <S.CardIconWrapper>
        <Icon name={isDeposit ? "WalletDeposit" : "WalletWithdraw"} size="extraMedium" />
      </S.CardIconWrapper>
      <div>
        <span>{amount}</span>
        <p>{status}</p>
      </div>
    </S.CardLeft>
    <S.CardRight>
      <p>{date}</p>
      <Icon name="Link" size="extraSmall" />
      <span>{address.substring(0, 8) + "..."}</span>
    </S.CardRight>
  </S.Card>
);

const Filters = ({ handleChange }) => (
  <S.HeaderFiltersContent>
    {["All", "Deposits", "Withdrawals"].map((value) => (
      <S.HeaderFilters key={value} onClick={() => handleChange(value)}>
        <span>{value}</span>
      </S.HeaderFilters>
    ))}
  </S.HeaderFiltersContent>
);

const FiltersHeader = ({ selected = "All" }) => (
  <S.HeaderFilters isHeader>
    <span>{selected}</span>
    <Icon stroke="text" name="ArrowBottom" />
  </S.HeaderFilters>
);

const EmptyData = ({ message = "No Transactions" }) => (
  <S.Empty>
    <S.EmptyContainer>
      <img src="/img/emptyOrderbookSell.png" alt="Empty Trades" />
      <p>{message}</p>
    </S.EmptyContainer>
  </S.Empty>
);

export default History;
