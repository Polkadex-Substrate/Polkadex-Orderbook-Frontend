import { ReactNode } from "react";
import { DefaultTheme } from "styled-components";

export type IDefaultThemes = "dark" | "light";

export type ITheme = {
  theme: {
    value: DefaultTheme;
    loading?: boolean;
  };
  themeToogle?: (themeName: IDefaultThemes) => void | undefined;
};

export type Props = {
  children: ReactNode;
};
