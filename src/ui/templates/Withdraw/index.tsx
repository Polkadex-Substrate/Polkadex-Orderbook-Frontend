// TODO: Refactor history

import Head from "next/head";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { intlFormat } from "date-fns";

import * as S from "./styles";

import { Dropdown } from "@polkadex/orderbook/v3/ui/molecules";
import {
  Button,
  InputLine,
  Table,
  Tooltip,
  TooltipContent,
  TooltipHeader,
  EmptyData,
  LoadingSection,
  Tabs,
  TabHeader,
  TabContent,
  Checkbox,
  Modal,
} from "@polkadex/orderbook-ui/molecules";
import { withdrawValidations } from "@polkadex/orderbook/validations";
import { Decimal, Icons } from "@polkadex/orderbook-ui/atoms";
import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";
import { useHistory, useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  selectClaimWithdrawsInLoading,
  selectMainAccount,
  selectUserBalance,
  selectUsingAccount,
  selectWithdrawsLoading,
  withdrawsFetch,
} from "@polkadex/orderbook-modules";
import {
  isAssetPDEX,
  selectAllAssets,
  selectGetAsset,
} from "@polkadex/orderbook/modules/public/assets";
import { POLKADEX_ASSET } from "@polkadex/web-constants";
import { UnlockAccount } from "@polkadex/orderbook-ui/organisms";

export const WithdrawTemplate = () => {
  const [state, setState] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(POLKADEX_ASSET);
  const [unlockAccount, setUnlockAccount] = useState(false);

  const currentAccount = useReduxSelector(selectUsingAccount);
  const currMainAcc = useReduxSelector(selectMainAccount(currentAccount.mainAddress));
  const assets = useReduxSelector(selectAllAssets);
  const loading = useReduxSelector(selectWithdrawsLoading);
  const userBalances = useReduxSelector(selectUserBalance);

  const dispatch = useDispatch();
  const router = useRouter();
  const { allWithdrawals, readyWithdrawals, handleClaimWithdraws } = useHistory();
  const routedAsset = router.query.id as string;
  const shortAddress =
    currMainAcc?.account?.address?.slice(0, 15) +
    "..." +
    currMainAcc?.account?.address?.slice(currMainAcc?.account?.address?.length - 15);

  const availableAmount = useMemo(
    () => userBalances?.find((item) => item.asset_id === selectedAsset?.asset_id),
    [userBalances, selectedAsset]
  );
  useEffect(() => {
    const initialAsset = assets.find(
      (asset) => asset.name.includes(routedAsset) || asset.symbol.includes(routedAsset)
    );
    if (initialAsset) {
      setSelectedAsset(initialAsset);
    }
  }, [assets, routedAsset]);

  const validate = (values) => {
    const errors = {} as any;
    if (values?.amount?.includes("e")) {
      errors.amount = "use a valid amount instead";
    }

    if (+values?.amount > +availableAmount?.free_balance) {
      errors.amount = "Amount cannot be greater than balance";
    }
    return errors;
  };

  const { touched, handleSubmit, errors, getFieldProps, isValid, dirty } = useFormik({
    initialValues: {
      amount: 0.0,
      asset: null,
    },
    validationSchema: withdrawValidations,
    validate,
    onSubmit: (values) => {
      const asset = isAssetPDEX(selectedAsset.asset_id)
        ? { polkadex: null }
        : { asset: selectedAsset.asset_id };
      dispatch(
        withdrawsFetch({
          asset: asset,
          amount: values.amount,
        })
      );
    },
  });

  const selectedWithdraw = useCallback(
    (status: "PENDING" | "CONFIRMED") => {
      const result = allWithdrawals.filter((txn) => txn.status === status);
      // eslint-disable-next-line prefer-spread
      return [].concat.apply([], result);
    },
    [allWithdrawals]
  );

  const pendingWithdraws = useMemo(() => selectedWithdraw("PENDING"), [selectedWithdraw]);

  const claimedWithdraws = useMemo(() => selectedWithdraw("CONFIRMED"), [selectedWithdraw]);
  const readyToClaim = readyWithdrawals;

  const hasPendingClaims = useMemo(
    () =>
      readyToClaim.reduce(
        (acc, value) => acc + value.items.filter((v) => v.status === "READY").length,
        0
      ),
    [readyToClaim]
  );

  const handleUnlockClose = () => !unlockAccount && setUnlockAccount(false);

  return (
    <>
      <Modal open={unlockAccount} onClose={handleUnlockClose}>
        <Modal.Body>
          <UnlockAccount
            onSubmit={() => {
              // Add action..
              setUnlockAccount(false);
            }}
          />
        </Modal.Body>
      </Modal>
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
                <h1>Withdraw Crypto</h1>
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
                    <strong>
                      {currMainAcc?.account?.meta?.name || "Wallet not selected"}
                    </strong>
                    <span>{shortAddress}</span>
                  </div>
                </S.SelectAccount>
                <form onSubmit={handleSubmit}>
                  <LoadingSection isActive={loading} color="primaryBackgroundOpacity">
                    <S.SelectInput>
                      <span>Select a coin</span>
                      <S.SelectInputContainer>
                        <Dropdown>
                          <Dropdown.Trigger>
                            <S.DropdownHeader>
                              <div>{selectedAsset?.name}</div>
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
                                key={asset.asset_id}
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
                          {availableAmount?.free_balance || 0} {selectedAsset?.symbol}
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
                      background="primary"
                      color="white"
                      disabled={!(isValid && dirty) || loading}
                      isFull
                      isLoading={loading}>
                      Withdraw
                    </Button>
                  </LoadingSection>
                </form>
              </S.Form>
              <S.History>
                <Tabs>
                  <h2>History</h2>
                  <S.HistoryHeader>
                    <S.HistoryTabs>
                      <TabHeader>
                        <S.HistoryTab>Pending</S.HistoryTab>
                      </TabHeader>
                      <TabHeader>
                        <S.HistoryTab hasPendingClaims={hasPendingClaims > 0}>
                          Ready to Claim
                          <span>{hasPendingClaims}</span>
                        </S.HistoryTab>
                      </TabHeader>
                      <TabHeader>
                        <S.HistoryTab>Claimed</S.HistoryTab>
                      </TabHeader>
                    </S.HistoryTabs>
                    <S.HistoryHeaderAside>
                      <Checkbox name="hide">Show only selected coin</Checkbox>
                    </S.HistoryHeaderAside>
                  </S.HistoryHeader>
                  <S.HistoryWrapper>
                    <TabContent>
                      {pendingWithdraws?.length ? (
                        <HistoryTable items={pendingWithdraws} />
                      ) : (
                        <EmptyData />
                      )}
                    </TabContent>
                    <TabContent>
                      {readyToClaim?.length ? (
                        readyToClaim?.map((value) => (
                          <HistoryCard
                            key={value.id}
                            sid={value.sid}
                            hasPendingWithdraws={value?.items.filter(
                              (v) => v.status === "READY"
                            )}
                            handleClaimWithdraws={() => handleClaimWithdraws(value.sid)}
                            items={value.items.filter((v) => v.status === "READY")}
                          />
                        ))
                      ) : (
                        <EmptyData />
                      )}
                    </TabContent>
                    <TabContent>
                      {claimedWithdraws?.length ? (
                        <HistoryTable items={claimedWithdraws} />
                      ) : (
                        <EmptyData />
                      )}
                    </TabContent>
                  </S.HistoryWrapper>
                </Tabs>
              </S.History>
            </S.Box>
          </S.Container>
        </S.Wrapper>
      </S.Main>
    </>
  );
};

