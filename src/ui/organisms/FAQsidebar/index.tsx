import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";

export const FAQsidebar = () => {
  return (
    <S.Container>
      <S.Heading>Still have questions?</S.Heading>
      <S.Button>Submit a request</S.Button>
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
      <S.SocialWrapper>
        <S.Social>
          <S.Icon>
            <Icon name="TelegramFAQ" background="none" stroke="text" size="large" />
          </S.Icon>
          <p>Telegram chat</p>
        </S.Social>
        <S.Social>
          <div>
            <Icon name="DiscordFAQ" background="none" stroke="text" size="large" />
          </div>
          <p>Join our discord</p>
        </S.Social>
        <S.Social>
          <S.Icon>
            <Icon name="MailFAQ" background="none" stroke="text" size="large" />
          </S.Icon>
          <p>Email us</p>
        </S.Social>
      </S.SocialWrapper>
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
