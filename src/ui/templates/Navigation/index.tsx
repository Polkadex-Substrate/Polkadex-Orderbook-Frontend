import * as S from "./styles";
import { LanguageCurrencyProps, LanguageNameProps, NavProps, Props } from "./types";

import { Logo, ThemeSwitch } from "src/ui";
import { Icon, Dropdown } from "@polkadex/orderbook-ui/molecules";

export const Navigation = ({ activateNotification }: Props) => (
  <S.Wrapper>
    <S.Header>
      <S.Container>
        <li>
          <Logo size="Medium" />
        </li>
      </S.Container>
      <S.Container>
        <li>
          <NavItem text="Exchange" active icon="Exchange" href="/" />
        </li>
        <li>
          <NavItem text="Swap" soon icon="Swap" href="/" />
        </li>
        <li>
          <NavItem text="P2P" soon icon="DoubleExchange" href="/" />
        </li>
      </S.Container>
      <S.Container>
        <li>
          <NavItem text="IDO Platform" soon icon="IDO" href="/" />
        </li>
      </S.Container>
      <S.Container>
        <li>
          <NavItem text="Support" soon icon="Help" href="/" />
        </li>
        <li>
          <NavItem text="Affiliates" soon icon="Help" href="/" />
        </li>
      </S.Container>
      <S.Container>
        <li>
          <ThemeSwitch />
        </li>
      </S.Container>
    </S.Header>
    <S.Footer>
      <S.FooterNotifications>
        <button type="button" onClick={activateNotification}>
          <Icon name="Notifications" background="transparent" />
        </button>
      </S.FooterNotifications>
      <S.FooterLanguage>
        <Dropdown direction="right" isOpacity header={<Icon name="Language" />}>
          <LanguageContent />
        </Dropdown>
      </S.FooterLanguage>
    </S.Footer>
  </S.Wrapper>
);

const NavItem = ({ active = false, soon = false, icon, text, ...props }: NavProps) => (
  <S.NavWrapper active={active} icon={icon} soon={soon} {...props}>
    <S.NavContainer>
      {soon && <span>Soon</span>}
      <Icon name={icon} isActive={active} />
    </S.NavContainer>
    <p>{text}</p>
  </S.NavWrapper>
);

const LanguageContent = () => (
  <S.LanguageWrapper>
    <S.LanguageContainer>
      <S.LanguageTitle>Language</S.LanguageTitle>
      <S.LanguageContent>
        <LanguageName title="English" flag="En" />
        <LanguageName title="Deutch" flag="De" />
        <LanguageName title="Francais" flag="Fr" />
        <LanguageName title="Spanish" flag="Es" />
        <LanguageName title="Portugues" flag="Pt" />
      </S.LanguageContent>
    </S.LanguageContainer>
    <S.LanguageContainer>
      <S.LanguageTitle>Currrency</S.LanguageTitle>
      <S.LanguageContent>
        <LanguageCurrency title="USD" />
        <LanguageCurrency title="EUR" />
        <LanguageCurrency title="BRL" />
        <LanguageCurrency title="AUD" />
      </S.LanguageContent>
    </S.LanguageContainer>
  </S.LanguageWrapper>
);

const LanguageCurrency = ({ title = "USD" }: LanguageCurrencyProps) => (
  <S.LanguageCurrencyWrapper> {title} </S.LanguageCurrencyWrapper>
);

const LanguageName = ({ title = "English", flag = "En" }: LanguageNameProps) => (
  <S.LanguageNameWrapper onClick={() => console.log("Change Language to", flag)}>
    <Icon name={flag} background="none" />
    <span> {title} </span>
  </S.LanguageNameWrapper>
);
