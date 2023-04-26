import type { Preview } from "@storybook/react";
import { Decorator } from "@storybook/react";
import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { defaultThemes, GlobalStyles } from "../src/styles";

export const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};
const withTheme: Decorator = (StoryFn, context) => {
  const theme = context.parameters.theme || context.globals.theme;

  return (
    <ThemeProvider theme={theme === "light" ? defaultThemes.light : defaultThemes.dark}>
      <GlobalStyles />
      <StoryFn />
    </ThemeProvider>
  );
};

export const decorators = [withTheme];

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "dark",
    toolbar: {
      icon: "circlehollow",
      items: [
        { value: "light", icon: "circlehollow", title: "light" },
        { value: "dark", icon: "circle", title: "dark" },
      ],
      showName: true,
    },
  },
};
