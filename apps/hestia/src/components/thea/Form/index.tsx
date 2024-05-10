import {
  Button,
  Input,
  Token,
  TokenAppearance,
  Typography,
} from "@polkadex/ux";
import { RiArrowDownSLine, RiArrowLeftRightLine } from "@remixicon/react";
import { Fragment, useMemo, useState } from "react";
import { useTheaProvider } from "@orderbook/core/providers";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useTransactionFeeModal } from "@orderbook/core/index";

import { SelectAsset } from "../selectAsset";
import { ConnectAccount } from "../connectAccount";

import { WalletCard } from "./wallet";
import { NetworkCard } from "./networkCard";
import { AvailableBalance } from "./availableBalance";

import { createQueryString, formatAmount } from "@/helpers";

export const Form = () => {
  const [amount, setAmount] = useState("");

  const [openAsset, setOpenAsset] = useState(false);
  const [openSourceModal, setOpenSourceModal] = useState(false);
  const [openDestinationModal, setOpenDestinationModal] = useState(false);

  const {
    sourceChain,
    setSourceChain,
    destinationChain,
    setDestinationChain,
    sourceAccount,
    setSourceAccount,
    destinationAccount,
    setDestinationAccount,
    selectedAsset,
    selectedAssetBalance,
    existential,
    selectedAssetAmount,
  } = useTheaProvider();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const onSwitchChain = () => {
    setSourceChain(destinationChain);
    setDestinationChain(sourceChain);
    const data = [
      { name: "from", value: destinationChain?.name },
      { name: "to", value: sourceChain?.name },
    ];
    createQueryString({
      data,
      pathname,
      searchParams,
      push,
    });
  };

  const onChangeMax = () => {
    if (!selectedAssetBalance) return;
    const formattedBalance = formatAmount(selectedAssetBalance);
    setAmount(formattedBalance);
  };

  const { setOpenFeeModal } = useTransactionFeeModal();

  // const onSubmitBridge = useCallback(
  //   async (e: FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     if (!ext.current) {
  //       const transferConfig = await getTransferConfig();
  //       if (transferConfig)
  //         ext.current = await transferConfig.transfer<SubmittableExtrinsic>(
  //           Number(amount)
  //         );
  //     }
  //     await mutateAsync({ amount: Number(amount) });
  //   },
  //   [amount, mutateAsync, getTransferConfig]
  // );

  const disabled = useMemo(
    () =>
      !selectedAsset ||
      !sourceAccount ||
      !sourceChain ||
      !destinationAccount ||
      !destinationChain ||
      !amount,
    [
      selectedAsset,
      sourceAccount,
      sourceChain,
      destinationAccount,
      destinationChain,
      amount,
    ]
  );

  return (
    <Fragment>
      {/* <ConfirmTransaction
        action={() =>
          formRef?.current?.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
          )
        }
        actionLoading={!!isLoading}
        extrinsicFn={() => {}}
        sender={sourceAccount?.address ?? ""}
        tokenFee={tokenFee}
        setTokenFee={setTokenFee}
        openFeeModal={openFeeModal}
        setOpenFeeModal={setOpenFeeModal}
      /> */}
      <SelectAsset open={openAsset} onOpenChange={setOpenAsset} />
      <ConnectAccount
        open={openSourceModal}
        onOpenChange={setOpenSourceModal}
        selectedChain={sourceChain}
        secondaryChain={destinationChain?.genesis}
        setChain={setSourceChain}
        selectedAccount={sourceAccount}
        setAccount={setSourceAccount}
        from
      />
      <ConnectAccount
        open={openDestinationModal}
        onOpenChange={setOpenDestinationModal}
        selectedChain={destinationChain}
        secondaryChain={sourceChain?.genesis}
        setChain={setDestinationChain}
        selectedAccount={destinationAccount}
        setAccount={setDestinationAccount}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpenFeeModal(true);
        }}
        className="flex flex-col gap-4 flex-1 max-w-[800px] mx-auto py-8 w-full px-2"
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <Typography.Heading>Networks</Typography.Heading>
            <div className="flex max-lg:flex-col gap-2">
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-col gap-2">
                  <Typography.Text appearance="primary">From</Typography.Text>
                  <NetworkCard
                    name={sourceChain?.name ?? ""}
                    icon={sourceChain?.logo ?? ""}
                    onOpenModal={() => setOpenSourceModal(true)}
                  />
                </div>
                {sourceAccount && (
                  <WalletCard
                    name={sourceAccount.name}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpenSourceModal(true);
                    }}
                  >
                    {sourceAccount.address}
                  </WalletCard>
                )}
              </div>
              <Button.Icon
                type="button"
                variant="outline"
                className="lg:mt-9 h-10 w-10 p-3 max-lg:self-center"
                onClick={onSwitchChain}
              >
                <RiArrowLeftRightLine className="w-full h-full" />
              </Button.Icon>
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-col gap-2">
                  <Typography.Text appearance="primary">To</Typography.Text>
                  <NetworkCard
                    name={destinationChain?.name ?? ""}
                    icon={destinationChain?.logo ?? ""}
                    onOpenModal={() => setOpenDestinationModal(true)}
                  />
                </div>
                {destinationAccount && (
                  <WalletCard
                    name={destinationAccount.name}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpenDestinationModal(true);
                    }}
                  >
                    {destinationAccount.address}
                  </WalletCard>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Typography.Heading>Asset</Typography.Heading>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <Typography.Text appearance="primary">Amount</Typography.Text>
                {selectedAsset && (
                  <AvailableBalance
                    locked={0}
                    existential={existential}
                    balance={selectedAssetAmount}
                    available={selectedAssetBalance}
                    assetTicker={selectedAsset.ticker}
                  />
                )}
              </div>
              <div className="flex item-center border border-primary rounded-sm">
                <Input.Vertical
                  value={amount}
                  onChange={(e) => setAmount(e.currentTarget.value)}
                  className="w-full pl-4 py-4"
                  placeholder="0.00"
                >
                  {sourceAccount && selectedAssetBalance && (
                    <Input.Action
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        onChangeMax();
                      }}
                    >
                      MAX
                    </Input.Action>
                  )}
                </Input.Vertical>
                <Button.Outline
                  type="button"
                  appearance="secondary"
                  className="gap-1 px-2 py-7 justify-between ml-4 "
                  onClick={() => setOpenAsset(true)}
                  disabled={!sourceChain || !destinationChain}
                >
                  <div className="flex items-center gap-2">
                    {selectedAsset ? (
                      <Token
                        name={selectedAsset.ticker}
                        size="md"
                        appearance={selectedAsset.ticker as TokenAppearance}
                        className="rounded-full border border-primary"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-level-5" />
                    )}

                    <Typography.Text size="md">
                      {selectedAsset ? selectedAsset.ticker : "Select token"}
                    </Typography.Text>
                  </div>
                  <RiArrowDownSLine className="w-4 h-4" />
                </Button.Outline>
              </div>
            </div>
          </div>
        </div>
        <Button.Solid className="w-full py-5" size="md" disabled={disabled}>
          Bridge
        </Button.Solid>
      </form>
    </Fragment>
  );
};
