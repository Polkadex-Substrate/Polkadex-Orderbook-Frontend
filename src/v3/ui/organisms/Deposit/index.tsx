import { useDispatch } from "react-redux";
import { Form, Formik } from "formik";

import * as S from "./styles";

import {
  Button,
  Dropdown,
  Icon,
  InputPrimary,
  SelectAccount,
} from "@polkadex/orderbook-ui/molecules";
import {
  depositsFetch,
  selectExtensionWalletAccounts,
  selectMainAccount,
  selectMarkets,
  setMainAccountFetch,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { depositValidations } from "@polkadex/orderbook/validations";

const defaultValues = {
  amount: 0.0,
  asset: "",
  market: null,
  address: "",
};

const Deposit = () => {
  const accounts = useReduxSelector(selectExtensionWalletAccounts);
  const selectedAccount = useReduxSelector(selectMainAccount);
  const markets = useReduxSelector(selectMarkets);

  const dispatch = useDispatch();

  return (
    <S.Wrapper>
      <Formik
        initialValues={defaultValues}
        validationSchema={depositValidations}
        onSubmit={async (values) => {
          const isBase = values.market?.base_unit === values.asset;
          const baseAsset =
            values.market.assetIdArray[0] === "-1"
              ? { polkadex: null }
              : { asset: values.market.assetIdArray[0] };
          const quoteAsset =
            values.market.assetIdArray[1] === "-1"
              ? { polkadex: null }
              : { asset: values.market.assetIdArray[1] };
          dispatch(depositsFetch({ baseAsset, quoteAsset, amount: values.amount, isBase }));
        }}>
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <S.SelectAccountContainer>
              <Dropdown
                direction="bottom"
                isClickable
                priority="medium"
                header={
                  <SelectAccount
                    isHeader
                    accountName={selectedAccount?.name || "Select your main account"}
                    address={selectedAccount?.address || "Polkadex is completely free"}
                  />
                }>
                <S.SelectContent isOverflow={accounts?.length > 2}>
                  {accounts?.length ? (
                    accounts.map((item, index) => (
                      <SelectAccount
                        isActive={item.address === selectedAccount?.address}
                        key={index}
                        accountName={item.meta.name || `Account ${index}`}
                        address={item.address}
                        onClick={() => {
                          setFieldValue("address", item.address);
                          dispatch(setMainAccountFetch(accounts[index]));
                        }}
                      />
                    ))
                  ) : (
                    <S.SelectMessage>You dont have account, please create one</S.SelectMessage>
                  )}
                </S.SelectContent>
              </Dropdown>
              {errors.address && <S.Error>{errors.address}</S.Error>}
            </S.SelectAccountContainer>
            <S.SelectPairContainer onClick={() => console.log(errors, values)}>
              <S.SelectPairWrapper>
                <Dropdown
                  direction="bottom"
                  isClickable
                  header={
                    <S.SelectWrapper>
                      <span>{values?.market?.name || "Select Market"}</span>
                      <Icon
                        name="ArrowBottom"
                        size="small"
                        style={{ marginLeft: "1rem" }}
                        stroke="text"
                      />
                    </S.SelectWrapper>
                  }>
                  <S.SelectContainer isOverflow={markets?.length > 2}>
                    {markets.map((market, idx) => (
                      <S.SelectCard
                        key={idx}
                        onClick={() => {
                          setFieldValue("market", market);
                        }}>
                        {market.name}
                      </S.SelectCard>
                    ))}
                  </S.SelectContainer>
                </Dropdown>
                {errors.market && <S.Error>{errors.market}</S.Error>}
              </S.SelectPairWrapper>
              {values?.market?.id && (
                <S.SelectPairWrapper>
                  <Dropdown
                    direction="bottom"
                    isClickable
                    header={
                      <S.SelectWrapper>
                        <span>{values.asset || "Select Asset"}</span>
                        <Icon
                          name="ArrowBottom"
                          size="small"
                          style={{ marginLeft: "1rem" }}
                          stroke="text"
                        />
                      </S.SelectWrapper>
                    }>
                    <S.SelectContent isOverflow={false}>
                      <S.SelectCard
                        onClick={() => {
                          setFieldValue("asset", values.market.base_unit);
                        }}>
                        {values.market?.base_unit}
                      </S.SelectCard>
                      <S.SelectCard
                        onClick={() => {
                          setFieldValue("asset", values.market.quote_unit);
                        }}>
                        {values.market?.quote_unit}
                      </S.SelectCard>
                    </S.SelectContent>
                  </Dropdown>
                  {errors.market && <S.Error>{errors.market}</S.Error>}
                </S.SelectPairWrapper>
              )}
            </S.SelectPairContainer>
            <S.WrapperContainer>
              <S.Container>
                <S.Input>
                  <InputPrimary
                    label="amount"
                    placeholder="Enter an amount "
                    type="amount"
                    name="amount"
                    error={errors.amount && touched.amount && errors.amount}
                  />
                </S.Input>
              </S.Container>
            </S.WrapperContainer>
            <S.Actions>
              <Button
                background="primary"
                size="extraLarge"
                color="white"
                isFull
                type="submit">
                Deposit
              </Button>
            </S.Actions>
          </Form>
        )}
      </Formik>
    </S.Wrapper>
  );
};

export default Deposit;
