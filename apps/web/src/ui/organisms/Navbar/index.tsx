import { useTranslation } from "next-i18next";
import { NavbarItem, Skeleton } from "@polkadex/orderbook-ui/molecules";
import { HeaderMarket } from "@polkadex/orderbook-ui/organisms";
import { useMarkets, useTickers } from "@orderbook/core/hooks";
import { getCurrentMarket, hasOnlyZeros } from "@orderbook/core/helpers";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { defaultTicker } from "@orderbook/core/constants";

import * as S from "./styles";

import { normalizeValue } from "@/utils/normalize";

type Props = {
  onOpenMarkets: () => void;
  market: string;
};

export const Navbar = ({ onOpenMarkets, market }: Props) => {
  const { currentTicker, tickerLoading } = useTickers(market);
  const { list, loading: isMarketFetching } = useMarkets();
  const currMarket = getCurrentMarket(list, market);

  const currentTradePrice = currentTicker?.currentPrice;
  const quoteAsset = currMarket?.quoteAsset;

  const currPrice = currentTicker?.close;
  const priceChangePerCent =
    (currentTicker?.priceChangePercent24Hr).toFixed(2) + "%";
  const isPriceChangeNegative = currentTicker?.priceChange24Hr < 0;
  const volume = currentTicker?.quoteVolume;
  const high = currentTicker?.high;
  const low = currentTicker?.low;

  const quotePrecision = currMarket?.quotePrecision || 0;
  const formattedVolume = Decimal.format(Number(volume), quotePrecision, ",");

  const price = hasOnlyZeros(currPrice.toString())
    ? currentTradePrice
    : currPrice;

  const { t: translation } = useTranslation("organisms");
  const t = (key: string, args = {}) => translation(`navbar.${key}`, args);

  const isPriceLoading =
    tickerLoading ||
    isMarketFetching ||
    !currMarket ||
    currentTicker.market === defaultTicker.market;

  const isLoading =
    tickerLoading ||
    isMarketFetching ||
    !currMarket ||
    currentTicker.market === defaultTicker.market;

  return (
    <S.Wrapper>
      <S.WrapperInfo>
        <S.ContainerPair>
          <HeaderMarket
            id={currMarket?.id || ""}
            pair={currMarket?.name || ""}
            pairTicker={currMarket?.baseAsset.ticker || ""}
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
            <InfoSkeleton width={normalizeValue(11)} />
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
                <InfoSkeleton width={normalizeValue(11)} />
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
  height = normalizeValue(4),
  width = normalizeValue(7),
}: SkeletonProps) => (
  <Skeleton style={{ marginBlock: 4 }} height={height} width={width} />
);
