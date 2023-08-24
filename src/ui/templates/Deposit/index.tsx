import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { intlFormat } from "date-fns";
import { useTranslation } from "react-i18next";

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
import { depositValidations } from "@polkadex/orderbook/validations";
import { Decimal, Icons, Tokens } from "@polkadex/orderbook-ui/atoms";
import { POLKADEX_ASSET } from "@polkadex/web-constants";
import { useOnChainBalance } from "@polkadex/orderbook/hooks/useOnChainBalance";
import { Header, Menu } from "@polkadex/orderbook-ui/organisms";
import { useDepositProvider } from "@polkadex/orderbook/providers/user/depositProvider/useDepositProvider";
import { isAssetPDEX } from "@polkadex/orderbook/helpers/isAssetPDEX";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useAssetsProvider } from "@polkadex/orderbook/providers/public/assetsProvider/useAssetsProvider";
import { useExtensionWallet } from "@polkadex/orderbook/providers/user/extensionWallet";
import { useTransactionsProvider } from "@polkadex/orderbook/providers/user/transactionsProvider/useTransactionProvider";
import { Transaction } from "@polkadex/orderbook/providers/user/transactionsProvider";
import { filterAssets } from "@polkadex/orderbook/helpers/filterAssets";
import { trimFloat } from "@polkadex/web-helpers";

export const DepositTemplate = () => {
  const { t } = useTranslation("deposit");
  const { t: tc } = useTranslation("common");

  const [selectedAsset, setSelectedAsset] = useState(POLKADEX_ASSET);
  const { selectedAccount: currentAccount } = useProfile();

  const { list, selectGetAsset } = useAssetsProvider();

  const extensionWalletState = useExtensionWallet();

  const currMainAcc =
    currentAccount.mainAddress &&
    extensionWalletState.allAccounts?.find(
      ({ account }) =>
        account?.address?.toLowerCase() === currentAccount.mainAddress?.toLowerCase()
    );
  const { loading, onFetchDeposit } = useDepositProvider();

  const router = useRouter();
  const { deposits } = useTransactionsProvider();

  const { onChainBalance, onChainBalanceLoading } = useOnChainBalance(selectedAsset?.assetId);

  const routedAsset = router.query.id as string;

  const shortAddress =
    currMainAcc?.account?.address?.slice(0, 15) +
    "..." +
    currMainAcc?.account?.address?.slice(currMainAcc?.account?.address?.length - 15);

  useEffect(() => {
    const initialAsset = list.find(
      (asset) => asset.name.startsWith(routedAsset) || asset.symbol.startsWith(routedAsset)
    );

    if (initialAsset) {
      setSelectedAsset(initialAsset);
    }
  }, [list, routedAsset]);

  const existentialBalance = isAssetPDEX(selectedAsset.assetId) ? 1 : Math.pow(10, -12);
  const { handleSubmit, errors, getFieldProps, isValid, dirty, setFieldValue } = useFormik({
    initialValues: {
      amount: 0.0,
    },
    validationSchema: depositValidations(
      onChainBalance,
      selectedAsset?.assetId,
      existentialBalance
    ),
    validateOnChange: true,
    onSubmit: (values) => {
      const asset = isAssetPDEX(selectedAsset.assetId)
        ? { polkadex: null }
        : { asset: selectedAsset.assetId };

      onFetchDeposit({
        asset: asset,
        amount: values.amount,
        mainAccount: currMainAcc,
      });
    },
  });

  const handleMax = (e) => {
    e.preventDefault();
    if (onChainBalance > existentialBalance) {
      const balance = onChainBalance - existentialBalance;
      // Fixed it to maximum 8 digits
      const trimmedBalance = trimFloat({ value: balance });
      setFieldValue("amount", trimmedBalance);
    }
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
        <title>{t("title")}</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <Header />
        <S.Flex>
          <Menu />
          <S.Wrapper>
            <S.Title type="button" onClick={() => router.back()}>
              <div>
                <Icons.SingleArrowLeft />
              </div>
              {t("overview")}
            </S.Title>
            <S.Container>
              <S.Column>
                <div>
                  <h1>{t("heading")}</h1>
                  <p>{t("description")}</p>
                </div>
              </S.Column>
              <S.Box>
                <S.Form>
                  <Loading message={tc("blockFinalizationMessage")} isVisible={loading}>
                    <S.SelectAccount>
                      <div>
                        <Icons.Avatar />
                      </div>
                      <div>
                        <strong>
                          {currMainAcc?.account?.meta?.name || t("walletNotPresent")}
                        </strong>
                        <span>{shortAddress}</span>
                      </div>
                    </S.SelectAccount>
                    <form onSubmit={handleSubmit}>
                      <S.SelectInput>
                        <span>{t("selectCoin")}</span>
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
                              {filterAssets(list).map((asset) => (
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
                          {tc("available")}{" "}
                          <strong>
                            {onChainBalanceLoading ? t("loading") : onChainBalance}
                          </strong>
                        </S.Available>
                      </S.SelectInput>
                      <InputLine
                        name="amount"
                        label={t("inputLabel")}
                        placeholder="0.00"
                        error={errors.amount?.toString()}
                        {...getFieldProps("amount")}>
                        <S.MAXButton onClick={handleMax}>{tc("max")}</S.MAXButton>
                      </InputLine>
                      <Button
                        type="submit"
                        size="extraLarge"
                        background="green"
                        hoverColor="green"
                        color="white"
                        disabled={!(isValid && dirty) || loading || !currMainAcc}
                        isFull
                        isLoading={loading}>
                        {currMainAcc ? tc("deposit") : t("accountNotFound")}
                      </Button>
                    </form>
                  </Loading>
                </S.Form>

                <S.History>
                  <h2>{t("history")}</h2>
                  {deposits.length ? (
                    <S.HistoryContent>
                      <Table
                        aria-label="Polkadex Deposit History Table"
                        style={{ width: "100%" }}>
                        <Table.Header fill="none">
                          <Table.Column>
                            <S.HeaderColumn style={{ paddingLeft: 10 }}>
                              {t("table.name")}
                            </S.HeaderColumn>
                          </Table.Column>
                          <Table.Column>
                            <S.HeaderColumn>{t("table.date")}</S.HeaderColumn>
                          </Table.Column>
                          <Table.Column>
                            <S.HeaderColumn>{t("table.status")}</S.HeaderColumn>
                          </Table.Column>
                          <Table.Column>
                            <S.HeaderColumn>{t("table.amount")}</S.HeaderColumn>
                          </Table.Column>
                          <Table.Column>
                            <S.HeaderColumn>{t("table.fee")}</S.HeaderColumn>
                          </Table.Column>
                        </Table.Header>
                        <Table.Body striped border="squared">
                          {deposits.map((item, i) => (
                            <Table.Row key={i}>
                              <Table.Cell>
                                <S.CellName>
                                  <span>{selectGetAsset(item.asset)?.symbol}</span>
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
        </S.Flex>
      </S.Main>
    </>
  );
};

export const Copy = ({ copyData }) => {
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
