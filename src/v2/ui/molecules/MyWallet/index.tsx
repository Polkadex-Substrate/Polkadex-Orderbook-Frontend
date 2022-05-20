import Link from "next/link";

import * as S from "./styles";

import { Icon, Dropdown } from "@polkadex/orderbook-ui/molecules";
import { getNameFromAssetId } from "@polkadex/orderbook/helpers/assetIdHelpers";
import { toCapitalize } from "@polkadex/web-helpers";
import { useFunds } from "@polkadex/orderbook/v2/hooks";

export const MyWallet = () => {
  return (
    <S.Main>
      <Dropdown header={<Header />} direction="bottomRight" priority="medium" isOpacity>
        <WalletContent title="My Funds" />
      </Dropdown>
    </S.Main>
  );
};

const Header = ({ isActive = false }) => (
  <S.Header isActive={isActive}>
    <Icon name="Wallet" stroke="inverse" size="extraSmall" />
  </S.Header>
);

export const WalletContent = ({ title, locked = true }) => {
  const {
    searchState,
    handleChange,
    // balances
  } = useFunds();
  const balances = [
    {
      ticker: 0,
      tickerName: 0,
      free: "0.00",
      used: "0.00",
      total: "0.00",
    },
    {
      ticker: 1,
      tickerName: 0,
      free: "0.00",
      used: "0.00",
      total: "0.00",
    },
  ];
  return (
    <S.Content>
      <S.Title>
        <h3>{title}</h3>
      </S.Title>
      <S.Box>
        <S.Search>
          <Icon name="Search" stroke="black" size="extraSmall" />
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
                  Locked <Icon name="IncreaseFilter" size="small" />
                </span>
              )}

              <span>
                Available <Icon name="IncreaseFilter" size="small" />
              </span>
            </S.FundsHeader>
            <S.FundsContent>
              {balances?.map((balance, i) => (
                <Card
                  key={i}
                  name={getNameFromAssetId(Number(balance.ticker))}
                  ticker={balance.tickerName}
                  amount={Number(balance.free)}
                  lockedAmount={Number(balance.used)}
                  locked={locked}
                  id={balance.ticker}
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
}) => (
  <S.Card hasLocked={locked}>
    <S.CardWrapper>
      <S.CardIconWrapper>
        <Icon name={ticker} color="black" isToken size="large" />
      </S.CardIconWrapper>
      <S.CardInfo>
        <p>{toCapitalize(name)}</p>
        <span>PDE</span>
      </S.CardInfo>
    </S.CardWrapper>
    {locked && (
      <S.CardWrapper>
        <p>{lockedAmount.toFixed(7)}</p>
        <span>{lockedAmountFiat.toFixed(7)}</span>
      </S.CardWrapper>
    )}

    <S.CardWrapper>
      <p>{amount.toFixed(7)}</p>
      <span>{amountFiat.toFixed(7)}</span>
    </S.CardWrapper>
    <S.CardActions>
      <Link href={`/wallet/${id}`}>
        <a>
          <Icon name="OrderBuy" color="black" size="medium" />
          <span>Deposit</span>
        </a>
      </Link>
      <Link href={`/wallet/${id}`}>
        <a>
          <Icon name="OrderSell" color="black" size="medium" />
          <span>Withdraw</span>
        </a>
      </Link>
    </S.CardActions>
  </S.Card>
);
