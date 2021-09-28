import { Formik, Form } from "formik";

import * as S from "./styles";

import { Button } from "src/ui/components";
import { MyCurrentAccountHeader } from "src/ui/organisms";
import { Input, Dropdown } from "src/ui/molecules";
import { useDispatch } from "react-redux";
import { selectAllUserList, signIn, UserSkeleton } from "src/modules";
import { useReduxSelector } from "src/hooks";
import { useState } from "react";


export const Login = () => {
  const dispatch = useDispatch()
  const userList: UserSkeleton[] = useReduxSelector(selectAllUserList);
  const defaultValues = {
    password: "",
    account: userList[0].address,
  };
  const [selectedAccount, setSelectedAccount] = useState<UserSkeleton>(userList[0])
  return (
    <S.Wrapper>
      <h4>Sign In</h4>
      {selectedAccount.username ? (
        <Formik
          initialValues={defaultValues}
          onSubmit={async (values) => {
            console.log("VALUES:", values);
            dispatch(signIn(values.account, values.password))
          }}>
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <Dropdown
                direction="bottomLeft"
                title={
                  <MyCurrentAccountHeader
                    name={selectedAccount.username}
                    address={selectedAccount.address}
                    isHeader
                  />
                }>
                <S.MyCurrentAccountContent>
                  {userList.length
                    ? userList.map((item, index) => (
                      <MyCurrentAccountHeader
                        key={index}
                        name={item.username}
                        address={item.address}
                        onClick={() => {
                          setFieldValue("account", item.address)
                          setSelectedAccount(userList.find(elem => elem.address === item.address))
                        }
                        }
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
