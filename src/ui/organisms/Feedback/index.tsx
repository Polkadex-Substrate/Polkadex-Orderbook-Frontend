import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Rating } from "../Rating";

import * as S from "./styles";

import { SwitchFAQ } from "@polkadex/orderbook-ui/molecules";
const Feedback = () => {
  const [answer, setAnswer] = useState(false);
  const [relevantInformation, setRelevantInformation] = useState(false);
  const [userFriendly, setUserFriendly] = useState(false);
  const [stars, setStars] = useState(0);
  const handleRating = (index) => {
    setStars(index + 1);
  };
  const formik = useFormik({
    initialValues: {
      value: "",
    },
    validationSchema: Yup.object({
      value: Yup.string().typeError("Input must be a string").required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  console.log(formik.errors, "errors");

  return (
    <S.Container>
      <S.Header>
        <S.BreadCrumbWrapper>
          Home/<S.LastCrumb>Feedbackform</S.LastCrumb>
        </S.BreadCrumbWrapper>
        <S.Heading>Give us your feedback</S.Heading>
      </S.Header>
      <S.QuestionWrapper>
        <S.Question>Were we able to answer your question?</S.Question>

        <SwitchFAQ checked={answer} setChecked={() => setAnswer(!answer)} />
        <S.Question>Did you find the relevant information you were looking for?</S.Question>
        <SwitchFAQ
          checked={relevantInformation}
          setChecked={() => setRelevantInformation(!relevantInformation)}
        />
        <S.Question>Was the FAQ Webpage user friendly?</S.Question>
        <SwitchFAQ checked={userFriendly} setChecked={() => setUserFriendly(!userFriendly)} />
        <S.Question>Is there anything you would want us to improve?</S.Question>
        <div>
          <S.Input placeholder="Enter your comment" {...formik.getFieldProps("value")} />
          {formik.touched.value && formik.errors.value ? (
            <S.InputError>{formik.errors.value}</S.InputError>
          ) : null}
        </div>

        <S.Question>How would you rate our service?</S.Question>
        <Rating value={stars} setValue={handleRating} />
        <S.Button>Submit a request</S.Button>
      </S.QuestionWrapper>
    </S.Container>
  );
};

export default Feedback;
