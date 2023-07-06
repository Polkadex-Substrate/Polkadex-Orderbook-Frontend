import Head from "next/head";
import Link from "next/link";

import * as S from "./styles";

// import { Menu } from "@polkadex/orderbook-ui/organisms/Menu";
import { FaqTopMessage } from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";

export const FaqTemplate = () => {
  return (
    <>
      <Head>
        <title>FAQ | Polkadex Orderbook</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <FaqTopMessage />
        <S.Flex>
          {/* <Menu /> */}
          <S.Wrapper>
            <S.Introduction>
              <S.IntroductionTitle>
                <Link href="#">Home</Link>
                <div>
                  <h1>Frequently asked question</h1>
                  <p>
                    Would request you to search with the keyword in your query inside the{" "}
                    <span>Search Bar</span> and check if the solution provided suffice enough.
                  </p>
                </div>
              </S.IntroductionTitle>
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
                  If your query is not listed and you`re unable to find a solution, please
                  reach out to{" "}
                  <Link href="#">#Polkadex Orderbook Helpdesk channel on Discord</Link> which
                  would connect you with a support executive.
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
          </S.Wrapper>
          <S.QuickAccess />
        </S.Flex>
      </S.Main>
    </>
  );
};

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
    id: "Deposit&Withdraw",
    title: "Deposit & Withdraw",
  },
  {
    id: "Spot&Margin",
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
