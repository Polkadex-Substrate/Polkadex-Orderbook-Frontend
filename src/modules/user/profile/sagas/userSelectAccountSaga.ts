import { UserAccountSelectFetch } from "@polkadex/orderbook-modules";

export function* userSelectAccountSaga(action: UserAccountSelectFetch) {
  const { tradeAddress } = action.payload;

  console.log(tradeAddress);
  // TODO: fetch linked main account from the trade address.
  // TODO: check if account exists in the extension
  // TODO: push data to reducer
}
