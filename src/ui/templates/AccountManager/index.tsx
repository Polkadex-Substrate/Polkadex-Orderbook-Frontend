import dynamic from "next/dynamic";
import Head from "next/head";
import { useRef, useState } from "react";
import Link from "next/link";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import {
  Dropdown,
  Tooltip,
  TooltipContent,
  TooltipHeader,
} from "@polkadex/orderbook-ui/molecules";

const Menu = dynamic(() => import("@polkadex/orderbook/v3/ui/organisms/Menu"), {
  ssr: false,
});

export const AccountManagerTemplate = () => {
  const [state, setState] = useState(false);

  return (
    <>
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
                <Link href="/withdrw">
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
              <Card
                title="Trading"
                address="esrWSxZY...8N7cxP3B"
                isUsing
                onRemoveFromBlockchain={() => console.log("onRemoveFromBlockchain")}
                onRemoveFromDevice={() => console.log("onRemoveFromDevice")}
                onUse={() => console.log("onUse")}
              />
              <Card
                title="Mobile"
                address="esrWSxZY...8N7cxP3B"
                onRemoveFromBlockchain={() => console.log("onRemoveFromBlockchain")}
                onRemoveFromDevice={() => console.log("onRemoveFromDevice")}
                onUse={() => console.log("onUse")}
              />
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
      <Link href="/accountManager">
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
