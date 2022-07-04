import Link from "next/link";

import * as S from "./styles";

import { Icon, Dropdown } from "@polkadex/orderbook-ui/molecules";
import { useFunds } from "@polkadex/orderbook/v2/hooks";

export const MyWallet = ({ hasLink = true }) => {
  return (
    <S.Main>
      <Dropdown header={<Header />} direction="bottomRight" priority="high">
        <WalletContent title="My Funds" hasLink={hasLink} />
      </Dropdown>
    </S.Main>
  );
};

const Header = ({ isActive = false }) => (
  <S.Header isActive={isActive}>
    <Icon name="Wallet" stroke="inverse" size="extraSmall" />
  </S.Header>
);

export const WalletContent = ({ title, locked = true, hasLink = true, hasMargin = false }) => {
  const { searchState, handleChange, balances } = useFunds();

  return (
    <S.Content hasMargin={hasMargin}>
      <S.Title>
        <h3>{title}</h3>
        {hasLink && <Link href="/wallet">Deposit/Withdraw</Link>}
      </S.Title>
      <S.Box>
        <S.Search>
          <Icon name="Search" stroke="text" size="extraSmall" />
          <input
            type="text"
            placeholder="Search"
            value={searchState}
            onChange={handleChange}
          />
        </S.Search>
        {!!balances.length && (
          <S.FundsWrapper hasScroll={balances.length > 5}>
            <S.FundsHeader hasLocked={locked}>
              <span>
                Name <Icon name="IncreaseFilter" size="small" />
              </span>
              {locked && (
                <span>
                  Available <Icon name="IncreaseFilter" size="small" />
                </span>
              )}

              <span>
                Locked <Icon name="IncreaseFilter" size="small" />
              </span>
            </S.FundsHeader>
            <S.FundsContent>
              {balances?.map((balance, i) => (
                <Card
                  key={i}
                  name={balance.name}
                  ticker={balance.symbol}
                  amount={Number(balance.free_balance) || 0}
                  lockedAmount={Number(balance.reserved_balance) || 0}
                  locked={locked}
                  id={balance.symbol}
                />
              ))}
            </S.FundsContent>
          </S.FundsWrapper>
        )}
      </S.Box>
    </S.Content>
  );
};

const Card = ({
  id,
  name,
  ticker,
  lockedAmount = 0.0,
  lockedAmountFiat = 0.0,
  amount = 0.0,
  amountFiat = 0.0,
  locked = true,
}) => {
  return (
    <S.Card hasLocked={locked}>
      <S.CardWrapper>
        <S.CardIconWrapper>
          <Icon isToken name="DOT" color="black" size="large" />
        </S.CardIconWrapper>
        <S.CardInfo>
          <p>{name}</p>
          <span>{ticker}</span>
        </S.CardInfo>
      </S.CardWrapper>
      <S.CardWrapper>
        <p>{amount.toFixed(7)}</p>
        <span>{amountFiat.toFixed(7)}</span>
      </S.CardWrapper>
      {locked && (
        <S.CardWrapper>
          <p>{lockedAmount.toFixed(7)}</p>
          <span>{lockedAmountFiat.toFixed(7)}</span>
        </S.CardWrapper>
      )}
    </S.Card>
  );
};
