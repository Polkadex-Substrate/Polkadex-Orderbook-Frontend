import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";

import { wrapper } from "../store";

import { Message } from "@polkadex/orderbook-ui/organisms";
import { Notifications } from "@orderbook/v2/ui/organisms";
import {
  alertDelete,
  notificationDeleteByIndex,
  selectAlertState,
  selectCurrentColorTheme,
  selectNotificationState,
} from "@polkadex/orderbook-modules";
import { useKeyringInitalize } from "@polkadex/orderbook-hooks";
import { defaultThemes, GlobalStyles } from "src/styles";
import { NotificationCard } from "@polkadex/orderbook-ui/molecules";

function App({ Component, pageProps }: AppProps) {
  useKeyringInitalize();
  return (
    <ThemeWrapper>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeWrapper>
  );
}

const ThemeWrapper = ({ children }) => {
  const [state, setState] = useState(false);
  const color = useSelector(selectCurrentColorTheme);
  const alert = useSelector(selectAlertState);
  const { notifications } = useSelector(selectNotificationState);

  const dispatch = useDispatch();

  useEffect(() => {
    setState(true);
  }, []);

  if (!state) return <div />;

  return (
    <ThemeProvider theme={color === "light" ? defaultThemes.light : defaultThemes.dark}>
      {!!notifications.length && <Notifications />}
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

export default wrapper.withRedux(App);
