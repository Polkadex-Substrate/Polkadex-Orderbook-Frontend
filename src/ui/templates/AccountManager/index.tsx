import Head from "next/head";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import {
  Checkbox,
  Icon,
  Table,
  AvailableMessage,
  Tooltip,
  TooltipContent,
  TooltipHeader,
} from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { Dropdown, Loading, Modal } from "@polkadex/orderbook/v3/ui/molecules";
import { RemoveFromBlockchain, RemoveFromDevice } from "@polkadex/orderbook-ui/organisms";
import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";
import {
  useAccountManager,
  useLinkMainAccount,
  useReduxSelector,
} from "@polkadex/orderbook-hooks";
import { Switch } from "@polkadex/orderbook/v2/ui/molecules/Switcher";
import {
  removeProxyAccountFromChainFetch,
  selectAssociatedTradeAccountsLoading,
  selectHasCurrentTradeAccount,
  selectHasExtension,
  selectIsCurrentMainAccountInWallet,
  selectIsSetMainAccountLoading,
  selectUserBalance,
} from "@polkadex/orderbook-modules";
import { selectAllAssets } from "@polkadex/orderbook/modules/public/assets";
import { UnlockAccount } from "@polkadex/orderbook-ui/organisms/UnlockAccount";

export const AccountManagerTemplate = () => {
  const [state, setState] = useState(false);
  const [unlockAccount, setUnlockAccount] = useState({
    address: "",
    status: false,
  });

  const [showSelected, setShowSelected] = useState(true);

  const [remove, setRemove] = useState<{
    isRemoveDevice: boolean;
    status: boolean;
    id?: string | number;
  }>({
    isRemoveDevice: false,
    status: false,
  });
  const hasExtension = useReduxSelector(selectHasExtension);
  const loading = useReduxSelector(selectIsSetMainAccountLoading);
  const loadingTradeAccounts = useReduxSelector(selectAssociatedTradeAccountsLoading);
  const userHasSelectedMainAccount = useReduxSelector(selectIsCurrentMainAccountInWallet);
  const userHasSelectedProxyAccount = useReduxSelector(selectHasCurrentTradeAccount);

  const assets = useReduxSelector(selectAllAssets);
  const balances = useReduxSelector(selectUserBalance);
  const {
    tradingAccounts,
    handleSelectTradeAccount,
    removeFromDevice,
    associatedTradeAccounts,
  } = useAccountManager();

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

  const shouldSelectDefaultTradeAccount = useMemo(
    () =>
      userHasSelectedMainAccount &&
      isRegistered &&
      !!associatedTradeAccounts?.length &&
      !userHasSelectedProxyAccount,
    [
      userHasSelectedMainAccount,
      isRegistered,
      associatedTradeAccounts,
      userHasSelectedProxyAccount,
    ]
  );
  const userBalances = useMemo(
    () => balances?.filter((value) => assets.some((item) => item.assetId === value.assetId)),
    [assets, balances]
  );

  useEffect(() => {
    if (shouldSelectDefaultTradeAccount && !!allTradingAccounts?.length)
      handleSelectTradeAccount(allTradingAccounts[0].address);
  }, [shouldSelectDefaultTradeAccount, allTradingAccounts, handleSelectTradeAccount]);

  const handleUnlockClose = () =>
    setUnlockAccount({
      address: "",
      status: false,
    });

  const handleUnlockOpen = (address: string) =>
    setUnlockAccount({
      address,
      status: true,
    });
  return (
    <>
      <Modal open={remove.status} onClose={handleClose}>
        <Modal.Body>
          {remove.isRemoveDevice ? (
            <RemoveFromDevice handleClose={removeFromDevice} />
          ) : (
            <RemoveFromBlockchain handleClose={handleClose} />
          )}
        </Modal.Body>
      </Modal>
      <Modal open={unlockAccount.status} onClose={handleUnlockClose}>
        <Modal.Body>
          <UnlockAccount
            handleClose={handleUnlockClose}
            handleSelectTradeAccount={handleSelectTradeAccount}
            address={unlockAccount.address}
          />
        </Modal.Body>
      </Modal>
      <Head>
        <title>Account Manager | Polkadex Orderbook</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <Menu handleChange={() => setState(!state)} />
        <S.Wrapper>
          <S.Title>
            <h1>Account Manager</h1>
            {!hasExtension ? (
              <a href="https://polkadot.js.org/extension/" target="_blank" rel="noreferrer">
                <S.LinkAccountColumn>
                  <S.LinkAccountColumnWrapper>
                    <Icons.PolkadotJs />
                  </S.LinkAccountColumnWrapper>
                  <S.LinkAccountColumnWrapper>
                    <div>
                      <span>No polkadot.js extension found</span>
                      <p> Install it and reload the page.</p>
                    </div>
                    <div>
                      <Icons.ArrowRight />
                    </div>
                  </S.LinkAccountColumnWrapper>
                </S.LinkAccountColumn>
              </a>
            ) : (
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
                          <Dropdown.Menu
                            fill="secondaryBackgroundSolid"
                            disabledKeys={["empty"]}>
                            {mainAccounts?.length ? (
                              mainAccounts.map((account) => {
                                const shortAddress =
                                  account?.address?.slice(0, 10) +
                                  "..." +
                                  account?.address?.slice(account?.address?.length - 10);

                                return (
                                  <Dropdown.Item
                                    key={account.address}
                                    onAction={() => handleSelectMainAccount(account.address)}>
                                    <S.MyDropdownContentCard>
                                      {account.meta.name}
                                      <span>{shortAddress}</span>
                                    </S.MyDropdownContentCard>
                                  </Dropdown.Item>
                                );
                              })
                            ) : (
                              <Dropdown.Item key="empty">Empty</Dropdown.Item>
                            )}
                          </Dropdown.Menu>
                        </Dropdown>
                      </S.SelectInputWrapper>
                      {userHasSelectedMainAccount && isRegistered && (
                        <S.Verified>
                          <Icons.Verified /> Registered
                        </S.Verified>
                      )}
                    </S.SelectInputFlex>
                  </S.SelectInputContainer>
                </S.TitleBalance>
                {userHasSelectedMainAccount &&
                  !isRegistered &&
                  !loading &&
                  !loadingTradeAccounts && (
                    <Link href="/linkAccount">
                      <S.UnVerified>Register Now</S.UnVerified>
                    </Link>
                  )}
                {userHasSelectedMainAccount && isRegistered && (
                  <S.TitleActions>
                    <AvailableMessage message="Soon">
                      <Link href="/history">
                        <S.OthersActions>History</S.OthersActions>
                      </Link>
                    </AvailableMessage>
                  </S.TitleActions>
                )}
              </S.TitleWrapper>
            )}
          </S.Title>
          {userHasSelectedMainAccount && isRegistered ? (
            <Loading message="Loading..." isVisible={loadingTradeAccounts}>
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
                <S.ContentGrid hasScroll={allTradingAccounts?.length >= 3}>
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
                  {allTradingAccounts?.map((value) => (
                    <Card
                      key={value.id}
                      title={value.name}
                      address={value.address}
                      isUsing={value.isActive}
                      onRemoveFromBlockchain={() => handleOpenRemove(false, value.id)}
                      onRemoveFromDevice={() => handleOpenRemove(true, value.id)}
                      onUse={() => {
                        handleSelectTradeAccount(value.address);
                        // handleUnlockOpen(value.address);
                      }}
                    />
                  ))}
                </S.ContentGrid>
              </S.Content>
            </Loading>
          ) : (
            <S.ContentEmpty>
              <div />
              <div />
            </S.ContentEmpty>
          )}
          {userHasSelectedProxyAccount && isRegistered && assets?.length && (
            <S.Content>
              <S.Header>
                <h2>Assets</h2>
                <S.HeaderWrapper>
                  <S.Search>
                    <Icon name="Search" size="extraSmall" stroke="text" />
                    <input type="text" placeholder="Search.." />
                  </S.Search>
                  <Checkbox name="hide">Hide small balances</Checkbox>
                </S.HeaderWrapper>
              </S.Header>
              <S.Assets>
                <Table aria-label="Polkadex assets" style={{ width: "100%" }}>
                  <Table.Header fill="none">
                    <Table.Column>
                      <S.Column style={{ paddingLeft: 10 }}>Name</S.Column>
                    </Table.Column>
                    <Table.Column>
                      <S.Column>Available</S.Column>
                    </Table.Column>
                    <Table.Column>
                      <S.Column>Locked</S.Column>
                    </Table.Column>
                    <Table.Column>
                      <S.Column>In Orders</S.Column>
                    </Table.Column>
                    <Table.Column>
                      <S.Column>Actions</S.Column>
                    </Table.Column>
                  </Table.Header>
                  <Table.Body striped>
                    {assets.map((item) => {
                      const balance = userBalances?.find(
                        (value) => value.assetId === item.assetId
                      );
                      return (
                        <Table.Row key={item.assetId}>
                          <Table.Cell>
                            <S.CellFlex>
                              <S.TokenIcon>
                                <Icon isToken name={item.symbol} size="extraSmall" />
                              </S.TokenIcon>
                              <S.Cell>
                                <span>
                                  {item.symbol} <small>{item.name?.toLowerCase()}</small>
                                </span>
                              </S.Cell>
                            </S.CellFlex>
                          </Table.Cell>
                          <Table.Cell>
                            <S.Cell>
                              <span>{Number(balance?.free_balance || 0).toFixed(8)} </span>
                            </S.Cell>
                          </Table.Cell>
                          <Table.Cell>
                            <S.Cell>
                              <span>{Number(balance?.reserved_balance || 0).toFixed(8)} </span>
                            </S.Cell>
                          </Table.Cell>
                          <Table.Cell>
                            <S.Cell>
                              <span>{Number(balance?.reserved_balance || 0).toFixed(8)} </span>
                            </S.Cell>
                          </Table.Cell>
                          <Table.Cell>
                            <S.Actions>
                              <Link href={`/deposit/${item.symbol}`}>
                                <S.DepositLink>Deposit</S.DepositLink>
                              </Link>
                              <AvailableMessage message="Soon">
                                <Link href={`/withdraw/${item.symbol}`}>
                                  <S.WithdrawLink>Withdraw</S.WithdrawLink>
                                </Link>
                              </AvailableMessage>
                            </S.Actions>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table>
              </S.Assets>
            </S.Content>
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
  const dispatch = useDispatch();
  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    buttonRef.current.innerHTML = "Copied";
  };

  const shortAddress = address?.slice(0, 10) + "..." + address?.slice(address?.length - 10);
  return (
    <S.Card isActive={isUsing}>
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
      </S.CardHeader>
      <S.CardContent>
        <Dropdown>
          <Dropdown.Trigger>
            <S.DropdownHeader>
              Actions
              <div>
                <Icons.DropdownArrow stroke="secondaryText" />
              </div>
            </S.DropdownHeader>
          </Dropdown.Trigger>
          <Dropdown.Menu fill="secondaryBackgroundSolid">
            <Dropdown.Item key="removeBlockchain">
              <p
                onClick={() => {
                  dispatch(removeProxyAccountFromChainFetch({ address }));
                }}>
                Remove from the blockchain
              </p>
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
