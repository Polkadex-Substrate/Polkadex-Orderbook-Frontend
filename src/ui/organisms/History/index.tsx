import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import * as S from "./styles";
import * as T from "./types";

import { Dropdown, Icon } from "@polkadex/orderbook-ui/molecules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  depositsFetch,
  selectDepositsData,
  selectHasUser,
  selectWithdrawsData,
  withdrawsFetch,
} from "@polkadex/orderbook-modules";

export const History = () => {
  const dispatch = useDispatch();
  const route = useRouter();

  const [selected, setSelected] = useState("All");
  const withdrawHistory = useReduxSelector(selectWithdrawsData);
  const depositHistory = useReduxSelector(selectDepositsData);
  const userLoggedIn = useReduxSelector(selectHasUser);

  const selectedValue = useMemo(() => {
    switch (selected) {
      case "Deposits":
        return depositHistory;
      case "Withdraws":
        return withdrawHistory;
      default:
        return [...(depositHistory || []), ...(withdrawHistory || [])];
    }
  }, [depositHistory, withdrawHistory, selected]);
  console.log("DEPOSITS:", depositHistory);
  console.log("WITHDRAWS:", withdrawHistory);

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
        <Dropdown direction="bottomRight" header={selected}>
          <Filters handleChange={setSelected} />
        </Dropdown>
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
                amount={`${value.amount} ${value.currency}`}
                amountInFiat={0.0}
              />
            ))}
      </S.Content>
    </S.Wrapper>
  );
};

export const Card = ({ date, address, txid, amount, amountInFiat = 0.0 }: T.HistoryProps) => (
  <a href={`/transaction/${txid}`}>
    <S.Card>
      <div>
        <span>{date}</span>
        <p>{address}</p>
      </div>
      <S.Aside>
        <span>
          <Icon
            name="ArrowRight"
            background="green"
            size="extraSmall"
            style={{ marginRight: 5 }}
          />
          {amount}
        </span>
        <p>~{amountInFiat} USD</p>
      </S.Aside>
    </S.Card>
  </a>
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
