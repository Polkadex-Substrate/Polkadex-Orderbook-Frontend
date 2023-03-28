import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { intlFormat } from "date-fns";

import * as S from "./styles";

import {
  Dropdown,
  Button,
  InputLine,
  Table,
  Tooltip,
  TooltipContent,
  TooltipHeader,
  EmptyData,
  Loading,
} from "@polkadex/orderbook-ui/molecules";
import { withdrawValidations } from "@polkadex/orderbook/validations";
import { Decimal, Icons, Tokens } from "@polkadex/orderbook-ui/atoms";
import {
  selectMainAccount,
  selectUsingAccount,
  Transaction,
} from "@polkadex/orderbook-modules";
import { useHistory, useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectAllAssets, selectGetAsset } from "@polkadex/orderbook/modules/public/assets";
import { POLKADEX_ASSET } from "@polkadex/web-constants";
import { useOnChainBalance } from "@polkadex/orderbook/hooks/useOnChainBalance";
import { Menu } from "@polkadex/orderbook-ui/organisms";
import { useAssetsProvider } from "@polkadex/orderbook/providers/public/assetsProvider/useAssetsProvider";
import { useDepositProvider } from "@polkadex/orderbook/providers/user/depositProvider/useDepositProvider";
import { isAssetPDEX } from "@polkadex/orderbook/helpers/isAssetPDEX";

