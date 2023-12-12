import { useContext } from "react";

import { Context } from "./context";

export const useWalletProvider = () => {
  const state = useContext(Context);
  return { ...state };
};
