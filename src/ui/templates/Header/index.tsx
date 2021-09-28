import { useDispatch } from "react-redux";

import * as S from "./styles";

import { Logo, ThemeSwitch } from "src/ui/molecules";
import { Toolbar, MyAccountContent, MyAccountHeader, SignContent } from "src/ui/organisms";
import { Button, Decimal, Dropdown } from "src/ui/components";
import { useReduxSelector } from "src/hooks";
import {
  selectCurrentMarket,
  selectMarkets,
  selectMarketTickers,
  selectUserInfo,
} from "src/modules";

const defaultTicker = {
  amount: 0,
  low: 0,
  last: 0,
  high: 0,
  volume: 0,
  price_change_percent: "+0.00%",
};

export const Header = () => {
  const dispatch = useDispatch();
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const marketTickers = useReduxSelector(selectMarketTickers);
  const markets = useReduxSelector(selectMarkets);
  const user = useReduxSelector(selectUserInfo);

  const getTickerValue = (value: string) =>
    (marketTickers[currentMarket?.id] || defaultTicker)[value];
  const bidUnit = currentMarket?.quote_unit?.toUpperCase();
  const isPositive = /\+/.test(getTickerValue("price_change_percent"));

  return (
    <S.Wrapper>
      <S.Container>
        <S.Column>
          <Logo />
          <Toolbar
            currentMarket={currentMarket}
            markets={markets}
            lastPrice={`${Decimal.format(
              Number(getTickerValue("last")),
              currentMarket?.price_precision,
              ","
            )} ${bidUnit || ""}`}
            currentPrice={
              (marketTickers[currentMarket?.id] || defaultTicker).price_change_percent
            }
            color={isPositive ? "green" : "red"}
            volume={`${Decimal.format(
              Number(getTickerValue("volume")),
              currentMarket?.price_precision,
              ","
            )} ${bidUnit || ""}`}
            changeLow={`${Decimal.format(
              Number(getTickerValue("low")),
              currentMarket?.price_precision,
              ","
            )} ${bidUnit || ""}`}
            changeHigh={`${Decimal.format(
              Number(getTickerValue("high")),
              currentMarket?.price_precision,
              ","
            )} ${bidUnit || ""}`}
          />
        </S.Column>
        <S.Column>
          <ThemeSwitch />
          {user.address ? (
            <Dropdown title={<MyAccountHeader />} direction="bottom">
              <MyAccountContent />
            </Dropdown>
          ) : (
            <Dropdown
              isOpacity
              style={{ top: 0 }}
              title={<Button title="Connect to a Wallet" />}
              direction="bottomLeft">
              <SignContent />
            </Dropdown>
          )}
        </S.Column>
      </S.Container>
    </S.Wrapper>
  );
};
