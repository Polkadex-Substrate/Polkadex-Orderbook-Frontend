import { ChangeEvent, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { Balance, selectUserBalance } from "@polkadex/orderbook-modules";

export function useFunds() {
  const [state, setState] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setState(e.target.value);

  const userBalances = useSelector(selectUserBalance);

  const balances: Balance[] = useMemo(
    () =>
      userBalances.reduce((pv, cv) => {
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
  };
}
