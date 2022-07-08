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
  setMainAccountFetch,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { depositValidations } from "@polkadex/orderbook/validations";
import { selectAllAssets } from "@polkadex/orderbook/modules/public/assets";
import { useOnChainBalance } from "@polkadex/orderbook/hooks/useOnChainBalance";

const defaultValues = {
  amount: 0.0,
  asset: null,
  address: "",
};

const Deposit = () => {
  const accounts = useReduxSelector(selectExtensionWalletAccounts);
  const selectedAccount = useReduxSelector(selectMainAccount);
  const assets = useReduxSelector(selectAllAssets);
  const dispatch = useDispatch();

  return (
    <S.Wrapper>
      <Formik
        initialValues={defaultValues}
        validationSchema={depositValidations}
        onSubmit={async (values) => {
          const asset =
            values.asset.assetId === "-1"
              ? { polkadex: null }
              : { asset: values.asset.assetId };
          dispatch(depositsFetch({ asset: asset, amount: values.amount }));
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
            <S.SelectPairContainer>
              <S.SelectPairWrapper>
                <Dropdown
                  direction="bottom"
                  isClickable
                  header={
                    <S.SelectWrapper>
                      <span>{values?.asset?.name || "Select Token"}</span>
                      <Icon
                        name="ArrowBottom"
                        size="small"
                        style={{ marginLeft: "1rem" }}
                        stroke="text"
                      />
                    </S.SelectWrapper>
                  }>
                  <S.SelectContainer isOverflow={assets?.length > 2}>
                    {assets.map((asset, idx) => (
                      <Card
                        key={idx}
                        id={asset.assetId}
                        onChange={() => setFieldValue("asset", asset)}
                        name={asset?.name}
                      />
                    ))}
                  </S.SelectContainer>
                </Dropdown>
                {errors.asset && <S.Error>{errors.asset}</S.Error>}
              </S.SelectPairWrapper>
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

const Card = ({ onChange, name, id }) => {
  const { onChainBalance } = useOnChainBalance(id);
  return (
    <S.SelectCard onClick={onChange}>
      <span>{name}</span>
      {onChainBalance > 0 && <small>{`Avlb: ${onChainBalance} ${name}`}</small>}
    </S.SelectCard>
  );
};
export default Deposit;
