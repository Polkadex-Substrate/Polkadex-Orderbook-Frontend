import { KeyboardEvent, useMemo, useRef, useState } from "react";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { generateUsername } from "friendly-username-generator";
import { detect } from "detect-browser";
import { useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";

import { Switch } from "../Switcher";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import { importTradeAccountFetch } from "@polkadex/orderbook-modules";

const informationData = [
  {
    id: "mnemonic",
    title: "Mnemonic phrase",
  },
  {
    id: "json",
    title: "Json file",
  },
  {
    id: "ledger",
    title: "Ledger device",
  },
];
export const ImportAccountForm = ({ onCancel = undefined }) => {
  const [state, setState] = useState("");

  const SelectedComponent = useMemo(() => {
    switch (state) {
      case "mnemonic":
        return <ImportAccountMnemonic onCancel={onCancel} />;

      case "json":
        return <ImportAccountJson />;

      default:
        return <div />;
    }
  }, [state, onCancel]);
  return (
    <S.Wrapper>
      <S.Method>
        <span>Import wallet method</span>
        <div>
          {informationData.map(({ id, title }) => (
            <label key={id} htmlFor={id}>
              <input
                type="radio"
                id={id}
                name={id}
                value={id}
                checked={id === state}
                onChange={() => setState(id)}
                disabled={id === "ledger"}
              />
              {title}
            </label>
          ))}
        </div>
      </S.Method>
      {SelectedComponent}
    </S.Wrapper>
  );
};

const ImportAccountMnemonic = ({ onCancel = undefined }) => {
  const mnemonicInputRef = useRef(null);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: generateUsername(),
      hasPasscode: false,
      passcode: "",
      isPasscodeVisible: false,
      mnemonic: [],
    },
    onSubmit: ({ mnemonic, name, passcode }) => {
      dispatch(
        importTradeAccountFetch({
          mnemonic: mnemonic.join(" "),
          name: name,
          password: passcode,
        })
      );
    },
  });
  const {
    errors,
    values,
    setFieldValue,
    touched,
    handleSubmit,
    getFieldProps,
    isValid,
    dirty,
  } = formik;

  const { name } = detect();
  const isBrowserSupported = ["chrome", "opera", "edge", "safari"].indexOf(name) > 0;

  const IconComponent = Icons[values.isPasscodeVisible ? "Show" : "Hidden"];
  return (
    <form onSubmit={handleSubmit}>
      <S.Menmonic>
        <FormikProvider value={formik}>
          <FieldArray name="mnemonic">
            {({ remove, push }) => {
              const handleRemove = (i: number) => remove(i);
              const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
                const val: string[] = e.currentTarget.value
                  .split(" ")
                  .map((value) => value.trim())
                  .filter((e) => e);

                const shouldPush =
                  !!val.length &&
                  val.length <= 12 &&
                  val.length + values?.mnemonic?.length <= 12 &&
                  e.key === "Enter";

                if (shouldPush) {
                  e.preventDefault();
                  val.forEach((item) => push(item));
                  mnemonicInputRef.current.value = null;
                } else if (e.key === "Backspace" && e.currentTarget?.value?.length === 0) {
                  handleRemove(values?.mnemonic?.length - 1);
                }
              };
              const handleOnMouseOut = async () => {
                const phrase = await navigator.clipboard.readText();
                const val: string[] = phrase
                  .split(" ")
                  .map((value) => value.trim())
                  .filter((e) => e);

                if (
                  val.length &&
                  val.length <= 12 &&
                  val.length + values.mnemonic?.length <= 12
                ) {
                  setFieldValue("mnemonic", val);
                  mnemonicInputRef.current.value = null;
                }
              };
              return (
                <S.Words hasError={false}>
                  <S.WordsWrapper>
                    <div>
                      <Icons.Info />
                    </div>
                    <span>12-word mnemonic seed</span>
                  </S.WordsWrapper>
                  <S.WordsContainer>
                    {!!values?.mnemonic?.length &&
                      values.mnemonic.map((value, i) => (
                        <div key={i} onClick={() => remove(i)}>
                          {value}
                        </div>
                      ))}
                    <input
                      type="text"
                      placeholder="Enter your mnemonic"
                      ref={mnemonicInputRef}
                      onKeyDown={onInputKeyDown}
                    />
                  </S.WordsContainer>
                  {isBrowserSupported && (
                    <S.WorrdsFooter
                      type="button"
                      onClick={isBrowserSupported ? handleOnMouseOut : undefined}>
                      Click to paste
                    </S.WorrdsFooter>
                  )}
                </S.Words>
              );
            }}
          </FieldArray>
        </FormikProvider>
        <S.WalletName>
          <S.WalletNameWrapper>
            <div>
              <span>Wallet Name</span>
              <input
                {...getFieldProps("name")}
                type="text"
                placeholder="Enter a wallet name"
              />
            </div>
            <button
              type="button"
              onClick={() =>
                setFieldValue("name", generateUsername({ useRandomNumber: false }))
              }>
              Random
            </button>
          </S.WalletNameWrapper>
          <S.WalletError isNegative={values.name.length >= 31}>
            {errors.name && touched.name && errors.name ? <p>{errors.name}</p> : <div />}
            <small>
              <strong>{values.name.length}</strong>/30
            </small>
          </S.WalletError>
        </S.WalletName>
        <S.Password>
          <S.PasswordWrapper>
            <S.PasswordHeader>
              <span>Protect by password</span>
              <Switch
                isActive={values.hasPasscode}
                onChange={() => {
                  setFieldValue("hasPasscode", !values.hasPasscode);
                  setFieldValue("passcode", "");
                }}
              />
            </S.PasswordHeader>
            {values.hasPasscode && (
              <S.PasswordFooter>
                <input
                  {...getFieldProps("passcode")}
                  type={values.isPasscodeVisible ? "password" : "text"}
                  placeholder="(Optional) Enter a password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFieldValue("isPasscodeVisible", !values.isPasscodeVisible)
                  }>
                  <IconComponent />
                </button>
              </S.PasswordFooter>
            )}
          </S.PasswordWrapper>
          <S.Error> {errors.passcode && touched.passcode && errors.passcode}</S.Error>
        </S.Password>
        <S.Footer>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" disabled={!(isValid && dirty)}>
            Import account
          </button>
        </S.Footer>
      </S.Menmonic>
    </form>
  );
};

