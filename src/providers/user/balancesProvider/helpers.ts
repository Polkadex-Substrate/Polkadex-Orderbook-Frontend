import * as T from "@polkadex/orderbook/providers/user/balancesProvider/types";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import * as queries from "@polkadex/orderbook/graphql/queries";

export const fetchTradingBalancesAsync = async (
  account: string
): Promise<T.ITradingBalance[]> => {
  const res = await sendQueryToAppSync({
    query: queries.getAllBalancesByMainAccount,
    variables: {
      main_account: account,
    },
  });
  const balancesRaw: T.BalanceQueryResult[] = res.data.getAllBalancesByMainAccount.items;
  return balancesRaw?.map((val) => {
    return {
      asset_type: val.a,
      reserved_balance: val.r,
      free_balance: val.f,
      pending_withdrawal: val.p,
    };
  });
};
