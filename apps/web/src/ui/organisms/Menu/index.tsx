import Link from "next/link";
import { AnchorHTMLAttributes, PropsWithChildren } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Icon } from "@polkadex/orderbook-ui/molecules";
import { useAppearance } from "@orderbook/core/hooks";
import { useProfile } from "@orderbook/core/providers/user/profile";

import * as S from "./styles";

export const Menu = ({ open = false }) => {
  const router = useRouter();

  const profileState = useProfile();
  const { isDarkTheme, changeTheme } = useAppearance();

  const {
    authInfo: { isAuthenticated },
  } = profileState;

  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`menu.${key}`);

  return (
    <S.Wrapper open={open}>
      <S.WrapperLinks>
        <Card
          active={router.pathname === "/trading/[id]"}
          icon="Exchange"
          href="/trading"
          open={open}
        >
          {t("exchange")}
        </Card>
        <Card
          active={router.pathname === "/balances"}
          icon="Coins"
          href="/balances"
          disable={!isAuthenticated}
          open={open}
        >
          {t("balances")}
        </Card>
        <Card
          active={router.pathname === "/settings"}
          icon="Wallet"
          href="/settings"
          disable={!isAuthenticated}
          open={open}
        >
          {t("accounts")}
        </Card>
        <Terms open={open} />
        <Card
          icon="Question"
          open={open}
          href="https://discord.gg/G4KMw2sGGe"
          target="_blank"
          rel="noreferrer"
        >
          {t("help")}
        </Card>
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

const Terms = ({ open }) => {
  const { t: tc } = useTranslation("common");
  return (
    <S.Terms open={open}>
      <S.WrapperIcon>
        <S.Flex>
          <div>
            <Icon name="Book" background="none" stroke="text" size="large" />
          </div>
          {open && (
            <S.Text>
              <p>Legal links</p>
              <div>
                <Icon name="ArrowBottom" />
              </div>
            </S.Text>
          )}
        </S.Flex>
        <S.TermsLinks>
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Terms_of_Use.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <div>
              <span>{tc("termsOfUse")}</span>
            </div>
          </a>
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Privacy_Policy.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <div>
              <span>{tc("privacyPolicy")}</span>
            </div>
          </a>
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Disclaimer_and_Legal_Notice.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <div>
              <span>{tc("disclaimer")}</span>
            </div>
          </a>
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Excluded_Jurisdictions.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <div>
              <span>{tc("excludedJurisdictions")}</span>
            </div>
          </a>
          <a
            href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Data_Retention_Policy.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <div>
              <span>{tc("dataRetentionPolicy")}</span>
            </div>
          </a>
        </S.TermsLinks>
      </S.WrapperIcon>
    </S.Terms>
  );
};

interface Props
  extends Pick<
    AnchorHTMLAttributes<HTMLAreaElement>,
    "href" | "target" | "rel"
  > {
  active?: boolean;
  icon: "Exchange" | "Coins" | "Wallet" | "Help" | "Question";
  disable?: boolean;
  open?: boolean;
}

const Card = ({
  active,
  href,
  icon,
  disable,
  open,
  children,
  ...props
}: PropsWithChildren<Props>) => (
  <S.WrapperIcon isDisabled={disable} open={open}>
    {active && <S.LineBorder />}
    <Link href={href as string} {...props}>
      <div>
        <Icon name={icon} background="none" stroke="text" size="large" />
      </div>
      <S.Span>{children}</S.Span>
    </Link>
  </S.WrapperIcon>
);

export default Menu;
