import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { KeyringPair } from "@polkadot/keyring/types";
import Link from "next/link";
import { BigHead } from "@bigheads/core";

import * as S from "./styles";
import * as T from "./types";

import {
  Icon,
  Tooltip,
  TooltipContent,
  TooltipHeader,
  Dropdown,
} from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { transformAddress } from "@polkadex/orderbook/providers/user/profile/helpers";
import { getTradeAccount } from "@polkadex/orderbook/providers/user/tradeWallet/helper";
import { userMainAccountDetails } from "@polkadex/orderbook/providers/user/extensionWallet/helper";
import { ExtensionAccount } from "@polkadex/orderbook/providers/types";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { randomAvatars } from "@polkadex/orderbook-ui/organisms/ChangeAvatar/randomAvatars";
import { useExtensionWallet } from "@polkadex/orderbook/providers/user/extensionWallet";
import { useTradeWallet } from "@polkadex/orderbook/providers/user/tradeWallet";

export const AccountOverview = ({ onNavigate, logout }: T.Props) => {
  const router = useRouter();
  const extensionWalletState = useExtensionWallet();
  const tradeWalletState = useTradeWallet();

  const tradingAccounts = tradeWalletState.allBrowserAccounts;
  const mainAccounts = extensionWalletState.allAccounts;
  const {
    selectedAccount: currentUsingAccount,
    userData: { userAccounts: allUserAccounts },
  } = useProfile();
  const profileState = useProfile();
  const avatarOptions = randomAvatars?.find(
    (v) => v.id === Number(profileState.userProfile?.avatar)
  );
  const [accountList, setAccountList] = useState<KeyringPair[]>([]);
  const [selectedTradeAccount, setSelectedTradeAccount] = useState<KeyringPair>(null);
  const [selectedMainAccount, setSelectedMainAccount] = useState<ExtensionAccount>(null);
  const { onUserSelectAccount } = useProfile();

  // TODO: Missing dependencies
  useEffect(() => {
    if (currentUsingAccount) {
      const tradeAcc = getTradeAccount(currentUsingAccount.tradeAddress, tradingAccounts);
      const mainAcc = userMainAccountDetails(currentUsingAccount.mainAddress, mainAccounts);
      setSelectedTradeAccount(tradeAcc);
      setSelectedMainAccount(mainAcc);
    }
  }, [currentUsingAccount]);

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
    const userAcc = allUserAccounts.find(
      (acc) => acc.tradeAddress?.toLowerCase() === addr?.toLowerCase()
    );
    const mainAcc = userMainAccountDetails(userAcc.mainAddress, mainAccounts);
    setSelectedTradeAccount(acc);
    setSelectedMainAccount(mainAcc);
    onUserSelectAccount({ tradeAddress: addr });
  };

  const headerMessage = !allUserAccounts?.length
    ? "You have no registered trading account"
    : selectedTradeAccount?.meta?.name || "Choose your trade account";

  const addressMessage =
    selectedTradeAccount &&
    ` • ${selectedTradeAccount ? transformAddress(selectedTradeAccount.address) : ""}`;

  const handleOnMouseOut = (ref: MutableRefObject<HTMLElement>) =>
    (ref.current.innerHTML = "Copy to clipboard");

  const handleCopy = async (data: string, ref: MutableRefObject<HTMLElement>) => {
    await navigator.clipboard.writeText(data);
    ref.current.innerHTML = "Copied";
  };

  const tradeButton = useRef(null);
  const controllerButton = useRef(null);

  return (
    <S.Wrapper>
      <S.Profile>
        <div>
          <BigHead {...avatarOptions.data} />
        </div>
        <span>Profile</span>
      </S.Profile>
      <S.Switch>
        {accountList.length ? (
          <Dropdown>
            <Dropdown.Trigger>
              <S.SwitchCard>
                <S.SwitchCardContent>
                  {selectedTradeAccount && <span>Trading account</span>}
                  <S.SwitchCardInfo>
                    {selectedTradeAccount && (
                      <Tooltip>
                        <TooltipHeader>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopy(selectedTradeAccount.address, tradeButton)
                            }
                            onMouseOut={() => handleOnMouseOut(tradeButton)}>
                            <Icons.Copy />
                          </button>
                        </TooltipHeader>
                        <TooltipContent>
                          <span ref={tradeButton} style={{ whiteSpace: "nowrap" }}>
                            Copy to clipboard
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
                    <Dropdown.Item onAction={() => handleClick(address)} key={address}>
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
            <p>No trading accounts found</p>
            <Link href="/settings">Import or Create a new one</Link>
          </S.DropdownEmpty>
        )}
        {selectedTradeAccount && (
          <S.SwitchCard>
            <S.SwitchCardContent>
              <span>
                Funding account
                <div>
                  <Icons.Verified />
                </div>
              </span>
              <S.SwitchCardInfo>
                <Tooltip>
                  <TooltipHeader>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(selectedMainAccount.account.address, controllerButton)
                      }
                      onMouseOut={() => handleOnMouseOut(controllerButton)}>
                      <Icons.Copy />
                    </button>
                  </TooltipHeader>
                  <TooltipContent>
                    <span ref={controllerButton} style={{ whiteSpace: "nowrap" }}>
                      Copy to clipboard
                    </span>
                  </TooltipContent>
                </Tooltip>
                <p>
                  {selectedMainAccount?.account?.meta?.name} •{" "}
                  <small>
                    {transformAddress(selectedMainAccount?.account?.address ?? "")}
                  </small>
                </p>
              </S.SwitchCardInfo>
            </S.SwitchCardContent>
          </S.SwitchCard>
        )}
      </S.Switch>
      <S.Links>
        <Card title="Balances" icon="Coins" onClick={() => router.push("/balances")} />
        <Card title="Accounts" icon="Wallet" onClick={() => router.push("/settings")} />
        <Card title="Appearance" icon="Appearance" onClick={() => onNavigate("Appearance")} />
        <Card title="Log Out" icon="Logout" onClick={logout} />
      </S.Links>
    </S.Wrapper>
  );
};

const Card = ({ title, description, icon, ...props }: T.Card) => (
  <S.Card isHoverable={!!props?.onClick} {...props}>
    <S.CardContent>
      <Icon name={icon} stroke="tertiaryText" color="tertiaryText" size="medium" />
      <S.CardTitle>
        <span>{title}</span>
        {description && <p>{description}</p>}
      </S.CardTitle>
    </S.CardContent>
  </S.Card>
);
