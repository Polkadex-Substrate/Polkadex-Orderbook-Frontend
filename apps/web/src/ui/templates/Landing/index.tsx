import localFont from "next/font/local";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Slide } from "react-reveal";
import { useTranslation } from "react-i18next";
import Spline from "@splinetool/react-spline";
import { Menu } from "@headlessui/react";

import SpeedImage from "../../../../public/img/speed.webp";
import FeesImage from "../../../../public/img/fees.webp";
import MarketImage from "../../../../public/img/market.webp";
import NonCustodial from "../../../../public/img/nonCustodial.webp";

import * as S from "./styles";

import { Icons } from "@/ui/atoms";
import { OrderbookLogo } from "@/ui/molecules";
const outrun = localFont({
  src: "../../../../public/fonts/outrun-future-bold.otf",
});

export function LandingTemplate() {
  const { t } = useTranslation("landing");
  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
      </Head>
      <S.Main>
        <S.Header>
          <S.Logo>
            <OrderbookLogo />
          </S.Logo>
          <S.Aside>
            <S.Menu>
              <MenuDropdown
                title="Products"
                items={[
                  {
                    title: "Orderbook",
                    link: "https://polkadex.trade/orderbook",
                  },
                  {
                    title: "THEA",
                    link: "http://thea.polkadex.trade",
                  },
                ]}
              />
              <MenuDropdown
                title="About"
                items={[
                  {
                    title: "Token Economics",
                    link: "https://polkadex.trade/tokeneconomics",
                  },
                  {
                    title: "Roadmap",
                    link: "https://polkadex.trade/roadmap",
                  },
                  {
                    title: "Team",
                    link: "https://polkadex.trade/team",
                  },
                ]}
              />
              <MenuDropdown
                title="Resources"
                items={[
                  {
                    title: "Mainnet Explorer",
                    link: "https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fmainnet.polkadex.trade#/explorer",
                  },
                  {
                    title: "Github Repository",
                    link: "https://github.com/Polkadex-Substrate",
                  },
                  {
                    title: "Substrate",
                    link: "https://www.substrate.io/",
                  },
                  {
                    title: "Ambassadors Hub",
                    link: "https://polkadex.notion.site/bcac75d5f73c44cf8bf8fc7f75297afb?v=4047f8300ceb431da698b9248612d203",
                  },
                ]}
              />
              <MenuDropdown
                title="Community"
                items={[
                  {
                    title: "Twitter",
                    link: "https://twitter.com/polkadex",
                  },
                  {
                    title: "Telegram",
                    link: "https://t.me/Polkadex",
                  },
                  {
                    title: "Discord",
                    link: "https://discord.com/invite/Uvua83QAzk",
                  },
                  {
                    title: "Reddit",
                    link: "https://www.reddit.com/r/polkadex",
                  },
                  {
                    title: "LinkedIn",
                    link: "https://www.linkedin.com/company/69690544",
                  },
                  {
                    title: "Medium",
                    link: "https://polkadex.medium.com/",
                  },
                ]}
              />
            </S.Menu>
            <S.Button href="/trading">Start Trading</S.Button>
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
          <Spline
            className="spline"
            scene="https://prod.spline.design/d9wfWHuFHYgRRRG2/scene.splinecode"
          />
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
                  alt="Speed illustration"
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
                <Slide bottom>
                  <div>
                    <h3>{t("benefits.twoTitle")}</h3>
                    <p>{t("benefits.twoDescription")}</p>
                  </div>
                  <Image
                    src={FeesImage}
                    placeholder="blur"
                    alt="Fees illustration"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </Slide>
              </S.FeaturesCard>
              <S.FeaturesCard>
                <Slide bottom>
                  <div>
                    <h3>{t("benefits.threeTitle")}</h3>
                    <p>{t("benefits.threeDescription")}</p>
                  </div>
                  <Image
                    src={MarketImage}
                    placeholder="blur"
                    alt="Market illustration"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </Slide>
              </S.FeaturesCard>
              <S.FeaturesCard>
                <Slide bottom>
                  <div>
                    <h3>{t("benefits.fourTitle")}</h3>
                    <p>{t("benefits.fourDescription")}</p>
                  </div>
                  <Image
                    src={NonCustodial}
                    placeholder="blur"
                    alt="NonCustodial illustration"
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
                  Discord
                </Link>
                <Link href="https://t.me/Polkadex" target="_blank">
                  <Icons.Telegram />
                  Telegram
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
                    Overview
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://docs.polkadex.trade/whatispolkadex"
                    target="_blank"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="https://polkadex.trade/roadmap" target="_blank">
                    Roadmap
                  </Link>
                </li>
                <li>
                  <Link href="https://polkadex.trade/team" target="_blank">
                    Team
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://polkadex.trade/tokeneconomics"
                    target="_blank"
                  >
                    Token economics
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <strong>Products</strong>
              <ul>
                <li>
                  <Link href="https://polkadex.trade/orderbook" target="_blank">
                    Orderbook
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://polkadex.medium.com/thea-a-better-decentralized-token-bridge-ac2e362a2a2b"
                    target="_blank"
                  >
                    THEA Crosschain
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <strong>Resources</strong>
              <ul>
                <li>
                  <Link href="https://docs.polkadex.trade/" target="_blank">
                    Docs
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/Polkadex-Substrate"
                    target="_blank"
                  >
                    Github repository
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.youtube.com/channel/UC6fXRDT4lLKlXG3gP0PP06Q"
                    target="_blank"
                  >
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="https://www.substrate.io/" target="_blank">
                    Substrate
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <strong>Support</strong>
              <ul>
                <li>
                  <Link
                    href="https://discord.com/invite/Uvua83QAzk"
                    target="_blank"
                  >
                    Help center
                  </Link>
                </li>
                <li>
                  <Link href="https://t.me/Polkadex" target="_blank">
                    Report issues
                  </Link>
                </li>
                <li>
                  <Link href="https://t.me/Polkadex" target="_blank">
                    Beginner&rsquo;s guide
                  </Link>
                </li>
              </ul>
            </div>
          </S.FooterTop>
          <S.FooterBottom>
            <S.FooterCopyright>
              <p>Copyright ©2023 Polkadex Inc.</p>
              <div>
                <Link
                  href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Terms_of_Use.pdf"
                  target="_blank"
                >
                  Terms & conditions
                </Link>
                <Link
                  href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Privacy_Policy.pdf"
                  target="_blank"
                >
                  Privacy policy
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
          background: #06070a;
        }
      `}</style>
    </>
  );
}

const MenuDropdown = ({ title, items }) => (
  <Menu as="div" style={{ position: "relative" }}>
    <Menu.Button className="dropdownButton">
      {title} <Icons.ArrowBottom />
    </Menu.Button>
    <Menu.Items className="dropdownContent">
      {items?.map((value, i) => (
        <Menu.Item key={i}>
          <Link target="_blank" href={value.title}>
            {value.title}
          </Link>
        </Menu.Item>
      ))}
    </Menu.Items>
  </Menu>
);
