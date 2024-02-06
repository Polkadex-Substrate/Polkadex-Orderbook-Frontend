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
  ConnectWalletProvider,
} from "@orderbook/core/providers";
import { useRouter } from "next/router";

export const DynamicProviders = ({ children }) => {
  const { query } = useRouter();
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
                <SubscriptionProvider marketId={query.id as string}>
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
