import {
  WITHDRAWS_DATA,
  WITHDRAWS_FETCH,
  WITHDRAWS_ERROR,
  WITHDRAWS_CLAIM_FETCH,
  WITHDRAWS_CLAIM_DATA,
  WITHDRAWS_CLAIM_ERROR,
  CLAIM_WITHDRAW_RESET,
  CLAIM_WITHDRAW_CANCEL,
} from "./constants";

interface Fee {
  currency: string;
  cost: number;
}

export interface WithdrawsFetch {
  type: typeof WITHDRAWS_FETCH;
  payload: {
    asset: Record<string, string | null>;
    amount: string | number;
  };
}
export interface WithdrawsData {
  type: typeof WITHDRAWS_DATA;
}
export interface WithdrawsError {
  type: typeof WITHDRAWS_ERROR;
  error: string;
}

export interface WithdrawsClaimFetch {
  type: typeof WITHDRAWS_CLAIM_FETCH;
  payload: {
    sid: number;
  };
}

export interface WithdrawsClaimData {
  type: typeof WITHDRAWS_CLAIM_DATA;
  payload: {
    sid: number;
  };
}

export interface WithdrawsClaimError {
  type: typeof WITHDRAWS_CLAIM_ERROR;
  error: string;
}

export type WithdrawClaimReset = {
  type: typeof CLAIM_WITHDRAW_RESET;
};

export type WithdrawClaimCancel = {
  type: typeof CLAIM_WITHDRAW_CANCEL;
  payload: number;
};

export type WithdrawsAction =
  | WithdrawsFetch
  | WithdrawsData
  | WithdrawsError
  | WithdrawsClaimFetch
  | WithdrawsClaimData
  | WithdrawsClaimError
  | WithdrawClaimReset
  | WithdrawClaimCancel;

export const withdrawsFetch = (payload: WithdrawsFetch["payload"]): WithdrawsFetch => ({
  type: WITHDRAWS_FETCH,
  payload,
});

export const withdrawsData = (): WithdrawsData => ({
  type: WITHDRAWS_DATA,
});

export const withdrawsError = (error: string): WithdrawsError => ({
  type: WITHDRAWS_ERROR,
  error,
});

export const withdrawsClaimFetch = (
  payload: WithdrawsClaimFetch["payload"]
): WithdrawsClaimFetch => ({
  type: WITHDRAWS_CLAIM_FETCH,
  payload,
});

export const withdrawsClaimData = (
  payload: WithdrawsClaimData["payload"]
): WithdrawsClaimData => ({
  type: WITHDRAWS_CLAIM_DATA,
  payload,
});

export const withdrawsClaimError = (error: string): WithdrawsClaimError => ({
  type: WITHDRAWS_CLAIM_ERROR,
  error,
});

export const withdrawClaimReset = (): WithdrawClaimReset => ({
  type: CLAIM_WITHDRAW_RESET,
});

export const withdrawClaimCancel = (payload: number): WithdrawClaimCancel => ({
  type: CLAIM_WITHDRAW_CANCEL,
  payload,
});
