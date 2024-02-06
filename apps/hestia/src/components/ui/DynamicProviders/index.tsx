"use client";

import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Amplify } from "aws-amplify";
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
import { ConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";

import awsconfig from "../../../../aws-exports";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

Amplify.configure(awsconfig);
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
