import * as S from "./styles";

import { Accordion } from "@polkadex/orderbook-ui/molecules/Accordian";

export const FAQquestionBar = ({ show }) => {
  const data = [
    {
      category: "Getting started",
      questions: [
        "How to register on Polkadex website",
        "How to register an account on Polkadex app",
        "How to find my user ID on Polkadex.trade",
        "How to verify my account",
        "How to disable my Polkadex account",
        "What is Biometric Authentication and how to set it up",
        "How to reset your Polkadex account password",
        "Why is email registration necessary",
      ],
    },
    {
      category: "Accounts",
      questions: [
        "How to register on Polkadex website",
        "How to register an account on Polkadex app",
        "How to find my user ID on Polkadex.trade",
        "How to verify my account",
        "How to disable my Polkadex account",
        "What is Biometric Authentication and how to set it up",
        "How to reset your Polkadex account password",
        "Why is email registration necessary",
      ],
    },
    {
      category: "Wallets",
      questions: [
        "How to register on Polkadex website",
        "How to register an account on Polkadex app",
        "How to find my user ID on Polkadex.trade",
        "How to verify my account",
        "How to disable my Polkadex account",
        "What is Biometric Authentication and how to set it up",
        "How to reset your Polkadex account password",
        "Why is email registration necessary",
      ],
    },
    {
      category: "Deposits/withdraw",
      questions: [
        "How to register on Polkadex website",
        "How to register an account on Polkadex app",
        "How to find my user ID on Polkadex.trade",
        "How to verify my account",
        "How to disable my Polkadex account",
        "What is Biometric Authentication and how to set it up",
        "How to reset your Polkadex account password",
        "Why is email registration necessary",
      ],
    },
  ];
  return (
    <S.Container show={show}>
      {data.map((item) => {
        return (
          <Accordion
            key={item.category}
            title={item.category}
            questions={item.questions}></Accordion>
        );
      })}
    </S.Container>
  );
};
