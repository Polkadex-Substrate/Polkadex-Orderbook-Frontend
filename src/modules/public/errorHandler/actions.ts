import { ERROR_HANDLE_DATA, ERROR_HANDLE_FETCH } from "./constants";

export interface ErrorHandlerFetch {
  type: typeof ERROR_HANDLE_FETCH;
  payload: {
    processingType: "alert" | "console";
    error: string;
    extraOptions?: {
      params?: any;
      actionError?: any;
    };
  };
}

interface ErrorHandlerData {
  type: typeof ERROR_HANDLE_DATA;
}

type ErrorHandlerActions = ErrorHandlerFetch | ErrorHandlerData;
export type ErrorHandlerAction = ErrorHandlerActions;

export const sendError = (payload: ErrorHandlerFetch["payload"]): ErrorHandlerFetch => ({
  type: ERROR_HANDLE_FETCH,
  payload,
});

export const getErrorData = (): ErrorHandlerData => ({
  type: ERROR_HANDLE_DATA,
});