const ImportAccountJson = ({ onCancel = undefined }) => {
  const formik = useFormik({
    initialValues: {
      name: generateUsername(),
      hasPasscode: false,
      passcode: "",
      isPasscodeVisible: false,
      file: null,
    },
    onSubmit: () => {
      console.log(values);
      // dispatch(
      //   importTradeAccountFetch({
      //     mnemonic: mnemonic.join(" "),
      //     name: name,
      //     password: passcode,
      //   })
      // );
    },
  });
  const { getRootProps, getInputProps, isDragReject, isDragAccept } = useDropzone({
    maxFiles: 1,
    accept: {
      "application/json": [".json"],
      "application/ld+json": [".jsonld"],
    },
    onDrop: (acceptedFiles) => setFieldValue("file", acceptedFiles[0]),
  });
  const {
    errors,
    values,
    setFieldValue,
    touched,
    handleSubmit,
    getFieldProps,
    isValid,
    dirty,
  } = formik;

  const IconComponent = Icons[values.isPasscodeVisible ? "Show" : "Hidden"];

  console.log(values.file);
  return (
    <form onSubmit={handleSubmit}>
      <S.Menmonic>
        {!values?.file?.name?.length && (
          <S.Upload
            isDragReject={isDragReject}
            isDragAccept={isDragAccept}
            {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <div>
              <Icons.Upload />
            </div>
            <p>Select a Json file to upload</p>
            <span>or drag and drop it here</span>
            {isDragReject && <small>Invalid</small>}
          </S.Upload>
        )}

        {!!values?.file?.name?.length && (
          <S.File>
            <div>
              <p>
                {values.file.name.slice(0, 20) +
                  values.file.name.slice(values.file.name.length - 5)}
              </p>
              <span>{values.file.size}</span>
            </div>
            <button type="button" onClick={() => setFieldValue("file", null)}>
              <Icons.Trash />
            </button>
          </S.File>
        )}
        <S.WalletName>
          <S.WalletNameWrapper>
            <div>
              <span>Wallet Name</span>
              <input
                {...getFieldProps("name")}
                type="text"
                placeholder="Enter a wallet name"
              />
            </div>
            <button
              type="button"
              onClick={() =>
                setFieldValue("name", generateUsername({ useRandomNumber: false }))
              }>
              Random
            </button>
          </S.WalletNameWrapper>
          <S.WalletError isNegative={values.name.length >= 31}>
            {errors.name && touched.name && errors.name ? <p>{errors.name}</p> : <div />}
            <small>
              <strong>{values.name.length}</strong>/30
            </small>
          </S.WalletError>
        </S.WalletName>
        <S.Password>
          <S.PasswordWrapper>
            <S.PasswordHeader>
              <span>Protect by password</span>
              <Switch
                isActive={values.hasPasscode}
                onChange={() => {
                  setFieldValue("hasPasscode", !values.hasPasscode);
                  setFieldValue("passcode", "");
                }}
              />
            </S.PasswordHeader>
            {values.hasPasscode && (
              <S.PasswordFooter>
                <input
                  {...getFieldProps("passcode")}
                  type={values.isPasscodeVisible ? "password" : "text"}
                  placeholder="(Optional) Enter a password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFieldValue("isPasscodeVisible", !values.isPasscodeVisible)
                  }>
                  <IconComponent />
                </button>
              </S.PasswordFooter>
            )}
          </S.PasswordWrapper>
          <S.Error> {errors.passcode && touched.passcode && errors.passcode}</S.Error>
        </S.Password>
        <S.Footer>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" disabled={!(isValid && dirty)}>
            Import account
          </button>
        </S.Footer>
      </S.Menmonic>
    </form>
  );
};
