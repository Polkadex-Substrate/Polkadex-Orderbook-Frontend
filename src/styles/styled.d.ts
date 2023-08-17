import "styled-components";

import { darkTheme } from "./theme";

type Theme = typeof darkTheme;
declare module "styled-components" {
  export type DefaultTheme = Theme;
}
