import { useRouter } from "next/router";

import * as S from "./styles";
import * as T from "./types";

import { Icon } from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { Dropdown } from "@polkadex/orderbook/v3/ui/molecules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  selectBrowserTradeAccounts,
  selectExtensionWalletAccounts,
  selectUserAccounts,
  selectUsingAccount,
  userAccountSelectFetch,
} from "@polkadex/orderbook-modules";
import { useEffect, useState } from "react";
import { KeyringPair } from "@polkadot/keyring/types";
import { transformAddress } from "@polkadex/orderbook/modules/user/profile/helpers";
import { getTradeAccount } from "@polkadex/orderbook/modules/user/tradeWallet/helper";
import { userMainAccountDetails } from "@polkadex/orderbook/modules/user/extensionWallet/helpers";
import { ExtensionAccount } from "@polkadex/orderbook/modules/types";
import { useDispatch } from "react-redux";

export const AccountOverview = ({ onNavigate, logout }: T.Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const tradingAccounts = useReduxSelector(selectBrowserTradeAccounts);
  const mainAccounts = useReduxSelector(selectExtensionWalletAccounts);
  const currentUsingAccount = useReduxSelector(selectUsingAccount);
  const allUserAccounts = useReduxSelector(selectUserAccounts);
  const [accountList, setAccountList] = useState<KeyringPair[]>([]);
  const [selectedTradeAccount, setSelectedTradeAccount] = useState<KeyringPair>(null);
  const [selectedMainAccount, setSelectedMainAccount] = useState<ExtensionAccount>(null);

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
    allUserAccounts.map((data) => {
      const res = getTradeAccount(data.tradeAddress, tradingAccounts);
      if (res && accountList.length < 5) {
        accountList.push(res);
      }
    });
    setAccountList(accountList);
  }, [allUserAccounts]);

  const handleClick = (addr: string) => {
    const acc = getTradeAccount(addr, tradingAccounts);
    const userAcc = allUserAccounts.find(
      (acc) => acc.tradeAddress?.toLowerCase() === addr?.toLowerCase()
    );
    const mainAcc = userMainAccountDetails(userAcc.mainAddress, mainAccounts);
    setSelectedTradeAccount(acc);
    setSelectedMainAccount(mainAcc);
    dispatch(userAccountSelectFetch({ tradeAddress: addr }));
  };

  return (
    <S.Wrapper>
      <S.Profile>
        <div>
          <Icons.Profile />
        </div>
        <span>Profile</span>
      </S.Profile>
      <S.Switch>
        <Dropdown>
          <Dropdown.Trigger>
            <S.SwitchCard>
              <S.SwitchCardContent>
                <span>Trading account</span>
                <S.SwitchCardInfo>
                  <button type="button">
                    <Icons.Copy />
                  </button>
                  <p>
                    {allUserAccounts.length === 0
                      ? "You have no registered trading account"
                      : selectedTradeAccount
                      ? selectedTradeAccount.meta.name
                      : "Choose trade account"}{" "}
                    •{" "}
                    <small>
                      {selectedTradeAccount
                        ? transformAddress(selectedTradeAccount.address)
                        : ""}
                    </small>
                  </p>
                </S.SwitchCardInfo>
              </S.SwitchCardContent>
              <S.SwitchCardArrow>
                <Icons.ArrowBottom />
              </S.SwitchCardArrow>
            </S.SwitchCard>
          </Dropdown.Trigger>
          {accountList.length ? (
            <Dropdown.Menu fill="secondaryBackgroundSolid">
              {accountList.map((acc) => (
                <Dropdown.Item onAction={handleClick} key={acc.address}>
                  {acc.address}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          ) : null}
        </Dropdown>
        <S.SwitchCard>
          <S.SwitchCardContent>
            <span>
              Controller account
              <div>
                <Icons.Verified />
              </div>
            </span>
            <S.SwitchCardInfo>
              <button type="button">
                <Icons.Copy />
              </button>
              <p>
                {selectedMainAccount?.account?.meta?.name} •{" "}
                <small>{transformAddress(selectedMainAccount?.account?.address ?? "")}</small>
              </p>
            </S.SwitchCardInfo>
          </S.SwitchCardContent>
        </S.SwitchCard>
      </S.Switch>
      <S.Links>
        <Card title="Balances" icon="Wallet" onClick={() => router.push("/balances")} />
        <Card title="History" icon="History" onClick={() => router.push("/history")} />
        <Card title="Settings" icon="Settings" onClick={() => router.push("/settings")} />
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
