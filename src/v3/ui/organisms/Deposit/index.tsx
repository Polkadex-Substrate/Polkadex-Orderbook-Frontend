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
import { depositsFetch, selectLinkedMainAccount } from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { depositValidations } from "@polkadex/orderbook/validations";
import { selectAllAssets } from "@polkadex/orderbook/modules/public/assets";

const Deposit = () => {
  const linkedMainAccount = useReduxSelector(selectLinkedMainAccount);
  const defaultValues = {
    amount: 0.0,
    asset: null,
    address: linkedMainAccount.address,
  };
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
          dispatch(
            depositsFetch({
              asset: asset,
              amount: values.amount,
              mainAccount: linkedMainAccount,
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
                accountName={linkedMainAccount?.meta.name || "My Main account"}
                address={linkedMainAccount?.address || "Polkadex is completely free"}
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
                      <S.SelectCard
                        key={idx}
                        onClick={() => {
                          setFieldValue("asset", asset);
                        }}>
                        {asset?.name}
                      </S.SelectCard>
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

export default Deposit;
