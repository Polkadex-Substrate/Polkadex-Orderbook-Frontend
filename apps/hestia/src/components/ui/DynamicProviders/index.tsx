"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Amplify } from "aws-amplify";
import dynamic from "next/dynamic";

import awsconfig from "../../../../aws-exports";
const UserAccountsProvider = dynamic(
  () =>
    import("@polkadex/react-providers").then((mod) => mod.UserAccountsProvider),
  { ssr: false }
);
const ExtensionsProvider = dynamic(
  () =>
    import("@polkadex/react-providers").then((mod) => mod.ExtensionsProvider),
  { ssr: false }
);
const ExtensionAccountsProvider = dynamic(
  () =>
    import("@polkadex/react-providers").then(
      (mod) => mod.ExtensionAccountsProvider
    ),
  { ssr: false }
);

const ProfileProvider = dynamic(
  () => import("@orderbook/core/providers").then((mod) => mod.ProfileProvider),
  { ssr: false }
);

const OrderbookServiceProvider = dynamic(
  () =>
    import("@orderbook/core/providers").then(
      (mod) => mod.OrderbookServiceProvider
    ),
  { ssr: false }
);

const NativeApiProvider = dynamic(
  () =>
    import("@orderbook/core/providers").then((mod) => mod.NativeApiProvider),
  { ssr: false }
);

const SettingProvider = dynamic(
  () => import("@orderbook/core/providers").then((mod) => mod.SettingProvider),
  { ssr: false }
);

const ConnectWalletProvider = dynamic(
  () =>
    import("@orderbook/core/providers").then(
      (mod) => mod.ConnectWalletProvider
    ),
  { ssr: false }
);

const Toaster = dynamic(
  () => import("@polkadex/ux").then((mod) => mod.Toaster),
  { ssr: false }
);

Amplify.configure(awsconfig);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const DynamicProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingProvider
        defaultToast={{
          onError: (e) => console.log(e),
          onSuccess: (e) => console.log(e),
        }}
      >
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
                    <ConnectWalletProvider>
                      <Toaster />
                      {children}
                    </ConnectWalletProvider>
                  </OrderbookServiceProvider>
                </NativeApiProvider>
              </ProfileProvider>
            </UserAccountsProvider>
          </ExtensionAccountsProvider>
        </ExtensionsProvider>
      </SettingProvider>
    </QueryClientProvider>
  );
};
