import Head from "next/head";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import { Dropdown } from "@polkadex/orderbook/v3/ui/molecules";
import {
  AvailableMessage,
  Popup,
  Tooltip,
  TooltipContent,
  TooltipHeader,
} from "@polkadex/orderbook-ui/molecules";
import { RemoveFromBlockchain, RemoveFromDevice } from "@polkadex/orderbook-ui/organisms";
import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";
import {
  useAccountManager,
  useLinkMainAccount,
  useReduxSelector,
} from "@polkadex/orderbook-hooks";
import { Switch } from "@polkadex/orderbook/v2/ui/molecules/Switcher";
import { selectIsSetMainAccountLoading } from "@polkadex/orderbook-modules";

export const AccountManagerTemplate = () => {
  const [state, setState] = useState(false);
  const [showSelected, setShowSelected] = useState(true);

  const [remove, setRemove] = useState<{
    isRemoveDevice: boolean;
    status: boolean;
    id?: string | number;
  }>({
    isRemoveDevice: false,
    status: false,
  });

  const {
    tradingAccounts,
    handleSelectTradeAccount,
    removeFromDevice,
    associatedTradeAccounts,
  } = useAccountManager();

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
    handleSelectMainAccount,
    shortWallet,
    currentMainAccount,
    isRegistered,
  } = useLinkMainAccount();

  const allTradingAccounts = useMemo(
    () =>
      tradingAccounts.filter((value) =>
        showSelected ? associatedTradeAccounts?.includes(value?.address) : value
      ),
    [tradingAccounts, associatedTradeAccounts, showSelected]
  );

  const userHasSelectedMainAccount = currentMainAccount?.name;
  const loading = useReduxSelector(selectIsSetMainAccountLoading);
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
                {!userHasSelectedMainAccount && (
                  <S.TitleText>Select Your Polkadex Account</S.TitleText>
                )}
                <S.SelectInputContainer>
                  <S.SelectInputFlex>
                    <S.SelectInputWrapper>
                      <Dropdown>
                        <Dropdown.Trigger>
                          <S.SelectAccount>
                            <S.SelectAccountContainer>
                              <Icons.Avatar />
                            </S.SelectAccountContainer>
                            <S.SelectAccountContainer>
                              <div>
                                <strong>
                                  {currentMainAccount?.name ||
                                    (loading ? "Loading..." : "Select your main account")}
                                </strong>
                                {shortWallet.length ? <span>{shortWallet}</span> : ""}
                              </div>
                              <div>
                                <Icons.ArrowBottom />
                              </div>
                            </S.SelectAccountContainer>
                          </S.SelectAccount>
                        </Dropdown.Trigger>
                        <Dropdown.Menu fill="secondaryBackgroundSolid">
                          {mainAccounts?.map((account) => {
                            const shortAddress =
                              account?.address?.slice(0, 10) +
                              "..." +
                              account?.address?.slice(account?.address?.length - 10);

                            return (
                              <Dropdown.Item key={account.address}>
                                <S.MyDropdownContentCard
                                  role="button"
                                  onClick={() => handleSelectMainAccount(account.address)}>
                                  {account.meta.name}
                                  <span>{shortAddress}</span>
                                </S.MyDropdownContentCard>
                              </Dropdown.Item>
                            );
                          })}
                        </Dropdown.Menu>
                      </Dropdown>
                    </S.SelectInputWrapper>
                    {userHasSelectedMainAccount && (
                      <>
                        {isRegistered ? (
                          <S.Verified>
                            <Icons.Verified /> Registered
                          </S.Verified>
                        ) : (
                          <S.UnVerified
                            type="button"
                            onClick={() => router.push("/linkAccount")}>
                            Register Now
                          </S.UnVerified>
                        )}
                      </>
                    )}
                  </S.SelectInputFlex>
                </S.SelectInputContainer>
              </S.TitleBalance>
              {userHasSelectedMainAccount && isRegistered && (
                <S.TitleActions>
                  <Link href="/deposit/PDEX">
                    <S.Deposit>Deposit</S.Deposit>
                  </Link>
                  <AvailableMessage message="Soon">
                    <Link href="/withdraw/PDEX">
                      <a>Withdraw</a>
                    </Link>
                  </AvailableMessage>
                  <AvailableMessage message="Soon">
                    <Link href="/history">
                      <a>History</a>
                    </Link>
                  </AvailableMessage>
                </S.TitleActions>
              )}
            </S.TitleWrapper>
          </S.Title>
          {userHasSelectedMainAccount ? (
            <S.Content>
              <S.ContentTitle>
                <h2>My Trading Accounts</h2>
                <div>
                  <span>Show only selected account</span>
                  <Switch
                    isActive={showSelected}
                    onChange={() => setShowSelected(!showSelected)}
                  />
                </div>
              </S.ContentTitle>
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
                    {allTradingAccounts.map((value) => (
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
                    <S.CreateAccount>
                      <S.CreateAccountWrapper>
                        <Link href={isRegistered ? "/createAccount" : "/linkAccount"}>
                          <a>
                            <div>
                              <Icons.Plus />
                            </div>
                            Create new account
                          </a>
                        </Link>{" "}
                        or
                        <Link href="/importAccount"> Import</Link>
                      </S.CreateAccountWrapper>
                    </S.CreateAccount>
                  </>
                )}
              </S.ContentGrid>
            </S.Content>
          ) : (
            <S.ContentEmpty>
              <div />
              <div />
              <div />
              <div />
            </S.ContentEmpty>
          )}
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
        <Dropdown>
          <Dropdown.Trigger>
            <S.DropdownHeader>
              Remove
              <div>
                <Icons.DropdownArrow stroke="secondaryText" />
              </div>
            </S.DropdownHeader>
          </Dropdown.Trigger>
          <Dropdown.Menu fill="secondaryBackgroundSolid">
            <Dropdown.Item key="removeBlockchain">
              <AvailableMessage>Remove from the blockchain</AvailableMessage>
            </Dropdown.Item>
            <Dropdown.Item key="removeBrowser">
              <AvailableMessage>Remove from my browser</AvailableMessage>
            </Dropdown.Item>
          </Dropdown.Menu>
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
