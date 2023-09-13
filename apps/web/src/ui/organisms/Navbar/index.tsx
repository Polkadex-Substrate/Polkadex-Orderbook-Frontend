import { useTranslation } from "react-i18next";
import { NavbarItem, Skeleton } from "@polkadex/orderbook-ui/molecules";
import { HeaderMarket } from "@polkadex/orderbook-ui/organisms";
import { useAssetsProvider } from "@orderbook/core/providers/public/assetsProvider";
import {
  useMarketsProvider,
  defaultTickers,
} from "@orderbook/core/providers/public/marketsProvider";
import { useRecentTradesProvider } from "@orderbook/core/providers/public/recentTradesProvider";
import { hasOnlyZeros } from "@orderbook/core/helpers";
import { Decimal } from "@polkadex/orderbook-ui/atoms";

import * as S from "./styles";

export const Navbar = ({ onOpenMarkets }) => {
  const { getCurrentTradePrice, loading: isRecentTradeFetching } =
    useRecentTradesProvider();
  const currTrade = getCurrentTradePrice();
  const { selectGetAsset } = useAssetsProvider();
  const {
    currentMarket: currMarket,
    currentTicker,
    tickerLoading,
    loading: isMarketFetching,
  } = useMarketsProvider();
  const quoteAsset = selectGetAsset(currMarket?.quoteAssetId);
  const currPrice = currentTicker?.close;
  const priceChangePerCent =
    (currentTicker?.priceChangePercent24Hr).toFixed(2) + "%";
  const isPriceChangeNegative = currentTicker?.priceChange24Hr < 0;
  const volume = currentTicker?.volumeBase24hr;
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
            id={currMarket?.id}
            pair={currMarket?.name}
            pairTicker={currMarket?.base_ticker}
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
                price: quoteAsset?.symbol?.length
                  ? `(${quoteAsset?.symbol})`
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
            <InfoSkeleton width="12rem" />
          ) : (
            <NavbarItem
              label={t("volume24hr", {
                volume: quoteAsset?.symbol?.length
                  ? `(${quoteAsset?.symbol})`
                  : "",
              })}
              info={formattedVolume}
            />
          )}

          <S.WrapperVolume>
            <S.ContainerVolume>
              {isLoading ? (
                <InfoSkeleton width="12rem" />
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
  width = "8rem",
}: SkeletonProps) => <Skeleton height={height} width={width} />;