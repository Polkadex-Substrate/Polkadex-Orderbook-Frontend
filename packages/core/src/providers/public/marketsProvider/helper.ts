import _ from "lodash";
import * as queries from "@orderbook/core/graphql/queries";
import { decimalPlaces, isAssetPDEX } from "@orderbook/core/helpers";
import { sendQueryToAppSync } from "@orderbook/core/helpers/appsync";
import { getAllMarkets } from "@orderbook/core/graphql/queries";
import { POLKADEX_ASSET } from "@orderbook/core/constants";

import { IPublicAsset } from "../assetsProvider";

import { Market, MarketQueryResult, Ticker, TickerQueryResult } from "./types";

export const fetchMarkets = async (
  assets: IPublicAsset[]
): Promise<Market[]> => {
  const res = await sendQueryToAppSync({ query: getAllMarkets });
  const pairs: MarketQueryResult[] = res.data.getAllMarkets.items;
  const markets = pairs?.map(
    async (pair: MarketQueryResult): Promise<Market> => {
      const [baseAsset, quoteAsset] = pair.market.split("-");
      const { ticker: baseSymbol } = findAsset(assets, baseAsset);
      const { ticker: quoteSymbol } = findAsset(assets, quoteAsset);

      return {
        id: pair.market,
        name: baseSymbol + "/" + quoteSymbol,
        m: pair.market,
        base_ticker: baseSymbol,
        quote_ticker: quoteSymbol,
        baseAssetId: baseAsset,
        quoteAssetId: quoteAsset,
        base_precision: Number(pair.quote_asset_precision),
        quote_precision: Number(pair.quote_asset_precision),
        min_price: Number(pair.min_order_price),
        max_price: Number(pair.max_order_price),
        min_amount: Number(pair.min_order_qty),
        max_amount: Number(pair.max_order_qty),
        tokenTickerName: baseSymbol,
        price_tick_size: Number(pair.price_tick_size),
        qty_step_size: Number(pair.qty_step_size),
      };
    }
  );
  return await Promise.all(markets);
};

const findAsset = (
  assets: IPublicAsset[],
  id: string
): { name: string; ticker: string; assetId: string } => {
  if (isAssetPDEX(id)) {
    const { name, symbol, assetId } = POLKADEX_ASSET;
    return { name, ticker: symbol, assetId };
  }
  const asset = assets?.find(({ assetId }) => assetId === id);
  if (asset?.name && asset?.symbol && asset?.assetId)
    return {
      name: asset.name,
      ticker: asset.symbol,
      assetId: asset.assetId,
    };
  else throw new Error(`cannot find asset id: ${id}`);
};

export const fetchMarketTickers = async ({
  m: market,
  price_tick_size: priceTickSize,
  qty_step_size: qtyStepSize,
}: Market): Promise<Ticker> => {
  // TODO: check sendQueryToAppSync market variable
  const to = new Date().toISOString();
  // tickers are fetched for the last 24 hours
  const from = new Date(
    new Date().setDate(new Date().getDate() - 1)
  ).toISOString();
  const res = await sendQueryToAppSync({
    query: queries.getMarketTickers,
    variables: { market, from, to },
  });
  const item: TickerQueryResult = res.data.getMarketTickers.items;
  const priceChange = Number(item.c) - Number(item.o);
  const priceChangePercent = (priceChange / Number(item.o)) * 100;

  const pricePrecision = decimalPlaces(priceTickSize);
  const quotePrecision = decimalPlaces(qtyStepSize);

  return {
    m: market,
    priceChange24Hr: _.round(priceChange, pricePrecision),
    priceChangePercent24Hr: _.round(
      isNaN(priceChangePercent) ? 0 : priceChangePercent,
      pricePrecision
    ),
    open: _.round(Number(item.o), pricePrecision),
    close: _.round(Number(item.c), pricePrecision),
    high: _.round(Number(item.h), pricePrecision),
    low: _.round(Number(item.l), pricePrecision),
    volumeBase24hr: _.round(
      isNaN(Number(item.vb)) ? 0 : Number(item.vb),
      quotePrecision
    ),
    volumeQuote24Hr: _.round(Number(item.vq), quotePrecision),
  };
};
