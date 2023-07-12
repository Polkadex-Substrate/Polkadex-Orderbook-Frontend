// TODO: Add types

import { useRef } from "react";
import ReactMarkdown from "react-markdown";

import * as S from "./styles";
import * as T from "./types";

import useClickOutside from "@polkadex/orderbook/hooks/useClickOutside";
import { getImgUrl } from "@polkadex/web-helpers";

export const FAQsidebar = ({ closeSidebar, pageQuickAccess, show }: T.Props) => {
  const ref = useRef(null);
  useClickOutside(ref, closeSidebar);

  const generikLinks = pageQuickAccess?.genericLink;
  const callToAction = pageQuickAccess?.callToAction;
  const socialLinks = pageQuickAccess?.socialCard;
  const communityCard = pageQuickAccess?.communityCard;

  return (
    <S.Container ref={ref} show={show}>
      <S.Heading>{pageQuickAccess?.title}</S.Heading>
      {callToAction?.title && (
        <S.CallToActionLink href={callToAction.link}>{callToAction.title}</S.CallToActionLink>
      )}

      <S.SocialWrapper>
        {generikLinks?.map((value, i) => {
          const icon = value?.icon?.data?.attributes?.url;
          const iconUrl = getImgUrl(icon);
          const link = `/faq/${value.link}`;

          return (
            <S.Social key={i} href={link}>
              {icon && (
                <div>
                  <img src={iconUrl} />
                </div>
              )}
              <p>{value.title}</p>
            </S.Social>
          );
        })}
      </S.SocialWrapper>
      <S.OnlyIcons>
        {socialLinks?.map((value, i) => {
          const icon = value?.icon?.data?.attributes?.url;
          const iconUrl = getImgUrl(icon);
          return (
            <S.IconWrapper key={i} href={value.link}>
              <img src={iconUrl} />
            </S.IconWrapper>
          );
        })}
      </S.OnlyIcons>
      {communityCard?.description && (
        <S.Community>
          <S.Heading>{communityCard.title}</S.Heading>
          <S.Description>
            <ReactMarkdown>{communityCard.description}</ReactMarkdown>
          </S.Description>
        </S.Community>
      )}
    </S.Container>
  );
};
