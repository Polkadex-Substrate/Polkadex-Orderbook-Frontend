import { useTranslation } from "next-i18next";
import { NavbarItem, Skeleton } from "@polkadex/orderbook-ui/molecules";
import { HeaderMarket } from "@polkadex/orderbook-ui/organisms";
import { useAssetsMetaData, useRecentTrades } from "@orderbook/core/index";
import {
  useMarketsProvider,
  defaultTickers,
} from "@orderbook/core/providers/public/marketsProvider";
import { hasOnlyZeros } from "@orderbook/core/helpers";
import { Decimal } from "@polkadex/orderbook-ui/atoms";

import * as S from "./styles";

type Props = {
  onOpenMarkets: () => void;
  market: string;
};

export const Navbar = ({ onOpenMarkets, market }: Props) => {
  const { getCurrentTradePrice, loading: isRecentTradeFetching } =
    useRecentTrades(market);
  const currTrade = getCurrentTradePrice();
  const { selectGetAsset } = useAssetsMetaData();
  const {
    currentMarket: currMarket,
    currentTicker,
    tickerLoading,
    loading: isMarketFetching,
  } = useMarketsProvider();
  const quoteAsset = currMarket
    ? selectGetAsset(currMarket.quoteAssetId)
    : undefined;
  const currPrice = currentTicker?.close;
  const priceChangePerCent =
    (currentTicker?.priceChangePercent24Hr).toFixed(2) + "%";
  const isPriceChangeNegative = currentTicker?.priceChange24Hr < 0;
  const volume = currentTicker?.volumeQuote24Hr;
  const high = currentTicker?.high;
  const low = currentTicker?.low;

  const quotePrecision = currMarket?.quote_precision || 0;
  const formattedVolume = Decimal.format(Number(volume), quotePrecision, ",");

  const price = hasOnlyZeros(currPrice.toString()) ? currTrade : currPrice;

  const { t: translation } = useTranslation("organisms");
  const t = (key: string, args = {}) => translation(`navbar.${key}`, args);

  const isPriceLoading =
    isRecentTradeFetching ||
    tickerLoading ||
    isMarketFetching ||
    !currMarket ||
    currentTicker.m === defaultTickers.m;

  const isLoading =
    tickerLoading ||
    isMarketFetching ||
    !currMarket ||
    currentTicker.m === defaultTickers.m;

  return (
    <S.Wrapper>
      <S.WrapperInfo>
        <S.ContainerPair>
          <HeaderMarket
            id={currMarket?.id || ""}
            pair={currMarket?.name || ""}
            pairTicker={currMarket?.base_ticker || ""}
            onOpenMarkets={onOpenMarkets}
            isLoading={isLoading}
          />
        </S.ContainerPair>
        <S.ContainerInfo>
          {isPriceLoading ? (
            <InfoSkeleton />
          ) : (
            <NavbarItem
              label={t("price", {
                price: quoteAsset?.ticker?.length
                  ? `(${quoteAsset?.ticker})`
                  : "",
              })}
              info={price}
            />
          )}

          {isLoading ? (
            <InfoSkeleton />
          ) : (
            <NavbarItem
              label={t("price%24h")}
              info={priceChangePerCent}
              color={isPriceChangeNegative ? "primary" : "green"}
            />
          )}

          {isLoading ? (
            <InfoSkeleton width="11rem" />
          ) : (
            <NavbarItem
              label={t("volume24hr", {
                volume: quoteAsset?.ticker?.length
                  ? `(${quoteAsset?.ticker})`
                  : "",
              })}
              info={formattedVolume}
            />
          )}

          <S.WrapperVolume>
            <S.ContainerVolume>
              {isLoading ? (
                <InfoSkeleton width="11rem" />
              ) : (
                <>
                  <S.VolumeHigh>
                    <span>{t("24hrhigh")}</span>
                    <p>{high}</p>{" "}
                  </S.VolumeHigh>
                  <S.VolumeLow>
                    <span>{t("24hrlow")}</span>
                    <p>{low}</p>
                  </S.VolumeLow>
                </>
              )}
            </S.ContainerVolume>
          </S.WrapperVolume>
        </S.ContainerInfo>
      </S.WrapperInfo>
    </S.Wrapper>
  );
};

type SkeletonProps = {
  height?: string;
  width?: string;
};

export const InfoSkeleton = ({
  height = "4rem",
  width = "7rem",
}: SkeletonProps) => (
  <Skeleton style={{ marginBlock: 4 }} height={height} width={width} />
);
