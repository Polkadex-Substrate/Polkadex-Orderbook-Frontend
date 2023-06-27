import Head from "next/head";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { intlFormat } from "date-fns";

import * as S from "./styles";

import {
  Button,
  Dropdown,
  InputLine,
  Table,
  EmptyData,
  LoadingSection,
  Tabs,
  TabHeader,
  TabContent,
  Checkbox,
  Modal,
} from "@polkadex/orderbook-ui/molecules";
import { getDigitsAfterDecimal } from "@polkadex/orderbook/helpers";
import { withdrawValidations } from "@polkadex/orderbook/validations";
import { Decimal, Icons } from "@polkadex/orderbook-ui/atoms";
import { useTryUnlockTradeAccount } from "@polkadex/orderbook-hooks";
import { Menu, UnlockAccount } from "@polkadex/orderbook-ui/organisms";
import {
  ErrorMessages,
  MAX_DIGITS_AFTER_DECIMAL,
  POLKADEX_ASSET,
} from "@polkadex/web-constants";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useAssetsProvider } from "@polkadex/orderbook/providers/public/assetsProvider/useAssetsProvider";
import { isAssetPDEX } from "@polkadex/orderbook/helpers/isAssetPDEX";
import { useBalancesProvider } from "@polkadex/orderbook/providers/user/balancesProvider/useBalancesProvider";
import { useExtensionWallet } from "@polkadex/orderbook/providers/user/extensionWallet";
import { useWithdrawsProvider } from "@polkadex/orderbook/providers/user/withdrawsProvider/useWithdrawsProvider";
import { useTransactionsProvider } from "@polkadex/orderbook/providers/user/transactionsProvider/useTransactionProvider";
import { useTradeWallet } from "@polkadex/orderbook/providers/user/tradeWallet";
import { selectTradeAccount } from "@polkadex/orderbook/providers/user/tradeWallet/helper";
import { Transaction } from "@polkadex/orderbook/providers/user/transactionsProvider";

const initialValues = {
  amount: 0.0,
};

