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
  const selectedValue = useMemo(() => {
    switch (selected) {
      case "Deposits":
        return getValue(depositHistory, true);
      case "Withdrawals":
        return getValue(withdrawHistory);
      default:
        return [
          ...(getValue(depositHistory, true) || []),
          ...(getValue(withdrawHistory) || []),
        ];
    }
  }, [depositHistory, withdrawHistory, selected]);

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
        <Dropdown
          direction="bottomRight"
          isClickable
          header={<FiltersHeader selected={selected} />}>
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
  amountInFiat = 0.0,
  isDeposit,
}: T.HistoryProps) => (
  <a href={`/transaction/${txid}`}>
    <S.Card>
      <div>
        <span>{date}</span>
        <p>{address}</p>
      </div>
      <S.Aside>
        <span>
          <Icon
            name={isDeposit ? "ArrowTop" : "ArrowBottom"}
            background={isDeposit ? "green" : "primary"}
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

const FiltersHeader = ({ selected = "All" }) => (
  <S.HeaderFilters isHeader>
    <span>{selected}</span>
    <Icon background="secondaryBackground" name="ArrowBottom" />
  </S.HeaderFilters>
);
