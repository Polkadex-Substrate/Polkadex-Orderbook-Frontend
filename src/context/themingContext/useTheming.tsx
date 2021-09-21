import { useEffect, useState } from "react";
import { defaultThemes } from "src/styles";

import { IDefaultThemes } from "./";

const useTheming = () => {
  const [theme, setTheme] = useState({
    value: defaultThemes.dark,
    loading: true,
  });

  const themeToogle = (theme: IDefaultThemes | string) => {
    process.browser && window.localStorage.setItem("theme", theme);
    setTheme({ value: defaultThemes[theme], loading: false });
  };

  useEffect(() => {
    const localTheme = process.browser && window.localStorage.getItem("theme");
    const OSDefaultTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    localTheme ? themeToogle(localTheme) : themeToogle(OSDefaultTheme);
  }, []);

  return {
    theme,
    themeToogle,
  };
};

export default useTheming;
