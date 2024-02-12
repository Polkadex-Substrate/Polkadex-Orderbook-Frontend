import { useRef } from "react";
import { useTranslation } from "next-i18next";
import { Button, Icon } from "@polkadex/orderbook-ui/molecules";

import * as S from "./styles";
import * as T from "./types";

export const FAQsidebar = ({ closeSidebar, show }: T.Props) => {
  const ref = useRef(null);

  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`faqSideBar.${key}`);

  return (
    <S.Container ref={ref} show={show}>
      <S.Heading>{t("stillHaveQuestions")}</S.Heading>
      <Button
        type="submit"
        size="extraLarge"
        background="primary"
        hoverColor="primaryHover"
        color="white"
        isFull
      >
        {t("submitRequest")}
      </Button>
      <S.SocialWrapper>
        <S.Social>
          <S.Icon>
            <Icon
              name="MediumFAQ"
              background="none"
              stroke="text"
              size="large"
            />
          </S.Icon>
          <p>{t("polkadexArticles")}</p>
        </S.Social>
        <S.Social>
          <S.Icon>
            <Icon
              name="TwitterFAQ"
              background="none"
              stroke="text"
              size="large"
            />
          </S.Icon>
          <p>{t("twitterNews")}</p>
        </S.Social>
        <S.Social>
          <S.Icon>
            <Icon
              name="YoutubeFAQ"
              background="none"
              stroke="text"
              size="large"
            />
          </S.Icon>
          <p>{t("videoTutorials")} </p>
        </S.Social>
        <S.Social>
          <S.Icon>
            <Icon
              name="OrderbookListingsFAQ"
              background="none"
              stroke="text"
              size="large"
            />
          </S.Icon>
          <p>{t("orderbookListings")}</p>
        </S.Social>
        <S.Social>
          <S.Icon>
            <Icon
              name="IssuesFAQ"
              background="none"
              stroke="text"
              size="large"
            />
          </S.Icon>
          <p>{t("reportIssues")} </p>
        </S.Social>
        <S.Social>
          <S.Icon>
            <Icon
              name="MessageFAQ"
              background="none"
              stroke="text"
              size="large"
            />
          </S.Icon>
          <p>{t("giveUsFeedback")}</p>
        </S.Social>
      </S.SocialWrapper>
      <S.Heading>{t("getInTouch")}</S.Heading>
      <S.OnlyIcons>
        <S.IconWrapper>
          <Icon
            name="TelegramFAQ"
            background="none"
            stroke="none"
            size="large"
          />
        </S.IconWrapper>
        <S.IconWrapper>
          <Icon name="Discord" background="none" stroke="none" size="large" />
        </S.IconWrapper>
        <S.IconWrapper>
          <Icon name="MailFAQ" background="none" stroke="none" size="large" />
        </S.IconWrapper>
      </S.OnlyIcons>

      <S.Community>
        <S.Heading>{t("communityHeading")}</S.Heading>
        <S.Description>
          {t("reachOutTo")}
          <S.Pink>{t("pinkText")}</S.Pink>
          {t("communityDescription")}
        </S.Description>
      </S.Community>
    </S.Container>
  );
};
