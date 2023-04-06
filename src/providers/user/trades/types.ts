import { FC, PropsWithChildren } from "react";
import * as A from "./actions";
import { CommonError } from "../../types";

export interface TradesState {
  error?: CommonError;
  loading: boolean;
  success: boolean;
  data: A.UserTrade[];
}

export type TradesProviderProps = PropsWithChildren<{
  value: TradesContextProps;
}>;

export type TradesContextProps = TradesState & {};

export interface TradesProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type TradesComponent = FC<PropsWithChildren<TradesProps>>;
