// TODO: Move mnemonic state to Formik
import { Formik, Form } from "formik";
import { useState } from "react";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { generateUsername } from "friendly-username-generator";
import { HeaderBack } from "@polkadex/orderbook-ui/organisms";
import {
  Button,
  Icon,
  InputPrimary,
  MnemonicImport,
} from "@polkadex/orderbook-ui/molecules";
import { importValiations } from "@orderbook/core/validations";
import { useWalletProvider } from "@orderbook/core/providers/user/walletProvider";

import * as S from "./styles";

const defaultValues = {
  accountName: generateUsername({ useRandomNumber: false }),
};

export const RecoveryTemplate = () => {
  const [state, setState] = useState<{ tags: string[] }>({ tags: [] });
  const { onImportFromMnemonic } = useWalletProvider();

  const { t } = useTranslation("recovery");

  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content="Feels like a CEX, works like a DEX" />
      </Head>
      <S.Main>
        <S.Wrapper>
          <S.Content>
            <HeaderBack />
            <S.Container>
              <S.AsideLeft>
                <S.Title>
                  <h1>{t("heading")}</h1>
                  <p>{t("description")}</p>
                </S.Title>
                <S.Form>
                  <Formik
                    initialValues={defaultValues}
                    validationSchema={importValiations}
                    onSubmit={async (values) => {
                      if (state.tags.length === 12) {
                        const { accountName } = values;
                        const mnemonicString = state.tags.join(" ");
                        typeof onImportFromMnemonic === "function" &&
                          onImportFromMnemonic({
                            mnemonic: mnemonicString,
                            name: accountName,
                            password: "",
                          });
                      }
                    }}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <MnemonicImport
                          label="12-word mnemonic seed"
                          state={state}
                          handleChange={setState}
                        />
                        <InputPrimary
                          label={t("inputLabel")}
                          placeholder={t("inputPlaceholder")}
                          type="accountName"
                          name="accountName"
                          error={touched.accountName ? errors.accountName : ""}
                        />
                        <Button
                          size="extraLarge"
                          type="submit"
                          disabled={state.tags.length < 12}
                          style={{ marginTop: 20 }}
                        >
                          {t("importAccount")}
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </S.Form>
              </S.AsideLeft>
              <S.AsideRight></S.AsideRight>
            </S.Container>
          </S.Content>
          <S.Box>
            <S.Card>
              <S.CardContent>
                <Icon size="extraLarge" color="inverse" name="Mnemonic" />
                <h4>{t("card.heading")}</h4>
                <p>
                  {t("card.description")}
                  <strong>{t("card.strongText")}</strong>
                </p>
              </S.CardContent>
            </S.Card>
          </S.Box>
        </S.Wrapper>
      </S.Main>
    </>
  );
};
