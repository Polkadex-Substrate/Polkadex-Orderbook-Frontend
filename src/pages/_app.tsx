import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import Script from "next/script";
import { useRouter } from "next/router";

import { wrapper } from "../store";
import { useAppDaemon } from "../hooks/useAppDaemon";
import { useReduxSelector } from "../hooks/useReduxSelector";

import { Message } from "@polkadex/orderbook-ui/organisms";
import {
  alertDelete,
  notificationDeleteAll,
  notificationDeleteById,
  selectAlertState,
  selectCurrentColorTheme,
  selectNotifications,
} from "@polkadex/orderbook-modules";
import { defaultThemes, GlobalStyles } from "src/styles";
import { Notifications } from "@polkadex/orderbook-ui/templates";

function App({ Component, pageProps }: AppProps) {
  useAppDaemon();
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
  const notifications = useReduxSelector(selectNotifications);

  const dispatch = useDispatch();

  useEffect(() => {
    setState(true);
  }, []);

  if (!state) return <div />;

  return (
    <ThemeProvider theme={color === "light" ? defaultThemes.light : defaultThemes.dark}>
      <Notifications
        notifications={notifications}
        onRemove={(e) => dispatch(notificationDeleteById(e))}
        onRemoveAll={() => dispatch(notificationDeleteAll())}
      />
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
