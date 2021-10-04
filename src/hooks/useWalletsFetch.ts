import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectShouldFetchWallets, walletsFetch } from "../modules";

export const useWalletsFetch = () => {
  const shouldDispatch = useSelector(selectShouldFetchWallets);
  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldDispatch) dispatch(walletsFetch());
  }, [dispatch, shouldDispatch]);
};
