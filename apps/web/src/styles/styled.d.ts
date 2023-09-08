import "styled-components";

import { darkTheme } from "./theme";

type Theme = typeof darkTheme;
declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
