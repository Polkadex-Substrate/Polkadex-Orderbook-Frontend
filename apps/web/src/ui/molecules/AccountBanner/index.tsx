import Link from "next/link";
import { Icons } from "@polkadex/orderbook-ui/atoms";

import * as S from "./styles";

export type Props = {
  title: string;
  description: string;
  subDescription?: string;
  onClose?: () => void;
  closeButtonTitle?: string;
  linkText: string;
  link: string;
  iconClose?: keyof typeof Icons;
  heroImage?: string;
  heroAlt?: string;
};

export const AccountBanner = ({
  title,
  description,
  subDescription,
  onClose,
  closeButtonTitle,
  linkText,
  link,
  iconClose = "Close",
  heroImage,
  heroAlt,
}: Props) => {
  const IconClose = Icons[iconClose];
  return (
    <S.Wrapper>
      <S.Container>
        {heroImage && (
          <S.Column>
            <img src={`/img/${heroImage}`} alt={heroAlt} />
          </S.Column>
        )}
        <S.Content>
          <div>
            <h2>{title}</h2>
            <p>{description}</p>
            {!!subDescription && <p>{subDescription}</p>}
          </div>
          <div>
            {!!closeButtonTitle && (
              <button type="button" onClick={onClose}>
                {closeButtonTitle}
              </button>
            )}
            <Link href={link}>{linkText}</Link>
          </div>
        </S.Content>
      </S.Container>
      <S.Close type="button" onClick={onClose}>
        <IconClose />
      </S.Close>
    </S.Wrapper>
  );
};
