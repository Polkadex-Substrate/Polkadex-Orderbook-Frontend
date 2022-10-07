import Head from "next/head";
import { useState } from "react";

import * as S from "./styles";
import * as T from "./types";

import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";
import {
  Checkbox,
  Footer,
  Modal,
  Search,
  Tooltip,
  TooltipContent,
  TooltipHeader,
} from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { Dropdown } from "@polkadex/orderbook/v3/ui/molecules";
import { PreviewAccount, NewAccount } from "@polkadex/orderbook-ui/organisms";

export const SettingsTemplate = () => {
  const [state, setState] = useState(false);
  const [preview, setPreview] = useState(false);
  const [newAccount, setNewAccount] = useState(true);

  return (
    <>
      <Modal open={preview} onClose={() => setPreview(false)} placement="start right">
        <PreviewAccount onClose={() => setPreview(false)} />
      </Modal>
      <Modal open={newAccount} onClose={() => setNewAccount(false)} placement="start right">
        <NewAccount onClose={() => setNewAccount(false)} />
      </Modal>
      <Head>
        <title>Settings | Polkadex Orderbook</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <Menu handleChange={() => setState(!state)} />
        <S.Wrapper>
          <S.ContainerMain>
            <S.Title>
              <h1>Settings.</h1>
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
                  {true && (
                    <ButtonWallet type="button" onClick={() => setNewAccount(true)}>
                      New Account
                    </ButtonWallet>
                  )}
                </S.WalletTitle>
                <S.WalletContainer>
                  {false ? (
                    <Empty
                      title="No tradding accounts"
                      description="Trading accounts allow you to operate within the orderbook and make withdrawals. They are created from a wallet, it is only possible to have 3 per wallet."
                      // actionTitle="Import trading account"
                      onClick={() => console.log("Open Modal")}>
                      {false && (
                        <S.Registered>
                          <div>
                            <Icons.Info />
                          </div>
                          <div>
                            <span>Wallet found, but not registered</span>
                            <p>
                              Ops, it seems that you have one or several wallets, it is
                              necessary to register a wallet to create a trading account.
                            </p>
                          </div>
                        </S.Registered>
                      )}
                    </Empty>
                  ) : (
                    <S.WalletWrapper>
                      <AccountHeader>
                        <S.AccountHeaderContent>
                          <Checkbox>Show only linked accounts</Checkbox>
                          <Dropdown>
                            <Dropdown.Trigger>
                              <S.AccountHeaderTrigger>
                                <span>All</span>
                                <div>
                                  <Icons.ArrowBottom />
                                </div>
                              </S.AccountHeaderTrigger>
                            </Dropdown.Trigger>
                            <Dropdown.Menu fill="secondaryBackgroundSolid">
                              <Dropdown.Item>Test</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </S.AccountHeaderContent>
                      </AccountHeader>
                      <S.WalletContent>
                        <WalletCard
                          isUsing={true}
                          isDefault={true}
                          defaultTitle="Default trade account"
                          name="Occasional-chamois"
                          address="5HmuAcVry1VWoK9vYvQ4zkGBHrXCcFYVuVfAur1gDAa7kaF8"
                          aditionalInfo="(Linked to Ordebrook testing)">
                          <S.Button type="button" onClick={() => setPreview(true)}>
                            Preview
                          </S.Button>
                        </WalletCard>
                        <WalletCard
                          name="Occasional-chamois"
                          address="5HmuAcVry1VWoK9vYvQ4zkGBHrXCcFYVuVfAur1gDAa7kaF8"
                          aditionalInfo="(Linked to Ordebrook testing)">
                          <S.Button type="button" onClick={() => setPreview(true)}>
                            Preview
                          </S.Button>
                        </WalletCard>
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
                        <span>Controller account info</span>
                      </TooltipContent>
                    </Tooltip>
                    <h2>Wallets</h2>
                  </S.WalletTitleWrapper>
                </S.WalletTitle>
                <S.WalletContainer>
                  {false ? (
                    <Empty
                      title="No wallet found"
                      description="Wallets allow you to create trading accounts and make deposits. Use your Polkadot {.js} extension wallet."
                    />
                  ) : (
                    <S.WalletWrapper>
                      <AccountHeader>
                        <S.AccountHeaderContent>
                          <Dropdown>
                            <Dropdown.Trigger>
                              <S.AccountHeaderTrigger>
                                <span>All wallets types</span>
                                <div>
                                  <Icons.ArrowBottom />
                                </div>
                              </S.AccountHeaderTrigger>
                            </Dropdown.Trigger>
                            <Dropdown.Menu fill="secondaryBackgroundSolid">
                              <Dropdown.Item>Test</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </S.AccountHeaderContent>
                      </AccountHeader>
                      <S.WalletContent>
                        <WalletCard
                          isUsing={true}
                          isDefault={true}
                          defaultTitle="Default controller account"
                          name="Polkadex testing"
                          address="5HmuAcVry1VWoK9vYvQ4zkGBHrXCcFYVuVfAur1gDAa7kaF8"
                          aditionalInfo="(1 trading account)">
                          {true ? (
                            <Badge isRegistered={true}>Registered</Badge>
                          ) : (
                            <S.Button type="button">Register Now</S.Button>
                          )}
                        </WalletCard>
                        <WalletCard
                          defaultTitle="Default controller account"
                          name="Polkadex testing"
                          address="5HmuAcVry1VWoK9vYvQ4zkGBHrXCcFYVuVfAur1gDAa7kaF8"
                          aditionalInfo="(1 trading account)">
                          {false ? (
                            <Badge isRegistered={true}>Registered</Badge>
                          ) : (
                            <S.Button type="button">Register Now</S.Button>
                          )}
                        </WalletCard>
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
                    description="rodolfo@polkadex.trade"
                    isLocked
                    hasBadge
                    isVerified
                  />
                  <Card
                    label="Avatar"
                    isAvatar
                    description="Select an avatar to personalize your account."
                    actionTitle="Change"
                    onClick={() => console.log("Open Modal")}
                  />
                  <Card label="Creation date" description="September 29, 2022." isLocked />
                  <Card
                    label="Delete Account"
                    description="This action is irreversible, please make sure you`re certain of it."
                    onClick={() => console.log("Open Modal")}
                    actionTitle="Delete account"
                  />
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

const AccountHeader = ({ children }) => (
  <S.Header>
    <Search isFull placeholder="Search" />
    <S.Filters>{children}</S.Filters>
  </S.Header>
);

const WalletCard = ({
  isUsing = false,
  isDefault = false,
  defaultTitle = "",
  name = "",
  address = "",
  aditionalInfo = "",
  children,
}) => (
  <S.WalletCard>
    <S.WalletCardWrapper>
      {isUsing && <S.Using>USING</S.Using>}
      <S.WalletCardContent>
        <span>
          {name} <small>{aditionalInfo}</small>
        </span>
        <S.WalletCardCopy>
          <div>
            <Icons.Copy />
          </div>
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
