import { useReducer } from "react";
import { Provider } from "./context";
import { initialState, profileReducer } from "./reducer";

import * as T from "./types";
import * as A from "./actions";

export const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  const onUserSelectAccount = (payload: T.UserSelectAccount) => {
    const { tradeAddress } = payload;
    try {
      const mainAddress = state.userData?.userAccounts?.find(
        ({ trade_address }) => trade_address === tradeAddress
      )?.mainAddress;
      if (mainAddress) {
        const data = { tradeAddress, mainAddress };
        dispatch(A.userAccountSelectData(data));
      }
    } catch (e) {
      console.log("error: ", e);
      alert(`Invalid funding account! ${e?.message}`);
      // Notf push would be implemented later
      //   yield put(
      //     notificationPush({
      //       message: {
      //         title: "Invalid funding account!",
      //         description: e?.message,
      //       },
      //       time: new Date().getTime(),
      //     })
      //   );
    }
  };

  return (
    <Provider
      value={{
        ...state,
        onUserSelectAccount,
      }}>
      {children}
    </Provider>
  );
};
