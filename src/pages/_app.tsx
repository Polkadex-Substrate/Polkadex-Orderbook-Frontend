import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";

import { wrapper } from "../store";

import { selectCurrentColorTheme } from "@polkadex/orderbook-modules";
import { useRangerConnectFetch, useKeyringInitalize } from "@polkadex/orderbook-hooks";
import { defaultThemes, GlobalStyles } from "src/styles";

function App({ Component, pageProps }: AppProps) {
  const { loading } = useKeyringInitalize();

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

  useEffect(() => {
    setState(true);
  }, []);

  if (!state) return <div />;
  return (
    <ThemeProvider theme={color === "light" ? defaultThemes.light : defaultThemes.dark}>
      {children}
    </ThemeProvider>
  );
};

export default wrapper.withRedux(App);
