import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import { Rating } from "../Rating";

import * as S from "./styles";

import { Button, SwitchFAQ } from "@polkadex/orderbook-ui/molecules";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";
import { FAQHeader } from "@polkadex/orderbook-ui/molecules/FAQHeader";
const Feedback = () => {
  const { onHandleAlert } = useSettingsProvider();

  const formik = useFormik({
    initialValues: {
      value: "",
      answer: false,
      relevantInformation: false,
      userFriendly: false,
      stars: 0,
    },
    validationSchema: Yup.object({
      value: Yup.string().typeError("Input must be a string"),
    }),
    onSubmit: (values) => {
      onHandleAlert(JSON.stringify(values, null, 2));
    },
  });
  const disabled = !(formik.dirty && formik.isValid);
  const router = useRouter();
  const handleStarClick = (selectedValue) => {
    formik.setFieldValue("stars", selectedValue);
  };

  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`feedback.${key}`);

  return (
    <S.Container>
      <FAQHeader heading="Give us your feedback" pathname={router.pathname} />
      <form action="" onSubmit={formik.handleSubmit}>
        <S.BorderWrapper>
          <S.QuestionWrapper>
            <S.Question>{t("firstQuestion")}</S.Question>

            <SwitchFAQ
              id="answer"
              name="answer"
              checked={formik.values.answer}
              setChecked={formik.handleChange}
            />
            <S.Question>{t("secondQuestion")}</S.Question>
            <SwitchFAQ
              id="relevantInformation"
              name="relevantInformation"
              checked={formik.values.relevantInformation}
              setChecked={formik.handleChange}
            />
            <S.Question>{t("thirdQuestion")}</S.Question>
            <SwitchFAQ
              id="userFriendly"
              name="userFriendly"
              checked={formik.values.userFriendly}
              setChecked={formik.handleChange}
            />
            <S.Question>{t("fourthQuestion")}</S.Question>
            <div>
              <S.Input
                placeholder={t("inputPlaceholder")}
                {...formik.getFieldProps("value")}
              />
              {formik.touched.value && formik.errors.value ? (
                <S.InputError>{formik.errors.value}</S.InputError>
              ) : null}
            </div>

            <S.Question>{t("fifthQuestion")}</S.Question>

            <Rating value={formik.values.stars} onClick={handleStarClick} />
            <Button
              type="submit"
              size="extraLarge"
              background="primary"
              hoverColor="primary"
              color="white"
              disabled={disabled}
              isFull>
              {t("submitRequest")}
            </Button>
          </S.QuestionWrapper>
        </S.BorderWrapper>
      </form>
    </S.Container>
  );
};

export default Feedback;
