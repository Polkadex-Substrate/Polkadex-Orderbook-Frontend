import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

import * as S from "./styles";

import { Icons } from "@/ui/atoms";

export const MessageBanner = ({ link = "/transfer" }) => {
  const [state, setState] = useState(true);

  const onClose = () => {
    localStorage.setItem("USMessage", "true");
    setState(true);
  };
  function onCheckState() {
    const result = localStorage.getItem("USMessage");
    if (result !== "true") setState(false);
  }
  useEffect(() => {
    if (state) onCheckState();
  }, [state]);

  if (state) return <Fragment />;
  return (
    <S.Wrapper>
      <div />
      <S.Banner>
        <p>
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Excluded_Jurisdictions.pdf
Polkadex_Excluded_Jurisdictions.pdf"
            target="_blank"
            rel="noreferrer noopener"
          >
            Regulatory compliance
          </a>
          : Traders residing in the USA are requested not to use Polkadex
          Orderbook.{" "}
          <strong>
            This website will be geoblocked in the US by February 28th
          </strong>
        </p>
        <div>
          <Link href={link}>Transfer funds</Link>
        </div>
      </S.Banner>
      <button onClick={onClose}>
        <Icons.Close />
      </button>
    </S.Wrapper>
  );
};
