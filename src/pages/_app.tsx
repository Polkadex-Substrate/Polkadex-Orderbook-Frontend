import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { OverlayProvider } from "@react-aria/overlays";
import dynamic from "next/dynamic";
import NextNProgress from "nextjs-progressbar";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

import { useInit } from "../hooks/useInit";

import { defaultThemes, GlobalStyles, FontStyles } from "src/styles";
import { defaultConfig } from "@polkadex/orderbook-config";
import {
  AuthProvider,
  ProfileProvider,
  TradeWalletProvider,
  NativeApiProvider,
  ExtensionWalletProvider,
  SettingProvider,
} from "@polkadex/orderbook/providers";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";

const Maintenance = dynamic(
  () => import("@polkadex/orderbook-ui/templates/Maintenance").then((mod) => mod.Maintenance),
  {
    ssr: false,
  }
);
const queryClient = new QueryClient();
const Providers = ({ children }) => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <NativeApiProvider>
          <TradeWalletProvider>
            <ExtensionWalletProvider>{children}</ExtensionWalletProvider>
          </TradeWalletProvider>
        </NativeApiProvider>
      </ProfileProvider>
    </AuthProvider>
  );
};

function App({ Component, pageProps }: AppProps) {
  // Removes all console from production environment
  if (process.env.NODE_ENV === "production") {
    console.log = () => {};
    console.debug = () => {};
    console.info = () => {};
    console.warn = () => {};
    console.error = () => {};
  }
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const availableRoutes = defaultConfig.availableRoutes;
  useEffect(() => {
    setIsActive(availableRoutes.some((word) => router.pathname.includes(word)));
  }, [availableRoutes, router.pathname]);

  return (
    <>
      <FontStyles />

      <ToastContainer transition={Flip} />
      <SettingProvider
        defaultToast={{
          onError: (e) => toast(e, { type: "error", theme: "colored" }),
          onSuccess: (e) =>
            toast(e, {
              type: "success",
              theme: "colored",
              className: "toastBg",
              pauseOnFocusLoss: false,
            }),
        }}>
        <OverlayProvider>
          {isActive ? (
            <Providers>
              <ModifiedThemeProvider Component={Component} pageProps={pageProps} />
            </Providers>
          ) : (
            <ModifiedThemeProvider Component={Component} pageProps={pageProps} />
          )}
        </OverlayProvider>
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
