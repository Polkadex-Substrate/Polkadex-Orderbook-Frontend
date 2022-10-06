import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import { Switch } from "@polkadex/orderbook-ui/molecules";
import { Dropdown } from "@polkadex/orderbook/v3/ui/molecules";

export const PreviewAccount = ({ onClose = undefined }) => {
  return (
    <S.Main>
      <S.Header type="button" onClick={onClose}>
        <Icons.SingleArrowLeft />
      </S.Header>
      <S.Content>
        <h2>Preview Wallet</h2>
        <S.Container>
          <S.Box>
            <WalletName label="Wallet name" information="Occasional-chamois" />
            <WalletAddress
              label="Trade wallet"
              information="5HmuAcVry1VWoK9...cVuVfAur1gDAa7kaF8"
            />
            <WalletAddress
              label="Controller wallet"
              information="Orderbook testing"
              additionalInformation="5E1hRUGF5rCs...juU4NKGrX5P8"
              isLocked
            />
            <ProtectedByPassword label="Protected by password" />
            <DefaultAccount label="Default trade account" />
          </S.Box>
          <S.Button disabled>Using</S.Button>
        </S.Container>
      </S.Content>
      <S.Footer>
        <S.ExportButton type="button">Export</S.ExportButton>
        <Dropdown>
          <Dropdown.Trigger>
            <S.DropdownButton type="button">
              Remove acccount
              <div>
                <Icons.ArrowBottom />
              </div>
            </S.DropdownButton>
          </Dropdown.Trigger>
          <Dropdown.Menu fill="secondaryBackgroundSolid">
            <Dropdown.Item>Remove from blockchain</Dropdown.Item>
            <Dropdown.Item>Remove from device</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </S.Footer>
    </S.Main>
  );
};

const WalletName = ({ label = "", information = "" }) => (
  <S.Card>
    <S.CardWrapper>
      <S.CardContent>
        <span>{label}</span>
        <S.CardInfo>
          <p>{information}</p>
        </S.CardInfo>
      </S.CardContent>
      <S.Actions>
        <button type="button">Edit</button>
      </S.Actions>
    </S.CardWrapper>
    <strong>18/30</strong>
  </S.Card>
);

const WalletAddress = ({
  label = "",
  information = "",
  additionalInformation = "",
  isLocked = false,
}) => (
  <S.CardWrapper>
    <S.CardContent>
      <S.CardBox>
        <span>{label}</span>
        {isLocked && (
          <div>
            <Icons.Lock />
          </div>
        )}
      </S.CardBox>
      <S.CardInfo>
        <div>
          <Icons.Copy />
        </div>
        <p>
          {information}
          {!!additionalInformation.length && <small> • {additionalInformation}</small>}
        </p>
      </S.CardInfo>
    </S.CardContent>
  </S.CardWrapper>
);

const ProtectedByPassword = ({ label = "" }) => (
  <S.CardWrapper>
    <S.CardContent>
      <S.CardBox>
        <span>{label}</span>
        <div>
          <Icons.Lock />
        </div>
      </S.CardBox>
    </S.CardContent>
    <S.Verified>
      <Icons.Verified />
    </S.Verified>
  </S.CardWrapper>
);

const DefaultAccount = ({ label = "" }) => (
  <S.CardWrapper>
    <S.CardContent>
      <span>{label}</span>
    </S.CardContent>
    <Switch />
  </S.CardWrapper>
);
