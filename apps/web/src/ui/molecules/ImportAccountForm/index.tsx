import { KeyboardEvent, useMemo, useRef, useState } from "react";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { generateUsername } from "friendly-username-generator";
import { detect } from "detect-browser";
import { useDropzone } from "react-dropzone";
import { intlFormat } from "date-fns";
import { useTranslation } from "react-i18next";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { importAccountJsonValidations } from "@orderbook/core/validations";
import { useTradeWallet } from "@orderbook/core/providers/user/tradeWallet";

import { Switch } from "../Switcher";

import * as S from "./styles";

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
export const ImportAccountForm = ({
  onCancel = undefined,
  defaultImportJson = false,
}) => {
  const [state, setState] = useState(defaultImportJson ? "json" : "");

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

  const { t: translation } = useTranslation("molecules");
  const t = (key: string) => translation(`importAccountForm.${key}`);

  return (
    <S.Wrapper>
      <S.Method>
        <span>{t("title")}</span>
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
  const { onImportTradeAccount } = useTradeWallet();
  const mnemonicInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: generateUsername(),
      hasPasscode: false,
      passcode: "",
      isPasscodeVisible: false,
      mnemonic: [],
    },
    onSubmit: ({ mnemonic, name, passcode }) => {
      onImportTradeAccount({
        mnemonic: mnemonic.join(" "),
        name: name,
        password: passcode,
      });
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
  const isBrowserSupported =
    ["chrome", "opera", "edge", "safari"].indexOf(name) > 0;

  const IconComponent = Icons[values.isPasscodeVisible ? "Show" : "Hidden"];

  const { t: translation } = useTranslation("molecules");
  const t = (key: string) =>
    translation(`importAccountForm.importAccountMnemonic.${key}`);

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
                } else if (
                  e.key === "Backspace" &&
                  e.currentTarget?.value?.length === 0
                ) {
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
                    <span>{t("title")}</span>
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
                      placeholder={t("placeHolder")}
                      ref={mnemonicInputRef}
                      onKeyDown={onInputKeyDown}
                    />
                  </S.WordsContainer>
                  {isBrowserSupported && (
                    <S.WorrdsFooter
                      type="button"
                      onClick={
                        isBrowserSupported ? handleOnMouseOut : undefined
                      }
                    >
                      {t("clickToPaste")}
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
              <span>{t("walletTitle")}</span>
              <input
                {...getFieldProps("name")}
                type="text"
                placeholder={t("walletPlaceHolder")}
              />
            </div>
            <button
              type="button"
              onClick={() =>
                setFieldValue(
                  "name",
                  generateUsername({ useRandomNumber: false }),
                )
              }
            >
              {t("random")}
            </button>
          </S.WalletNameWrapper>
          <S.WalletError isNegative={values.name.length >= 31}>
            {errors.name && touched.name && errors.name ? (
              <p>{errors.name}</p>
            ) : (
              <div />
            )}
            <small>
              <strong>{values.name.length}</strong>/30
            </small>
          </S.WalletError>
        </S.WalletName>
        <S.Password>
          <S.PasswordWrapper>
            <S.PasswordHeader>
              <span>{t("protectByPassword")}</span>
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
                  type={values.isPasscodeVisible ? "text" : "password"}
                  placeholder={t("passwordPlaceholder")}
                />
                <button
                  type="button"
                  onClick={() =>
                    setFieldValue(
                      "isPasscodeVisible",
                      !values.isPasscodeVisible,
                    )
                  }
                >
                  <IconComponent />
                </button>
              </S.PasswordFooter>
            )}
          </S.PasswordWrapper>
          <S.Error>
            {" "}
            {errors.passcode && touched.passcode && errors.passcode}
          </S.Error>
        </S.Password>
        <S.Footer>
          <button type="button" onClick={onCancel}>
            {t("cancel")}
          </button>
          <button type="submit" disabled={!(isValid && dirty)}>
            {t("importAccount")}
          </button>
        </S.Footer>
      </S.Menmonic>
    </form>
  );
};

const ImportAccountJson = ({ onCancel = undefined }) => {
  const { t: translation } = useTranslation("molecules");
  const t = (key: string) =>
    translation(`importAccountForm.importAccountJSON.${key}`);

  const { onImportTradeAccountJson } = useTradeWallet();
  const formik = useFormik({
    initialValues: {
      hasPasscode: false,
      passcode: "",
      isPasscodeVisible: false,
      file: null,
    },
    validationSchema: importAccountJsonValidations,
    onSubmit: ({ passcode, file }) => {
      onImportTradeAccountJson({
        file,
        password: passcode,
      });
    },
  });
  const { getRootProps, getInputProps, isDragReject, isDragAccept } =
    useDropzone({
      maxFiles: 1,
      accept: { "application/json": [".json"] },
      onDrop: (acceptedFiles) => {
        const blob = new Blob([acceptedFiles[0]], {
          type: "text/plain;charset=utf-8",
        });
        const reader = new FileReader();
        reader.readAsText(blob);
        reader.onload = () => {
          if (reader.result) {
            const decodedFile = JSON.parse(String(reader.result));
            setFieldValue(
              "file",
              decodedFile?.address?.length ? decodedFile : "",
            );
          }
        };
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

  const IconComponent = Icons[values.isPasscodeVisible ? "Show" : "Hidden"];

  const hasDataFile = useMemo(
    () => !!values.file?.address?.length,
    [values.file?.address?.length],
  );
  return (
    <form onSubmit={handleSubmit}>
      <S.Menmonic>
        {!hasDataFile && (
          <S.Upload
            isDragReject={isDragReject}
            isDragAccept={isDragAccept}
            {...getRootProps({ className: "dropzone" })}
          >
            <input {...getInputProps()} />
            <div>
              <Icons.Upload />
            </div>
            <p>{t("title")}</p>
            <span>{t("draganddrop")}</span>
            {isDragReject && <small>{t("invalid")}</small>}
          </S.Upload>
        )}
        {hasDataFile && (
          <S.File>
            <div>
              <p>{values.file?.meta.name}</p>
              <span>
                Created on{" "}
                {intlFormat(
                  new Date(values.file?.meta?.whenCreated),
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  },
                  { locale: "EN" },
                )}
              </span>
            </div>
            <button type="button" onClick={() => setFieldValue("file", null)}>
              <Icons.Trash />
            </button>
          </S.File>
        )}
        <S.Password>
          <S.PasswordWrapper>
            <S.PasswordHeader>
              <span>{t("protectedByPassword")}</span>
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
                  type={values.isPasscodeVisible ? "text" : "password"}
                  placeholder={t("passwordPlaceholder")}
                />
                <button
                  type="button"
                  onClick={() =>
                    setFieldValue(
                      "isPasscodeVisible",
                      !values.isPasscodeVisible,
                    )
                  }
                >
                  <IconComponent />
                </button>
              </S.PasswordFooter>
            )}
          </S.PasswordWrapper>
          <S.Error>
            {" "}
            {errors.passcode && touched.passcode && errors.passcode}
          </S.Error>
        </S.Password>
        <S.Footer>
          <button type="button" onClick={onCancel}>
            {t("cancel")}
          </button>
          <button type="submit" disabled={!(isValid && dirty)}>
            {t("importAccount")}
          </button>
        </S.Footer>
      </S.Menmonic>
    </form>
  );
};
