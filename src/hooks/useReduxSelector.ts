import { shallowEqual, useSelector } from "react-redux";

import { RootState } from "../modules";

export function useReduxSelector<T>(selector: (state: RootState) => T): T {
  return useSelector(selector, shallowEqual);
}

// export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;
