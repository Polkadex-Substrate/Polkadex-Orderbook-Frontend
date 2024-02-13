import Link from "next/link";

import * as S from "./styles";

export const MessageBanner = ({ link = "/transfer" }) => {
  return (
    <S.Banner>
      <p>
        <strong>Users residing in the US </strong>
        are requested not to use the Orderbook.{" "}
        <strong>
          It will be unavailable in the US within the next 7 days.{" "}
        </strong>
      </p>
      <Link href={link}>Transfer funds</Link>
    </S.Banner>
  );
};
