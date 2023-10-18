import { ChangeEvent, useMemo, useState } from "react";
import {
  useBalancesProvider,
  Balance,
} from "@orderbook/core/providers/user/balancesProvider";

export function useFunds() {
  const [state, setState] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setState(e.target.value);

  const { balances: userBalances, loading } = useBalancesProvider();

  const balances = useMemo(
    () =>
      userBalances.reduce((pv: Balance[], cv) => {
        if (
          cv.name.toLowerCase().includes(state.toLowerCase()) ||
          cv.symbol.toLowerCase().includes(state.toLowerCase())
        ) {
          pv.push(cv);
        }
        return pv;
      }, []),
    [userBalances, state]
  );

  return {
    searchState: state,
    handleChange,
    balances,
    isLoading: loading,
  };
}
