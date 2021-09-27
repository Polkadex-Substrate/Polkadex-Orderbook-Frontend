import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

import * as S from "./styles";
import { Props } from "./types";

import {
  Decimal,
  Icon,
  IconToken,
  Input,
  Skeleton,
  TabContent,
  TabHeader,
  Tabs,
  Tag,
} from "src/ui/components";
import { Market, selectMarkets, selectMarketTickers, setCurrentMarket } from "src/modules";
import { useReduxSelector } from "src/hooks";

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
  last: string | number;
  volume: string | number;
  price_change_percent: string;
  price_change_percent_num: number;
} & Market;

export const Markets = ({ marketActive = false }) => {
  const [fieldValue, setFieldValue] = useState({
    searchFieldValue: "",
    marketsTabsSelected: "",
  });

  const marketTickets = useReduxSelector(selectMarketTickers);
  const markets = useReduxSelector(selectMarkets);
  const dispatch = useDispatch();
  const router = useRouter();

  // Filters
  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFieldValue({ ...fieldValue, searchFieldValue: e.target.value });

  const handleMarketsTabsSelected = (value: string) =>
    setFieldValue({ ...fieldValue, marketsTabsSelected: value });

  const handleChangeMarket = (e: string) => {
    const marketToSet = markets.find((el) => el.name === e);
    if (marketToSet) {
      router.push(`${marketToSet.id}`, undefined, { shallow: true });
      dispatch(setCurrentMarket(marketToSet));
    }
  };

  const getTickers = () => {
    const initialMarkets: initialMarkets[] = [];

    const allTickets = markets.map((item) => {
      return {
        ...item,
        last: (marketTickets[item.id] || defaultTickers).last,
        volume: (marketTickets[item.id] || defaultTickers).volume,
        price_change_percent: (marketTickets[item.id] || defaultTickers).price_change_percent,
        price_change_percent_num: Number.parseFloat(
          (marketTickets[item.id] || defaultTickers).price_change_percent
        ),
      };
    });

    // Filtered Tickets
    const allTicketsFilters = allTickets.reduce((pv, cv) => {
      const [, quote] = cv.name.toLowerCase().split("/");
      if (
        cv.id.toLowerCase().includes(fieldValue.searchFieldValue.toLowerCase()) &&
        (fieldValue.marketsTabsSelected === "" ||
          fieldValue.marketsTabsSelected.toLowerCase() === quote ||
          fieldValue.marketsTabsSelected.toLowerCase() === "all")
      ) {
        pv.push(cv);
      }
      return pv;
    }, initialMarkets);
    return allTicketsFilters;
  };

  const getPairsName = (pv: string[], cv: Market) => {
    const [, quote] = cv.name.split("/");
    if (pv.indexOf(quote) === -1) {
      pv.push(quote);
    }
    return pv;
  };

  let allPairs: string[] = ["All"];
  allPairs = markets.reduce(getPairsName, allPairs);

  return (
    <S.Section marketActive={true}>
      <Tabs>
        <S.Header>
          <S.HeaderContainer>
            <h3>Market</h3>
            <Input
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
                    <li>
                      <a
                        role="button"
                        onClick={() => handleMarketsTabsSelected(item.toLowerCase())}>
                        {item}
                      </a>
                    </li>
                  </TabHeader>
                ))}
            </ul>
            <button type="button">
              <Icon icon="Star" background="none" />
            </button>
          </S.Pairs>
        </S.Header>
        <S.Content>
          <S.TableHeader>
            <span>Pair</span>
            <span>Price</span>
            <span>Change</span>
          </S.TableHeader>
          <S.TableContent>
            {allPairs &&
              allPairs.map((item, i) => (
                <TabContent key={i}>
                  {markets.length > 0 ? (
                    getTickers().map((item, index) => (
                      <ContentItem
                        key={item.id}
                        tokenIcon={item.base_unit}
                        pair={item.name}
                        vol={Decimal.format(Number(item.volume), item.price_precision, ",")}
                        priceFiat={Decimal.format(
                          Number(item.last),
                          item.price_precision,
                          ","
                        )}
                        price="0"
                        change={item.price_change_percent}
                        onClick={() => handleChangeMarket(item.name)}
                      />
                    ))
                  ) : (
                    <ContentLoading />
                  )}
                </TabContent>
              ))}
          </S.TableContent>
        </S.Content>
      </Tabs>
    </S.Section>
  );
};

const ContentItem = ({ tokenIcon, pair, vol, priceFiat, price, change, onClick }: Props) => (
  <S.ContentItemWrapper onClick={onClick}>
    <S.ContentItemToken>
      {tokenIcon ? (
        <IconToken icon={tokenIcon} />
      ) : (
        <Skeleton width="4rem" height="4rem" style={{ marginRight: 10 }} />
      )}
      <div>
        {pair ? <p>{pair}</p> : <Skeleton width="10rem" style={{ marginBottom: 10 }} />}
        {vol ? <span>VOL $ {vol}</span> : <Skeleton width="6rem" />}
      </div>
    </S.ContentItemToken>
    <S.ContentItemPrice>
      {priceFiat ? (
        <p>$ {priceFiat}</p>
      ) : (
        <Skeleton width="6rem" style={{ marginBottom: 10 }} />
      )}
      {price ? <span>{price} BTC</span> : <Skeleton width="4rem" />}
    </S.ContentItemPrice>
    {change ? (
      <Tag title={change} isPositive={isNegative(change.toString())} />
    ) : (
      <Skeleton width="4rem" />
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
