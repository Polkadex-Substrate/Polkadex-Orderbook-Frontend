import Head from "next/head";
import { useRef, useState } from "react";
import Link from "next/link";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import {
  Dropdown,
  Popup,
  Tooltip,
  TooltipContent,
  TooltipHeader,
} from "@polkadex/orderbook-ui/molecules";
import { RemoveFromBlockchain, RemoveFromDevice } from "@polkadex/orderbook-ui/organisms";
import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";

const testAccounts = [
  {
    id: 1,
    name: "Trading",
    address: "esrWSxZY...8N7cxP3B",
    isActive: true,
  },
  {
    id: 2,
    name: "Mobile",
    address: "8N7cxP3B...esrWSxZY",
    isActive: false,
  },
];

export const AccountManagerTemplate = () => {
  const [state, setState] = useState(false);
  const [remove, setRemove] = useState<{
    isRemoveDevice: boolean;
    status: boolean;
    id?: string | number;
  }>({
    isRemoveDevice: false,
    status: false,
  });

  const handleOpenRemove = (isDevice = false, id: string | number) =>
    setRemove({
      isRemoveDevice: !!isDevice,
      status: true,
      id,
    });
  const handleClose = () =>
    setRemove({
      ...remove,
      status: false,
    });

  const isLinkedAccount = true;

  return (
    <>
      <Popup isVisible={remove.status} onClose={handleClose} size="fitContent" isMessage>
        {remove.isRemoveDevice ? (
          <RemoveFromDevice handleClose={handleClose} />
        ) : (
          <RemoveFromBlockchain handleClose={handleClose} />
        )}
      </Popup>
      <Head>
        <title>Account Manager | Polkadex Orderbook</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <Menu handleChange={() => setState(!state)} />
        <S.Wrapper>
          <S.Title>
            <h1>Acount Manager</h1>
            <S.TitleWrapper>
              <S.TitleBalance>
                <div>
                  <Icons.Wallet />
                </div>
                <div>
                  <strong>Estimated Balance</strong>
                  <span>
                    25.622 PDEX <small> ~0.00 USD</small>
                  </span>
                </div>
              </S.TitleBalance>
              <S.TitleActions>
                <Link href="/deposit">
                  <a>Deposit</a>
                </Link>
                <Link href="/withdraw">
                  <a>Withdraw</a>
                </Link>
                <Link href="/history">
                  <a>History</a>
                </Link>
              </S.TitleActions>
            </S.TitleWrapper>
          </S.Title>
          <S.Content>
            <h2>My wallets</h2>

            <S.ContentGrid>
              {!isLinkedAccount ? (
                <S.LinkAccount>
                  <S.LinkAccountColumn>
                    <S.FlexCenter>
                      <span>Link your account</span>
                      <p>Connect your account to a main wallet to start using Orderbook</p>
                    </S.FlexCenter>
                  </S.LinkAccountColumn>
                  <Link href="/linkAccount">
                    <S.LinkAccountColumn as="a">
                      <S.LinkAccountColumnWrapper>
                        <Icons.PolkadotJs />
                      </S.LinkAccountColumnWrapper>
                      <S.LinkAccountColumnWrapper>
                        <div>
                          <span>Polkadot.js</span>
                          <p>Link your account using Polkadot.js extension</p>
                        </div>
                        <div>
                          <Icons.ArrowRight />
                        </div>
                      </S.LinkAccountColumnWrapper>
                    </S.LinkAccountColumn>
                  </Link>
                </S.LinkAccount>
              ) : (
                <>
                  {testAccounts.map((value) => (
                    <Card
                      key={value.id}
                      title={value.name}
                      address={value.address}
                      isUsing={value.isActive}
                      onRemoveFromBlockchain={() => handleOpenRemove(false, value.id)}
                      onRemoveFromDevice={() => handleOpenRemove(true, value.id)}
                      onUse={() => console.log("onUse account id:", value.id)}
                    />
                  ))}
                  <Link href="/createAccount">
                    <S.CreateAccount>
                      <S.CreateAccountWrapper>
                        <div>
                          <Icons.Plus />
                        </div>
                        Create new account or
                        <Link href="/importAccount"> Import</Link>
                      </S.CreateAccountWrapper>
                    </S.CreateAccount>
                  </Link>
                </>
              )}
            </S.ContentGrid>
          </S.Content>
        </S.Wrapper>
      </S.Main>
    </>
  );
};

export const Card = ({
  title,
  address,
  isUsing = false,
  onRemoveFromBlockchain,
  onRemoveFromDevice,
  onUse,
}) => {
  const buttonRef = useRef(null);
  const handleOnMouseOut = () => (buttonRef.current.innerHTML = "Copy to clipboard");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    buttonRef.current.innerHTML = "Copied";
  };
  return (
    <S.Card isActive={isUsing}>
      <Link href="/assets">
        <a>
          <S.CardHeader>
            <S.CardHeaderContent>
              <strong>{title} Account</strong>
              <span>
                <Tooltip>
                  <TooltipHeader>
                    <button type="button" onClick={handleCopy} onMouseOut={handleOnMouseOut}>
                      <Icons.Copy />
                    </button>
                  </TooltipHeader>
                  <TooltipContent>
                    <p ref={buttonRef}>Copy to clipboard</p>
                  </TooltipContent>
                </Tooltip>

                {address}
              </span>
            </S.CardHeaderContent>
            <S.CardHeaderIcon>
              <Icons.ArrowRight />
            </S.CardHeaderIcon>
          </S.CardHeader>
        </a>
      </Link>
      <S.CardContent>
        <Dropdown
          isClickable
          direction="bottom"
          header={
            <S.DropdownHeader>
              Remove
              <div>
                <Icons.DropdownArrow stroke="secondaryText" />
              </div>
            </S.DropdownHeader>
          }>
          <S.DropdownContent>
            <button type="button" onClick={onRemoveFromBlockchain}>
              Remove from the blockchain
            </button>
            <button type="button" onClick={onRemoveFromDevice}>
              Remove from my browser
            </button>
          </S.DropdownContent>
        </Dropdown>
        <S.ContentActions>
          {isUsing ? (
            <span>Using</span>
          ) : (
            <button type="button" onClick={onUse}>
              Use
            </button>
          )}
        </S.ContentActions>
      </S.CardContent>
    </S.Card>
  );
};
