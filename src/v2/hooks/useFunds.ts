import { ChangeEvent, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { selectUserBalance } from "@polkadex/orderbook-modules";

export function useFunds() {
  const [state, setState] = useState("");

  const balances = useSelector(selectUserBalance);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setState(e.target.value);

  return {
    searchState: state,
    handleChange,
    balances,
  };
}
