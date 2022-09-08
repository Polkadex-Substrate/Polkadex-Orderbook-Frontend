import { AppProps } from "next/app";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import Script from "next/script";
import { useRouter } from "next/router";
import { OverlayProvider } from "@react-aria/overlays";
import dynamic from "next/dynamic";
import keyring from "@polkadot/ui-keyring";

import { wrapper } from "../store";
import { useInit } from "../hooks/useInit";
import { useUserDataFetch } from "../hooks/useUserDataFetch";

import { selectCurrentColorTheme } from "@polkadex/orderbook-modules";
import { defaultThemes, GlobalStyles } from "src/styles";
const { cryptoWaitReady } = await import("@polkadot/util-crypto");
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
function App({ Component, pageProps }: AppProps) {
  useInit();
  useUserDataFetch();
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      (window as any).gtag("config", process.env.GOOGLE_ANALYTICS, {
        page_path: url,
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <ThemeWrapper>
      <GlobalStyles />
      <Component {...pageProps} />
      <Analytics />
    </ThemeWrapper>
  );
}

const ThemeWrapper = ({ children }) => {
  const color = useSelector(selectCurrentColorTheme);

  const cryptoWait = async () => {
    await cryptoWaitReady();
    keyring.loadAll({ ss58Format: 88, type: "sr25519" });
  };

  useEffect(() => {
    cryptoWait();
  }, []);

  return (
    <OverlayProvider>
      <ThemeProvider theme={color === "light" ? defaultThemes.light : defaultThemes.dark}>
        <Notifications />
        <Message />
        {children}
      </ThemeProvider>
    </OverlayProvider>
  );
};

const Analytics = () => (
  <>
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}
    />
    <Script
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
      }}
    />
  </>
);
export default wrapper.withRedux(App);
