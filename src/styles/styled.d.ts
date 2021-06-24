import "styled-components";

import { darkTheme } from "src/styles/theme";

type Theme = typeof darkTheme;
declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
