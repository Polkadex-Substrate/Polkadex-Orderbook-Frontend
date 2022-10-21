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
  selectMainAccount,
  selectUsingAccount,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { depositValidations } from "@polkadex/orderbook/validations";
import { isAssetPDEX, selectAllAssets } from "@polkadex/orderbook/modules/public/assets";
import { useOnChainBalance } from "@polkadex/orderbook/hooks/useOnChainBalance";

const Deposit = () => {
  const currentAccount = useReduxSelector(selectUsingAccount);
  const linkedMainAddress = currentAccount.mainAddress;
  const { account } = useReduxSelector(selectMainAccount(linkedMainAddress));
  const defaultValues = {
    amount: 0.0,
    asset: null,
    address: linkedMainAddress,
  };
  const assets = useReduxSelector(selectAllAssets);
  const dispatch = useDispatch();

  return (
    <S.Wrapper>
      <Formik
        initialValues={defaultValues}
        validationSchema={depositValidations}
        onSubmit={async (values) => {
          const asset = isAssetPDEX(values.asset.assetId)
            ? { polkadex: null }
            : { asset: values.asset.assetId };
          dispatch(
            depositsFetch({
              asset: asset,
              amount: values.amount,
              mainAccount: account,
            })
          );
        }}>
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <S.SelectAccountContainer>
              <SelectAccount
                isHeader
                locked
                withButton={false}
                isHoverable={false}
                accountName={account?.meta.name || "My Funding account"}
                address={account?.address || "Polkadex is completely free"}
              />
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
                        id={asset.asset_id}
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
      {onChainBalance > 0 && <small>{`Available: ${onChainBalance} ${name}`}</small>}
    </S.SelectCard>
  );
};
export default Deposit;
