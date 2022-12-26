import { AppProps } from "next/app";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { OverlayProvider } from "@react-aria/overlays";
import dynamic from "next/dynamic";
import NextNProgress from "nextjs-progressbar";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { withSSRContext } from "aws-amplify";
import { ReactNode, useEffect } from "react";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import keyring from "@polkadot/ui-keyring";
import { QueryClient, QueryClientProvider } from "react-query";

import { wrapper } from "../store";
import { useInit } from "../hooks/useInit";
import { useUserDataFetch } from "../hooks/useUserDataFetch";
import {
  getAllMainLinkedAccounts,
  getAllProxyAccounts,
} from "../modules/user/profile/sagas/userSaga";

import {
  selectCurrentColorTheme,
  sendError,
  userAuthData,
  userData,
} from "@polkadex/orderbook-modules";
import { defaultThemes, GlobalStyles } from "src/styles";
import { defaultConfig } from "@polkadex/orderbook-config";

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
  const color = useSelector(selectCurrentColorTheme);

  return (
    <OverlayProvider>
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
    </OverlayProvider>
  );
}

const ThemeWrapper = ({ children }: { children: ReactNode }) => {
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

  useInit();
  useUserDataFetch();

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
// TODO: Move to sagas || Improve
App.getInitialProps = wrapper.getInitialAppProps(({ dispatch }) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async ({ Component, ctx }: any) => {
    const { Auth, API } = withSSRContext(ctx);
    let pageProps = {};
    if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx);
    try {
      /* Getting the current user's attributes and signInUserSession from Amazon Cognito auth API. */
      const { attributes, signInUserSession } = await Auth.currentAuthenticatedUser();

      dispatch(
        userAuthData({
          email: attributes?.email,
          isAuthenticated: true,
          userExists: true,
          isConfirmed: attributes?.email_verified,
          jwt: signInUserSession?.accessToken?.jwtToken,
        })
      );
      if (attributes?.email?.length) {
        const { accounts } = await getAllMainLinkedAccounts(attributes.email, API);
        const userAccounts = await getAllProxyAccounts(accounts, API);
        dispatch(userData({ mainAccounts: accounts, userAccounts }));
      }
    } catch (error) {
      console.log("User error", error);
      switch (error) {
        case "User is not confirmed.": {
          dispatch(
            userAuthData({
              email: "",
              isAuthenticated: false,
              userExists: true,
              isConfirmed: false,
            })
          );
          break;
        }
        case "The user is not authenticated": {
          break;
        }
        default: {
          dispatch(
            sendError({
              error: `User data fetch error: ${error.message}`,
              processingType: "alert",
            })
          );
          break;
        }
      }
    }
    return {
      pageProps,
    };
  }
);

export default wrapper.withRedux(App);
