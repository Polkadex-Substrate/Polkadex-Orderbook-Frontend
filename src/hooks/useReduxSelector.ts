import { shallowEqual, useSelector } from "react-redux";

import { RootState } from "@polkadex/orderbook-modules";

export function useReduxSelector<T>(selector: (state: RootState) => T): T {
  return useSelector(selector, shallowEqual);
}
