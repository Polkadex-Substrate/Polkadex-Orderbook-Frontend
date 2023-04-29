import { FC, PropsWithChildren } from "react";

export type TradesQueryResult = {
  m: string;
  p: string;
  q: string;
  s: string;
  t: string;
};

export interface SessionState {
  dateTo: Date;
  dateFrom: Date;
}

export type SessionContextProps = SessionState & {
  dispatchUserSessionData: (value: SessionState) => void;
};

export type SessionProviderProps = PropsWithChildren<{
  value: SessionContextProps;
}>;

export interface SessionProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type SessionComponent = FC<PropsWithChildren<SessionProps>>;
