import { useDispatch } from "react-redux";

export const useReduxDispatch = (action) => {
  const dispatch = useDispatch();
  return dispatch(action);
};
