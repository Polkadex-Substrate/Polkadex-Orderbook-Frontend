import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import * as S from "./styles";

import { Icon } from "@polkadex/orderbook-ui/molecules";
import { useAppearance } from "@polkadex/orderbook/hooks";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";

export const Menu = () => {
  const router = useRouter();

  const profileState = useProfile();
  const { isDarkTheme, changeTheme } = useAppearance();

  const {
    authInfo: { isAuthenticated },
  } = profileState;

  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`menu.${key}`);

  return (
    <S.Wrapper>
      <S.WrapperLinks>
        <S.WrapperIcon>
          {router.pathname === "/trading/[id]" && <S.LineBorder />}
          <Link href="/trading">
            <div>
              <Icon name="Exchange" background="none" stroke="text" size="large" />
            </div>
            <S.Span>{t("exchange")}</S.Span>
          </Link>
        </S.WrapperIcon>
        <S.WrapperIcon isDisabled={!isAuthenticated}>
          {router.pathname === "/balances" && <S.LineBorder />}
          <Link href="/balances">
            <div>
              <Icon name="Coins" background="none" stroke="text" size="large" />
            </div>
            <S.Span>{t("balances")}</S.Span>
          </Link>
        </S.WrapperIcon>
        <S.WrapperIcon isDisabled={!isAuthenticated}>
          {router.pathname === "/settings" && <S.LineBorder />}
          <Link href="/settings">
            <div>
              <Icon name="Wallet" background="none" stroke="text" size="large" />
            </div>
            <S.Span>{t("accounts")}</S.Span>
          </Link>
        </S.WrapperIcon>
        <Terms />
        <Help />
      </S.WrapperLinks>
      <S.BottomContainer>
        <S.WrapperIcon onClick={changeTheme} as="button">
          <Icon
            name={isDarkTheme ? "Sun" : "Moon"}
            background="secondaryBackground"
            size="large"
          />
          <S.Span>{isDarkTheme ? t("light") : t("dark")}</S.Span>
        </S.WrapperIcon>
      </S.BottomContainer>
    </S.Wrapper>
  );
};

const Terms = () => {
  const { t: tc } = useTranslation("common");
  return (
    <S.Terms>
      <S.WrapperIcon>
        <div>
          <Icon name="Book" background="none" stroke="text" size="large" />
        </div>
        <S.TermsLinks>
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Terms_of_Use.pdf"
            target="_blank"
            rel="noreferrer">
            <div>
              <span>{tc("termsOfUse")}</span>
            </div>
          </a>
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Privacy_Policy.pdf"
            target="_blank"
            rel="noreferrer">
            <div>
              <span>{tc("privacyPolicy")}</span>
            </div>
          </a>
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Disclaimer_and_Legal_Notice.pdf"
            target="_blank"
            rel="noreferrer">
            <div>
              <span>{tc("disclaimer")}</span>
            </div>
          </a>
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Excluded_Jurisdictions.pdf"
            target="_blank"
            rel="noreferrer">
            <div>
              <span>{tc("excludedJurisdictions")}</span>
            </div>
          </a>
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Data_Retention_Policy.pdf"
            target="_blank"
            rel="noreferrer">
            <div>
              <span>{tc("dataRetentionPolicy")}</span>
            </div>
          </a>
        </S.TermsLinks>
      </S.WrapperIcon>
    </S.Terms>
  );
};

const Help = () => {
  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`menu.${key}`);
  const [state, setState] = useState(false);
  return (
    <S.Terms>
      <span role="button" onClick={() => setState(!state)}>
        <S.WrapperIcon>
          <div>
            <Icon name="Question" background="none" stroke="text" size="large" />
          </div>
          <div>
            <S.Span>{t("help")}</S.Span>
          </div>
        </S.WrapperIcon>
      </span>
      {state && (
        <S.TermsLinks>
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Orderbook_FAQ.pdf"
            target="_blank"
            rel="noreferrer">
            <S.WrapperIcon>
              <div>
                <S.Span>{t("faq")}</S.Span>
              </div>
            </S.WrapperIcon>
          </a>
          <a href="https://discord.gg/G4KMw2sGGe" target="_blank" rel="noreferrer">
            <S.WrapperIcon>
              <div>
                <S.Span>{t("discord")}</S.Span>
              </div>
            </S.WrapperIcon>
          </a>
        </S.TermsLinks>
      )}
    </S.Terms>
  );
};

export default Menu;
