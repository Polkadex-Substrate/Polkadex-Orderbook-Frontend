import Image from "next/image";
import Head from "next/head";
import React, { Fragment, useRef } from "react";
import { BigHead } from "@bigheads/core";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import {
  Menu,
  PreviewAccount,
  NewAccount,
  ChangeAvatar,
  DisclaimerMessage,
  Header,
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
  CheckboxCustom,
} from "@polkadex/orderbook-ui/molecules";
import { Keyboard } from "@polkadex/orderbook-ui/molecules/LoadingIcons";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { useSettings } from "@orderbook/core/hooks";
import { ExtensionAccount } from "@orderbook/core/providers/types";
import { useProfile } from "@orderbook/core/providers/user/profile";
import {
  getMainAddresssLinkedToTradingAccount,
  transformAddress,
} from "@orderbook/core/providers/user/profile/helpers";
import { useExtensionWallet } from "@orderbook/core/providers/user/extensionWallet";
import { randomAvatars } from "@polkadex/orderbook-ui/organisms/ChangeAvatar/randomAvatars";
import { useTradeWallet } from "@orderbook/core/providers/user/tradeWallet";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";

import * as T from "./types";
import * as S from "./styles";

export const WalletsTemplate = () => {
  const router = useRouter();
  const {
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
    handleFilterTradeAccounts,
    handleFilterControllerWallets,
    handleChangeCurrentControllerWallet,
    usingAccount,
    showRegistered,
    handleChangeShowRegistered,
    showPresent,
    handleChangeShowPresent,
    handleCloseNewAccount,
    handleClosePreviewModal,
    filterTradeAccountsByControllerAccount,
    handleFilterTradeAccountByController,
    defaultTradeAddress,
    defaultFundingAddress,
    avatarModal,
    handleCloseAvatarModal,
    hasRegisteredMainAccount,
  } = useSettings();

  const { extensions } = useSettingsProvider();

  const {
    onUserSelectAccount,
    auth: { isLoading: isProfileFetching },
    data: { isLoading: isAccountsFetching },
  } = useProfile();
  const tradeWalletState = useTradeWallet();
  const {
    isFetching: isFetchingExtensionAccounts,
    defaultExtension: defaultExtensionName,
  } = useExtensionWallet();

  const defaultExtension = extensions.find(
    (extension) => extension.extensionName === defaultExtensionName
  );

  const showTradingAccountLoader =
    tradeWalletState.isFetching || isProfileFetching || isAccountsFetching;

  const showFundingAccountLoader =
    showTradingAccountLoader || isFetchingExtensionAccounts;

  const { t, "2": isTranslationReady } = useTranslation("settings");

  if (!isTranslationReady) return <></>;

  return (
    <>
      <Modal
        open={isPreviewActive}
        onClose={handleClosePreviewModal}
        placement="start right"
        isFullHeight
      >
        <PreviewAccount
          onClose={handleClosePreviewModal}
          selected={previewAccountSelected}
          mainAccAddress={
            previewAccountSelected?.address && userAccounts
              ? getMainAddresssLinkedToTradingAccount(
                  previewAccountSelected?.address,
                  userAccounts
                )
              : ""
          }
        />
      </Modal>
      <Modal
        open={!!isActive}
        onClose={handleCloseNewAccount}
        placement="start right"
        isFullHeight
      >
        <NewAccount
          onClose={handleCloseNewAccount}
          selected={{
            address: currentControllerWallet?.account.address as string,
            name: currentControllerWallet?.account?.meta?.name as string,
          }}
          isLoading={isLoading}
        />
      </Modal>
      <Modal
        open={avatarModal}
        onClose={handleCloseAvatarModal}
        placement="start right"
      >
        <ChangeAvatar onClose={handleCloseAvatarModal} />
      </Modal>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <Header />
        <S.Flex>
          <Menu />
          <S.Wrapper>
            <S.ContainerMain>
              <S.Title>
                <h1>{t("heading")}</h1>
                <p>{t("subHeading")}</p>
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
                          <span>{t("tradingAccountToolTip")}</span>
                        </TooltipContent>
                      </Tooltip>
                      <h2>{t("tradingAccounts")}</h2>
                    </S.WalletTitleWrapper>
                    <S.ButtonGroup>
                      <ButtonWallet
                        type="button"
                        onClick={() =>
                          tradeWalletState.onRegisterAccountModalActive({
                            defaultImportActive: true,
                          })
                        }
                      >
                        {t("importAccount")}
                      </ButtonWallet>
                      {hasRegisteredMainAccount && (
                        <ButtonWallet
                          type="button"
                          onClick={() => {
                            handleChangeCurrentControllerWallet(null);
                            tradeWalletState.onRegisterAccountModalActive();
                          }}
                        >
                          {controllerWallets?.length > 0
                            ? t("newAccount")
                            : t("importAccount")}
                        </ButtonWallet>
                      )}
                    </S.ButtonGroup>
                  </S.WalletTitle>
                  <S.WalletContainer>
                    {showTradingAccountLoader ? (
                      <S.LoadingWrapper>
                        <Keyboard color="primary" />
                      </S.LoadingWrapper>
                    ) : !tradeAccounts?.length ? (
                      <div style={{ padding: "4rem 2rem" }}>
                        <Empty
                          title={t("noTradingAccountTitle")}
                          description={t("noTradingAccountDescription")}
                        />
                      </div>
                    ) : (
                      <S.WalletWrapper>
                        <AccountHeader
                          handleFilter={(e) =>
                            handleFilterTradeAccounts(e.target.value)
                          }
                        >
                          <S.AccountHeaderFlex>
                            <S.AccountHeaderContent>
                              <CheckboxCustom
                                checked={showPresent}
                                onChange={handleChangeShowPresent}
                              >
                                {t("onlySelectedAccount")}
                              </CheckboxCustom>
                            </S.AccountHeaderContent>
                            <S.AccountHeaderContent>
                              {/* don't show all section if no linked address */}
                              {controllerWallets?.length ? (
                                <Dropdown>
                                  <Dropdown.Trigger>
                                    <S.AccountHeaderTrigger>
                                      <span>
                                        {filterTradeAccountsByControllerAccount}
                                      </span>
                                      <div>
                                        <Icons.ArrowBottom />
                                      </div>
                                    </S.AccountHeaderTrigger>
                                  </Dropdown.Trigger>
                                  <Dropdown.Menu fill="secondaryBackgroundSolid">
                                    {[
                                      {
                                        account: {
                                          meta: { name: "All" },
                                          address: "all",
                                        },
                                      },
                                      ...controllerWallets,
                                    ]?.map(({ account }, i) => {
                                      const name = account?.meta?.name?.length
                                        ? account?.meta?.name
                                        : transformAddress(account.address, 5);

                                      return (
                                        <Dropdown.Item
                                          key={i}
                                          onAction={() =>
                                            handleFilterTradeAccountByController(
                                              account.address
                                            )
                                          }
                                        >
                                          <S.Dropdown>{name}</S.Dropdown>
                                        </Dropdown.Item>
                                      );
                                    })}
                                  </Dropdown.Menu>
                                </Dropdown>
                              ) : null}
                            </S.AccountHeaderContent>
                          </S.AccountHeaderFlex>
                        </AccountHeader>
                        <S.WalletContent>
                          {allFilteredTradeAccounts?.length ? (
                            allFilteredTradeAccounts?.map((account, i) => {
                              const linkedMainAddress = userAccounts
                                ? getMainAddresssLinkedToTradingAccount(
                                    account.address,
                                    userAccounts
                                  )
                                : "";
                              const acc = controllerWallets?.find(
                                ({ account }) =>
                                  account?.address === linkedMainAddress
                              );
                              const hasLinkedAccount =
                                !!linkedMainAddress?.length ||
                                !!acc?.account?.meta?.name?.length;
                              const isUsing =
                                account.address === usingAccount.tradeAddress;
                              const isDefault =
                                defaultTradeAddress === account.address;
                              const isPresentInBrowser =
                                !!account?.account?.meta?.name;
                              return (
                                <WalletCard
                                  key={i}
                                  isUsing={isUsing}
                                  isDefault={isDefault}
                                  defaultTitle="Default trade account"
                                  isPresentInBrowser={isPresentInBrowser}
                                  name={String(
                                    account?.account?.meta?.name ||
                                      t("accountNotPresentInBrowser")
                                  )}
                                  address={account.address}
                                  additionalInfo={
                                    hasLinkedAccount
                                      ? t("linkedTo", {
                                          address:
                                            acc?.account?.meta?.name ||
                                            transformAddress(linkedMainAddress),
                                        })
                                      : ""
                                  }
                                >
                                  <S.WalletActions>
                                    {isPresentInBrowser && (
                                      <S.Button
                                        type="button"
                                        onClick={() => {
                                          onUserSelectAccount({
                                            tradeAddress: account.address,
                                          });
                                          router.push("/balances");
                                        }}
                                      >
                                        {t("addFunds")}
                                      </S.Button>
                                    )}
                                    {!isUsing && account.isPresentInBrowser && (
                                      <S.Button
                                        type="button"
                                        onClick={() => {
                                          onUserSelectAccount({
                                            tradeAddress: account.address,
                                          });
                                        }}
                                      >
                                        {t("use")}
                                      </S.Button>
                                    )}
                                    <S.Preview
                                      type="button"
                                      onClick={() => {
                                        tradeWalletState.onPreviewAccountModalActive(
                                          account
                                        );
                                      }}
                                    >
                                      <div>
                                        <Icons.OptionsHorizontal />
                                      </div>
                                      <span>{t("actions")}</span>
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
                            message={t("disclaimerMessage")}
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
                          <span>{t("fundingAccountToolTip")}</span>
                        </TooltipContent>
                      </Tooltip>
                      <h2>{t("fundingAccounts")}</h2>
                    </S.WalletTitleWrapper>
                  </S.WalletTitle>
                  <S.WalletContainer>
                    {showFundingAccountLoader ? (
                      <S.LoadingWrapper>
                        <Keyboard color="primary" />
                      </S.LoadingWrapper>
                    ) : !controllerWallets?.length ? (
                      <div style={{ padding: "4rem 2rem" }}>
                        <EmptyFundingWallet
                          title={t("noWalletFoundTitle")}
                          description={t("noWalletFoundDescription")}
                        />
                      </div>
                    ) : (
                      <S.WalletWrapper>
                        <AccountHeader
                          handleFilter={(e) =>
                            handleFilterControllerWallets(e.target.value)
                          }
                        >
                          <S.AccountHeaderContent>
                            <Checkbox
                              checked={showRegistered}
                              onChange={handleChangeShowRegistered}
                            >
                              {t("onlyRegisteredAccounts")}
                            </Checkbox>
                            {/* Extension dropdown */}
                            <Dropdown>
                              <Dropdown.Trigger>
                                <S.DropdownTrigger>
                                  {defaultExtension && (
                                    <>
                                      <Image
                                        src={defaultExtension.logo.src}
                                        alt={defaultExtension.logo.alt}
                                        width={20}
                                        height={20}
                                      />
                                      {defaultExtension.title}
                                      <Icons.ArrowBottom />
                                    </>
                                  )}
                                </S.DropdownTrigger>
                              </Dropdown.Trigger>
                              <AvailableExtensionsDropDown />
                            </Dropdown>
                          </S.AccountHeaderContent>
                        </AccountHeader>
                        <S.WalletContent>
                          {filterControllerWallets?.length ? (
                            filterControllerWallets.map(({ account }, i) => {
                              const isUsing =
                                usingAccount?.mainAddress === account?.address;
                              return (
                                <ControllerWallets
                                  key={i}
                                  address={account.address}
                                  name={account.meta.name as string}
                                  isUsing={isUsing}
                                  isDefault={
                                    defaultFundingAddress === account.address
                                  }
                                  handleRegister={(
                                    account: ExtensionAccount
                                  ) => {
                                    handleChangeCurrentControllerWallet(
                                      account
                                    );
                                    tradeWalletState.onRegisterAccountModalActive(
                                      {
                                        data: {
                                          name: account.account?.meta
                                            ?.name as string,
                                          address: account.account.address,
                                        },
                                      }
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
                  <h2>{t("profile")}</h2>
                  <S.AccountContainer>
                    <Card
                      label={t("profileCardLabel")}
                      description={user.email}
                      isLocked
                      hasBadge
                      isVerified={user.isConfirmed}
                    />
                    <AvailableMessage message={t("availableMessage")}>
                      <Card
                        label={t("deleteAccount")}
                        description={t("deleteAccountDescription")}
                        onClick={() => console.log("Open Modal")}
                        actionTitle={t("deleteAccount")}
                      />
                    </AvailableMessage>
                  </S.AccountContainer>
                </S.Account>
              </S.Content>
            </S.ContainerMain>
            <Footer />
          </S.Wrapper>
        </S.Flex>
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

  const isRegistered =
    address && profileState.userData?.mainAccounts?.includes(address);

  const userAccounts = profileState.userData?.userAccounts;
  const accounts = userAccounts?.filter(
    (account) => account.mainAddress === address
  );
  const linkedTradeAccounts = accounts?.map((account) => account.tradeAddress);

  const extensionAccount = extensionWalletState.allAccounts?.find(
    ({ account }) => account?.address?.toLowerCase() === address?.toLowerCase()
  );

  const { onLinkEmail } = useExtensionWallet();

  const handleLinkEmail = (extensionAccount: ExtensionAccount) => {
    const accountAddress = extensionAccount.account.address;
    onLinkEmail({
      mainAccount: accountAddress,
    });
  };

  const { t } = useTranslation("settings");

  return (
    <WalletCard
      isUsing={isUsing}
      isDefault={isDefault}
      defaultTitle={t("linkedToDefaultTradingAccount")}
      name={name || "--"}
      address={address}
      additionalInfo={
        isRegistered
          ? t("additionalInfo", { accounts: linkedTradeAccounts?.length ?? 0 })
          : ""
      }
    >
      <S.WalletActions>
        {isRegistered && linkedTradeAccounts!.length > 0 ? (
          <Badge isRegistered={true}>{t("registeredBadge")}</Badge>
        ) : (
          <Fragment>
            {!isRegistered && (
              <S.Button
                type="button"
                onClick={() => {
                  if (extensionAccount) {
                    handleLinkEmail(extensionAccount);
                  }
                }}
              >
                {t("useInOrderbook")}
              </S.Button>
            )}
            {isRegistered && (
              <S.Button
                type="button"
                onClick={() => {
                  if (
                    extensionAccount &&
                    typeof handleRegister === "function"
                  ) {
                    handleRegister(extensionAccount);
                  }
                }}
              >
                {t("registerNow")}
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

  const { t } = useTranslation("settings");

  return (
    <S.AccountCard>
      <S.AccountCardWrapper>
        {isAvatar && (
          <S.AccountCardAvatar>
            <BigHead {...avatarOptions?.data} />
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
              <Badge isRegistered={isVerified}>{t("card.verified")}</Badge>
            ) : (
              <S.Button type="button">{t("card.verifyNow")}</S.Button>
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
    {!!actionTitle?.length && (
      <S.Button onClick={onClick}>{actionTitle}</S.Button>
    )}
    {children}
  </S.Empty>
);

const EmptyFundingWallet = ({
  description = "",
  actionTitle = "",
  onClick = undefined,
  children,
}: T.EmptyProps) => {
  return (
    <S.Empty>
      <S.EmptyBox>
        {/* Extension dropdown/Connect wallet */}
        <Dropdown>
          <Dropdown.Trigger>
            <S.DropdownTrigger showBackground>
              Connect Wallet
              <Icons.ArrowBottom />
            </S.DropdownTrigger>
          </Dropdown.Trigger>
          <AvailableExtensionsDropDown />
        </Dropdown>
        <p>{description}</p>
      </S.EmptyBox>
      {!!actionTitle?.length && (
        <S.Button onClick={onClick}>{actionTitle}</S.Button>
      )}
      {children}
    </S.Empty>
  );
};

const AvailableExtensionsDropDown = () => {
  const { extensions } = useSettingsProvider();
  const { onConnectExtensionWallet } = useExtensionWallet();

  return (
    <Dropdown.Menu fill="secondaryBackgroundSolid">
      {extensions.slice(0, 3).map((extension) => (
        <Dropdown.Item
          key={extension.extensionName}
          onAction={() => {
            onConnectExtensionWallet({
              extensionName: extension.extensionName,
            });
          }}
        >
          <Image
            src={extension.logo.src}
            alt={extension.logo.alt}
            width={20}
            height={20}
          />
          {extension.title}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  );
};

type AccountHeaderProps = {
  handleFilter: (e) => void;
  children: React.ReactNode;
};

const AccountHeader = ({ handleFilter, children }: AccountHeaderProps) => {
  const { t } = useTranslation("settings");

  return (
    <S.Header>
      <Search
        onInput={handleFilter}
        isFull
        placeholder={t("searchPlaceHolder")}
      />
      <S.Filters>{children}</S.Filters>
    </S.Header>
  );
};

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
  const { t } = useTranslation("settings");
  const buttonRef = useRef<HTMLSpanElement | null>(null);
  const handleOnMouseOut = () => {
    if (buttonRef.current) {
      buttonRef.current.innerHTML = t("copyToClipBoard");
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    if (buttonRef.current) {
      buttonRef.current.innerHTML = t("copied");
    }
  };

  const shortAddress = transformAddress(address, 18);
  return (
    <S.WalletCard isActive={isPresentInBrowser}>
      <S.WalletCardWrapper>
        {isUsing && <S.Using>{t("inUse")}</S.Using>}
        <S.WalletCardContent>
          <span>
            {name} <small>{additionalInfo}</small>
          </span>
          <S.WalletCardCopy>
            <Tooltip>
              <TooltipHeader>
                <button
                  type="button"
                  onClick={handleCopy}
                  onMouseOut={handleOnMouseOut}
                >
                  <Icons.Copy />
                </button>
              </TooltipHeader>
              <TooltipContent>
                <span ref={buttonRef} style={{ whiteSpace: "nowrap" }}>
                  {t("copyToClipBoard")}
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
