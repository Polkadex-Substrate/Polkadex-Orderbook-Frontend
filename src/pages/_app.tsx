import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import Script from "next/script";
import { useRouter } from "next/router";
import { OverlayProvider } from "@react-aria/overlays";
import dynamic from "next/dynamic";
import keyring from "@polkadot/ui-keyring";

import { wrapper } from "../store";
import { useInit } from "../hooks/useInit";
import { useReduxSelector } from "../hooks/useReduxSelector";
import { useUserDataFetch } from "../hooks/useUserDataFetch";

import {
  alertDelete,
  selectAlertState,
  selectCurrentColorTheme,
  selectNotificationsAlert,
} from "@polkadex/orderbook-modules";
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
    import("@polkadex/orderbook-ui/templates/Notifications").then((mod) => mod.Notifications),
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
  const [state, setState] = useState(false);
  const color = useSelector(selectCurrentColorTheme);
  const alert = useSelector(selectAlertState);
  const notifications = useReduxSelector(selectNotificationsAlert);

  const dispatch = useDispatch();

  const cryptoWait = async () => {
    await cryptoWaitReady();
    keyring.loadAll({ ss58Format: 88, type: "sr25519" });
  };

  useEffect(() => {
    setState(true);
    cryptoWait();
  }, []);

  if (!state) return <div />;

  return (
    <OverlayProvider>
      <ThemeProvider theme={color === "light" ? defaultThemes.light : defaultThemes.dark}>
        <Notifications notifications={notifications} />
        {alert.status && (
          <Message
            isVisible={alert.status}
            onClose={() => dispatch(alertDelete())}
            type={alert.type}
            title={alert.message.title}
            description={alert.message.description}
          />
        )}
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
