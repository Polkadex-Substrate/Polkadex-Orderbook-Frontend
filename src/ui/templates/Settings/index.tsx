import Head from "next/head";
import { useDispatch } from "react-redux";
import { useRef } from "react";

import * as S from "./styles";
import * as T from "./types";

import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";
import {
  AvailableMessage,
  Checkbox,
  Footer,
  Modal,
  ResultFound,
  Search,
  Tooltip,
  TooltipContent,
  TooltipHeader,
} from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { Dropdown } from "@polkadex/orderbook/v3/ui/molecules";
import { PreviewAccount, NewAccount } from "@polkadex/orderbook-ui/organisms";
import { useReduxSelector, useSettings } from "@polkadex/orderbook-hooks";
import {
  previewAccountModalActive,
  registerAccountModalActive,
  selectAssociatedTradeAddresses,
  selectIsMainAddressRegistered,
  selectMainAccount,
  userAccountSelectFetch,
} from "@polkadex/orderbook-modules";
import {
  getMainAddresssLinkedToTradingAccount,
  transformAddress,
} from "@polkadex/orderbook/modules/user/profile/helpers";
import { ExtensionAccount } from "@polkadex/orderbook/modules/types";

export const SettingsTemplate = () => {
  const {
    state,
    allFilteredTradeAccounts,
    filterControllerWallets,
    isPreviewActive,
    previewAccountSelected,
    currentControllerWallet,
    controllerWallets,
    tradeAccounts,
    user,
    userAccounts,
    linkedMainAddress,
    isActive,
    isLoading,
    setState,
    handleFilterTradeAccounts,
    handleFilterControllerWallets,
    handleChangeCurrentControllerWallet,
    usingAccount,
    showRegistered,
    handleChangeShowRegistered,
    handleCloseNewAccount,
    handleClosePreviewModal,
    filterTradeAccountsByControllerAccount,
    handleFilterTradeAccountByController,
    hasRegisteredMainAccount,
  } = useSettings();

  const dispatch = useDispatch();
  return (
    <>
      <Modal open={isPreviewActive} onClose={handleClosePreviewModal} placement="start right">
        <PreviewAccount
          onClose={handleClosePreviewModal}
          selected={previewAccountSelected}
          mainAccAddress={getMainAddresssLinkedToTradingAccount(
            previewAccountSelected?.address,
            userAccounts
          )}
        />
      </Modal>
      <Modal open={isActive} onClose={handleCloseNewAccount} placement="start right">
        <NewAccount
          onClose={handleCloseNewAccount}
          selected={{
            address: currentControllerWallet?.account.address,
            name: currentControllerWallet?.account?.meta?.name,
          }}
          isLoading={isLoading}
        />
      </Modal>
      <Head>
        <title>Accounts | Polkadex Orderbook</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <Menu handleChange={() => setState(!state)} />
        <S.Wrapper>
          <S.ContainerMain>
            <S.Title>
              <h1>Accounts.</h1>
              <p>General account settings.</p>
            </S.Title>
            <S.Content>
              <S.Wallet>
                <S.WalletTitle>
                  <S.WalletTitleWrapper>
                    <Tooltip>
                      <TooltipHeader>
                        <S.TooltipHeader>
                          <Icons.Info />
                        </S.TooltipHeader>
                      </TooltipHeader>
                      <TooltipContent>
                        <span>Trading account info</span>
                      </TooltipContent>
                    </Tooltip>
                    <h2>Trading accounts</h2>
                  </S.WalletTitleWrapper>
                  {!!controllerWallets?.length && hasRegisteredMainAccount && (
                    <ButtonWallet
                      type="button"
                      onClick={() => {
                        handleChangeCurrentControllerWallet(null);
                        dispatch(registerAccountModalActive());
                      }}>
                      New Account
                    </ButtonWallet>
                  )}
                </S.WalletTitle>
                <S.WalletContainer>
                  {!tradeAccounts.length ? (
                    <Empty
                      title="No trading accounts"
                      description="Trading accounts allow you to operate within the orderbook and make withdrawals. They are created from a wallet, it is only possible to have 3 per wallet."
                      // actionTitle="Import trading account"
                      onClick={() => console.log("Open Modal")}></Empty>
                  ) : (
                    <S.WalletWrapper>
                      <AccountHeader
                        handleFilter={(e) => handleFilterTradeAccounts(e.target.value)}>
                        <S.AccountHeaderContent>
                          {/* don't show all section if no linked address */}
                          {controllerWallets?.length ? (
                            <Dropdown>
                              <Dropdown.Trigger>
                                <S.AccountHeaderTrigger>
                                  <span>{filterTradeAccountsByControllerAccount}</span>
                                  <div>
                                    <Icons.ArrowBottom />
                                  </div>
                                </S.AccountHeaderTrigger>
                              </Dropdown.Trigger>
                              <Dropdown.Menu fill="secondaryBackgroundSolid">
                                {[
                                  { account: { meta: { name: "All" }, address: "all" } },
                                  ...controllerWallets,
                                ]?.map(({ account }, i) => {
                                  const name = account?.meta?.name?.length
                                    ? account?.meta?.name
                                    : transformAddress(account.address, 5);

                                  return (
                                    <Dropdown.Item
                                      key={i}
                                      onAction={() =>
                                        handleFilterTradeAccountByController(account.address)
                                      }>
                                      <S.Dropdown>{name}</S.Dropdown>
                                    </Dropdown.Item>
                                  );
                                })}
                              </Dropdown.Menu>
                            </Dropdown>
                          ) : null}
                        </S.AccountHeaderContent>
                      </AccountHeader>
                      <S.WalletContent>
                        {allFilteredTradeAccounts?.length ? (
                          allFilteredTradeAccounts?.map((account, i) => {
                            const linkedMainAddress = getMainAddresssLinkedToTradingAccount(
                              account.address,
                              userAccounts
                            );
                            const acc = controllerWallets?.find(
                              ({ account }) => account?.address === linkedMainAddress
                            );
                            const hasLinkedAccount =
                              !!linkedMainAddress?.length ||
                              !!acc?.account?.meta?.name?.length;
                            const isUsing = account.address === usingAccount.tradeAddress;
                            return (
                              <WalletCard
                                key={i}
                                isUsing={isUsing}
                                isDefault={false}
                                defaultTitle="Default trade account"
                                name={String(account?.account?.meta?.name || "Unknown")}
                                address={account.address}
                                additionalInfo={
                                  hasLinkedAccount &&
                                  `(Linked to ${
                                    acc?.account?.meta?.name ||
                                    transformAddress(linkedMainAddress)
                                  })`
                                }>
                                <S.WalletActions>
                                  {!isUsing && account.isPresentInBrowser && (
                                    <S.Button
                                      type="button"
                                      onClick={() => {
                                        dispatch(
                                          userAccountSelectFetch({
                                            tradeAddress: account.address,
                                          })
                                        );
                                      }}>
                                      Use
                                    </S.Button>
                                  )}
                                  <S.Preview
                                    type="button"
                                    onClick={() =>
                                      dispatch(previewAccountModalActive(account))
                                    }>
                                    <div>
                                      <Icons.OptionsHorizontal />
                                    </div>
                                    <span>Actions</span>
                                  </S.Preview>
                                </S.WalletActions>
                              </WalletCard>
                            );
                          })
                        ) : (
                          <ResultFound />
                        )}
                      </S.WalletContent>
                    </S.WalletWrapper>
                  )}
                </S.WalletContainer>
              </S.Wallet>
              <S.Wallet>
                <S.WalletTitle>
                  <S.WalletTitleWrapper>
                    <Tooltip>
                      <TooltipHeader>
                        <S.TooltipHeader>
                          <Icons.Info />
                        </S.TooltipHeader>
                      </TooltipHeader>
                      <TooltipContent>
                        <span>Funding account info</span>
                      </TooltipContent>
                    </Tooltip>
                    <h2>Funding Accounts</h2>
                  </S.WalletTitleWrapper>
                </S.WalletTitle>
                <S.WalletContainer>
                  {!controllerWallets?.length ? (
                    <Empty
                      title="No wallet found"
                      description="Wallets allow you to create trading accounts and make deposits. Use your Polkadot {.js} extension wallet."
                    />
                  ) : (
                    <S.WalletWrapper>
                      <AccountHeader
                        handleFilter={(e) => handleFilterControllerWallets(e.target.value)}>
                        <S.AccountHeaderContent>
                          <Checkbox
                            checked={showRegistered}
                            onChange={handleChangeShowRegistered}>
                            Only registered accounts
                          </Checkbox>
                        </S.AccountHeaderContent>
                      </AccountHeader>
                      <S.WalletContent>
                        {filterControllerWallets?.length ? (
                          filterControllerWallets.map(({ account }, i) => {
                            const isUsing = usingAccount?.mainAddress === account?.address;
                            return (
                              <ControllerWallets
                                key={i}
                                address={account.address}
                                name={account.meta.name}
                                isUsing={isUsing}
                                handleRegister={(account: ExtensionAccount) => {
                                  handleChangeCurrentControllerWallet(account);
                                  dispatch(
                                    registerAccountModalActive({
                                      name: account.account.meta.name,
                                      address: account.account.address,
                                    })
                                  );
                                }}
                              />
                            );
                          })
                        ) : (
                          <ResultFound />
                        )}
                      </S.WalletContent>
                    </S.WalletWrapper>
                  )}
                </S.WalletContainer>
              </S.Wallet>
              <S.Account>
                <h2>Account details</h2>
                <S.AccountContainer>
                  <Card
                    label="Email"
                    description={user.email}
                    isLocked
                    hasBadge
                    isVerified={user.isConfirmed}
                  />
                  <AvailableMessage>
                    <Card
                      label="Avatar"
                      isAvatar
                      description="Select an avatar to personalize your account."
                      actionTitle="Change"
                      onClick={() => console.log("Open Modal")}
                    />
                  </AvailableMessage>
                  <AvailableMessage>
                    <Card
                      label="Delete Account"
                      description="This action is irreversible, please make sure you`re certain of it."
                      onClick={() => console.log("Open Modal")}
                      actionTitle="Delete account"
                    />
                  </AvailableMessage>
                </S.AccountContainer>
              </S.Account>
            </S.Content>
          </S.ContainerMain>
          <Footer />
        </S.Wrapper>
      </S.Main>
    </>
  );
};