export const WithdrawTemplate = () => {
  const [selectedAsset, setSelectedAsset] = useState(POLKADEX_ASSET);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { selectedAccount: currentAccount } = useProfile();
  const extensionWalletState = useExtensionWallet();
  const { onFetchWithdraws } = useWithdrawsProvider();
  const tradeWalletState = useTradeWallet();
  const { list: assets } = useAssetsProvider();
  const { allWithdrawals, readyWithdrawals: readyToClaim } = useTransactionsProvider();
  const { onFetchClaimWithdraw, loading } = useWithdrawsProvider();

  const currMainAcc =
    currentAccount.mainAddress &&
    extensionWalletState.allAccounts?.find(
      ({ account }) =>
        account?.address?.toLowerCase() === currentAccount.mainAddress?.toLowerCase()
    );

  const tradingAccountInBrowser = selectTradeAccount(
    currentAccount?.tradeAddress,
    tradeWalletState.allBrowserAccounts
  );

  useTryUnlockTradeAccount(tradingAccountInBrowser);
  const { balances: userBalances } = useBalancesProvider();

  const routedAsset = router.query.id as string;
  const shortAddress =
    currMainAcc?.account?.address?.slice(0, 15) +
    "..." +
    currMainAcc?.account?.address?.slice(currMainAcc?.account?.address?.length - 15);

  const availableAmount = useMemo(
    () => userBalances?.find((item) => item.assetId === selectedAsset?.assetId),
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

  const handleSubmitWithdraw = async (amount: string | number) => {
    try {
      const asset = isAssetPDEX(selectedAsset.assetId) ? "PDEX" : selectedAsset.assetId;

      await onFetchWithdraws({ asset, amount });
    } finally {
      resetForm({ values: initialValues });
    }
  };

  const validate = (values) => {
    const errors = {} as any;
    if (getDigitsAfterDecimal(values.amount) > MAX_DIGITS_AFTER_DECIMAL)
      errors.amount = ErrorMessages.MAX_EIGHT_DIGIT_AFTER_DECIMAL;
    if (/\s/.test(String(values.amount))) {
      errors.amount = ErrorMessages.WHITESPACE_NOT_ALLOWED;
    }
    return errors;
  };

  const { touched, handleSubmit, errors, getFieldProps, isValid, dirty, resetForm } =
    useFormik({
      initialValues,
      validationSchema: withdrawValidations(Number(availableAmount?.free_balance)),
      validate,
      onSubmit: ({ amount }) => {
        if (tradingAccountInBrowser?.isLocked) setShowPassword(true);
        else {
          /* Calling the handleSubmitWithdraw function with the amount parameter. */
          handleSubmitWithdraw(amount);
        }
      },
    });

  const selectedWithdraw = useCallback(
    (status: Transaction["status"]) =>
      allWithdrawals?.filter((txn) => txn.status === status)?.flat(),
    [allWithdrawals]
  );

  const pendingWithdraws = useMemo(() => selectedWithdraw("PENDING"), [selectedWithdraw]);
  const claimedWithdraws = useMemo(() => selectedWithdraw("CONFIRMED"), [selectedWithdraw]);

  const hasPendingClaims = useMemo(
    () =>
      readyToClaim.reduce(
        (acc, value) => acc + value.items.filter((v) => v.status === "READY").length,
        0
      ),
    [readyToClaim]
  );

  const handleUnlockClose = () => setShowPassword(false);
  const formRef = useRef(null);
  return (
    <>
      <Modal
        open={tradingAccountInBrowser?.isLocked && showPassword}
        onClose={handleUnlockClose}>
        <Modal.Body>
          <S.UnlockAccount>
            <S.UnlockButton type="button" onClick={handleUnlockClose}>
              <Icons.Close />
            </S.UnlockButton>
            <UnlockAccount
              onSubmit={({ password }) => {
                try {
                  tradingAccountInBrowser.unlock(password);
                  if (!tradingAccountInBrowser?.isLocked)
                    formRef?.current?.dispatchEvent(
                      new Event("submit", { cancelable: true, bubbles: true })
                    );
                } catch (error) {
                  alert(error);
                } finally {
                  setShowPassword(false);
                }
              }}
            />
          </S.UnlockAccount>
        </Modal.Body>
      </Modal>
      <Head>
        <title>Withdraw | Polkadex Orderbook</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <Menu />
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
                <form ref={formRef} onSubmit={handleSubmit}>
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
                          {availableAmount?.free_balance || 0} {selectedAsset?.symbol}
                        </strong>
                      </S.Available>
                    </S.SelectInput>
                    <S.Flex>
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
                    </S.Flex>
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
                        <div style={{ padding: "2rem" }}>
                          <EmptyData />
                        </div>
                      )}
                    </TabContent>
                    <TabContent>
                      {readyToClaim?.length ? (
                        readyToClaim.map(({ id, sid, items }) => (
                          <HistoryCard
                            key={id}
                            sid={sid}
                            hasPendingWithdraws={items?.filter((v) => v.status === "READY")}
                            handleClaimWithdraws={async () =>
                              await onFetchClaimWithdraw({ sid })
                            }
                            items={items?.filter((v) => v.status === "READY")}
                          />
                        ))
                      ) : (
                        <div style={{ padding: "2rem" }}>
                          <EmptyData />
                        </div>
                      )}
                    </TabContent>
                    <TabContent>
                      {claimedWithdraws?.length ? (
                        <HistoryTable items={claimedWithdraws} />
                      ) : (
                        <div style={{ padding: "2rem" }}>
                          <EmptyData />
                        </div>
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
  const { claimsInLoading: claimWithdrawsInLoading } = useWithdrawsProvider();
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

const HistoryTable = ({ items }) => {
  const { selectGetAsset } = useAssetsProvider();

  return (
    <S.HistoryTable>
      <Table aria-label="Polkadex Withdraw History Table" style={{ width: "100%" }}>
        <Table.Header fill="none" striped>
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
        <Table.Body striped border="squared">
          {items.map((item) => (
            <Table.Row key={item.stid}>
              <Table.Cell>
                <S.Cell>
                  <span>{selectGetAsset(item.asset)?.name} </span>
                  <small>{selectGetAsset(item.asset)?.symbol}</small>
                </S.Cell>
              </Table.Cell>
              <Table.Cell>
                <S.Cell>
                  <span>
                    {intlFormat(
                      item.date,
                      {
                        year: "2-digit",
                        month: "2-digit",
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
