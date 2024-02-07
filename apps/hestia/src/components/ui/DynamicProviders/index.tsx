"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ProfileProvider,
  OrderbookServiceProvider,
  NativeApiProvider,
  SettingProvider,
} from "@orderbook/core/providers";
import {
  ExtensionAccountsProvider,
  ExtensionsProvider,
  UserAccountsProvider,
} from "@polkadex/react-providers";
import { Amplify } from "aws-amplify";
import dynamic from "next/dynamic";

import awsconfig from "../../../../aws-exports";

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
