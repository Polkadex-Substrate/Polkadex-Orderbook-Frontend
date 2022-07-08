import * as S from "./styles";
import * as T from "./types";

import { Dropdown, Icon } from "@polkadex/orderbook-ui/molecules";
import { ResultFound, Search } from "@polkadex/orderbook/v3/ui/molecules";
import { useHistory } from "@polkadex/orderbook-hooks";

const History = () => {
  const {
    filterByType,
    onChangeFilterByType,
    search,
    onChangeSearch,
    transactionHistory,
    getAsset,
  } = useHistory();

  return (
    <S.Wrapper>
      <S.Title>
        <h2>History</h2>
        <S.TitleWrapper>
          <Search placeholder="Search by address" value={search} onChange={onChangeSearch} />
          <S.TitleIconWrapper>
            <Icon name="Calendar" size="extraSmall" />
          </S.TitleIconWrapper>
        </S.TitleWrapper>
        <Dropdown
          direction="bottomRight"
          isClickable
          header={<FiltersHeader selected={filterByType} />}>
          <Filters handleChange={onChangeFilterByType} />
        </Dropdown>
      </S.Title>
      <S.Content>
        {transactionHistory?.length ? (
          transactionHistory.map((value) => (
            <Card
              key={value.time}
              date={new Date(value.time).toLocaleString()}
              address={value.main_account}
              amount={`${value?.amount} ${getAsset(value?.asset)?.symbol}`}
              status={value.status}
              isDeposit={value.txn_type === "DEPOSIT"}
            />
          ))
        ) : (
          <ResultFound />
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
      <span>{address.substring(0, 15) + "..."}</span>
    </S.CardRight>
  </S.Card>
);

const Filters = ({ handleChange }) => (
  <S.HeaderFiltersContent>
    {["all", "deposit", "withdraw"].map((value) => (
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

export default History;
