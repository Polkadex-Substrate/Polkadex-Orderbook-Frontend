import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { selectAssetsFetchSuccess } from "../modules/public/assets";
import { selectCurrentMarket } from "../modules/public/markets";
import {
  balanceChannelFetch,
  balancesFetch,
  selectBalancesSuccess,
} from "../modules/user/balances";
import { selectUserInfo } from "../modules/user/profile";

import { useReduxSelector } from "./useReduxSelector";

export const useUserDataFetch = () => {
  const user = useReduxSelector(selectUserInfo);
  const dispatch = useDispatch();
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const isAsssetsFetched = useReduxSelector(selectAssetsFetchSuccess);
  useEffect(() => {
    if (user) {
      if (!isAsssetsFetched) dispatch(balancesFetch());
    }
  }, [user, dispatch, isAsssetsFetched]);

  useEffect(() => {
    if (user) dispatch(balanceChannelFetch());
  }, [dispatch, user]);
};
