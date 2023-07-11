import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";
export const GettingStartedComponent = () => {
  const questions = [
    "How to register on Polkadex website?",
    "How to find my user ID on Polkadex.trade?",
    "How to register an account on Polkadex app?",
    "How to verify my account?",
    "How to disable my Polkadex account?",
    "What is Biometric Authentication and how to set it up?",
    "How to reset your Polkadex account password?",
    "Why is email registration necessary?",
  ];
  const router = useRouter();
  const FAQHeader = dynamic(
    () => import("@polkadex/orderbook-ui/molecules").then((mod) => mod.FAQHeader),
    {
      ssr: false,
    }
  );
  return (
    <S.Container>
      <FAQHeader pathname={router.pathname} heading={"Getting started"} />
      <S.QuestionWrapper>
        {questions.map((item) => {
          return (
            <S.Question key={item}>
              <p>{item}</p>
              <Icon name="ArrowRightFilled" background="none" size="medium" />
            </S.Question>
          );
        })}
      </S.QuestionWrapper>
    </S.Container>
  );
};
