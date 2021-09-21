import { useDispatch } from "react-redux";
import { RootActions } from "src/store";

export const useReduxDispatch = (action: RootActions) => {
  const dispatch = useDispatch();
  return dispatch(action);
};
