import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useRef } from "react";

import { Rating } from "../Rating";

import * as S from "./styles";

import { Button } from "@polkadex/orderbook-ui/molecules";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";
import { FAQHeader } from "@polkadex/orderbook-ui/molecules/FAQHeader";
const Feedback = () => {
  const { onHandleAlert } = useSettingsProvider();
  const formik = useFormik({
    initialValues: {
      answer: true,
      answerValue: "",
      userFriendly: true,
      userFriendlyValue: "",
      stars: "best",
      value: "",
    },
    validationSchema: Yup.object({
      value: Yup.string().typeError("Input must be a string"),
      answerValue: Yup.string().typeError("Input must be a string"),
      userFriendlyValue: Yup.string().typeError("Input must be a string"),
    }),
    onSubmit: (values) => {
      onHandleAlert(JSON.stringify(values, null, 2));
    },
  });
  const disabled = !formik.dirty && formik.isValid;

  const router = useRouter();
  const handleStarClick = (selectedValue) => {
    formik.setFieldValue("stars", selectedValue);
  };
  const handleAnswer = (value) => {
    formik.setFieldValue("answer", value);
  };
  const handleUserFriendly = (value) => {
    formik.setFieldValue("userFriendly", value);
  };
  const answerRef = useRef<HTMLDivElement>(null);
  const userFriendlyRef = useRef<HTMLDivElement>(null);

  const answerHeight = !formik.values.answer ? answerRef.current?.scrollHeight : 0;
  const userFriendlyHeight = !formik.values.userFriendly
    ? userFriendlyRef.current?.scrollHeight
    : 0;

  return (
    <S.Container>
      <FAQHeader heading={"Give us your feedback"} pathname={router.pathname} />
      <form action="" onSubmit={formik.handleSubmit}>
        <S.BorderWrapper>
          <S.QuestionWrapper>
            <S.Question>Were we able to answer your question?</S.Question>
            <S.SwitchWrapper>
              <S.Switch onClick={() => handleAnswer(false)}>
                <S.SwitchHandle active={!formik.values.answer}></S.SwitchHandle>
                <S.SwitchText>No</S.SwitchText>
              </S.Switch>
              <S.Switch onClick={() => handleAnswer(true)}>
                <S.SwitchHandle active={formik.values.answer}></S.SwitchHandle>
                <S.SwitchText>Yes</S.SwitchText>
              </S.Switch>
            </S.SwitchWrapper>

            <S.Comment ref={answerRef} maxHeight={answerHeight}>
              <S.Question>
                Please state your query below and our support executive will get back to you
              </S.Question>
              <S.Input
                placeholder="Enter your comment"
                {...formik.getFieldProps("answerValue")}
              />
            </S.Comment>

            <S.Question>Was the FAQ Webpage user friendly?</S.Question>
            <S.SwitchWrapper>
              <S.Switch onClick={() => handleUserFriendly(false)}>
                <S.SwitchHandle active={!formik.values.userFriendly}></S.SwitchHandle>
                <S.SwitchText>No</S.SwitchText>
              </S.Switch>
              <S.Switch onClick={() => handleUserFriendly(true)}>
                <S.SwitchHandle active={formik.values.userFriendly}></S.SwitchHandle>
                <S.SwitchText>Yes</S.SwitchText>
              </S.Switch>
            </S.SwitchWrapper>

            <S.Comment ref={userFriendlyRef} maxHeight={userFriendlyHeight}>
              <S.Question>What would you want us to improve</S.Question>
              <S.Input
                placeholder="Enter your comment"
                {...formik.getFieldProps("userFriendlyValue")}
              />
            </S.Comment>

            <S.Question>How would you rate our service?</S.Question>

            <Rating value={formik.values.stars} onClick={handleStarClick} />
            <S.Question>Additional comments(Optional)</S.Question>
            <div>
              <S.Input placeholder="Enter your comment" {...formik.getFieldProps("value")} />
              {formik.touched.value && formik.errors.value ? (
                <S.InputError>{formik.errors.value}</S.InputError>
              ) : null}
            </div>
            <Button
              type="submit"
              size="extraLarge"
              background="primary"
              hoverColor="primary"
              color="white"
              disabled={!disabled}
              isFull>
              Submit a request
            </Button>
          </S.QuestionWrapper>
        </S.BorderWrapper>
      </form>
    </S.Container>
  );
};

export default Feedback;
