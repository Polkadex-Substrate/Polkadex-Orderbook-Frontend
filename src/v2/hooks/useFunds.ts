import { ChangeEvent, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { selectUserBalance } from "@polkadex/orderbook-modules";
import { getNameFromAssetId } from "@polkadex/orderbook/helpers/assetIdHelpers";

export function useFunds() {
  const [state, setState] = useState("");

  const balances = useSelector(selectUserBalance);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setState(e.target.value);
  const allBalances = useMemo(
    () =>
      balances.filter(
        (value) =>
          value.tickerName.toLowerCase().includes(state.toLowerCase()) ||
          getNameFromAssetId(Number(value.ticker)).toLowerCase().includes(state.toLowerCase())
      ),
    [balances, state]
  );

  return {
    searchState: state,
    handleChange,
    balances: allBalances,
  };
}
