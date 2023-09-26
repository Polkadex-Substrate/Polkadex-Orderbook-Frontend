import localFont from "next/font/local";
import Head from "next/head";
import Link from "next/link";

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
        <S.Start>
          <S.StartHeader>
            <span className={outrun.className}>Fast</span>
            <span className={outrun.className}>Simple</span>
            <span className={outrun.className}>Secure</span>
          </S.StartHeader>
          <S.StartContent>
            <S.StartCard>
              <div></div>
              <h3>1.Create an account</h3>
              <p>
                Sign up on Orderbook. Rest assured, we prioritize your security
                and use any data solely for security and marketing.
              </p>
            </S.StartCard>
            <S.StartCard>
              <div />
              <h3>2.Connect your wallet</h3>
              <p>
                Choose your wallet from a variety of Polkadot-based wallets, and
                register it for use within Orderbook.
              </p>
            </S.StartCard>
            <S.StartCard>
              <div></div>
              <h3>3.Add funds & start trading</h3>
              <p>
                Transfer funds into your Orderbook wallet. Now, you&lsquo;re all
                set to start trading.
              </p>
            </S.StartCard>
          </S.StartContent>
          <S.StartFooter>
            <span>
              Click this small button to begin trading
              <Icons.SingleArrowRight />
            </span>
            <S.Button href="/trading">Start trading</S.Button>
          </S.StartFooter>
        </S.Start>
        <S.Features>
          <S.FeaturesHeader>
            <div>
              <span className={outrun.className}>Your</span>
              <p className={outrun.className}>Keys</p>
            </div>
            <div>
              <span className={outrun.className}>Your</span>
              <p className={outrun.className}>Crypto</p>
            </div>
            <div>
              <span className={outrun.className}>Secure</span>
              <p className={outrun.className}>Exchange</p>
            </div>
          </S.FeaturesHeader>
          <S.FeaturesContent>
            <S.FeaturesHighlight>
              <div>
                <h3>500k trades/sec</h3>
                <p>
                  Trade crypto with sub-milisecond latency on a DEX that’s as
                  fast as CEXs.
                </p>
              </div>
              <img src="/img/speed.png" />
            </S.FeaturesHighlight>
            <S.FeaturesWrapper>
              <S.FeaturesCard>
                <div>
                  <h3>Ø Trading fees</h3>
                  <p>
                    Sign up on Orderbook. Rest assured, we prioritize your
                    security and use any data solely for security and marketing.
                  </p>
                </div>
                <img src="/img/fees.png" />
              </S.FeaturesCard>
              <S.FeaturesCard>
                <h3>Limit & market orders</h3>
                <p>
                  Control price with limit orders, achieve instant execution
                  with market orders.
                </p>
                <img src="/img/market.png" />
              </S.FeaturesCard>
              <S.FeaturesCard>
                <h3>Non-custodial</h3>
                <p>
                  You control your own liquidity, which means it is safe, and
                  you can pull it out whenever.
                </p>
                <img src="/img/nonCustodial.png" />
              </S.FeaturesCard>
            </S.FeaturesWrapper>
            <S.FeaturesFooter>
              <Link href="/">
                Read more about Polkadex Orderbook
                <Icons.SingleArrowRight />
              </Link>
              <S.Button href="/trading">Start trading</S.Button>
            </S.FeaturesFooter>
          </S.FeaturesContent>
        </S.Features>
        <S.Support>
          <S.SupportCard>
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
          </S.SupportCard>
          <S.SupportCard>
            <S.SupportCardHeader>
              <h3>Join Our Community</h3>
              <p>
                Polkadex Community connects users from 100+ countries and
                supporting 5+ languages.
              </p>
            </S.SupportCardHeader>
            <S.SupportCardFooter>
              <Link href="/">
                <Icons.Discord />
                Discover
                <Icons.ArrowBottom />
              </Link>
              <Link href="/">
                <Icons.Telegram />
                Telegram
                <Icons.ArrowBottom />
              </Link>
            </S.SupportCardFooter>
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
                  <Link href="/">Overview</Link>
                </li>
                <li>
                  <Link href="/">Features</Link>
                </li>
                <li>
                  <Link href="/">Roadmap</Link>
                </li>
                <li>
                  <Link href="/">Team</Link>
                </li>
                <li>
                  <Link href="/">Token economics</Link>
                </li>
              </ul>
            </div>
            <div>
              <strong>Products</strong>
              <ul>
                <li>
                  <Link href="/">Orderbook</Link>
                </li>
                <li>
                  <Link href="/">THEA Crosschain</Link>
                </li>
              </ul>
            </div>
            <div>
              <strong>Resources</strong>
              <ul>
                <li>
                  <Link href="/">Docs</Link>
                </li>
                <li>
                  <Link href="/">Github repository</Link>
                </li>
                <li>
                  <Link href="/">Tutorials</Link>
                </li>
                <li>
                  <Link href="/">Substrate</Link>
                </li>
              </ul>
            </div>
            <div>
              <strong>Support</strong>
              <ul>
                <li>
                  <Link href="/">Help center</Link>
                </li>
                <li>
                  <Link href="/">Report issues</Link>
                </li>
                <li>
                  <Link href="/">Beginner&rsquo;s guide</Link>
                </li>
              </ul>
            </div>
          </S.FooterTop>
          <S.FooterBottom>
            <S.FooterCopyright>
              <p>Copyright ©2023 Polkadex Inc.</p>
              <div>
                <Link href="/">Terms & conditions</Link>
                <Link href="/">Privacy policy</Link>
              </div>
            </S.FooterCopyright>
            <S.FooterSocial>
              <Link href="/">
                <Icons.Linkedin />
              </Link>
              <Link href="/">
                <Icons.Discord />
              </Link>
              <Link href="/">
                <Icons.Youtube />
              </Link>
              <Link href="/">
                <Icons.Reddit />
              </Link>
              <Link href="/">
                <Icons.Telegram />
              </Link>
              <Link href="/">
                <Icons.Twitter />
              </Link>
            </S.FooterSocial>
          </S.FooterBottom>
        </S.Footer>
      </S.Main>
    </>
  );
}
