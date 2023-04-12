import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { OverlayProvider } from "@react-aria/overlays";
import dynamic from "next/dynamic";
import NextNProgress from "nextjs-progressbar";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { Auth } from "aws-amplify";
import { ReactNode, useEffect } from "react";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import keyring from "@polkadot/ui-keyring";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer, toast } from "react-toastify";

import { wrapper } from "../store";
import { useInit } from "../hooks/useInit";
import { useUserDataFetch } from "../hooks/useUserDataFetch";
import { AssetsProvider } from "../providers/public/assetsProvider/provider";
import { MarketsProvider } from "../providers/public/marketsProvider/provider";
import { BalancesProvider } from "../providers/user/balancesProvider/provider";
import { OrdersProvider } from "../providers/user/orders";

import { defaultThemes, GlobalStyles } from "src/styles";
import { defaultConfig } from "@polkadex/orderbook-config";
import { OrderBookProvider } from "@polkadex/orderbook/providers/public/orderBook";
import { AuthProvider, useAuth } from "@polkadex/orderbook/providers/user/auth";
import { ProfileProvider, useProfile } from "@polkadex/orderbook/providers/user/profile";
import { TradeWalletProvider } from "@polkadex/orderbook/providers/user/tradeWallet";
import { NativeApiProvider } from "@polkadex/orderbook/providers/public/nativeApi";
import { ExtensionWalletProvider } from "@polkadex/orderbook/providers/user/extensionWallet";
import {
  SettingProvider,
  useSettingsProvider,
} from "@polkadex/orderbook/providers/public/settings";

import "react-toastify/dist/ReactToastify.css";

const Message = dynamic(
  () => import("@polkadex/orderbook-ui/organisms/Message").then((mod) => mod.Message),
  {
    ssr: false,
  }
);

const Notifications = dynamic(
  () =>
    import("@polkadex/orderbook-ui/organisms/Notifications").then((mod) => mod.Notifications),
  {
    ssr: false,
  }
);

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
      <ToastContainer />
      <SettingProvider>
        <AuthProvider onError={(v) => toast.error(v)} onNotification={(v) => toast.info(v)}>
          <ProfileProvider
            onError={(v) => toast.error(v)}
            onNotification={(v) => toast.info(v)}>
            <AssetsProvider
              onError={(v) => toast.error(v)}
              onNotification={(v) => toast.info(v)}>
              <OrdersProvider
                onError={(v) => toast.error(v)}
                onNotification={(v) => toast.info(v)}>
                <NativeApiProvider
                  onError={(v) => toast.error(v)}
                  onNotification={(v) => toast.info(v)}>
                  <MarketsProvider
                    onError={(v) => toast.error(v)}
                    onNotification={(v) => toast.info(v)}>
                    <OrderBookProvider
                      onError={(v) => toast.error(v)}
                      onNotification={(v) => toast.info(v)}>
                      <ExtensionWalletProvider
                        onError={(v) => toast.error(v)}
                        onNotification={(v) => toast.info(v)}>
                        <TradeWalletProvider
                          onError={(v) => toast.error(v)}
                          onNotification={(v) => toast.info(v)}>
                          <BalancesProvider
                            onError={(v) => toast.error(v)}
                            onNotification={(v) => toast.info(v)}>
                            <OverlayProvider>
                              <ModifiedThemeProvider
                                Component={Component}
                                pageProps={pageProps}
                              />
                            </OverlayProvider>
                          </BalancesProvider>
                        </TradeWalletProvider>
                      </ExtensionWalletProvider>
                    </OrderBookProvider>
                  </MarketsProvider>
                </NativeApiProvider>
              </OrdersProvider>
            </AssetsProvider>
          </ProfileProvider>
        </AuthProvider>
      </SettingProvider>
    </>
  );
}

const ModifiedThemeProvider = ({ Component, pageProps }) => {
  const { color } = useSettingsProvider();

  return (
    <>
      <ThemeProvider theme={color === "light" ? defaultThemes.light : defaultThemes.dark}>
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
  const profileState = useProfile();
  const authState = useAuth();
  const signInSuccess = authState.signin.isSuccess;
  const logoutSuccess = authState.logout.isSuccess;

  const cryptoWait = async () => {
    try {
      await cryptoWaitReady();
      keyring.loadAll({ ss58Format: 88, type: "sr25519" });
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    cryptoWait();
  }, []);

  useEffect(() => {
    // When User logout, do not fetch the data
    if (!logoutSuccess) {
      fetchDataOnUserAuth();
    }
  }, [signInSuccess, logoutSuccess]);

  useInit();
  useUserDataFetch();

  const fetchDataOnUserAuth = async () => {
    try {
      const { attributes, signInUserSession } = await Auth.currentAuthenticatedUser();
      profileState.onUserChangeInitBanner();
      authState.onUserAuth({
        email: attributes?.email,
        userConfirmed: attributes?.email_verified,
      });
      profileState.onUserAuth({
        email: attributes?.email,
        isAuthenticated: true,
        userExists: true,
        isConfirmed: attributes?.email_verified,
        jwt: signInUserSession?.accessToken?.jwtToken,
      });
    } catch (error) {
      console.log("User error", error);
      switch (error) {
        case "User is not confirmed.": {
          authState.onUserAuth({
            email: "",
            userConfirmed: false,
          });
          profileState.onUserAuth({
            email: "",
            isAuthenticated: false,
            userExists: true,
            isConfirmed: false,
          });
          break;
        }
        case "The user is not authenticated": {
          break;
        }
        default: {
          console.error("Error=>", `User data fetch error: ${error.message}`);
          toast.error(`User data fetch error: ${error.message}`);
          break;
        }
      }
    }
  };

  return (
    <>
      <Notifications />
      <Message />
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

export default wrapper.withRedux(App);
