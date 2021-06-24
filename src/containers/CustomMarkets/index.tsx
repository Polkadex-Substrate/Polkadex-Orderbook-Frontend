import React, {useMemo, useState, useCallback, ChangeEvent} from "react"
import { useReduxSelector } from "src/hooks";
import { useIntl } from 'react-intl';
import {
  Market,
  selectCurrentMarket,
  selectMarkets,
  selectMarketsLoading,
  selectMarketTickers,
  setCurrentMarket,
} from 'src/modules/public/markets';
import { depthFetch } from 'src/modules/public/orderBook';
import { setCurrentPrice, selectUserInfo } from 'src/modules';
import { useDispatch } from "react-redux";
import {
  Decimal,
  CustomIcon,
  CustomIconToken,
  CustomInputPolkadex,
  CustomSkeleton,
  TabContent,
  TabHeader,
  Tabs,
  CustomTag,
} from "src/components";
import { incrementalOrderBook } from 'src/api';
import { useMarketsTickersFetch } from 'src/hooks';

import * as S from "./styles";
import { Props } from "./types";

const defaultTickers = {
  last: 0,
  volume: 0,
  price_change_percent: "+0.00",
};

const isNegative = (value: string) => {
  const result = /\+/.test(value || defaultTickers.price_change_percent);
  return result;
};

type initialMarkets = {
  last: string | number
  volume: string | number
  price_change_percent: string | number
  price_change_percent_num: string | number
} & Market;

export const CustomMarkets = ({ marketActive = false }) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const marketsData = useReduxSelector(selectMarkets);
  const marketTickers = useReduxSelector(selectMarketTickers);
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const userData = useReduxSelector(selectUserInfo);

  //Headers
  const headers = useMemo(() => {
    return {
      pair: formatMessage({ id: 'page.body.trade.header.markets.content.pair' }) ,
      price: formatMessage({ id: 'page.body.trade.header.markets.content.price' }),
      change: formatMessage({ id: 'page.body.trade.header.markets.content.change' }),
    }
  }
, [formatMessage]);

  const [fieldValue, setFieldValue] = useState({
    searchFieldValue: "",
    marketsTabsSelected: "",
  });

  const getData = useCallback(() => {
    return marketsData && marketsData.length > 0 && (
      getTickers().map((item, index) => (
        <ContentItem
          key={item.id}
          tokenIcon={item.base_unit}
          pair={item.name}
          vol={Decimal.format(
            Number(item.volume),
            item.price_precision,
            ","
          )}
          priceFiat={Decimal.format(
            Number(item.last),
            item.price_precision,
            ","
          )}
          price="0"
          change={item.price_change_percent}
          onClick={() => handleOnSelect(item.name)}
        />
       )
      )
    )   
  }, [marketTickers, marketsData]);

  const getTickers = useCallback(() => {
      const initialMarkets: initialMarkets[] = [];
      const allTickets = marketsData.map((item) => {
        if (item.state && item.state === 'hidden' && userData.role !== 'admin' && userData.role !== 'superadmin') {
          return [null, null, null, null];
        } else {
           return {
            ...item,
            last: (marketTickers[item.id] || defaultTickers).last,
            volume: (marketTickers[item.id] || defaultTickers).volume,
            price_change_percent: (marketTickers[item.id] || defaultTickers)
              .price_change_percent,
            price_change_percent_num: Number.parseFloat(
              (marketTickers[item.id] || defaultTickers).price_change_percent
            ),
          };
        }
      });
      
      if(allTickets) {
        const filterTicket = allTickets.filter(item => item[0] !== null)
        if (filterTicket) {
          return (filterTicket as initialMarkets[]).reduce((pv, cv) => {
          const [, quote] = cv.name.toLowerCase().split("/");
          if (
            cv.id
              .toLowerCase()
              .includes(fieldValue.searchFieldValue.toLowerCase()) &&
            (fieldValue.marketsTabsSelected === "" ||
              fieldValue.marketsTabsSelected.toLowerCase() === quote ||
              fieldValue.marketsTabsSelected.toLowerCase() === "all")
          ) {
            pv.push(cv);
          }
          return pv;
        }, initialMarkets);
        }
        
      } 
    }, [marketTickers, marketsData]);

  // Filters
  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFieldValue({ ...fieldValue, searchFieldValue: e.target.value });

  const handleMarketsTabsSelected = (value: string) =>
    setFieldValue({ ...fieldValue, marketsTabsSelected: value });

  const handleOnSelect = useCallback((index: string) => {
    const marketToSet = marketsData && marketsData.find(el => el.name === index);
    if (marketToSet && (!currentMarket || currentMarket.id !== marketToSet.id)) {
        dispatch(setCurrentMarket(marketToSet));
        if (!incrementalOrderBook()) {
            dispatch(depthFetch(marketToSet));
        }
    }
}, [currentMarket, dispatch, marketsData]);
 

  const getPairsName = (pv: string[], cv: Market) => {
    const [, quote] = cv.name.split("/");
    if (pv.indexOf(quote) === -1) {
      pv.push(quote);
    }
    return pv;
  };

  let allPairs: string[] = ["All"];
  allPairs = marketsData.reduce(getPairsName, allPairs);

  useMarketsTickersFetch()

  return (
    <S.Section marketActive={marketActive}>
      <Tabs>
        <S.Header>
          <S.HeaderContainer>
            <h3>Market</h3>
            <CustomInputPolkadex
              placeholder="Search.."
              icon={{ icon: "Search", background: "none" }}
              style={{ maxWidth: "5rem" }}
              value={fieldValue.searchFieldValue}
              onChange={handleFieldChange}
            />
          </S.HeaderContainer>

          <S.Pairs>
            <ul>
              {allPairs &&
                allPairs.map((item, i) => (
                  <TabHeader key={i}>
                    <S.PairBox>
                      <a
                        role="button"
                        onClick={() =>
                          handleMarketsTabsSelected(item.toLowerCase())
                        }
                      >
                        {item}
                      </a>
                    </S.PairBox>
                  </TabHeader>
                ))}
            </ul>
            <button type="button">
              <CustomIcon icon="Star" background="none" />
            </button>
          </S.Pairs>
        </S.Header>
        <S.Content>
          <S.TableHeader>
            <span>{headers.pair}</span>
            <span>{headers.price}</span>
            <span>{headers.change}</span>
          </S.TableHeader>
          <S.TableContent>
            {allPairs &&
              allPairs.map((item, i) => (
                <TabContent key={i}>
                  {getData()}
                  {/* <ContentLoading /> */}
                </TabContent>
              ))}
          </S.TableContent>
        </S.Content>
      </Tabs>
    </S.Section>
  );
};