type ControllerWaletsProps = {
  address: string;
  name: string;
  isUsing: boolean;
  handleRegister?: (account: ExtensionAccount) => void;
};
const ControllerWallets = ({
  address,
  name,
  isUsing,
  handleRegister = undefined,
}: ControllerWaletsProps) => {
  const isRegistered = useReduxSelector(selectIsMainAddressRegistered(address));
  const linkedTradeAccounts = useReduxSelector(selectAssociatedTradeAddresses(address));
  const extensionAccount = useReduxSelector(selectMainAccount(address));
  return (
    <WalletCard
      isUsing={isUsing}
      isDefault={isUsing}
      defaultTitle="Default Funding account"
      name={name || "--"}
      address={address}
      additionalInfo={
        isRegistered && `(${linkedTradeAccounts?.length ?? 0} trading accounts)`
      }>
      <S.WalletActions>
        {isRegistered ? (
          <Badge isRegistered={true}>Registered</Badge>
        ) : (
          <S.Button
            type="button"
            onClick={() => {
              handleRegister(extensionAccount);
            }}>
            Register Now
          </S.Button>
        )}
      </S.WalletActions>
    </WalletCard>
  );
};

const Card = ({
  label = "",
  description = "",
  actionTitle,
  isLocked = false,
  hasBadge = false,
  isAvatar = false,
  isVerified = false,
  onClick,
}: T.Props) => (
  <S.AccountCard>
    <S.AccountCardWrapper>
      {isAvatar && (
        <S.AccountCardAvatar>
          <Icons.Profile />
        </S.AccountCardAvatar>
      )}
      <S.AccountCardContent>
        <S.AccountCardFlex>
          {isLocked && (
            <div>
              <Icons.Lock />
            </div>
          )}
          <span>{label}</span>
        </S.AccountCardFlex>
        <p>{description}</p>
      </S.AccountCardContent>
    </S.AccountCardWrapper>
    <S.AccountCardActions>
      {hasBadge && (
        <>
          {isVerified ? (
            <Badge isRegistered={isVerified}>Verified</Badge>
          ) : (
            <S.Button type="button">Verify Now</S.Button>
          )}
        </>
      )}
      {!!actionTitle?.length && (
        <S.Button type="button" onClick={onClick}>
          {actionTitle}
        </S.Button>
      )}
    </S.AccountCardActions>
  </S.AccountCard>
);

