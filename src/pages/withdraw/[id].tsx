import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useMemo } from "react";

import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useExtensionWallet } from "@polkadex/orderbook/providers/user/extensionWallet";
import { selectIsAddressInExtension } from "@polkadex/orderbook/providers/user/extensionWallet/helper";
import { WithdrawsProvider } from "@polkadex/orderbook/providers/user/withdrawsProvider/provider";
import { TransactionsProvider } from "@polkadex/orderbook/providers/user/transactionsProvider/provider";
import { AssetsProvider, BalancesProvider } from "@polkadex/orderbook/providers";
import { useDisabledPages } from "@polkadex/orderbook-hooks";

const WithdrawTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Withdraw").then((mod) => mod.WithdrawTemplate),
  {
    ssr: false,
    loading: () => (
      <h1 style={{ textAlign: "center", marginTop: 10 }}>Loading withdraw page.....</h1>
    ),
  }
);
const Withdraw = () => {
  const router = useRouter();
  const { disabled } = useDisabledPages();

  const {
    authInfo: { isAuthenticated: hasUser },
    auth: { isLoading },
    selectedAccount: { mainAddress },
  } = useProfile();
  const profileState = useProfile();
  const extensionWalletState = useExtensionWallet();

  const isRegistered =
    mainAddress && profileState.userData?.mainAccounts?.includes(mainAddress);

  const hasSelectedAccount = selectIsAddressInExtension(
    mainAddress,
    extensionWalletState.allAccounts
  );

  const shouldRedirect = useMemo(
    () => !hasUser || !isRegistered || !hasSelectedAccount,
    [hasUser, isRegistered, hasSelectedAccount]
  );

  if (!isLoading && !hasUser) router?.push("/trading/");

  if (shouldRedirect || disabled) return <div />;
  return (
    <AssetsProvider>
      <BalancesProvider>
        <WithdrawsProvider>
          <TransactionsProvider>
            <WithdrawTemplate />
          </TransactionsProvider>
        </WithdrawsProvider>
      </BalancesProvider>
    </AssetsProvider>
  );
};

export default Withdraw;
