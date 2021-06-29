const defaultTheme = {
  title: "dark",
  grid: {
    container: "130rem",
    gutter: "3.2rem",
  },
  border: {
    radius: {
      small: "0.7rem",
      medium: "1rem",
      large: "1.3rem",
      primary: {
        small: "0 1.5rem 1.5rem 1.5rem",
        medium: "0 2.5rem 2.5rem 2.5rem",
      },
    },
  },
  font: {
    family:
      "Work Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    light: 300,
    normal: 400,
    bold: 600,
    sizes: {
      xxsmall: "1.2rem",
      xsmall: "1.3rem",
      small: "1.4rem",
      medium: "1.6rem",
      large: "1.8rem",
      xlarge: "2.0rem",
      xxlarge: "2.8rem",
    },
  },
  icon: {
    sizes: {
      xsmall: "1.2rem",
      small: "1.4rem",
      medium: "1.5rem",
      large: "1.8rem",
      xlarge: "2.0rem",
      xxlarge: "2.8rem",
    },
  },
  colors: {
    primary: "#E6007A",
    secondary: "#6745D2",
    secondaryBackground: "rgba(139,161,190,0.2)",
    secondaryBackgroundOpacity: "rgba(139,161,190,0.1)",
    gradient: "linear-gradient(47.94deg, #e6007a 0%, #6745d2 98.88%)",
    transparent: "transparent",
    none: "none",
    green: "#0CA564",
    gradientGreen: "linear-gradient(90deg, #0CA564 0.04%, rgba(2, 192, 118, 0.3) 99.92%)",
    gradientRed: "linear-gradient(90deg, #E6007A 0.04%, rgba(230, 0, 225, 0.3) 92.26%)",
    white: "#ffffff",
    black: "#000000",
  },
  spacings: {
    xxxsmall: "0.5rem",
    xxsmall: "0.8rem",
    xsmall: "1.6rem",
    small: "2.4rem",
    medium: "3.2rem",
    large: "4.0rem",
    xlarge: "4.8rem",
    xxlarge: "5.6rem",
  },
  padding: {
    xxsmall: "0.1rem",
    xsmall: "0.2rem",
    small: "0.3rem",
    medium: "0.4rem",
    large: "0.5rem",
    xlarge: "0.6rem",
    xxlarge: "0.7rem",
  },
  layers: {
    base: 10,
    menu: 20,
    overlay: 30,
    modal: 40,
    alwaysOnTop: 50,
  },
  transition: {
    default: "0.3s ease-in-out",
    fast: "0.1s ease-in-out",
  },
};

const light = {
  title: "light",
  colors: {
    primaryBackground: "#F9FBFC",
    primaryBackgroundOpacity: "#F9FBFC99",
    gradientBackground:
      "linear-gradient(62.3deg, #FFFFFF 13.21%, #F9FBFC99 98.01%)",
    tertiaryBackground: "#F9FBFC99",
    secondaryBackgroundSolid: "#E8ECF2",
    text: "#000000",
  },
  shadow: {
    primary: "0px 10px 40px rgba(171, 192, 227, 0.25)",
    top: "0px -5px 15px rgba(171, 192, 227, 0.9)",
  },
  skeleton: {
    default: `linear-gradient(
      -90deg,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.12) 25%,
      rgba(0, 0, 0, 0.20) 50%,
      rgba(0, 0, 0, 0.14) 75%,
      rgba(0, 0, 0, 0.1) 100%
    )`,
  },
};

const dark = {
  title: "dark",
  colors: {
    primaryBackground: "#1C1C26",
    primaryBackgroundOpacity: "#1C1C2699",
    gradientBackground: "#1F2029",
    tertiaryBackground: "#2E303C",
    secondaryBackgroundSolid: "#2F3340",
    text: "#f5f5f5",
  },
  shadow: {
    primary: "0px 10px 15px rgba(0, 0, 0, 0.02)",
    top: "0px -5px 15px rgba(0, 0, 0, 0.4)",
  },
  skeleton: {
    default: `linear-gradient(
      -90deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.12) 25%,
      rgba(255, 255, 255, 0.20) 50%,
      rgba(255, 255, 255, 0.14) 75%,
      rgba(255, 255, 255, 0.1) 100%
    )`,
  },
};

export const lightTheme = {
  ...defaultTheme,
  ...light,
  colors: {
    ...light.colors,
    ...defaultTheme.colors,
  },
};

export const darkTheme = {
  ...defaultTheme,
  ...dark,
  colors: {
    ...dark.colors,
    ...defaultTheme.colors,
  },
};
