// ? Move component to Organism
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { useState } from "react";

import * as S from "./styles";

import { Button } from "src/ui/components";
import { MyCurrentAccountHeader } from "src/ui/organisms";
import { Input, Dropdown } from "src/ui/molecules";
import { selectAllUserList, signIn, UserSkeleton } from "src/modules";
import { useReduxSelector } from "src/hooks";

export const Login = () => {
  const dispatch = useDispatch();
  const userList: UserSkeleton[] = useReduxSelector(selectAllUserList);
  const defaultValues = {
    password: "",
    account: userList.length > 0 ? userList[0].address : "",
  };
  const [selectedAccount, setSelectedAccount] = useState<UserSkeleton>(userList[0]);
  console.log(userList);
  return (
    <S.Wrapper>
      <h4>Sign In</h4>
      {userList.length > 0 ? (
        <Formik
          initialValues={defaultValues}
          onSubmit={async (values) => {
            console.log("VALUES:", values);
            dispatch(signIn(values.account, values.password));
          }}>
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <Dropdown
                direction="bottomLeft"
                style={{ width: "100%", top: 0 }}
                title={
                  <MyCurrentAccountHeader
                    name={selectedAccount.username || "Account"}
                    address={selectedAccount.address}
                    isHeader
                  />
                }>
                <S.MyCurrentAccountContent>
                  {userList.length
                    ? userList.map((item, index) => (
                        <MyCurrentAccountHeader
                          isActive={item.address === selectedAccount.address}
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
                title="Sign In"
                type="submit"
                style={{ width: "100%", marginTop: 20, justifyContent: "center" }}
              />
            </Form>
          )}
        </Formik>
      ) : (
        <p style={{ textAlign: "center" }}>Install Polkadot.js</p>
      )}
    </S.Wrapper>
  );
};
