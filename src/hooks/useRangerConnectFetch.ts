import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectUserLoggedIn } from "src/modules";
import { rangerConnectFetch } from "src/modules/public/ranger";
import {
  selectRanger,
  selectShouldRangerConnect,
} from "src/modules/public/ranger/selectors";

export const useRangerConnectFetch = () => {
  const dispatch = useDispatch();
  const userLoggedIn = useSelector(selectUserLoggedIn);
  const shouldFetch = useSelector(selectShouldRangerConnect);
  const { connected } = useSelector(selectRanger);

  useEffect(() => {
    dispatch(rangerConnectFetch({ withAuth: userLoggedIn, withP2P: true }));
  }, [dispatch, shouldFetch, connected]);
  return { connected };
};
