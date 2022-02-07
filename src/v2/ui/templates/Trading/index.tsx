import { setTimeout } from "timers/promises";

import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useRouter } from "next/router";

import { AlertCard } from "../../molecules";

import * as S from "./styles";

import {
  Header,
  Markets,
  ExploreMarket,
  Orderbook,
  Chart,
  News,
  MyOrders,
  PlaceOrder,
  RecentTrades,
  Information,
  Footer,
} from "@orderbook/v2/ui/organisms";
import { Popup } from "@polkadex/orderbook-ui/molecules";
import { useMarketsFetch, useMarketsTickersFetch } from "@polkadex/orderbook-hooks";
export const Trading = () => {
  const [isActive, setIsActive] = useState(false);

  // Test data
  const [alerts, setAlerts] = useState([]);
  const { id } = useRouter().query;
  useMarketsFetch(id as string);
  useMarketsTickersFetch();

  if (!id) return <div />;
  const handleClose = () => setIsActive(!isActive);
  const handleRemoveAlert = (id: number) =>
    setAlerts((alert) => alert.filter((item) => id !== item.id));

  return (
    <S.Main>
      <Popup isVisible={isActive} onClose={handleClose} size="fitContent" isRightPosition>
        <Markets />
      </Popup>
      {!!alerts.length && (
        <S.AlertsWrapper>
          <TransitionGroup>
            {alerts.map((alert) => (
              <CSSTransition key={alert.id} timeout={500} classNames="animate-alert">
                <AlertCard
                  title={alert.title}
                  description={alert.description}
                  icon={alert.icon}
                  onClick={() => handleRemoveAlert(alert.id)}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </S.AlertsWrapper>
      )}
      <Header />
      <S.Wrapper>
        <S.Container>
          <Information onOpenMarkets={handleClose} />
          <Chart />
          <Orderbook />
          <ExploreMarket />
        </S.Container>
        <PlaceOrder />
        <MyOrders />
        <News />
        <RecentTrades />
      </S.Wrapper>
      <Footer />
    </S.Main>
  );
};
