import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { KeyringPair } from "@polkadot/keyring/types";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import {
  Icon,
  Tooltip,
  TooltipContent,
  TooltipHeader,
  Dropdown,
} from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import {
  transformAddress,
  useProfile,
} from "@orderbook/core/providers/user/profile";
import {
  getTradeAccount,
  useTradeWallet,
} from "@orderbook/core/providers/user/tradeWallet";
import {
  userMainAccountDetails,
  useExtensionWallet,
} from "@orderbook/core/providers/user/extensionWallet";
import { ExtensionAccount } from "@orderbook/core/providers/types";

import * as T from "./types";
import * as S from "./styles";

export const AccountOverview = ({ onNavigate, logout }: T.Props) => {
  const { t: translation } = useTranslation("molecules");
  const t = (key: string) => translation(`accountOverview.${key}`);

  const router = useRouter();
  const extensionWalletState = useExtensionWallet();
  const tradeWalletState = useTradeWallet();

  const tradingAccounts = tradeWalletState.allBrowserAccounts;
  const mainAccounts = extensionWalletState.allAccounts;
  const {
    selectedAccount: currentUsingAccount,
    userData: { userAccounts: allUserAccounts },
  } = useProfile();

  const [accountList, setAccountList] = useState<KeyringPair[]>([]);
  const [selectedTradeAccount, setSelectedTradeAccount] = useState<
    KeyringPair | undefined
  >();
  const [selectedMainAccount, setSelectedMainAccount] = useState<
    ExtensionAccount | undefined
  >();
  const { onUserSelectAccount } = useProfile();

  // TODO: Missing dependencies
  useEffect(() => {
    if (currentUsingAccount) {
      const tradeAcc = getTradeAccount(
        currentUsingAccount.tradeAddress,
        tradingAccounts
      );
      const mainAcc = userMainAccountDetails(
        currentUsingAccount.mainAddress,
        mainAccounts
      );
      setSelectedTradeAccount(tradeAcc);
      setSelectedMainAccount(mainAcc);
    }
  }, [currentUsingAccount, mainAccounts, tradingAccounts]);

  useEffect(() => {
    const accountList: KeyringPair[] = [];
    allUserAccounts?.forEach((data) => {
      const res = getTradeAccount(data.tradeAddress, tradingAccounts);
      if (res && accountList.length < 5) {
        accountList.push(res);
      }
    });
    setAccountList(accountList);
  }, [allUserAccounts, tradingAccounts]);

  const handleClick = (addr: string) => {
    const acc = getTradeAccount(addr, tradingAccounts);
    const userAcc = allUserAccounts?.find(
      (acc) => acc.tradeAddress?.toLowerCase() === addr?.toLowerCase()
    );
    const mainAcc =
      userAcc && userMainAccountDetails(userAcc.mainAddress, mainAccounts);
    setSelectedTradeAccount(acc);
    setSelectedMainAccount(mainAcc);
    onUserSelectAccount({ tradeAddress: addr });
  };

  const headerMessage = !allUserAccounts?.length
    ? t("noRegisteredAccount")
    : selectedTradeAccount?.meta?.name || t("chooseYourTradeAccount");

  const addressMessage =
    selectedTradeAccount &&
    ` • ${
      selectedTradeAccount ? transformAddress(selectedTradeAccount.address) : ""
    }`;

  const handleOnMouseOut = (ref: MutableRefObject<HTMLElement | null>) => {
    if (ref.current) ref.current.innerHTML = t("copyToClipboard");
  };

  const handleCopy = async (
    data: string,
    ref: MutableRefObject<HTMLElement | null>
  ) => {
    await navigator.clipboard.writeText(data);
    if (ref.current) {
      ref.current.innerHTML = t("copied");
    }
  };

  const tradeButton = useRef(null);
  const controllerButton = useRef(null);

  return (
    <S.Wrapper>
      <S.Switch>
        {accountList.length ? (
          <Dropdown>
            <Dropdown.Trigger>
              <S.SwitchCard>
                <S.SwitchCardContent>
                  {selectedTradeAccount && <span>{t("tradingAccount")}</span>}
                  <S.SwitchCardInfo>
                    {selectedTradeAccount && (
                      <Tooltip>
                        <TooltipHeader>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopy(
                                selectedTradeAccount.address,
                                tradeButton
                              )
                            }
                            onMouseOut={() => handleOnMouseOut(tradeButton)}
                          >
                            <Icons.Copy />
                          </button>
                        </TooltipHeader>
                        <TooltipContent>
                          <span
                            ref={tradeButton}
                            style={{ whiteSpace: "nowrap" }}
                          >
                            {t("copyToClipboard")}
                          </span>
                        </TooltipContent>
                      </Tooltip>
                    )}
                    <p>
                      <>
                        {headerMessage}
                        <small>{addressMessage}</small>
                      </>
                    </p>
                  </S.SwitchCardInfo>
                </S.SwitchCardContent>
                <S.SwitchCardArrow>
                  <Icons.ArrowBottom />
                </S.SwitchCardArrow>
              </S.SwitchCard>
            </Dropdown.Trigger>
            {accountList?.length && (
              <Dropdown.Menu fill="secondaryBackgroundSolid">
                {accountList.map(({ address, meta }) => {
                  const shortAddress = transformAddress(address, 10);
                  return (
                    <Dropdown.Item
                      onAction={() => handleClick(address)}
                      key={address}
                    >
                      <S.DropdownHeader>
                        <>
                          {meta.name}
                          <small>{` • ${shortAddress}`}</small>
                        </>
                      </S.DropdownHeader>
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            )}
          </Dropdown>
        ) : (
          <S.DropdownEmpty>
            <p>{t("noTradingAccount")}</p>
            <Link href="/wallets">{t("importOrCreateOne")}</Link>
          </S.DropdownEmpty>
        )}
        {selectedTradeAccount && (
          <S.SwitchCard>
            <S.SwitchCardContent>
              <span>
                {t("fundingAccount")}
                <div>
                  <Icons.Verified />
                </div>
              </span>
              <S.SwitchCardInfo>
                <Tooltip>
                  <TooltipHeader>
                    <button
                      type="button"
                      onClick={() => {
                        if (selectedMainAccount?.account?.address)
                          handleCopy(
                            selectedMainAccount.account.address,
                            controllerButton
                          );
                      }}
                      onMouseOut={() => handleOnMouseOut(controllerButton)}
                    >
                      <Icons.Copy />
                    </button>
                  </TooltipHeader>
                  <TooltipContent>
                    <span
                      ref={controllerButton}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {t("copyToClipboard")}
                    </span>
                  </TooltipContent>
                </Tooltip>
                <p>
                  {selectedMainAccount?.account?.meta?.name} •{" "}
                  <small>
                    {transformAddress(
                      selectedMainAccount?.account?.address ?? ""
                    )}
                  </small>
                </p>
              </S.SwitchCardInfo>
            </S.SwitchCardContent>
          </S.SwitchCard>
        )}
      </S.Switch>
      <S.Links>
        <Card
          title={t("balances")}
          icon="Coins"
          onClick={() => router.push("/balances")}
        />
        <Card
          title={t("wallets")}
          icon="Wallet"
          onClick={() => router.push("/wallets")}
        />
        <Card
          title={t("appearance")}
          icon="Appearance"
          onClick={() => onNavigate("Appearance")}
        />
        <Card title={t("logout")} icon="Logout" onClick={logout} />
      </S.Links>
    </S.Wrapper>
  );
};

const Card = ({ title, description, icon, ...props }: T.Card) => (
  <S.Card isHoverable={!!props?.onClick} {...props}>
    <S.CardContent>
      <Icon
        name={icon}
        stroke="tertiaryText"
        color="tertiaryText"
        size="medium"
      />
      <S.CardTitle>
        <span>{title}</span>
        {description && <p>{description}</p>}
      </S.CardTitle>
    </S.CardContent>
  </S.Card>
);
