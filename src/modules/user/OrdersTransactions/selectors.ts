import { RootState } from "../../index";

import { orderTxn } from "./reducer";

export const selectOrderTransactions = (state: RootState): orderTxn[] =>
  state.user.orderTransactions.orders;
