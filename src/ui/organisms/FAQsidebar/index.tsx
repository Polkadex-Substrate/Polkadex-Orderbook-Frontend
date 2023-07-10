import { useRef } from "react";

import * as S from "./styles";
import * as T from "./types";

import { Button, Icon } from "@polkadex/orderbook-ui/molecules";
import useClickOutside from "@polkadex/orderbook/hooks/useClickOutside";

export const FAQsidebar = ({ closeSidebar, show }: T.Props) => {
  const ref = useRef(null);
  useClickOutside(ref, closeSidebar);

  return (
    <S.Container ref={ref} show={show}>
      <S.Heading>Still have questions?</S.Heading>
      <Button
        type="submit"
        size="extraLarge"
        background="primary"
        hoverColor="primaryHover"
        color="white"
        isFull>
        Submit a request
      </Button>
      <S.SocialWrapper>
        <S.Social>
          <S.Icon>
            <Icon name="MediumFAQ" background="none" stroke="text" size="large" />
          </S.Icon>
          <p>Polkadex articles</p>
        </S.Social>
        <S.Social>
          <S.Icon>
            <Icon name="TwitterFAQ" background="none" stroke="text" size="large" />
          </S.Icon>
          <p>Twitter news</p>
        </S.Social>
        <S.Social>
          <S.Icon>
            <Icon name="YoutubeFAQ" background="none" stroke="text" size="large" />
          </S.Icon>
          <p>Video tutorials </p>
        </S.Social>
        <S.Social>
          <S.Icon>
            <Icon name="OrderbookListingsFAQ" background="none" stroke="text" size="large" />
          </S.Icon>
          <p>Orderbook listings</p>
        </S.Social>
        <S.Social>
          <S.Icon>
            <Icon name="IssuesFAQ" background="none" stroke="text" size="large" />
          </S.Icon>
          <p>Report issues </p>
        </S.Social>
        <S.Social>
          <S.Icon>
            <Icon name="MessageFAQ" background="none" stroke="text" size="large" />
          </S.Icon>
          <p>Give us your feedback</p>
        </S.Social>
      </S.SocialWrapper>
      <S.Heading>Get in touch</S.Heading>
      <S.OnlyIcons>
        <S.IconWrapper>
          <Icon name="TelegramFAQ" background="none" stroke="none" size="large" />
        </S.IconWrapper>
        <S.IconWrapper>
          <Icon name="Discord" background="none" stroke="none" size="large" />
        </S.IconWrapper>
        <S.IconWrapper>
          <Icon name="MailFAQ" background="none" stroke="none" size="large" />
        </S.IconWrapper>
      </S.OnlyIcons>

      <S.Community>
        <S.Heading>Community question?</S.Heading>
        <S.Description>
          Reach out to <S.Pink>#Polkadex Orderbook Queries channel on Discord </S.Pink> and
          someone from thee community would definitely try to answer your query as and when
          they see the message.
        </S.Description>
      </S.Community>
    </S.Container>
  );
};
