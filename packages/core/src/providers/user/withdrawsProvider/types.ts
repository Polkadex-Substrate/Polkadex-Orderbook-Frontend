import { FC, PropsWithChildren } from "react";

import { WithdrawsClaimFetch, WithdrawsFetch } from "./actions";

export interface WithdrawsState {
  error?: string;
  loading: boolean;
  success: boolean;
  claimLoading: boolean;
  claimsInLoading: Array<number>;
  claimSuccess: boolean;
}

export type WithdrawsContextProps = WithdrawsState & {
  onFetchWithdraws: (value: WithdrawsFetch["payload"]) => Promise<void>;
  onFetchClaimWithdraw: (
    value: WithdrawsClaimFetch["payload"],
  ) => Promise<void>;
};

export type WithdrawsProviderProps = PropsWithChildren<{
  value: WithdrawsContextProps;
}>;

export interface WithdrawsProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type WithdrawsComponent = FC<PropsWithChildren<WithdrawsProps>>;
