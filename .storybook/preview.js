import { RouterContext } from "next/dist/shared/lib/router-context"; // next 12
import GlobalStyles from "../src/styles/global"
import { darkTheme } from "../src/styles/theme"
import { ThemeProvider } from "styled-components"
import { Provider } from 'react-redux'
import {store} from "../src/store"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyles />
        <Story />
      </ThemeProvider>
    </Provider>

)
]
