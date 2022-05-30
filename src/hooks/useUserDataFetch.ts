import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { selectAssetsFetchSuccess } from "../modules/public/assets";
import { selectCurrentMarket } from "../modules/public/markets";
import {
  balanceChannelFetch,
  balancesFetch,
  selectBalancesSuccess,
} from "../modules/user/balances";
import { userOrderUpdatesChannelFetch } from "../modules/user/ordersHistory";
import { selectUserInfo } from "../modules/user/profile";

import { useReduxSelector } from "./useReduxSelector";

export const useUserDataFetch = () => {
  const user = useReduxSelector(selectUserInfo);
  const dispatch = useDispatch();
  const isAsssetsFetched = useReduxSelector(selectAssetsFetchSuccess);
  // use user address here instead of hasUser as we need to refetch these on user change
  useEffect(() => {
    if (user.address) {
      if (!isAsssetsFetched) dispatch(balancesFetch());
    }
  }, [user, dispatch, isAsssetsFetched]);

  useEffect(() => {
    if (user.address) {
      dispatch(balanceChannelFetch());
      dispatch(userOrderUpdatesChannelFetch());
    }
  }, [dispatch, user]);
};
