import { useEffect } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";

import { useReduxSelector } from "src/hooks";
import {
  currenciesFetch,
  marketsFetch,
  marketsTickersFetch,
  recentTradesFetch,
  selectCurrencies,
  selectCurrenciesLoading,
  selectCurrentMarket,
  selectMarkets,
  selectMarketsLoading,
  selectMarketTickers,
} from "src/modules";
import * as S from "src/styles/status";
import { Button, Icon, Logo, ThemeSwitch } from "src/ui";
import { recentTradesFetchSaga } from "src/modules/public/recentTrades/sagas/recentTradesFetchSaga";
function Home() {
  const dispatch = useDispatch();
  const currentMarket = useReduxSelector(selectCurrentMarket);

  // Markets
  const markets = useReduxSelector(selectMarkets);
  const marketsIsLoading = useReduxSelector(selectMarketsLoading);

  // Tickers
  const tickers = useReduxSelector(selectMarketTickers);

  // Tickers
  const currencies = useReduxSelector(selectCurrencies);
  const currenciesIsLoading = useReduxSelector(selectCurrenciesLoading);

  return (
    <S.Wrapper>
      <S.Header>
        <Link href="/">
          <a>
            <Icon icon="Return" background="none" size="xlarge" />
          </a>
        </Link>
        <S.Logo>
          <Logo href="/" />
          <span>Status</span>
        </S.Logo>
        <ThemeSwitch />
      </S.Header>
      <S.Content>
        <S.Status>
          <Icon
            icon="Verified"
            background="green"
            style={{
              margin: "0 auto",
              minWidth: "8rem",
              minHeight: "8rem",
              padding: "2rem",
              borderRadius: "20%",
            }}
          />
          <h1>Polkadex is up and running</h1>
          <p>
            Having trouble? Troubleshoot connection issues or email us at
            issues@polkadex.trade.com.
          </p>
          <Button
            title="Verify Again"
            background="primary"
            style={{ color: "white", margin: "0 auto" }}
          />
        </S.Status>
        <S.Information>
          <S.Nav>
            <h2>Current Status</h2>
            <S.Aside>
              <StatusType type="Verified" title="No issues" />
              <StatusType type="Close" title="Outage" />
              <StatusType type="Attention" title="Incident" />
            </S.Aside>
          </S.Nav>
          <S.Table>
            <Card
              title="Fetch Markets"
              description="/api/v2/peatio/public/markets"
              onClick={() => dispatch(marketsFetch())}
              dataToShow={markets}
              isLoading={marketsIsLoading}
            />
            <Card
              title="Fetch Tickers"
              description="/api/v2/peatio/public/markets/tickers"
              onClick={() => dispatch(marketsTickersFetch())}
              dataToShow={tickers}
              isLoading={marketsIsLoading}
            />
            <Card
              title="Fetch Currencies"
              description="/api/v2/peatio/public/currencies"
              onClick={() => dispatch(currenciesFetch())}
              dataToShow={currencies}
              isLoading={currenciesIsLoading}
            />
            <Card
              title="Fetch Depth Market"
              description="/api/v2/peatio/public/markets/dashbtc/depth"
              onClick={() => console.log("...")}
              dataToShow={[]}
              isLoading={false}
            />
            <Card
              title="Fetch K-line"
              description="/api/v2/finex/public/markets/dashbtc/k-line"
              onClick={() => console.log("...")}
              dataToShow={[]}
              isLoading={false}
            />
            <Card
              title="Fetch Recent Trades"
              description="/api/v2/peatio/public/markets/dashbtc/trades"
              onClick={() => console.log("...")}
              dataToShow={[]}
              isLoading={false}
            />
            <Card
              title="Fetch Orders"
              description={`/api/v2/peatio/market/orders?page=1&limit=10all`}
              onClick={() => console.log("...")}
              dataToShow={[]}
              isLoading={false}
            />
            <Card
              title="Fetch Cancel Order"
              description="/api/v2/peatio/market/orders/{id}/cancel"
              onClick={() => console.log("...")}
              dataToShow={[]}
              isLoading={false}
            />
            <Card
              title="Fetch Buy Order"
              description="/api/v2/peatio/market/orders"
              onClick={() => console.log("...")}
              dataToShow={[]}
              isLoading={false}
            />
            <Card
              title="Fetch Sell Order"
              description="/api/v2/peatio/market/orders"
              onClick={() => console.log("...")}
              dataToShow={[]}
              isLoading={false}
            />
            <Card
              title="Fetch User Auth"
              description="..."
              onClick={() => console.log("...")}
              dataToShow={[]}
              isLoading={false}
            />
            <Card
              title="Polkadot{.js} WS connection"
              description="No issues"
              type="Verified"
            />
          </S.Table>
        </S.Information>
      </S.Content>
    </S.Wrapper>
  );
}

type CardProps = {
  description?: string;
  onClick?: () => void;
  isLoading?: boolean;
  dataToShow?: any;
} & Props;

const Card = ({
  title = "",
  description = "",
  onClick,
  isLoading = false,
  dataToShow,
}: CardProps) => {
  const hasResult = !!dataToShow?.length || (dataToShow && Object.keys(dataToShow).length);
  const icon = getColor(hasResult ? "Verified" : "Close");

  useEffect(() => {
    if (hasResult) console.log(`${title} data:`, dataToShow);
  }, [dataToShow]);

  return (
    <S.Card>
      <S.CardContainer>
        <div>
          <button type="button" onClick={onClick} disabled={isLoading}>
            {isLoading ? "Loading.." : "Verify again"}
          </button>
          <h5>{title}</h5>
        </div>
        <p>
          {process.env.HOST_URL}
          <strong>{description}</strong>
        </p>
      </S.CardContainer>
      <Icon
        icon={icon.iconName}
        background={icon.color}
        style={{ width: "2rem", height: "2rem", padding: 5, borderRadius: "30%" }}
      />
    </S.Card>
  );
};

type Props = {
  type?: "Verified" | "Close" | "Attention";
  title?: string;
};

const StatusType = ({ type = "Verified", title = "No issues" }: Props) => {
  const icon = getColor(type);
  return (
    <S.AsideContainer>
      <Icon
        icon={icon.iconName}
        background={icon.color}
        style={{ width: "2rem", height: "2rem", padding: 5, borderRadius: "30%" }}
      />
      <span>{title}</span>
    </S.AsideContainer>
  );
};

const getColor = (value: "Verified" | "Close" | "Attention") => {
  let icon = {};
  switch (value) {
    case "Attention":
      return (icon = {
        iconName: value,
        color: "orange",
      });
    case "Close":
      return (icon = {
        iconName: value,
        color: "primary",
      });
    default:
      return (icon = {
        iconName: value,
        color: "green",
      });
  }
};
export default Home;
