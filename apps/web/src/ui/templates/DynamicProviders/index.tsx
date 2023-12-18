import {
  ExtensionAccountsProvider,
  ExtensionsProvider,
  UserAccountsProvider,
} from "@polkadex/react-providers";
import {
  ProfileProvider,
  TradeWalletProvider,
  NativeApiProvider,
  ExtensionWalletProvider,
  OrderbookServiceProvider,
  SubscriptionProvider,
} from "@orderbook/core/providers";
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
              <TradeWalletProvider>
                <ExtensionWalletProvider>
                  <OrderbookServiceProvider>
                    <SubscriptionProvider>{children}</SubscriptionProvider>
                  </OrderbookServiceProvider>
                </ExtensionWalletProvider>
              </TradeWalletProvider>
            </NativeApiProvider>
          </ProfileProvider>
        </UserAccountsProvider>
      </ExtensionAccountsProvider>
    </ExtensionsProvider>
  );
};
