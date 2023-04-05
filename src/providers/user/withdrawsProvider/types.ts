import { FC, PropsWithChildren } from "react";
import { WithdrawsFetch } from "./actions";

export interface WithdrawsState {
  error?: string;
  loading: boolean;
  success: boolean;
  claimLoading: boolean;
  claimsInLoading: Array<number>;
  claimSuccess: boolean;
}

export interface Fee {
  currency: string;
  cost: number;
}

export type WithdrawsContextProps = WithdrawsState & {
  onFetchWithdraws: (value: WithdrawsFetch) => void;
};

export type WithdrawsProviderProps = PropsWithChildren<{
  value: WithdrawsContextProps;
}>;

export interface WithdrawsProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type WithdrawsComponent = FC<PropsWithChildren<WithdrawsProps>>;
