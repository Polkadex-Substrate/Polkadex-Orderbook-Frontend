import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

import { Rating } from "../Rating";

import * as S from "./styles";

import { Button, SwitchFAQ } from "@polkadex/orderbook-ui/molecules";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";
import { FAQHeader } from "@polkadex/orderbook-ui/molecules/FAQHeader";
const Feedback = () => {
  const [stars, setStars] = useState(0);
  const { onHandleAlert } = useSettingsProvider();
  const handleRating = (index) => {
    setStars(index + 1);
  };
  const formik = useFormik({
    initialValues: {
      value: "",
      answer: false,
      relevantInformation: false,
      userFriendly: false,
    },
    validationSchema: Yup.object({
      value: Yup.string().typeError("Input must be a string").required("Required"),
    }),
    onSubmit: (values) => {
      onHandleAlert(JSON.stringify(values, null, 2));
    },
  });
  const disabled = !(formik.dirty && formik.isValid);
  const router = useRouter();
  console.log(formik.getFieldProps("answer"), "check");

  return (
    <S.Container>
      <FAQHeader heading={"Give us your feedback"} pathname={router.pathname} />
      <form action="" onSubmit={formik.handleSubmit}>
        <S.BorderWrapper>
          <S.QuestionWrapper>
            <S.Question>Were we able to answer your question?</S.Question>

            <SwitchFAQ
              id="answer"
              name="answer"
              checked={formik.values.answer}
              setChecked={formik.handleChange}
            />
            <S.Question>
              Did you find the relevant information you were looking for?
            </S.Question>
            <SwitchFAQ
              id="relevantInformation"
              name="relevantInformation"
              checked={formik.values.relevantInformation}
              setChecked={formik.handleChange}
            />
            <S.Question>Was the FAQ Webpage user friendly?</S.Question>
            <SwitchFAQ
              id="userFriendly"
              name="userFriendly"
              checked={formik.values.userFriendly}
              setChecked={formik.handleChange}
            />
            <S.Question>Is there anything you would want us to improve?</S.Question>
            <div>
              <S.Input placeholder="Enter your comment" {...formik.getFieldProps("value")} />
              {formik.touched.value && formik.errors.value ? (
                <S.InputError>{formik.errors.value}</S.InputError>
              ) : null}
            </div>

            <S.Question>How would you rate our service?</S.Question>
            <Rating value={stars} setValue={handleRating} />
            <Button
              type="submit"
              size="extraLarge"
              background="primary"
              hoverColor="primary"
              color="white"
              disabled={disabled}
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
