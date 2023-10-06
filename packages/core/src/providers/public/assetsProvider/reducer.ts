import { AssetsAction } from "./actions";
import {
  PUBLIC_ASSETS_DATA,
  PUBLIC_ASSETS_ERROR,
  PUBLIC_ASSETS_FETCH,
} from "./constants";
import { AssetsState } from "./types";

export const initialState: AssetsState = {
  list: [],
  loading: false,
  success: false,
};

export const assetsReducer = (state = initialState, action: AssetsAction) => {
  switch (action.type) {
    case PUBLIC_ASSETS_FETCH:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case PUBLIC_ASSETS_DATA:
      return {
        ...state,
        list: action.payload.list,
        loading: false,
        success: true,
      };
    case PUBLIC_ASSETS_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
      };
    default:
      return state;
  }
};
