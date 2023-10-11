import { sendQueryToAppSync } from "@orderbook/core/helpers";
import * as queries from "@orderbook/core/graphql/queries";

import * as T from "./types";

export const fetchbalancesAsync = async (
  account: string
): Promise<T.IBalanceFromDb[]> => {
  const res = await sendQueryToAppSync({
    query: queries.getAllBalancesByMainAccount,
    variables: {
      main_account: account,
    },
  });
  const balancesRaw: T.BalanceQueryResult[] =
    res.data.getAllBalancesByMainAccount.items;
  return balancesRaw?.map((val) => {
    return {
      asset_type: val.a,
      reserved_balance: val.r,
      free_balance: val.f,
      pending_withdrawal: val.p,
    };
  });
};