const HistoryCard = ({ sid, hasPendingWithdraws, handleClaimWithdraws, items }) => {
  const claimWithdrawsInLoading = useReduxSelector(selectClaimWithdrawsInLoading);

  const claimIsLoading = useMemo(
    () => claimWithdrawsInLoading.includes(sid),
    [claimWithdrawsInLoading, sid]
  );
  return (
    <S.HistoryContent>
      <S.HistoryTitle>
        <strong>Id #{sid ?? "QUEUED"}</strong>

        {claimWithdrawsInLoading?.length >= 1 && !claimIsLoading ? (
          <p>There is already a transaction in progress</p>
        ) : (
          !!hasPendingWithdraws?.length && (
            <Button
              type="button"
              disabled={claimIsLoading}
              isLoading={claimIsLoading}
              onClick={handleClaimWithdraws}>
              Claim
            </Button>
          )
        )}
      </S.HistoryTitle>
      <HistoryTable items={items} />
    </S.HistoryContent>
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

const HistoryTable = ({ items }) => {
  const getAsset = useReduxSelector(selectGetAsset);

  return (
    <S.HistoryTable>
      <Table aria-label="Polkadex Withdraw History Table" style={{ width: "100%" }}>
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
          <Table.Column>
            <S.HeaderColumn>Status</S.HeaderColumn>
          </Table.Column>
        </Table.Header>
        <Table.Body>
          {items.map((item) => (
            <Table.Row key={item.event_id}>
              <Table.Cell>
                <S.Cell>
                  <span>
                    {getAsset(item.asset)?.name} <small>{getAsset(item.asset)?.symbol}</small>
                  </span>
                </S.Cell>
              </Table.Cell>
              <Table.Cell>
                <S.Cell>
                  <span>
                    {intlFormat(
                      item.date,
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
                  <span>
                    <Decimal fixed={5}>{item.amount}</Decimal>
                  </span>
                </S.Cell>
              </Table.Cell>
              <Table.Cell>
                <S.Cell>
                  <span>{item.status}</span>
                </S.Cell>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </S.HistoryTable>
  );
};
