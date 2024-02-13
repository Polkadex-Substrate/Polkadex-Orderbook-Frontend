import { GraphQLResult } from "@aws-amplify/api";
import BigNumber from "bignumber.js";
import { signAndSendExtrinsic } from "@orderbook/core/helpers";
import { UNIT_BN } from "@orderbook/core/constants";

import {
  Cancel_orderMutation,
  Place_orderMutation,
  WithdrawMutation,
} from "../../../API";
import * as mutation from "../../../graphql/mutations";

import { sendQueryToAppSync } from "./helpers";
import {
  DepositArgs,
  ExecuteArgs,
  OrderbookOperationStrategy,
} from "./../interfaces";

type UserActionLambdaResp = {
  is_success: boolean;
  body: string;
};
class AppsyncV1Operations implements OrderbookOperationStrategy {
  init(): Promise<void> {
    return Promise.resolve(undefined);
  }

  isReady(): boolean {
    return true;
  }

  async cancelOrder(data: ExecuteArgs): Promise<void> {
    const result = await sendQueryToAppSync<
      GraphQLResult<Cancel_orderMutation>
    >({
      query: mutation.place_order,
      variables: { input: { payload: data.payload } },
      token: data.token,
    });
    if (result.errors && result.errors.length > 0) {
      let concatError = "";
      result.errors.forEach((error) => {
        concatError += error.message;
        concatError += ":";
      });
      throw new Error(concatError);
    }
    if (result?.data?.cancel_order) {
      const resp: UserActionLambdaResp = JSON.parse(result.data.cancel_order);
      if (!resp.is_success) {
        throw new Error(resp.body);
      }
    } else {
      throw new Error("cancel order failed: No valid response from server");
    }
  }

  async placeOrder(data: ExecuteArgs): Promise<void> {
    const result = await sendQueryToAppSync<GraphQLResult<Place_orderMutation>>(
      {
        query: mutation.place_order,
        variables: { input: { payload: data.payload } },
        token: data.token,
      }
    );
    if (result.errors && result.errors.length > 0) {
      let concatError = "";
      result.errors.forEach((error) => {
        concatError += error.message;
        concatError += ":";
      });
      throw new Error(concatError);
    }
    if (result?.data?.place_order) {
      const resp: UserActionLambdaResp = JSON.parse(result.data.place_order);
      if (!resp.is_success) {
        throw new Error(resp.body);
      }
    } else {
      throw new Error("place order failed: No valid response from server");
    }
  }

  async withdraw(data: ExecuteArgs): Promise<void> {
    const result = await sendQueryToAppSync<GraphQLResult<WithdrawMutation>>({
      query: mutation.withdraw,
      variables: { input: { payload: data.payload } },
      token: data.token,
    });
    if (result.errors && result.errors.length > 0) {
      let concatError = "";
      result.errors.forEach((error) => {
        concatError += error.message;
        concatError += ":";
      });
      throw new Error(concatError);
    }
    if (result?.data?.withdraw) {
      const resp: UserActionLambdaResp = JSON.parse(result.data.withdraw);
      if (!resp.is_success) {
        throw new Error(resp.body);
      }
    } else {
      throw new Error("withdraw failed: No valid response from server");
    }
  }

  async deposit({ account, amount, api, asset }: DepositArgs): Promise<void> {
    const amountStr = new BigNumber(amount).multipliedBy(UNIT_BN).toString();
    const ext = api.tx.ocex.deposit(asset, amountStr);
    const res = await signAndSendExtrinsic(
      api,
      ext,
      { signer: account.signer },
      account?.address,
      true
    );
    if (!res.isSuccess) {
      throw new Error("Deposit failed");
    }
  }
}
export const appsyncOperations = new AppsyncV1Operations();
