import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";

import { wrapper } from "../store";

import { defaultThemes, GlobalStyles } from "src/styles";
import { selectCurrentColorTheme } from "src/modules";
import { useRangerConnectFetch } from "src/hooks";

function App({ Component, pageProps }: AppProps) {
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

  // const { connected } = useRangerConnectFetch();
  if (!state) return <div />;
  return (
    <ThemeProvider theme={color === "light" ? defaultThemes.light : defaultThemes.dark}>
      {children}
    </ThemeProvider>
  );
};

export default wrapper.withRedux(App);
