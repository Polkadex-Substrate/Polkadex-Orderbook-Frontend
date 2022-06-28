import { useRouter } from "next/router";

import NavbarItem from "../../molecules/NavbarItem";

import * as S from "./styles";

import { HeaderMarket } from "@polkadex/orderbook/v2/ui/organisms";
import { Button } from "@polkadex/orderbook-ui/molecules";
import { MyAccount, MyWallet } from "@polkadex/orderbook/v2/ui/molecules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  selectCurrentMarket,
  selectCurrentMarketTickers,
  selectHasUser,
} from "@polkadex/orderbook-modules";
import { Notifications } from "@polkadex/orderbook-ui/templates";
import { selectGetAsset } from "@polkadex/orderbook/modules/public/assets";

const Navbar = ({ onOpenMarkets }) => {
  const hasUser = useReduxSelector(selectHasUser);
  const getAsset = useReduxSelector(selectGetAsset);
  const currMarket = useReduxSelector(selectCurrentMarket);
  const currentTickers = useReduxSelector(selectCurrentMarketTickers);
  const baseAsset = getAsset(currMarket?.assetIdArray[0]);
  const quoteAsset = getAsset(currMarket?.assetIdArray[1]);

  const currPrice = Number(currentTickers?.close).toFixed(2);
  const price_change_percent = Number(currentTickers?.priceChangePercent24Hr).toFixed(2) + "%";
  const isPriceChangeNegative = Number(currentTickers?.priceChange24Hr) < 0;
  const volume = Number(currentTickers?.volumeBase24hr).toFixed(2);
  const high = Number(currentTickers?.high).toFixed(2);
  const low = Number(currentTickers?.low).toFixed(2);

  const router = useRouter();
  return (
    <S.Wrapper>
      <S.WrapperInfo>
        <S.ContainerPair>
          <HeaderMarket
            pair={currMarket?.name}
            pairTicker="UDD"
            onOpenMarkets={onOpenMarkets}
          />
        </S.ContainerPair>
        <S.ContainerInfo>
          <NavbarItem label={`Price (${quoteAsset?.symbol})`} info={currPrice} />
          <NavbarItem
            label="Price % 24h"
            info={price_change_percent}
            color={isPriceChangeNegative ? "primary" : "green"}
          />
          <NavbarItem label={`Volume 24h (${quoteAsset?.symbol})`} info={volume} />
          <S.WrapperVolume>
            <S.VolumeHigh isNegative>
              <span>24h High</span>
              <p>{high}</p>
            </S.VolumeHigh>
            <S.VolumeLow>
              <span>24h Low</span>
              <p>{low}</p>
            </S.VolumeLow>
          </S.WrapperVolume>
        </S.ContainerInfo>
      </S.WrapperInfo>
      {hasUser ? (
        <S.Box>
          <Notifications />
          <MyWallet />
          <MyAccount />
        </S.Box>
      ) : (
        <S.Box>
          <Button
            onClick={() => router.push("/login")}
            color="white"
            icon={{
              name: "Wallet",
              background: "black",
              size: "extraMedium",
              stroke: "white",
            }}>
            Login/Sign Up
          </Button>
        </S.Box>
      )}
    </S.Wrapper>
  );
};

export default Navbar;
