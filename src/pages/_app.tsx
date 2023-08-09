/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { OverlayProvider } from "@react-aria/overlays";
import dynamic from "next/dynamic";
import NextNProgress from "nextjs-progressbar";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { ReactNode, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
// eslint-disable-next-line camelcase
import { Work_Sans } from "next/font/google";

import { useInit } from "../hooks/useInit";

import { defaultThemes, GlobalStyles } from "src/styles";
import { defaultConfig } from "@polkadex/orderbook-config";
import {
  AuthProvider,
  ProfileProvider,
  TradeWalletProvider,
  NativeApiProvider,
  ExtensionWalletProvider,
  SettingProvider,
  AssetsProvider,
  MarketsProvider,
} from "@polkadex/orderbook/providers";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";
import "@polkadex/orderbook/i18n";
const workSans = Work_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

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

const TradingPageProvider = ({ children }) => {
  const router = useRouter();
  const isTradingPage = router.pathname.startsWith("/trading");
  return isTradingPage ? (
    <AssetsProvider>
      <MarketsProvider>{children}</MarketsProvider>
    </AssetsProvider>
  ) : (
    <>{children}</>
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
  const router = useRouter();
  const availableRoutes = defaultConfig.availableRoutes;
  const isActive = useMemo(() => {
    return availableRoutes.some((word) => router.pathname.includes(word));
  }, [availableRoutes, router.pathname]);

  return (
    <>
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
            <TradingPageProvider>
              <Providers>
                <ModifiedThemeProvider Component={Component} pageProps={pageProps} />
              </Providers>
            </TradingPageProvider>
          ) : (
            <ModifiedThemeProvider Component={Component} pageProps={pageProps} />
          )}
        </OverlayProvider>
      </SettingProvider>
      {/* @ts-ignore */}
      <style jsx global>{`
        body {
          font-family: ${workSans.style.fontFamily}, ${defaultThemes.dark.font.family};
        }
      `}</style>
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
              <Layout Component={Component} pageProps={pageProps} />
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
const Layout = ({ Component, pageProps }) => {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  } else {
    return <Component {...pageProps} />;
  }
};
export default App;
