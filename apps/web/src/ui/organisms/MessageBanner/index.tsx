import Link from "next/link";

import * as S from "./styles";

export const MessageBanner = ({ link = "/transfer" }) => {
  return (
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
  );
};
