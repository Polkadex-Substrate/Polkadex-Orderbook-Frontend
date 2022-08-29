import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import { Dropdown } from "@polkadex/orderbook/v3/ui/molecules";
import {
  Button,
  InputLine,
  Table,
  Tooltip,
  TooltipContent,
  TooltipHeader,
} from "@polkadex/orderbook-ui/molecules";
import { withdrawValidations } from "@polkadex/orderbook/validations";
import { Icons, Tokens } from "@polkadex/orderbook-ui/atoms";
import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";
import { useHistory, useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  selectCurrentMainAccount,
  selectWithdrawsLoading,
  withdrawsFetch,
} from "@polkadex/orderbook-modules";
import {
  isAssetPDEX,
  selectAllAssets,
  selectGetAsset,
} from "@polkadex/orderbook/modules/public/assets";
import { POLKADEX_ASSET } from "@polkadex/web-constants";

export const WithdrawTemplate = () => {
  const [state, setState] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(POLKADEX_ASSET);

  const currMainAcc = useReduxSelector(selectCurrentMainAccount);
  const assets = useReduxSelector(selectAllAssets);
  const getAsset = useReduxSelector(selectGetAsset);
  const loading = useReduxSelector(selectWithdrawsLoading);

  const dispatch = useDispatch();
  const router = useRouter();
  const { withdrawals } = useHistory();
  const routedAsset = router.query.id as string;
  const shortAddress =
    currMainAcc?.address?.slice(0, 15) +
    "..." +
    currMainAcc?.address?.slice(currMainAcc?.address?.length - 15);

  useEffect(() => {
    const initialAsset = assets.find(
      (asset) => asset.name.includes(routedAsset) || asset.symbol.includes(routedAsset)
    );
    if (initialAsset) {
      setSelectedAsset(initialAsset);
    }
  }, [assets, routedAsset]);

  const { touched, handleSubmit, errors, getFieldProps, isValid, dirty } = useFormik({
    initialValues: {
      amount: 0.0,
      asset: null,
    },
    validationSchema: withdrawValidations,
    onSubmit: (values) => {
      const asset = isAssetPDEX(selectedAsset.assetId)
        ? { polkadex: null }
        : { asset: selectedAsset.assetId };
      dispatch(
        withdrawsFetch({
          asset: asset,
          amount: values.amount,
        })
      );
    },
  });

  return (
    <>
      <Head>
        <title>Deposit | Polkadex Orderbook</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <Menu handleChange={() => setState(!state)} />
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
                <S.SelectAccount>
                  <div>
                    <Icons.Avatar />
                  </div>
                  <div>
                    <strong>{currMainAcc?.name || "Wallet not selected"}</strong>
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
                      Avlb <strong>120PDEX</strong>
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
                    background="primary"
                    color="white"
                    disabled={!(isValid && dirty)}
                    isFull>
                    Withdraw
                  </Button>
                </form>
              </S.Form>
              <S.History>
                <h2>History</h2>
                {withdrawals.map((value) => (
                  <S.HistoryContent key={value.id}>
                    <S.HistoryTitle>
                      <strong>Id #{value.eventId}</strong>
                      <button type="button" onClick={undefined}>
                        Claim
                      </button>
                    </S.HistoryTitle>
                    <S.HistoryTable>
                      <Table
                        aria-label="Polkadex Withdraw History Table"
                        style={{ width: "100%" }}>
                        <Table.Header fill="none">
                          <Table.Column>
                            <S.HeaderColumn>Name</S.HeaderColumn>
                          </Table.Column>
                          <Table.Column>
                            <S.HeaderColumn>Date</S.HeaderColumn>
                          </Table.Column>
                          <Table.Column>
                            <S.HeaderColumn>Amount</S.HeaderColumn>
                          </Table.Column>
                        </Table.Header>
                        <Table.Body>
                          {value.items.map((item) => (
                            <Table.Row key={item.id}>
                              <Table.Cell>
                                <S.Cell>
                                  <span>
                                    {getAsset(item.asset)?.name}{" "}
                                    <small>{getAsset(item.asset)?.symbol}</small>
                                  </span>
                                </S.Cell>
                              </Table.Cell>
                              <Table.Cell>
                                <S.Cell>
                                  <span>{item.date}</span>
                                </S.Cell>
                              </Table.Cell>
                              <Table.Cell>
                                <S.Cell>
                                  <span>{item.amount}</span>
                                </S.Cell>
                              </Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table>
                    </S.HistoryTable>
                  </S.HistoryContent>
                ))}
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
