import {
  ExtensionAccountsProvider,
  ExtensionsProvider,
  UserAccountsProvider,
} from "@polkadex/react-providers";
import {
  ProfileProvider,
  NativeApiProvider,
  OrderbookServiceProvider,
  SubscriptionProvider,
} from "@orderbook/core/providers";

import { ConnectWalletProvider } from "@/providers/connectWalletProvider";
export const DynamicProviders = ({ children }) => {
  return (
    <ExtensionsProvider>
      <ExtensionAccountsProvider
        network={"polkadex"}
        ss58={88}
        dappName={"polkadex"}
      >
        <UserAccountsProvider>
          <ProfileProvider>
            <NativeApiProvider>
              <OrderbookServiceProvider>
                <SubscriptionProvider>
                  <ConnectWalletProvider>{children}</ConnectWalletProvider>
                </SubscriptionProvider>
              </OrderbookServiceProvider>
            </NativeApiProvider>
          </ProfileProvider>
        </UserAccountsProvider>
      </ExtensionAccountsProvider>
    </ExtensionsProvider>
  );
};
