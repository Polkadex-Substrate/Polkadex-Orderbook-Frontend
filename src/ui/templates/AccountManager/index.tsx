import Head from "next/head";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import { Search } from "@polkadex/orderbook/v3/ui/molecules";
import {
  Dropdown,
  Popup,
  Tooltip,
  TooltipContent,
  TooltipHeader,
} from "@polkadex/orderbook-ui/molecules";
import { RemoveFromBlockchain, RemoveFromDevice } from "@polkadex/orderbook-ui/organisms";
import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";
import { useAccountManager, useLinkMainAccount } from "@polkadex/orderbook-hooks";

export const AccountManagerTemplate = () => {
  const [state, setState] = useState(false);
  const { tradingAccounts, handleSelectTradeAccount, removeFromDevice } = useAccountManager();
  const [search, setSearch] = useState("");
  const [remove, setRemove] = useState<{
    isRemoveDevice: boolean;
    status: boolean;
    id?: string | number;
  }>({
    isRemoveDevice: false,
    status: false,
  });
  const router = useRouter();
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

  const isLinkedAccount = tradingAccounts?.length > 0;
  const {
    mainAccounts,
    isRegistered,
    handleSelectMainAccount,
    shortWallet,
    currentMainAccount,
  } = useLinkMainAccount();

  const allMainAccounts = useMemo(
    () =>
      mainAccounts.reduce((pv, cv) => {
        if (cv.meta.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) pv.push(cv);
        return pv;
      }, []),
    [mainAccounts, search]
  );

  return (
    <>
      <Popup isVisible={remove.status} onClose={handleClose} size="fitContent" isMessage>
        {remove.isRemoveDevice ? (
          <RemoveFromDevice handleClose={removeFromDevice} />
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
            <h1>Account Manager</h1>
            <S.TitleWrapper>
              <S.TitleBalance>
                <S.TitleText>Select Your Polkadex Account</S.TitleText>
                <S.SelectInputContainer>
                  <S.SelectInputFlex>
                    <S.SelectInputWrapper>
                      <Dropdown
                        isClickable
                        direction="bottom"
                        header={
                          <S.SelectAccount>
                            <S.SelectAccountContainer>
                              <Icons.Avatar />
                            </S.SelectAccountContainer>
                            <S.SelectAccountContainer>
                              <div>
                                <strong>
                                  {currentMainAccount?.name || "Select your main account"}
                                </strong>
                                {shortWallet.length ? <span>{shortWallet}</span> : ""}
                              </div>
                              <div>
                                <Icons.ArrowBottom />
                              </div>
                            </S.SelectAccountContainer>
                          </S.SelectAccount>
                        }>
                        <S.MyDropdownContent>
                          <S.MyDropdownContentTitle>
                            <Search
                              type="text"
                              placeholder="Search.."
                              isFull
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                            />
                          </S.MyDropdownContentTitle>
                          {allMainAccounts?.map((account) => {
                            const shortAddress =
                              account?.address?.slice(0, 10) +
                              "..." +
                              account?.address?.slice(account?.address?.length - 10);

                            return (
                              <S.MyDropdownContentCard
                                key={account.address}
                                role="button"
                                onClick={() => handleSelectMainAccount(account.address)}>
                                {account.meta.name}
                                <span>{shortAddress}</span>
                              </S.MyDropdownContentCard>
                            );
                          })}
                        </S.MyDropdownContent>
                      </Dropdown>
                    </S.SelectInputWrapper>
                    {isRegistered ? (
                      <S.Verified>
                        <Icons.Verified /> Verified
                      </S.Verified>
                    ) : (
                      <S.UnVerified type="button" onClick={() => router.push("/linkAccount")}>
                        Register Now
                      </S.UnVerified>
                    )}
                  </S.SelectInputFlex>
                </S.SelectInputContainer>
              </S.TitleBalance>
              <S.TitleActions>
                <Link href="/deposit/PDEX">
                  <a>Deposit</a>
                </Link>
                <Link href="/withdraw/PDEX">
                  <a>Withdraw</a>
                </Link>
                <Link href="/history">
                  <a>History</a>
                </Link>
              </S.TitleActions>
            </S.TitleWrapper>
          </S.Title>
          <S.Content>
            <h2>My Trading Accounts</h2>

            <S.ContentGrid>
              {!isLinkedAccount ? (
                <S.LinkAccount>
                  <S.LinkAccountColumn>
                    <S.FlexCenter>
                      <span>Link your account</span>
                      <p>Connect your account to a main wallet to start using Orderbook</p>
                    </S.FlexCenter>
                  </S.LinkAccountColumn>
                  <Link href="linkAccount">
                    <S.LinkAccountColumn>
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
                  {tradingAccounts.map((value) => (
                    <Card
                      key={value.id}
                      title={value.name}
                      address={value.address}
                      isUsing={value.isActive}
                      onRemoveFromBlockchain={() => handleOpenRemove(false, value.id)}
                      onRemoveFromDevice={() => handleOpenRemove(true, value.id)}
                      onUse={() => handleSelectTradeAccount(value.address)}
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

const Card = ({
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

  const shortAddress = address?.slice(0, 10) + "..." + address?.slice(address?.length - 10);
  return (
    <S.Card isActive={isUsing}>
      <Link href="/assets">
        <a>
          <S.CardHeader>
            <S.CardHeaderContent>
              <strong>{title}</strong>
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
                {shortAddress}
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
