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
      "'-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', sans-serif",
    light: 300,
    normal: 400,
    bold: 600,
    sizes: {
      xxxxsmall: "1rem",
      xxxsmall: "1.1rem",
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
      xxsmall: "1rem",
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
    primaryHover: "rgba(230,0,122,0.7)",
    secondary: "#6745D2",
    secondaryBackground: "rgba(139,161,190,0.2)",
    secondaryBackgroundDark: "#ABB2BC",
    secondaryBackgroundOpacity: "rgba(139,161,190,0.1)",
    tertiaryBackgroundOpacity: "rgba(139,161,190,0.05)",
    gradient: "linear-gradient(47.94deg, #e6007a 0%, #6745d2 98.88%)",
    gradientGreen: "linear-gradient(90deg, #0CA564 0.04%, rgba(2, 192, 118, 0.3) 99.92%)",
    gradientRed: "linear-gradient(90deg, #E6007A 0.04%, rgba(230, 0, 225, 0.3) 92.26%)",
    gradientPrimary: "linear-gradient(180deg, #E6007A13 0%, rgba(230, 0, 122, 0) 100%);",
    transparent: "transparent",
    secondaryText: "#575A60",
    tertiaryText: "#A8ADB7",
    none: "none",
    green: "#0CA564",
    white: "#ffffff",
    black: "#000000",
    orange: "#F2994A",
    purple: "#6745D2",
    blue: "#0090E1",
    overlayOpacity: "#00000030",
    light: "rgba(0, 0, 0, 0.08)",
    red: "#F31260",
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
    base: 5,
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
    primaryBackgroundSolid: "#F9FBFC",
    gradientBackground: "linear-gradient(62.3deg, #FFFFFF 13.21%, #F9FBFC99 98.01%)",
    tertiaryBackground: "#EEF0F6",
    secondaryBackgroundSolid: "#FBFBFB",
    quaternaryBackground: "#272934",
    text: "#000000",
    inverse: "#F9FBFC",
  },
  shadows: {
    primary: "rgba(50, 50, 93, 0.25) 0px 0 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 0 -30px",
    secondary:
      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 0 -30px",
    tertiary: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.02) 0px 0px 0px 1px",
    quaternary: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
    smooth: "0px -20px 99px rgba(171, 192, 227, 0.17)",
    top: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
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
    inverse: `linear-gradient(
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
    primaryBackgroundSolid: "#22232E",
    gradientBackground: "#1F2029",
    tertiaryBackground: "#2E303C",
    secondaryBackgroundSolid: "#2F3340",
    quaternaryBackground: "#272934",
    gradient: "linear-gradient(47.94deg, #e6007a 0%, #6745d2 98.88%)",
    text: "#ffffff",
    inverse: "#1F2029",
  },
  shadows: {
    primary: "rgba(0, 0, 0, 0.25) 0px 0 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 0 -30px",
    secondary: "rgba(0, 0, 0, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 0 -30px",
    tertiary: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
    quaternary: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
    smooth: "0px -20px 20px rgba(0, 0, 0, 0.1)",
    top: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
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
    inverse: `linear-gradient(
      -90deg,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.12) 25%,
      rgba(0, 0, 0, 0.20) 50%,
      rgba(0, 0, 0, 0.14) 75%,
      rgba(0, 0, 0, 0.1) 100%
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
