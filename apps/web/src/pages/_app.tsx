import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { OverlayProvider } from "@react-aria/overlays";
import { appWithTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import NextNProgress from "nextjs-progressbar";
import { ReactNode, useEffect, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Flip, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { Amplify, Analytics } from "aws-amplify";
import { Work_Sans } from "next/font/google";
import Head from "next/head";
import { defaultConfig } from "@orderbook/core/config";
import {
  AuthProvider,
  ProfileProvider,
  TradeWalletProvider,
  NativeApiProvider,
  ExtensionWalletProvider,
  SettingProvider,
  AssetsProvider,
  MarketsProvider,
} from "@orderbook/core/providers";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useInit } from "@orderbook/core/hooks";

import awsconfig from "../../aws-exports";

import * as gtag from "@/lib/gtag";
import { defaultThemes, GlobalStyles } from "@/styles";

const analyticsConfig = {
  AWSPinpoint: {
    // Amazon Pinpoint App Client ID
    appId: process.env.PIN_POINT_CLIENT_ID,
    // Amazon service region
    region: process.env.API_REGION,
    mandatorySignIn: false,
  },
};
Amplify.configure(awsconfig);

Analytics.configure(analyticsConfig);

const workSans = Work_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const Maintenance = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Maintenance").then(
      (mod) => mod.Maintenance
    ),
  {
    ssr: false,
  }
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

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

  useEffect(() => {
    const handleRouteChange = (url: string) => gtag.pageview(url);
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
            `,
          }}
        />
      </Head>
      <ToastContainer transition={Flip} />
      <QueryClientProvider client={queryClient}>
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
          }}
        >
          <OverlayProvider>
            {isActive ? (
              <TradingPageProvider>
                <Providers>
                  <ModifiedThemeProvider
                    Component={Component}
                    pageProps={pageProps}
                  />
                </Providers>
              </TradingPageProvider>
            ) : (
              <ModifiedThemeProvider
                Component={Component}
                pageProps={pageProps}
              />
            )}
          </OverlayProvider>
        </SettingProvider>
      </QueryClientProvider>
      {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      <style jsx global>{`
        body {
          font-family: ${workSans.style.fontFamily},
            ${defaultThemes.dark.font.family};
        }
      `}</style>
    </>
  );
}

const ModifiedThemeProvider = ({ Component, pageProps }) => {
  const { theme } = useSettingsProvider();

  return (
    <>
      <ThemeProvider
        theme={theme === "light" ? defaultThemes.light : defaultThemes.dark}
      >
        {defaultConfig.maintenanceMode ? (
          <Maintenance />
        ) : (
          <ThemeWrapper>
            <Layout Component={Component} pageProps={pageProps} />
          </ThemeWrapper>
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
export default appWithTranslation(App);
