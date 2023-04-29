import Head from "next/head";
import { Fragment, useRef } from "react";
import { BigHead } from "@bigheads/core";
import { useRouter } from "next/router";

import * as S from "./styles";
import * as T from "./types";

import {
  Menu,
  PreviewAccount,
  NewAccount,
  ChangeAvatar,
  DisclaimerMessage,
} from "@polkadex/orderbook-ui/organisms";
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
  Dropdown,
} from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { useSettings } from "@polkadex/orderbook-hooks";
import { ExtensionAccount } from "@polkadex/orderbook/providers/types";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import {
  getMainAddresssLinkedToTradingAccount,
  transformAddress,
} from "@polkadex/orderbook/providers/user/profile/helpers";
import { useExtensionWallet } from "@polkadex/orderbook/providers/user/extensionWallet";
import { randomAvatars } from "@polkadex/orderbook-ui/organisms/ChangeAvatar/randomAvatars";
import { useTradeWallet } from "@polkadex/orderbook/providers/user/tradeWallet";

export const SettingsTemplate = () => {
  const router = useRouter();
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
    defaultTradeAddress,
    defaultFundingAddress,
    avatarModal,
    handleCloseAvatarModal,
    handleOpenAvatarModal,
    hasRegisteredMainAccount,
  } = useSettings();

  const { onUserSelectAccount } = useProfile();
  const tradeWalletState = useTradeWallet();

  return (
    <>
      <Modal
        open={isPreviewActive}
        onClose={handleClosePreviewModal}
        placement="start right"
        isFullHeight>
        <PreviewAccount
          onClose={handleClosePreviewModal}
          selected={previewAccountSelected}
          mainAccAddress={getMainAddresssLinkedToTradingAccount(
            previewAccountSelected?.address,
            userAccounts
          )}
        />
      </Modal>
      <Modal
        open={isActive}
        onClose={handleCloseNewAccount}
        placement="start right"
        isFullHeight>
        <NewAccount
          onClose={handleCloseNewAccount}
          selected={{
            address: currentControllerWallet?.account.address,
            name: currentControllerWallet?.account?.meta?.name,
          }}
          isLoading={isLoading}
        />
      </Modal>
      <Modal open={avatarModal} onClose={handleCloseAvatarModal} placement="start right">
        <ChangeAvatar onClose={handleCloseAvatarModal} />
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
                  {hasRegisteredMainAccount && (
                    <ButtonWallet
                      type="button"
                      onClick={() => {
                        handleChangeCurrentControllerWallet(null);
                        tradeWalletState.onRegisterAccountModalActive();
                      }}>
                      {controllerWallets?.length > 0 ? "New Account" : "Import Account"}
                    </ButtonWallet>
                  )}
                </S.WalletTitle>
                <S.WalletContainer>
                  {!tradeAccounts.length ? (
                    <Empty
                      title="No trading accounts"
                      description="Trading accounts allow you to deposit funds to Orderbook, trade and withdraw funds to your Polkadex account."
                      // actionTitle="Import trading account"
                      onClick={() => console.log("Open Modal")}
                    />
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
                            const isDefault = defaultTradeAddress === account.address;
                            const isPresentInBrowser = !!account?.account?.meta?.name;
                            return (
                              <WalletCard
                                key={i}
                                isUsing={isUsing}
                                isDefault={isDefault}
                                defaultTitle="Default trade account"
                                isPresentInBrowser={isPresentInBrowser}
                                name={String(
                                  account?.account?.meta?.name ||
                                    "Account not present in the browser"
                                )}
                                address={account.address}
                                additionalInfo={
                                  hasLinkedAccount &&
                                  `(Linked to ${
                                    acc?.account?.meta?.name ||
                                    transformAddress(linkedMainAddress)
                                  })`
                                }>
                                <S.WalletActions>
                                  {isPresentInBrowser && (
                                    <S.Button
                                      type="button"
                                      onClick={() => {
                                        onUserSelectAccount({
                                          tradeAddress: account.address,
                                        });
                                        router.push("/balances");
                                      }}>
                                      Add funds
                                    </S.Button>
                                  )}
                                  {!isUsing && account.isPresentInBrowser && (
                                    <S.Button
                                      type="button"
                                      onClick={() => {
                                        onUserSelectAccount({
                                          tradeAddress: account.address,
                                        });
                                      }}>
                                      Use
                                    </S.Button>
                                  )}
                                  {!isPresentInBrowser && (
                                    <S.Button
                                      type="button"
                                      onClick={() =>
                                        tradeWalletState.onRegisterAccountModalActive({
                                          defaultImportActive: true,
                                        })
                                      }>
                                      Import
                                    </S.Button>
                                  )}
                                  <S.Preview
                                    type="button"
                                    onClick={() => {
                                      tradeWalletState.onPreviewAccountModalActive(account);
                                    }}>
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
                      <S.Disclaimer>
                        <DisclaimerMessage
                          isSmall
                          message="Trading accounts will be lost if browser cache is cleared. But do not worry, your funds will not be lost. You can create an other one."
                        />
                      </S.Disclaimer>
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
                                isDefault={defaultFundingAddress === account.address}
                                handleRegister={(account: ExtensionAccount) => {
                                  handleChangeCurrentControllerWallet(account);
                                  tradeWalletState.onRegisterAccountModalActive({
                                    data: {
                                      name: account.account.meta.name,
                                      address: account.account.address,
                                    },
                                  });
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
                <h2>Profile</h2>
                <S.AccountContainer>
                  <Card
                    label="Email"
                    description={user.email}
                    isLocked
                    hasBadge
                    isVerified={user.isConfirmed}
                  />
                  <Card
                    label="Avatar"
                    isAvatar
                    description="Select an avatar to personalize your account."
                    actionTitle="Change"
                    onClick={handleOpenAvatarModal}
                  />
                  <AvailableMessage message="Soon">
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
  isDefault: boolean;
};
const ControllerWallets = ({
  address,
  name,
  isUsing,
  isDefault,
  handleRegister = undefined,
}: ControllerWaletsProps) => {
  const profileState = useProfile();
  const extensionWalletState = useExtensionWallet();

  const isRegistered = address && profileState.userData.mainAccounts.includes(address);

  const userAccounts = profileState.userData.userAccounts;
  const accounts = userAccounts.filter((account) => account.mainAddress === address);
  const linkedTradeAccounts = accounts.map((account) => account.tradeAddress);

  const extensionAccount =
    address &&
    extensionWalletState.allAccounts?.find(
      ({ account }) => account?.address?.toLowerCase() === address?.toLowerCase()
    );

  const { onLinkEmail } = useExtensionWallet();

  const handleLinkEmail = (extensionAccount: ExtensionAccount) => {
    const accountAddress = extensionAccount.account.address;
    onLinkEmail({
      mainAccount: accountAddress,
    });
  };

  return (
    <WalletCard
      isUsing={isUsing}
      isDefault={isDefault}
      defaultTitle="Linked to default trading account"
      name={name || "--"}
      address={address}
      additionalInfo={
        isRegistered && `(${linkedTradeAccounts?.length ?? 0} trading accounts)`
      }>
      <S.WalletActions>
        {isRegistered && linkedTradeAccounts?.length > 0 ? (
          <Badge isRegistered={true}>Registered</Badge>
        ) : (
          <Fragment>
            {!isRegistered && (
              <S.Button
                type="button"
                onClick={() => {
                  handleLinkEmail(extensionAccount);
                }}>
                Use in Orderbook
              </S.Button>
            )}
            {isRegistered && (
              <S.Button
                type="button"
                onClick={() => {
                  handleRegister(extensionAccount);
                }}>
                Register Now
              </S.Button>
            )}
          </Fragment>
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
}: T.Props) => {
  const profileState = useProfile();
  const avatarOptions = randomAvatars?.find(
    (v) => v.id === Number(profileState.userProfile?.avatar)
  );
  return (
    <S.AccountCard>
      <S.AccountCardWrapper>
        {isAvatar && (
          <S.AccountCardAvatar>
            <BigHead {...avatarOptions} />
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
};

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
  isPresentInBrowser = true,
  children,
}) => {
  const buttonRef = useRef(null);
  const handleOnMouseOut = () => (buttonRef.current.innerHTML = "Copy to clipboard");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    buttonRef.current.innerHTML = "Copied";
  };

  const shortAddress = transformAddress(address, 18);
  return (
    <S.WalletCard isActive={isPresentInBrowser}>
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
            <p>{shortAddress}</p>
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
