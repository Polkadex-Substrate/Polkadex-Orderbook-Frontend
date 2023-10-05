import localFont from "next/font/local";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Slide } from "react-reveal";
import { useTranslation } from "react-i18next";
import { Menu } from "@headlessui/react";
import Spline from "@splinetool/react-spline";
import { useState } from "react";
import classNames from "classnames";

import SpeedImage from "../../../../public/img/speed.webp";
import FeesImage from "../../../../public/img/fees.webp";
import MarketImage from "../../../../public/img/market.webp";
import NonCustodial from "../../../../public/img/nonCustodial.webp";

import * as S from "./styles";

import { Icons } from "@/ui/atoms";
import { OrderbookLogo } from "@/ui/molecules";
import LoadingScreen from "@/ui/molecules/LoadingScreen";

const outrun = localFont({
  src: "../../../../public/fonts/outrun-future-bold.otf",
});
const menuItems = {
  products: [
    {
      title: "orderbook",
      link: "https://orderbook.polkadex.trade/trading",
    },
    {
      title: "thea",
      link: "http://thea.polkadex.trade",
    },
  ],
  about: [
    {
      title: "tokenEconomics",
      link: "https://polkadex.trade/tokeneconomics",
    },
    {
      title: "roadmap",
      link: "https://polkadex.trade/roadmap",
    },
  ],
  resources: [
    {
      title: "explorer",
      link: "https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fmainnet.polkadex.trade#/explorer",
    },
    {
      title: "github",
      link: "https://github.com/Polkadex-Substrate",
    },
    {
      title: "substrate",
      link: "https://www.substrate.io/",
    },
    {
      title: "ambassadors",
      link: "https://polkadex.notion.site/bcac75d5f73c44cf8bf8fc7f75297afb?v=4047f8300ceb431da698b9248612d203",
    },
  ],
  community: [
    {
      title: "twitter",
      link: "https://twitter.com/polkadex",
    },
    {
      title: "telegram",
      link: "https://t.me/Polkadex",
    },
    {
      title: "discord",
      link: "https://discord.com/invite/Uvua83QAzk",
    },
    {
      title: "reddit",
      link: "https://www.reddit.com/r/polkadex",
    },
    {
      title: "linkedIn",
      link: "https://www.linkedin.com/company/69690544",
    },
    {
      title: "medium",
      link: "https://polkadex.medium.com/",
    },
  ],
};
export function LandingTemplate() {
  const { t } = useTranslation("landing");
  const [state, setState] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
      </Head>
      {!open && <LoadingScreen light />}
      <S.Main open={open}>
        <S.Header>
          {state && (
            <S.MenuWrapper>
              <S.MenuContent>
                <S.MenuClose onClick={() => setState(false)}>
                  <Icons.Close />
                </S.MenuClose>
                <S.MenuItems>
                  <div>
                    <span>{t("header.products")}</span>
                    <ul>
                      {menuItems.products.map((v) => (
                        <li key={v.title}>
                          <a href={v.link} target="_blank" rel="noreferrer">
                            {t(`header.${v.title}`)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span>{t("header.about")}</span>
                    <ul>
                      {menuItems.about.map((v) => (
                        <li key={v.title}>
                          <a href={v.link} target="_blank" rel="noreferrer">
                            {t(`header.${v.title}`)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span>{t("header.resources")}</span>
                    <ul>
                      {menuItems.resources.map((v) => (
                        <li key={v.title}>
                          <a href={v.link} target="_blank" rel="noreferrer">
                            {t(`header.${v.title}`)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span>{t("header.community")}</span>
                    <ul>
                      {menuItems.community.map((v) => (
                        <li key={v.title}>
                          <a href={v.link} target="_blank" rel="noreferrer">
                            {t(`header.${v.title}`)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </S.MenuItems>
              </S.MenuContent>
            </S.MenuWrapper>
          )}
          <S.Logo href="/">
            <OrderbookLogo light />
            <span>BETA</span>
          </S.Logo>
          <S.Aside>
            <S.Menu>
              <MenuDropdown
                title={t("header.products")}
                items={menuItems.products}
              />
              <MenuDropdown title={t("header.about")} items={menuItems.about} />
              <MenuDropdown
                title={t("header.resources")}
                items={menuItems.resources}
              />
              <MenuDropdown
                title={t("header.community")}
                items={menuItems.community}
              />
            </S.Menu>
            <S.Button href="/trading">{t("button")}</S.Button>
            <S.MenuButton onClick={() => setState(true)}>
              <svg width="26" height="26" viewBox="0 0 100 100">
                <path
                  className="line line1"
                  d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                  fill="none"
                />
                <path className="line line2" d="M 20,50 H 80" fill="none" />
                <path
                  className="line line3"
                  d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                  fill="none"
                />
              </svg>
            </S.MenuButton>
          </S.Aside>
        </S.Header>
        <S.Hero>
          <S.HeroAside>
            <S.HeroHeader>
              <span>
                <Icons.Checked />
                {t("hero.nonCustodial")}
              </span>
              <span>
                <Icons.Checked />
                {t("hero.gasFees")}
              </span>
              <span>
                <Icons.Checked />
                {t("hero.performance")}
              </span>
            </S.HeroHeader>
            <h1>{t("hero.title")}</h1>
            <p className={outrun.className}>
              {t("hero.highlight")}
              <strong>.</strong>
            </p>
            <S.Button href="/trading">{t("button")}</S.Button>
          </S.HeroAside>
          <S.Spline>
            <Spline
              className={classNames(open && "active", "spline")}
              scene="https://prod.spline.design/d9wfWHuFHYgRRRG2/scene.splinecode"
              onLoad={() => setOpen(true)}
            />
          </S.Spline>
        </S.Hero>
        <S.Start>
          <S.StartHeader>
            <Slide bottom>
              <span className={outrun.className}>{t("features.fast")}</span>
            </Slide>
            <Slide bottom>
              <span className={outrun.className}>{t("features.simple")}</span>
            </Slide>
            <Slide bottom>
              <span className={outrun.className}>{t("features.secure")}</span>
            </Slide>
          </S.StartHeader>
          <Slide bottom>
            <S.StartContent>
              <S.StartCard>
                <span />
                <div>
                  <h3>{t("features.stepOneTitle")}</h3>
                  <p>{t("features.stepOneDescription")}</p>
                </div>
              </S.StartCard>
              <S.StartCard>
                <span />
                <div>
                  <h3>{t("features.stepTwoTitle")}</h3>
                  <p>{t("features.stepTwoDescription")}</p>
                </div>
              </S.StartCard>
              <S.StartCard>
                <span />
                <div>
                  <h3>{t("features.stepThreeTitle")}</h3>
                  <p>{t("features.stepThreeDescription")}</p>
                </div>
              </S.StartCard>
            </S.StartContent>
          </Slide>
          <Slide bottom>
            <S.StartFooter>
              <span>
                {t("features.ctaTitle")}
                <Icons.SingleArrowRight />
              </span>
              <S.Button href="/trading">{t("button")}</S.Button>
            </S.StartFooter>
          </Slide>
        </S.Start>
        <S.Features>
          <S.FeaturesContainer>
            <S.FeaturesHeader>
              <S.FeatureShadow />
              <S.FeaturesHeaderCard>
                <Slide bottom>
                  <div>
                    <span className={outrun.className}>
                      {t("benefits.highlight")}
                    </span>
                    <p className={outrun.className}>{t("benefits.keys")}</p>
                  </div>
                </Slide>
                <Slide bottom>
                  <div>
                    <span className={outrun.className}>
                      {t("benefits.highlight")}
                    </span>
                    <p className={outrun.className}>{t("benefits.crypto")}</p>
                  </div>
                </Slide>
                <Slide bottom>
                  <div>
                    <span className={outrun.className}>
                      {t("benefits.highlight")}
                    </span>
                    <p className={outrun.className}>{t("benefits.exchange")}</p>
                  </div>
                </Slide>
              </S.FeaturesHeaderCard>
            </S.FeaturesHeader>
            <S.FeaturesContent>
              <Slide bottom>
                <S.FeaturesHighlight>
                  <div>
                    <h3>{t("benefits.oneTitle")}</h3>
                    <p>{t("benefits.oneDescription")}</p>
                  </div>
                  <Image
                    src={SpeedImage}
                    placeholder="blur"
                    alt={t("benefits.speedAlt")}
                    priority
                    draggable={false}
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </S.FeaturesHighlight>
              </Slide>
              <S.FeaturesWrapper>
                <S.FeaturesCard>
                  <Slide left>
                    <div>
                      <h3>{t("benefits.twoTitle")}</h3>
                      <p>{t("benefits.twoDescription")}</p>
                    </div>
                    <Image
                      src={FeesImage}
                      placeholder="blur"
                      alt={t("benefits.feesAlt")}
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  </Slide>
                </S.FeaturesCard>
                <S.FeaturesCard>
                  <div>
                    <h3>{t("benefits.threeTitle")}</h3>
                    <p>{t("benefits.threeDescription")}</p>
                  </div>
                  <Image
                    src={MarketImage}
                    placeholder="blur"
                    alt={t("benefits.marketAlt")}
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </S.FeaturesCard>
                <S.FeaturesCard>
                  <Slide right>
                    <div>
                      <h3>{t("benefits.fourTitle")}</h3>
                      <p>{t("benefits.fourDescription")}</p>
                    </div>
                    <Image
                      src={NonCustodial}
                      placeholder="blur"
                      alt={t("benefits.walletAlt")}
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  </Slide>
                </S.FeaturesCard>
              </S.FeaturesWrapper>

              <Slide bottom>
                <S.FeaturesFooter>
                  <Link href="https://polkadex.trade/orderbook" target="_blank">
                    {t("benefits.ctaTitle")}
                    <Icons.SingleArrowRight />
                  </Link>
                  <S.Button href="/trading">{t("button")}</S.Button>
                </S.FeaturesFooter>
              </Slide>
            </S.FeaturesContent>
          </S.FeaturesContainer>
        </S.Features>
        <S.Support>
          <S.SupportCard>
            <Slide bottom>
              <S.SupportCardHeader>
                <h3>{t("help.faqTitle")}</h3>
                <p>{t("help.faqDescription")}</p>
              </S.SupportCardHeader>
              <Link href="/">
                {t("help.faqButton")}
                <Icons.SingleArrowRight />
              </Link>
            </Slide>
          </S.SupportCard>
          <S.SupportCard>
            <Slide bottom>
              <S.SupportCardHeader>
                <h3>{t("help.socialTitle")}</h3>
                <p>{t("help.socialDescription")}</p>
              </S.SupportCardHeader>
              <S.SupportCardFooter>
                <Link
                  href="https://discord.com/invite/Uvua83QAzk"
                  target="_blank"
                >
                  <Icons.Discord />
                  {t("header.discord")}
                </Link>
                <Link href="https://t.me/Polkadex" target="_blank">
                  <Icons.Telegram />
                  {t("header.telegram")}
                </Link>
              </S.SupportCardFooter>
            </Slide>
          </S.SupportCard>
        </S.Support>
        <S.Footer>
          <S.FooterTop>
            <div>
              <span>
                <Icons.PolkadexLogo />
              </span>
            </div>
            <div>
              <strong>About us</strong>
              <ul>
                <li>
                  <Link href="https://docs.polkadex.trade/" target="_blank">
                    {t("footer.overview")}
                  </Link>
                </li>
                <li>
                  <Link href="https://polkadex.trade/roadmap" target="_blank">
                    {t("header.roadmap")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://polkadex.trade/tokeneconomics"
                    target="_blank"
                  >
                    {t("header.tokenEconomics")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <strong>{t("header.products")}</strong>
              <ul>
                <li>
                  <Link href="https://polkadex.trade/orderbook" target="_blank">
                    {t("header.orderbook")}
                  </Link>
                </li>
                <li>
                  <Link href="http://thea.polkadex.trade" target="_blank">
                    {t("header.thea")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <strong> {t("header.resources")}</strong>
              <ul>
                <li>
                  <Link
                    href="https://github.com/Polkadex-Substrate"
                    target="_blank"
                  >
                    {t("header.github")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.youtube.com/channel/UC6fXRDT4lLKlXG3gP0PP06Q"
                    target="_blank"
                  >
                    {t("footer.tutorials")}
                  </Link>
                </li>
                <li>
                  <Link href="https://www.substrate.io/" target="_blank">
                    {t("header.substrate")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <strong>{t("footer.support")}</strong>
              <ul>
                <li>
                  <Link
                    href="https://discord.com/invite/Uvua83QAzk"
                    target="_blank"
                  >
                    {t("footer.help")}
                  </Link>
                </li>
                <li>
                  <Link href="https://t.me/Polkadex" target="_blank">
                    {t("footer.report")}
                  </Link>
                </li>
                <li>
                  <Link href="https://t.me/Polkadex" target="_blank">
                    {t("footer.guide")}
                  </Link>
                </li>
              </ul>
            </div>
          </S.FooterTop>
          <S.FooterBottom>
            <S.FooterCopyright>
              <p>{t("footer.copyright")}</p>
              <div>
                <Link
                  href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Terms_of_Use.pdf"
                  target="_blank"
                >
                  {t("footer.terms")}
                </Link>
                <Link
                  href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Privacy_Policy.pdf"
                  target="_blank"
                >
                  {t("footer.privacy")}
                </Link>
              </div>
            </S.FooterCopyright>
            <S.FooterSocial>
              <Link
                href="https://www.linkedin.com/company/69690544"
                target="_blank"
              >
                <Icons.Linkedin />
              </Link>
              <Link
                href="https://discord.com/invite/Uvua83QAzk/"
                target="_blank"
              >
                <Icons.Discord />
              </Link>
              <Link href="https://polkadex.medium.com/" target="_blank">
                <Icons.Medium />
              </Link>
              <Link href="https://www.reddit.com/r/polkadex" target="_blank">
                <Icons.Reddit />
              </Link>
              <Link href="https://t.me/Polkadex" target="_blank">
                <Icons.Telegram />
              </Link>
              <Link href="https://twitter.com/polkadex" target="_blank">
                <Icons.Twitter />
              </Link>
            </S.FooterSocial>
          </S.FooterBottom>
        </S.Footer>
      </S.Main>

      <style jsx global>{`
        body {
          background: #1c1c26;
          overflow: ${state ? "hidden" : "auto"};
        }
      `}</style>
    </>
  );
}

const MenuDropdown = ({ title, items }) => {
  const { t } = useTranslation("landing");
  return (
    <Menu as="div" style={{ position: "relative" }}>
      <Menu.Button className="dropdownButton">
        {title} <Icons.ArrowBottom />
      </Menu.Button>
      <Menu.Items className="dropdownContent">
        {items?.map((value, i) => (
          <Menu.Item key={i}>
            <a target="_blank" href={value.link} rel="noreferrer">
              {t(`header.${value.title}`)}
            </a>
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};
