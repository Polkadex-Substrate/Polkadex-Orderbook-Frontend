import { GraphQLResult } from "@aws-amplify/api";
import BigNumber from "bignumber.js";
import { signAndSendExtrinsic } from "@orderbook/core/helpers";
import { UNIT_BN } from "@orderbook/core/constants";
import { SubmittableExtrinsic } from "@polkadot/api/types";

import {
  Cancel_allMutation,
  Place_orderMutation,
  WithdrawMutation,
} from "../../../API";
import * as mutation from "../../../graphql/mutations";

import { sendQueryToAppSync } from "./helpers";
import {
  ClaimRewardArgs,
  DepositArgs,
  ExecuteArgs,
  OrderbookOperationStrategy,
  WithdrawArgs,
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
    try {
      // INFO: Temporary fix => It's actually a backend issue
      const result = await sendQueryToAppSync<GraphQLResult<any>>({
        query: mutation.place_order,
        variables: { input: { payload: data.payload } },
        token: data.token,
      });
      if (result?.data?.place_order) {
        const resp: UserActionLambdaResp = JSON.parse(result.data.place_order);
        if (!resp.is_success) {
          throw new Error(resp.body);
        }
      } else {
        throw new Error("Cancel order failed: No valid response from server");
      }
    } catch (error) {
      const errors = (error as GraphQLResult).errors;
      if (errors && errors.length > 0) {
        let concatError = "";
        errors.forEach((error) => {
          concatError += error.message;
          concatError += ":";
        });
        throw new Error(concatError);
      }
    }
  }

  async placeOrder(data: ExecuteArgs): Promise<void> {
    try {
      const result = await sendQueryToAppSync<
        GraphQLResult<Place_orderMutation>
      >({
        query: mutation.place_order,
        variables: { input: { payload: data.payload } },
        token: data.token,
      });

      if (result?.data?.place_order) {
        const resp: UserActionLambdaResp = JSON.parse(result.data.place_order);
        if (!resp.is_success) {
          throw new Error(resp.body);
        }
      } else {
        throw new Error("Place order failed: No valid response from server");
      }
    } catch (error) {
      const errors = (error as GraphQLResult).errors;
      if (errors && errors.length > 0) {
        let concatError = "";
        errors.forEach((error) => {
          concatError += error.message;
          concatError += ":";
        });
        throw new Error(concatError);
      }
    }
  }

  async withdraw(data: WithdrawArgs): Promise<void> {
    try {
      const payload = JSON.stringify({ Withdraw: data.payload });
      const result = await sendQueryToAppSync<GraphQLResult<WithdrawMutation>>({
        query: mutation.withdraw,
        variables: { input: { payload } },
        token: data.address,
      });
      if (result?.data?.withdraw) {
        const resp: UserActionLambdaResp = JSON.parse(result.data.withdraw);
        if (!resp.is_success) {
          throw new Error(resp.body);
        }
      } else {
        throw new Error("withdraw failed: No valid response from server");
      }
    } catch (error) {
      const errors = (error as GraphQLResult).errors;
      if (errors && errors.length > 0) {
        let concatError = "";
        errors.forEach((error) => {
          concatError += error.message;
          concatError += ":";
        });
        throw new Error(concatError);
      }
    }
  }

  async cancelAll({ payload, token }: ExecuteArgs): Promise<void> {
    try {
      const result = await sendQueryToAppSync<
        GraphQLResult<Cancel_allMutation>
      >({
        query: mutation.cancel_all,
        variables: { input: { payload } },
        token,
      });
      if (result?.data?.cancel_all) {
        const resp: UserActionLambdaResp = JSON.parse(result.data.cancel_all);
        if (!resp.is_success) {
          throw new Error(resp.body);
        }
      } else {
        throw new Error("cancelAll failed: No valid response from server");
      }
    } catch (error) {
      const errors = (error as GraphQLResult).errors;
      if (errors && errors.length > 0) {
        let concatError = "";
        errors.forEach((error) => {
          concatError += error.message;
          concatError += ":";
        });
        throw new Error(concatError);
      }
    }
  }

  async deposit({ account, amount, api, asset }: DepositArgs): Promise<void> {
    const amountStr = new BigNumber(amount).multipliedBy(UNIT_BN).toString();
    const ext = api.tx.ocex.deposit(asset as unknown as string, amountStr);
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

  async claimReward({
    signer,
    api,
    lmp,
    epoch,
    market,
    address,
  }: ClaimRewardArgs): Promise<void> {
    const ext = (await lmp.claimRewardsTx(
      epoch,
      market
    )) as SubmittableExtrinsic<"promise">;
    const res = await signAndSendExtrinsic(api, ext, { signer }, address, true);
    if (!res.isSuccess) {
      throw new Error("Claim reward failed");
    }
  }
}
export const appsyncOperations = new AppsyncV1Operations();