const Empty = ({
  title = "",
  description = "",
  actionTitle = "",
  onClick = undefined,
  children,
}: T.EmptyProps) => (
  <S.Empty>
    <S.EmptyBox>
      <div>
        <Icons.Clean />
      </div>
      <span>{title}</span>
      <p>{description}</p>
    </S.EmptyBox>
    {!!actionTitle?.length && <S.Button onClick={onClick}>{actionTitle}</S.Button>}
    {children}
  </S.Empty>
);

const AccountHeader = ({ handleFilter = undefined, children }) => (
  <S.Header>
    <Search onInput={handleFilter} isFull placeholder="Search" />
    <S.Filters>{children}</S.Filters>
  </S.Header>
);

const WalletCard = ({
  isUsing = false,
  isDefault = false,
  defaultTitle = "",
  name = "",
  address = "",
  additionalInfo = "",
  children,
}) => {
  const buttonRef = useRef(null);
  const handleOnMouseOut = () => (buttonRef.current.innerHTML = "Copy to clipboard");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    buttonRef.current.innerHTML = "Copied";
  };

  return (
    <S.WalletCard>
      <S.WalletCardWrapper>
        {isUsing && <S.Using>IN USE</S.Using>}
        <S.WalletCardContent>
          <span>
            {name} <small>{additionalInfo}</small>
          </span>
          <S.WalletCardCopy>
            <Tooltip>
              <TooltipHeader>
                <button type="button" onClick={handleCopy} onMouseOut={handleOnMouseOut}>
                  <Icons.Copy />
                </button>
              </TooltipHeader>
              <TooltipContent>
                <span ref={buttonRef} style={{ whiteSpace: "nowrap" }}>
                  Copy to clipboard
                </span>
              </TooltipContent>
            </Tooltip>
            <p>{address}</p>
          </S.WalletCardCopy>
        </S.WalletCardContent>
      </S.WalletCardWrapper>
      <S.WalletCardAside>
        {isDefault && (
          <S.WalletCardBadge>
            <span>{defaultTitle}</span>
          </S.WalletCardBadge>
        )}
        {children}
      </S.WalletCardAside>
    </S.WalletCard>
  );
};

const Badge = ({ isRegistered = false, children }) => (
  <S.Badge isRegistered={isRegistered}>
    {isRegistered && (
      <div>
        <Icons.Verified />
      </div>
    )}

    <span>{children}</span>
  </S.Badge>
);

const ButtonWallet = ({ children, ...props }: T.ButtonProps) => (
  <S.ButtonWallet type="button" {...props}>
    <div>
      <Icons.Plus />
    </div>
    {children}
  </S.ButtonWallet>
);