export const DepositTemplate = () => {
  const [state, setState] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(POLKADEX_ASSET);
  const currentAccount = useReduxSelector(selectUsingAccount);
  const currMainAcc = useReduxSelector(selectMainAccount(currentAccount.mainAddress));
  const assetsState = useAssetsProvider();
  const depositState = useDepositProvider();
  const assets = assetsState.state.selectAllAssets();

  const loading = depositState.depositsLoading();

  const router = useRouter();
  const { deposits } = useHistory();

  const { onChainBalance, onChainBalanceLoading } = useOnChainBalance(selectedAsset?.assetId);
  const routedAsset = router.query.id as string;
  const shortAddress =
    currMainAcc?.account?.address?.slice(0, 15) +
    "..." +
    currMainAcc?.account?.address?.slice(currMainAcc?.account?.address?.length - 15);

  useEffect(() => {
    const initialAsset = assets.find(
      (asset) => asset.name.includes(routedAsset) || asset.symbol.includes(routedAsset)
    );
    if (initialAsset) {
      setSelectedAsset(initialAsset);
    }
  }, [assets, routedAsset]);

  // A custom validation function. This must return an object
  // which keys are symmetrical to our values/initialValues
  const validate = (values) => {
    const errors = {} as any;
    if (values?.amount?.includes("e") || values?.amount?.includes("o")) {
      errors.amount = "use a valid amount instead";
    }
    if (+values.amount > onChainBalance) {
      errors.amount = "Amount cannot be greater than balance";
    }
    const balanceAfterDeposit = Number(onChainBalance) - Number(values.amount);
    if (balanceAfterDeposit < 1) {
      errors.amount = "You need atleast 1 PDEX in your funding account to keep it alive";
    }
    return errors;
  };

  const { touched, handleSubmit, errors, getFieldProps, isValid, dirty, validateForm } =
    useFormik({
      initialValues: {
        amount: 0.0,
        asset: selectedAsset,
      },
      // TODO: re-add the validations
      validationSchema: withdrawValidations,
      validate,
      onSubmit: (values) => {
        const asset = isAssetPDEX(selectedAsset.assetId)
          ? { polkadex: null }
          : { asset: selectedAsset.assetId };

        depositState.onfetchDeposit({
          asset: asset,
          amount: values.amount,
          mainAccount: currMainAcc,
        });
      },
    });

  const handleInputChange = (e) => {
    console.log({ e }, e.ta);
  };

  const getColor = (status: Transaction["status"]) => {
    switch (status) {
      case "CONFIRMED":
        return "green";
      case "PENDING":
        return "orange";
      default:
        return "primary";
    }
  };

  return (
    <>
      <Head>
        <title>Deposit | Polkadex Orderbook</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <Menu isWallet handleChange={() => setState(!state)} />
        <S.Wrapper>
          <S.Title type="button" onClick={() => router.back()}>
            <div>
              <Icons.SingleArrowLeft />
            </div>
            Overview
          </S.Title>
          <S.Container>
            <S.Column>
              <div>
                <h1>Deposit Crypto</h1>
                <p>
                  Polkadex is a fully non-custodial platform, so the assets in your wallet are
                  always under your control.
                </p>
              </div>
            </S.Column>
            <S.Box>
              <S.Form>
                <Loading
                  message="Block finalization will take a few mins."
                  isVisible={loading}>
                  <S.SelectAccount>
                    <div>
                      <Icons.Avatar />
                    </div>
                    <div>
                      <strong>
                        {currMainAcc?.account?.meta?.name || "Wallet not present"}
                      </strong>
                      <span>{shortAddress}</span>
                    </div>
                  </S.SelectAccount>
                  <form onSubmit={handleSubmit}>
                    <S.SelectInput>
                      <span>Select a coin</span>
                      <S.SelectInputContainer>
                        <Dropdown>
                          <Dropdown.Trigger>
                            <S.DropdownHeader>
                              <div>
                                <span>
                                  <Tokens.PDEX />
                                </span>
                                {selectedAsset?.name}
                              </div>
                              <div>
                                <span>
                                  <Icons.ArrowBottom />
                                </span>
                              </div>
                            </S.DropdownHeader>
                          </Dropdown.Trigger>
                          <Dropdown.Menu fill="secondaryBackgroundSolid">
                            {assets.map((asset) => (
                              <Dropdown.Item
                                key={asset.assetId}
                                onAction={() => setSelectedAsset(asset)}>
                                {asset.name}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </S.SelectInputContainer>
                      <S.Available>
                        Available{" "}
                        <strong>
                          {onChainBalanceLoading ? "Loading..." : onChainBalance}
                        </strong>
                      </S.Available>
                    </S.SelectInput>
                    <InputLine
                      name="amount"
                      label="Token Amount"
                      placeholder="0.00"
                      error={errors.amount && touched.amount && errors.amount}
                      {...getFieldProps("amount")}
                    />
                    <Button
                      type="submit"
                      size="extraLarge"
                      background="green"
                      hoverColor="green"
                      color="white"
                      disabled={!(isValid && dirty) || loading || !currMainAcc}
                      isFull
                      isLoading={loading}>
                      {currMainAcc
                        ? "Deposit"
                        : "Funding account not found in polkadot.js extension"}
                    </Button>
                  </form>
                </Loading>
              </S.Form>

              <S.History>
                <h2>History</h2>
                {deposits.length ? (
                  <S.HistoryContent>
                    <Table
                      aria-label="Polkadex Deposit History Table"
                      style={{ width: "100%" }}>
                      <Table.Header fill="none">
                        <Table.Column>
                          <S.HeaderColumn style={{ paddingLeft: 10 }}>Name</S.HeaderColumn>
                        </Table.Column>
                        <Table.Column>
                          <S.HeaderColumn>Date</S.HeaderColumn>
                        </Table.Column>
                        <Table.Column>
                          <S.HeaderColumn>Status</S.HeaderColumn>
                        </Table.Column>
                        <Table.Column>
                          <S.HeaderColumn>Amount</S.HeaderColumn>
                        </Table.Column>
                        <Table.Column>
                          <S.HeaderColumn>Fee</S.HeaderColumn>
                        </Table.Column>
                      </Table.Header>
                      <Table.Body striped>
                        {deposits.map((item, i) => (
                          <Table.Row key={i}>
                            <Table.Cell>
                              <S.CellName>
                                <span>
                                  {assetsState.state.selectGetAsset(item.asset)?.symbol}
                                </span>
                              </S.CellName>
                            </Table.Cell>
                            <Table.Cell>
                              <S.Cell>
                                <span>
                                  {intlFormat(
                                    new Date(item.time),
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    },
                                    { locale: "EN" }
                                  )}
                                </span>
                              </S.Cell>
                            </Table.Cell>
                            <Table.Cell>
                              <S.Cell>
                                <S.Status color={getColor(item.status)}>
                                  {item.status}
                                </S.Status>
                              </S.Cell>
                            </Table.Cell>
                            <Table.Cell>
                              <S.Cellamount>
                                <Decimal fixed={5}>{item.amount}</Decimal>
                              </S.Cellamount>
                            </Table.Cell>
                            <Table.Cell>
                              <S.Cell>
                                <Decimal fixed={5}>{item.fee}</Decimal>
                              </S.Cell>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </S.HistoryContent>
                ) : (
                  <EmptyData />
                )}
              </S.History>
            </S.Box>
          </S.Container>
        </S.Wrapper>
      </S.Main>
    </>
  );
};

const Copy = ({ copyData }) => {
  const buttonRef = useRef(null);
  const handleOnMouseOut = () => (buttonRef.current.innerHTML = "Copy to clipboard");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(copyData);
    buttonRef.current.innerHTML = "Copied";
  };
  return (
    <S.Cell>
      <Tooltip>
        <TooltipHeader>
          <button type="button" onClick={handleCopy} onMouseOut={handleOnMouseOut}>
            <Icons.Copy />
          </button>
          {copyData}
        </TooltipHeader>
        <TooltipContent>
          <p ref={buttonRef}>Copy to clipboard</p>
        </TooltipContent>
      </Tooltip>
    </S.Cell>
  );
};
