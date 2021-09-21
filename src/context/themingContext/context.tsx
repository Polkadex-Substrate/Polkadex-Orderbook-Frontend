import { createContext } from "react";
import { defaultThemes } from "src/styles";

import { ITheme } from "./types";

const ThemingContext = createContext<ITheme>({
  theme: { value: defaultThemes.dark },
});

export default ThemingContext;
