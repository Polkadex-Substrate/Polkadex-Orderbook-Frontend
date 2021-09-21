import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { minutesUntilAutoLogout, sessionCheckInterval } from "src/api";
import {
  logoutFetch,
  selectPlatformAccessStatus,
  selectUserFetching,
  selectUserInfo,
  selectUserLoggedIn,
} from "src/modules";

export const useInit = () => {
  const [state, setState] = useState({ isShownExpSessionModal: false });

  const platformAccessStatus = useSelector(selectPlatformAccessStatus);
  const user = useSelector(selectUserInfo);
  const isLoggedIn = useSelector(selectUserLoggedIn);
  const userLoading = useSelector(selectUserFetching);

  const dispatch = useDispatch();

  let timer;
  let walletsFetchInterval;
  const STORE_KEY = "lastAction";

  const reset = () => {
    setLastAction(Date.now());
  };

  const initListener = () => {
    reset();
  };

  const setLastAction = (lastAction: number) => {
    process.browser && localStorage.setItem(STORE_KEY, lastAction.toString());
  };

  const getLastAction = () => {
    if (process.browser && localStorage.getItem(STORE_KEY) !== null) {
      return parseInt(
        (process.browser && localStorage.getItem(STORE_KEY)) || "0",
        10
      );
    }
    return 0;
  };
  const initInterval = () => {
    console.log("Testing Initial Interval");
    timer = setInterval(() => {
      checkLastActivity();
    }, parseFloat(sessionCheckInterval()));
  };

  const checkLastActivity = () => {
    const now = Date.now();
    const timeLeft =
      getLastAction() + parseFloat(minutesUntilAutoLogout()) * 60 * 1000;
    const diff = timeLeft - now;
    const isTimeout = diff < 0;

    if (isTimeout && user.email) {
      if (user.state === "active") {
        setState({
          isShownExpSessionModal: !state.isShownExpSessionModal,
        });
      }

      dispatch(logoutFetch());
      clearInterval(timer);
    }
  };

  return {
    state,
    platformAccessStatus,
    checkLastActivity,
    initInterval,
    user,
    isLoggedIn,
    timer,
    initListener,
    reset,
    userLoading,
    walletsFetchInterval,
  };
};
