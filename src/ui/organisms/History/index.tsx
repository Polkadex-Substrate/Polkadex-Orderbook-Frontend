import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import * as S from "./styles";
import * as T from "./types";

import { Dropdown, Icon } from "@polkadex/orderbook-ui/molecules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  Deposits,
  depositsFetch,
  selectDepositsData,
  selectHasUser,
  selectWithdrawsData,
  UserWithdraws,
  withdrawsFetch,
} from "@polkadex/orderbook-modules";
import { getSymbolFromAssetId } from "@polkadex/orderbook/helpers/assetIdHelpers";

export const History = () => {
  const dispatch = useDispatch();
  const route = useRouter();

  const [selected, setSelected] = useState("All");
  const withdrawHistory = useReduxSelector(selectWithdrawsData);
  const depositHistory = useReduxSelector(selectDepositsData);
  const userLoggedIn = useReduxSelector(selectHasUser);

  const getValue = (values: Deposits[] | UserWithdraws[], isDeposit = false) => {
    return values?.map((item) => {
      return {
        ...item,
        isDeposit: isDeposit,
      };
    });
  };
  const selectedValue = [
    {
      isDeposit: false,
      id: "1",
      timestamp: new Date(Date.now()),
      currency: "0",
      amount: 0,
      from: "0x000000000000000000",
      to: "0x00000000000000000000",
      fee: 0.01,
    },
    {
      isDeposit: true,
      id: "2",
      timestamp: Date.now(),
      currency: "0",
      amount: 0.0,
      from: "0x000000000000000000",
      to: "0x000000000000000000",
      fee: 0.01,
    },
  ];

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

  console.log(selectedValue);
  useEffect(() => {
    if (userLoggedIn) {
      dispatch(depositsFetch());
      dispatch(withdrawsFetch());
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
        {!!selectedValue?.length &&
          selectedValue
            .filter((value) => value.currency === route.query.id)
            .map((value) => (
              <Card
                key={value.id}
                date={value.timestamp.toLocaleString()}
                address={value.from}
                txid={value.to}
                amount={`${value.amount.toFixed(6)} ${getSymbolFromAssetId(
                  Number(value.currency)
                )}`}
                amountInFiat={(0.0).toFixed(2)}
                isDeposit={value.isDeposit}
              />
            ))}
      </S.Content>
    </S.Wrapper>
  );
};

export const Card = ({
  date,
  address,
  txid,
  amount,
  amountInFiat = "0.0",
  isDeposit,
}: T.HistoryProps) => (
  <S.Card>
    <S.CardLeft>
      <S.CardIconWrapper>
        <Icon name={isDeposit ? "WalletDeposit" : "WalletWithdraw"} size="extraMedium" />
      </S.CardIconWrapper>
      <div>
        <span>{amount}</span>
        <p>~{amountInFiat} USD</p>
      </div>
    </S.CardLeft>
    <S.CardRight>
      <p>{date}</p>
      <a href="#txidHere" target="_blank">
        <Icon name="Link" size="extraSmall" />
        <span>{address}</span>
      </a>
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
