import localFont from "next/font/local";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Fade, Slide } from "react-reveal";

import SpeedImage from "../../../../public/img/speed.webp";
import FeesImage from "../../../../public/img/fees.webp";
import MarketImage from "../../../../public/img/market.webp";
import NonCustodial from "../../../../public/img/nonCustodial.webp";

import * as S from "./styles";

import { Header } from "@/ui/organisms";
import { Icons } from "@/ui/atoms";
const outrun = localFont({
  src: "../../../../public/fonts/outrun-future-bold.otf",
});

export function LandingTemplate() {
  return (
    <>
      <Head>
        <title>Landing Page</title>
        <meta name="description" content="Description" />
      </Head>
      <S.Main>
        <Header dark />
        <Fade>
          <S.Hero>
            <S.HeroAside>
              <S.HeroHeader>
                <span>
                  <Icons.Checked />
                  Non-custodial
                </span>
                <span>
                  <Icons.Checked />
                  Zero gas fees
                </span>
                <span>
                  <Icons.Checked />
                  500k TPS performance
                </span>
              </S.HeroHeader>
              <h1>Trade on the CEXiest decentralized</h1>
              <p className={outrun.className}>
                Exchange <strong>.</strong>
              </p>
              <S.Button href="/trading">Start trading</S.Button>
            </S.HeroAside>
          </S.Hero>
        </Fade>
        <S.Start>
          <S.StartHeader>
            <Slide bottom>
              <span className={outrun.className}>Fast</span>
            </Slide>
            <Slide bottom>
              <span className={outrun.className}>Simple</span>
            </Slide>
            <Slide bottom>
              <span className={outrun.className}>Secure</span>
            </Slide>
          </S.StartHeader>
          <Slide bottom>
            <S.StartContent>
              <S.StartCard>
                <span />
                <div>
                  <h3>1.Create an account</h3>
                  <p>
                    Sign up on Orderbook. Rest assured, we prioritize your
                    security and use any data solely for security and marketing.
                  </p>
                </div>
              </S.StartCard>
              <S.StartCard>
                <span />
                <div>
                  <h3>2.Connect your wallet</h3>
                  <p>
                    Choose your wallet from a variety of Polkadot-based wallets,
                    and register it for use within Orderbook.
                  </p>
                </div>
              </S.StartCard>
              <S.StartCard>
                <span />
                <div>
                  <h3>3.Add funds & start trading</h3>
                  <p>
                    Transfer funds into your Orderbook wallet. Now, you&lsquo;re
                    all set to start trading.
                  </p>
                </div>
              </S.StartCard>
            </S.StartContent>
          </Slide>
          <Slide bottom>
            <S.StartFooter>
              <span>
                Click this small button to begin trading
                <Icons.SingleArrowRight />
              </span>
              <S.Button href="/trading">Start trading</S.Button>
            </S.StartFooter>
          </Slide>
        </S.Start>
        <S.Features>
          <S.FeaturesHeader>
            <S.FeatureShadow />
            <S.FeaturesHeaderCard>
              <Slide bottom>
                <div>
                  <span className={outrun.className}>Your</span>
                  <p className={outrun.className}>Keys</p>
                </div>
              </Slide>
              <Slide bottom>
                <div>
                  <span className={outrun.className}>Your</span>
                  <p className={outrun.className}>Crypto</p>
                </div>
              </Slide>
              <Slide bottom>
                <div>
                  <span className={outrun.className}>Your</span>
                  <p className={outrun.className}>Exchange</p>
                </div>
              </Slide>
            </S.FeaturesHeaderCard>
          </S.FeaturesHeader>
          <S.FeaturesContent>
            <Slide bottom>
              <S.FeaturesHighlight>
                <div>
                  <h3>500k trades/sec</h3>
                  <p>
                    Trade crypto with sub-milisecond latency on a DEX that’s as
                    fast as CEXs.
                  </p>
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
                    <h3>Ø Trading fees</h3>
                    <p>
                      Sign up on Orderbook. Rest assured, we prioritize your
                      security and use any data solely for security and
                      marketing.
                    </p>
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
                    <h3>Limit & market orders</h3>
                    <p>
                      Control price with limit orders, achieve instant execution
                      with market orders.
                    </p>
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
                    <h3>Non-custodial</h3>
                    <p>
                      You control your own liquidity, which means it is safe,
                      and you can pull it out whenever.
                    </p>
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
                  Read more about Polkadex Orderbook
                  <Icons.SingleArrowRight />
                </Link>
                <S.Button href="/trading">Start trading</S.Button>
              </S.FeaturesFooter>
            </Slide>
          </S.FeaturesContent>
        </S.Features>
        <S.Support>
          <S.SupportCard>
            <Slide bottom>
              <S.SupportCardHeader>
                <h3>FAQs</h3>
                <p>
                  Explore our Frequently Asked Questions section for in-depth
                  guidance on specific features.
                </p>
              </S.SupportCardHeader>
              <Link href="/">
                Explore FAQ
                <Icons.SingleArrowRight />
              </Link>
            </Slide>
          </S.SupportCard>
          <S.SupportCard>
            <Slide bottom>
              <S.SupportCardHeader>
                <h3>Join Our Community</h3>
                <p>
                  Polkadex Community connects users from 100+ countries and
                  supporting 5+ languages.
                </p>
              </S.SupportCardHeader>
              <S.SupportCardFooter>
                <Link
                  href="https://discord.com/invite/Uvua83QAzk"
                  target="_blank"
                >
                  <Icons.Discord />
                  Discover
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
