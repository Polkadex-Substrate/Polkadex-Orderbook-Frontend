export interface CommonActionState {
  isLoading: boolean;
  message: string;
  isError: boolean;
  isSuccess: boolean;
}

export type CommonError = {
  code: number;
  message: string[];
};

export type OrderSide = "Sell" | "Buy";
export type OrderType = "LIMIT" | "MARKET";
