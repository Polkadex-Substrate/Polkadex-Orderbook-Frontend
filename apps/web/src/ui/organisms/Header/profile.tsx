import { ChevronDownIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Typography,
  truncateString,
  Icons,
  Popover,
  Multistep,
} from "@polkadex/ux";
import { useWalletProvider } from "@orderbook/core/providers/user/walletProvider";
import { useMemo } from "react";

import { Profile as ProfileDropdown } from "../../templates/ConnectWallet/profile";
import { NewTradingAccount } from "../../templates/ConnectWallet/newTradingAccount";
import { ConnectTradingAccount } from "../../templates/ConnectWallet/connectTradingAccount";
import { UserActions } from "../../templates/ConnectWallet/userActions";

export const Profile = ({ onClick }: { onClick: () => void }) => {
  const { selectedWallet, selectedAccount, onLogout, localTradingAccounts } =
    useWalletProvider();

  const shortAddress = useMemo(
    () => truncateString(selectedAccount?.address ?? "", 3),
    [selectedAccount?.address]
  );

  const tradingWalletPresent = useMemo(
    () => !!Object.keys(selectedAccount ?? {})?.length,
    [selectedAccount]
  );
  const fundWalletPresent = useMemo(
    () => !!Object.keys(selectedWallet ?? {})?.length,
    [selectedWallet]
  );

  if (tradingWalletPresent || fundWalletPresent)
    return (
      <Popover>
        <Popover.Trigger className="bg-level-1 transition-colors duration-300 pl-2 flex items-center gap-2 rounded-md">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4">
              <Icons.Avatar />
            </div>
            {fundWalletPresent ? (
              <Typography.Text size="xs" bold>
                {selectedWallet?.name}
              </Typography.Text>
            ) : (
              <Typography.Text size="xs" bold variant="secondary">
                Wallet not present
              </Typography.Text>
            )}
          </div>
          <div className="flex items-center gap-2 bg-level-4 px-2 py-1 rounded-md">
            {tradingWalletPresent ? (
              <Typography.Text size="xs" bold>
                Trading account ({shortAddress})
              </Typography.Text>
            ) : (
              <Typography.Text size="xs" bold variant="secondary">
                No trading account
              </Typography.Text>
            )}

            <ChevronDownIcon className="h-3 w-3" />
          </div>
        </Popover.Trigger>
        <Popover.Content>
          <Multistep.Interactive
            className="h-auto overflow-auto max-h-screen"
            placement="top center"
          >
            {(props) => (
              <>
                <Multistep.Trigger>
                  <ProfileDropdown
                    onCreateTradingAccount={() =>
                      props?.onPage("NewTradingAccount", true)
                    }
                    onImportTradingAccount={() =>
                      props?.onPage("ConnectTradingAccount", true)
                    }
                    onSwitch={() => {}}
                    onLogout={() => onLogout?.()}
                    onActions={() => props?.onPage("UserActions", true)}
                    onRemove={() => {}}
                    tradingWalletPresent={!!selectedAccount?.address}
                    fundWalletPresent={!!selectedWallet?.name}
                    fundWallet={selectedWallet}
                    tradeAccount={selectedAccount}
                    localTradingAccounts={localTradingAccounts}
                  />
                </Multistep.Trigger>
                <Multistep.Content>
                  <NewTradingAccount
                    key="NewTradingAccount"
                    onClose={() => props?.onChangeInteraction(false)}
                    onAction={async (e) => {}}
                    onRedirect={() => props?.onPage("ProcessingTransaction")}
                  />

                  <ConnectTradingAccount
                    key="ConnectTradingAccount"
                    accounts={localTradingAccounts}
                    onSelect={(e) => {
                      console.log(e);
                    }}
                    onClose={() => props?.onChangeInteraction(false)}
                    onImport={() => props?.onPage("ImportTradingAccount")}
                    onRemove={() => props?.onPage("RemoveTradingAccount")}
                  />
                  <UserActions
                    key="UserActions"
                    onClose={() => props?.onChangeInteraction(false)}
                    onNewTradingAccount={() =>
                      props?.onPage("NewTradingAccount")
                    }
                    onImportTradingAccount={() =>
                      props?.onPage("ImportTradingAccount")
                    }
                  />
                </Multistep.Content>
              </>
            )}
          </Multistep.Interactive>
        </Popover.Content>
      </Popover>
    );

  return <Button.Solid onClick={onClick}>Connect wallet</Button.Solid>;
};
