import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import { FAQHeader } from "@polkadex/orderbook-ui/molecules/FAQHeader";

export const FaqTemplate = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>FAQ | Polkadex Orderbook</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Wrapper>
        <FAQHeader heading="Frequently asked question" pathname={router.pathname}>
          <p>
            Would request you to search with the keyword in your query inside the{" "}
            <span>Search Bar</span> and check if the solution provided suffice enough.
          </p>
        </FAQHeader>
        <S.Introduction>
          <S.IntroductionSearch>
            <S.Search>
              <S.SearchContainer>
                <Icons.Search />
                <input id="search" type="text" placeholder="Ask your question.." />
              </S.SearchContainer>
              <button type="button" onClick={() => window.alert("Searching..")}>
                Search
              </button>
            </S.Search>
            <p>
              If your query is not listed and you`re unable to find a solution, please reach
              out to <Link href="#">#Polkadex Orderbook Helpdesk channel on Discord</Link>{" "}
              which would connect you with a support executive.
            </p>
          </S.IntroductionSearch>
        </S.Introduction>
        <S.Trending>
          <h2>Trending topics</h2>
          <S.TrendingCards>
            {trendingTopics.map((v) => (
              <div key={v.id}>
                <span>{v.title}</span>
                <p>{v.description}</p>
              </div>
            ))}
          </S.TrendingCards>
        </S.Trending>
        <S.Categories>
          <S.CategoriesTitle>
            <h2>Categories</h2>
            <p>Perhaps you can find the answer in out collections</p>
          </S.CategoriesTitle>
          <S.CategoriesCards>
            {categories.map((v) => (
              <S.CategoriesCard key={v.id}>
                <div>
                  <Icons.AddWallet />
                </div>
                <span>{v.title}</span>
              </S.CategoriesCard>
            ))}
          </S.CategoriesCards>
        </S.Categories>
        <S.Videos>
          <S.VideosTitle>
            <div>
              <h2>Tutorials & videos</h2>
              <p>These videos might help you</p>
            </div>
            <Link href="#">View all</Link>
          </S.VideosTitle>
          <S.VideosCards>
            <S.VideosPrimary>
              <S.VideosPrimaryContainer>
                <p>ORDERBOOK IS LIVE: Orderbook Demo</p>
                <span>Polkadex</span>
              </S.VideosPrimaryContainer>
              <S.IframeContainer>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube-nocookie.com/embed/usrE9CGC_1M"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                />
              </S.IframeContainer>
            </S.VideosPrimary>
            <S.VideosSecondary>
              {videos.map((v) => (
                <S.VideosSecondaryCard key={v.id}>
                  <img src={`/img/faq/${v.image}`} alt="Polkadex video" />
                  <div>
                    <p>{v.title}</p>
                    <span>{v.author}</span>
                  </div>
                </S.VideosSecondaryCard>
              ))}
            </S.VideosSecondary>
          </S.VideosCards>
        </S.Videos>
      </S.Wrapper>
    </>
  );
};

const videos = [
  {
    id: 1,
    title: "Quick guide: Stake your PDEX and earn amazing APY!",
    author: "Polkadex",
    image: "stakingYoutube.png",
    link: "",
  },
  {
    id: 2,
    title: "PDEX Migration walk through",
    author: "Polkadex",
    link: "",
    image: "migrationYoutube.png",
  },
  {
    id: 3,
    title: "Run a Polkadex validator node with OnFinality",
    author: "Polkadex",
    link: "",
    image: "validatorYoutube.png",
  },
  {
    id: 4,
    title: "How to set an identity on-chain and verify your validator",
    author: "Polkadex",
    link: "",
    image: "identityYoutube.png",
  },
  {
    id: 5,
    title: "Sneak Peek: The PolkaIDO Interface",
    author: "Polkadex",
    link: "",
    image: "polkaidoYoutube.png",
  },
];

const categories = [
  {
    id: "GettingStarted",
    title: "Getting started",
  },
  {
    id: "Accounts",
    title: "Accounts",
  },
  {
    id: "DepositWithdraw",
    title: "Deposit/Withdraw",
  },
  {
    id: "SpotMargin",
    title: "Spot & Margin",
  },
  {
    id: "Security",
    title: "Security",
  },
  {
    id: "Wallets",
    title: "Wallets",
  },
  {
    id: "Trading bots",
    title: "Trading bots",
  },
  {
    id: "Balances",
    title: "Balances",
  },
  {
    id: "PlatormIdsues",
    title: "Platorm issues",
  },
  {
    id: "OtherTopics",
    title: "Other topics",
  },
];

const trendingTopics = [
  {
    id: 1,
    title: "Register main account",
    description: "Elit duis tristique sollicitudin nibh..",
  },
  {
    id: 2,
    title: "Create trade account",
    description: "Sit a met commodo nulla facil.",
  },
  {
    id: 3,
    title: "Delete trade account from blockchain",
    description: "Amet commodo nulla facil vinar..",
  },
  {
    id: 4,
    title: "Deposit coin",
    description: "Aulla facil Pellentesque pulvinar..",
  },
  {
    id: 5,
    title: "Withdraw coin",
    description: "Commodo nulla facil Entesque..",
  },
  {
    id: 5,
    title: "How limit order works",
    description: "Nulla facil Pellentesque pulvinar..",
  },
  {
    id: 5,
    title: "Locked balances",
    description: "Facil Pellentesque pulvinar amet..",
  },
  {
    id: 5,
    title: "Excluded Jurisdictions",
    description: "Pellentesque pulvinar sit amete..",
  },
];
