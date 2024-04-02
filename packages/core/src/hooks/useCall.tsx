import { ApiPromise } from "@polkadot/api";
import { useCallback } from "react";

import { useNativeApi } from "../providers/public/nativeApi";

export type Ocex = ApiPromise["tx"]["ocex"];

export function useCall() {
  const { api } = useNativeApi();

  const onAddProxyAccountOcex = useCallback(
    (mainAccount: AddProxyAccountProps) =>
      addProxyAccount(api as ApiPromise, mainAccount),
    [api]
  );

  const onRemoveProxyAccountOcex = useCallback(
    (proxyAccount: RemoveProxyAccountProps) =>
      removeProxyAccount(api as ApiPromise, proxyAccount),
    [api]
  );
  const onRegisterMainAccountOcex = useCallback(
    (proxyAccount: RegisterMainAccountProps) =>
      registerMainAccount(api as ApiPromise, proxyAccount),
    [api]
  );
  const onClaimWithdrawOcex = useCallback(
    (props: ClaimWithdrawProps) => claimWithdraw(api as ApiPromise, props),
    [api]
  );
  const onDepositOcex = useCallback(
    (props: DepositProps) => deposit(api as ApiPromise, props),
    [api]
  );

  return {
    onAddProxyAccountOcex,
    onRemoveProxyAccountOcex,
    onRegisterMainAccountOcex,
    onClaimWithdrawOcex,
    onDepositOcex,
  };
}
type AddProxyAccountProps = Parameters<Ocex["addProxyAccount"]>;
const addProxyAccount = (api: ApiPromise, mainAccount: AddProxyAccountProps) =>
  api.tx.ocex.addProxyAccount(...mainAccount);

type RemoveProxyAccountProps = Parameters<Ocex["removeProxyAccount"]>;
const removeProxyAccount = (
  api: ApiPromise,
  proxyAccount: RemoveProxyAccountProps
) => api.tx.ocex.removeProxyAccount(...proxyAccount);

type RegisterMainAccountProps = Parameters<Ocex["registerMainAccount"]>;
const registerMainAccount = (
  api: ApiPromise,
  proxyAccount: RegisterMainAccountProps
) => api.tx.ocex.registerMainAccount(...proxyAccount);

type ClaimWithdrawProps = Parameters<Ocex["claimWithdraw"]>;
const claimWithdraw = (api: ApiPromise, props: ClaimWithdrawProps) =>
  api.tx.ocex.claimWithdraw(...props);

type DepositProps = Parameters<Ocex["deposit"]>;
const deposit = (api: ApiPromise, props: DepositProps) =>
  api.tx.ocex.deposit(...props);
