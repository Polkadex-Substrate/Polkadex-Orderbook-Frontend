import { useRouter } from "next/router";

import NavbarItem from "../../molecules/NavbarItem";

import * as S from "./styles";

import { HeaderMarket } from "@polkadex/orderbook/v2/ui/organisms";
import { AvailableMessage, Button } from "@polkadex/orderbook-ui/molecules";
import { MyAccount, MyWallet, QuickLogin } from "@polkadex/orderbook/v2/ui/molecules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectHasUser } from "@polkadex/orderbook-modules";
import { Notifications } from "@polkadex/orderbook-ui/templates";

const Navbar = ({ onOpenMarkets }) => {
  const hasUser = useReduxSelector(selectHasUser);
  const router = useRouter();
  return (
    <S.Wrapper>
      <S.WrapperInfo>
        <S.ContainerPair>
          <HeaderMarket pair="DOT" pairTicker="UDD" onOpenMarkets={onOpenMarkets} />
        </S.ContainerPair>
        <S.ContainerInfo>
          <NavbarItem label="Last Trade Price (BTC)" info="0.03209666" />
          <NavbarItem label="Price 24h" info="+52.47%" color="Red" />
          <NavbarItem label="Volume 24h (DOT)" info="71,459.80" />
          <S.WrapperVolume>
            <S.VolumeHigh isNegative>
              <span>24h High</span>
              <AvailableMessage message="Soon" color="secondaryBackgroundSolid" isVisible>
                <p>0.5020201</p>
              </AvailableMessage>
            </S.VolumeHigh>
            <S.VolumeLow>
              <span>24h High</span>
              <AvailableMessage message="Soon" color="secondaryBackgroundSolid" isVisible>
                <p>0.5020201</p>
              </AvailableMessage>
            </S.VolumeLow>
          </S.WrapperVolume>
        </S.ContainerInfo>
      </S.WrapperInfo>
      {!hasUser ? (
        <S.Box>
          <AvailableMessage message="Soon" isPriority>
            <Notifications />
          </AvailableMessage>
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
          <QuickLogin
            label="Quick Access"
            title="Log in with QR Code"
            description="Scan this QR Code with the Polkadex mobile app to log in instantly."
            qrCodeValue={"test1, test2, test3"}
            background="inverse"
          />
        </S.Box>
      )}
    </S.Wrapper>
  );
};

export default Navbar;
