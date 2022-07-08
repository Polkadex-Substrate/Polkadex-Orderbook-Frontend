import { Formik, Form } from "formik";

import * as S from "./styles";

import {
  Button,
  Dropdown,
  Icon,
  SecondaryInput,
  SelectAccount,
} from "@polkadex/orderbook-ui/molecules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectMainAccount } from "@polkadex/orderbook-modules";
import { selectAllAssets } from "@polkadex/orderbook/modules/public/assets";

const defaultValues = {
  asset: null,
  amount: 0.0,
};

const Withdraw = () => {
  const mainAccount = useReduxSelector(selectMainAccount);
  const proxyAccount = useReduxSelector(selectMainAccount);
  const assets = useReduxSelector(selectAllAssets);

  return (
    <S.Wrapper>
      <Formik
        initialValues={defaultValues}
        onSubmit={async (values) => {
          // dispatch(
          // );
        }}>
        {({ values, errors, setFieldValue }) => (
          <Form>
            <S.Form>
              <S.FormWallet>
                <SelectAccount
                  accountName={mainAccount?.name || "My Main account"}
                  address={mainAccount?.address || "Polkadex is completely free"}
                  locked
                  isHoverable={false}
                />
                <S.IconWrapper>
                  <Icon name="DoubleArrowRight" />
                </S.IconWrapper>

                <SelectAccount
                  accountName={proxyAccount?.name || "My Proxy account"}
                  address={proxyAccount?.address || "Polkadex is completely free"}
                  locked
                  iconBackground="secondaryBackground"
                  iconColor="black"
                  isHoverable={false}
                />
              </S.FormWallet>
              <S.FormAddress>
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
                      {assets?.map((asset, idx) => (
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
              </S.FormAddress>

              <S.FormAmount>
                <SecondaryInput label="Amount" name="amount">
                  <span>PDEX</span>
                </SecondaryInput>
              </S.FormAmount>
              <S.Info>
                <Dropdown header="Fee: 0.00001 BTC">Testing</Dropdown>
                <p>
                  You will get <strong> 0.0006108506 BTC</strong>
                </p>
              </S.Info>
              <Button background="primary" size="extraLarge" color="white" isFull>
                Withdraw
              </Button>
              <S.Footer>
                <span>Minimum withdrawal: 0.002 BTC</span>
                <p>
                  Please make sure you insert the correct BTC address. Withdrawals processed to
                  an incorrect address are not reversible.
                </p>
              </S.Footer>
            </S.Form>
          </Form>
        )}
      </Formik>
    </S.Wrapper>
  );
};

export default Withdraw;
