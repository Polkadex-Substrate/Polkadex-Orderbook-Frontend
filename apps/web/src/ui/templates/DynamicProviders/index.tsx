import {
  ExtensionAccountsProvider,
  ExtensionsProvider,
  UserAccountsProvider,
} from "@polkadex/react-providers";
import {
  ProfileProvider,
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
              <ExtensionWalletProvider>
                <OrderbookServiceProvider>
                  <SubscriptionProvider>{children}</SubscriptionProvider>
                </OrderbookServiceProvider>
              </ExtensionWalletProvider>
            </NativeApiProvider>
          </ProfileProvider>
        </UserAccountsProvider>
      </ExtensionAccountsProvider>
    </ExtensionsProvider>
  );
};
