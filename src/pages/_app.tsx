import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { OverlayProvider } from "@react-aria/overlays";
import dynamic from "next/dynamic";
import NextNProgress from "nextjs-progressbar";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useInit } from "../hooks/useInit";
import { AssetsProvider } from "../providers/public/assetsProvider/provider";
import { BalancesProvider } from "../providers/user/balancesProvider/provider";

import { defaultThemes, GlobalStyles } from "src/styles";
import { defaultConfig } from "@polkadex/orderbook-config";
import { AuthProvider } from "@polkadex/orderbook/providers/user/auth";
import { ProfileProvider } from "@polkadex/orderbook/providers/user/profile";
import { TradeWalletProvider } from "@polkadex/orderbook/providers/user/tradeWallet";
import { NativeApiProvider } from "@polkadex/orderbook/providers/public/nativeApi";
import { ExtensionWalletProvider } from "@polkadex/orderbook/providers/user/extensionWallet";
import {
  SettingProvider,
  useSettingsProvider,
} from "@polkadex/orderbook/providers/public/settings";
import { MarketsProvider } from "@polkadex/orderbook/providers/public/marketsProvider/provider";

const Maintenance = dynamic(
  () => import("@polkadex/orderbook-ui/templates/Maintenance").then((mod) => mod.Maintenance),
  {
    ssr: false,
  }
);
const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  // Removes all console from production environment
  if (process.env.NODE_ENV === "production") {
    console.log = () => {};
    console.debug = () => {};
    console.info = () => {};
    console.warn = () => {};
    console.error = () => {};
  }
  return (
    <>
      <ToastContainer transition={Flip} />
      <SettingProvider
        defaultToast={{
          onError: (e) => toast(e, { type: "error", theme: "colored" }),
          onSuccess: (e) =>
            toast(e, { type: "success", theme: "colored", className: "toastBg" }),
        }}>
        <AuthProvider>
          <ProfileProvider>
            <AssetsProvider>
              <MarketsProvider>
                <NativeApiProvider>
                  <ExtensionWalletProvider>
                    <TradeWalletProvider>
                      <BalancesProvider>
                        <OverlayProvider>
                          <ModifiedThemeProvider Component={Component} pageProps={pageProps} />
                        </OverlayProvider>
                      </BalancesProvider>
                    </TradeWalletProvider>
                  </ExtensionWalletProvider>
                </NativeApiProvider>
              </MarketsProvider>
            </AssetsProvider>
          </ProfileProvider>
        </AuthProvider>
      </SettingProvider>
    </>
  );
}

const ModifiedThemeProvider = ({ Component, pageProps }) => {
  const { theme } = useSettingsProvider();

  return (
    <>
      <ThemeProvider theme={theme === "light" ? defaultThemes.light : defaultThemes.dark}>
        {defaultConfig.maintenanceMode ? (
          <Maintenance />
        ) : (
          <QueryClientProvider client={queryClient}>
            <ThemeWrapper>
              <Component {...pageProps} />
            </ThemeWrapper>
          </QueryClientProvider>
        )}
        <GlobalStyles />
      </ThemeProvider>
    </>
  );
};

const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  useInit();

  return (
    <>
      <GoogleAnalytics trackPageViews />
      <NextNProgress
        color="#E6007A"
        startPosition={0.3}
        height={2}
        showOnShallow={true}
        options={{
          showSpinner: false,
        }}
      />
      {children}
    </>
  );
};

export default App;
