import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import * as S from "./styles";

import { Input, Dropdown, MyCurrentAccountHeader, Button } from "src/ui";
import { selectAllUserList, signIn, UserSkeleton } from "src/modules";
import { useReduxSelector } from "src/hooks";
import { useKeyringInitalize } from "src/hooks/useKeyringInitalize";
import { polkadotWalletFetch } from "src/modules/user/polkadotWallet";

export const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useKeyringInitalize();

  const userList: UserSkeleton[] = useReduxSelector(selectAllUserList);
  const defaultValues = {
    password: "",
    account: "",
  };
  const [selectedAccount, setSelectedAccount] = useState<UserSkeleton>(userList[0]);
  console.log(userList);

  useEffect(() => {
    dispatch(polkadotWalletFetch());
  }, []);

  useEffect(() => {
    if (!selectedAccount) setSelectedAccount(userList[0]);
  }, [userList]);

  return (
    <S.Wrapper>
      <h4>Unlock trading account</h4>
      {userList.length > 0 && !loading ? (
        <Formik
          initialValues={defaultValues}
          onSubmit={async (values) => {
            dispatch(signIn(values.account, values.password));
            //! Verify Why fetch polkadoWalletAgain?
            // dispatch(polkadotWalletFetch());
          }}>
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <Dropdown
                direction="bottomLeft"
                style={{ width: "100%", top: 0 }}
                title={
                  <MyCurrentAccountHeader
                    name={selectedAccount?.username || "Account"}
                    address={selectedAccount?.address}
                    isHeader
                  />
                }>
                <S.MyCurrentAccountContent>
                  {userList.length
                    ? userList.map((item, index) => (
                        <MyCurrentAccountHeader
                          isActive={item.address === selectedAccount?.address}
                          key={index}
                          name={item.username || `Account ${index}`}
                          address={item.address}
                          onClick={() => {
                            setFieldValue("account", item.address);
                            setSelectedAccount(
                              userList.find((elem) => elem.address === item.address)
                            );
                          }}
                        />
                      ))
                    : "Empty"}
                </S.MyCurrentAccountContent>
              </Dropdown>

              <Input
                label="Password"
                placeholder="Enter a new password fot this account"
                type="password"
                name="password"
                // error={errors.password && touched.password && errors.password}
              />
              <Button
                title="Unlock Wallet"
                type="submit"
                style={{ width: "100%", marginTop: 20, justifyContent: "center" }}
              />
            </Form>
          )}
        </Formik>
      ) : (
        <p style={{ textAlign: "center" }}>Create a trading account</p>
      )}
    </S.Wrapper>
  );
};