const ContentItem = ({
  tokenIcon,
  pair,
  vol,
  priceFiat,
  price,
  change,
  onClick,
}: Props) => (
  <S.ContentItemWrapper onClick={onClick}>
    <S.ContentItemToken>
      {tokenIcon ? (
        <CustomIconToken icon={tokenIcon} />
      ) : (
        <CustomSkeleton width="4rem" height="4rem" style={{ marginRight: 10 }} />
      )}
      <div>
        {pair ? (
          <p>{pair}</p>
        ) : (
          <CustomSkeleton width="10rem" style={{ marginBottom: 10 }} />
        )}
        {vol ? <span>VOL $ {vol}</span> : <CustomSkeleton width="6rem" />}
      </div>
    </S.ContentItemToken>
    <S.ContentItemPrice>
      {priceFiat ? (
        <p>$ {priceFiat}</p>
      ) : (
        <CustomSkeleton width="6rem" style={{ marginBottom: 10 }} />
      )}
      {price ? <span>{price} BTC</span> : <CustomSkeleton width="4rem" />}
    </S.ContentItemPrice>
    {change ? (
      <CustomTag title={change} isPositive={isNegative(change.toString())} />
    ) : (
      <CustomSkeleton width="4rem" />
    )}
  </S.ContentItemWrapper>
);

const ContentLoading = () => (
  <>
    <ContentItem />
    <ContentItem />
    <ContentItem />
    <ContentItem />
    <ContentItem />
    <ContentItem />
  </>
);
