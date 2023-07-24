// TODO: Add types
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import * as S from "./styles";

import { Icons } from "@polkadex/orderbook-ui/atoms";
import { FAQHeader } from "@polkadex/orderbook-ui/molecules/FAQHeader";
import { getImgUrl } from "@polkadex/web-helpers";

export const FaqTemplate = ({ title, seo, blocks }) => {
  const router = useRouter();
  const pageHero = blocks?.[1];
  const pageSearch = blocks?.[2];
  const pageCategories = blocks?.[4];
  const pageTrendingTopics = blocks?.[5];
  const pageVideos = blocks?.[6];

  const featuredVideo = pageVideos?.videoCard?.find((v) => v.featured);
  const allPageVideos = pageVideos?.videoCard?.filter((v) => !v.featured);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={seo?.metaDescription} />
      </Head>
      <S.Wrapper>
        <FAQHeader noBorder heading={pageHero?.title} pathname={router.pathname}>
          {pageHero?.description && <ReactMarkdown>{pageHero?.description}</ReactMarkdown>}
        </FAQHeader>
        <S.Introduction>
          <S.IntroductionSearch>
            <S.Search>
              <S.SearchContainer>
                <Icons.Search />
                <input id="search" type="text" placeholder={pageSearch?.placeholder} />
              </S.SearchContainer>
              <button type="button" onClick={() => window.alert("Searching..")}>
                {pageSearch?.buttonTitle}
              </button>
            </S.Search>
            <ReactMarkdown>{pageSearch?.message}</ReactMarkdown>
          </S.IntroductionSearch>
        </S.Introduction>
        <S.Trending>
          <h2>{pageTrendingTopics?.title}</h2>
          <S.TrendingCards>
            {pageTrendingTopics?.faq_articles?.data?.map(({ attributes }) => {
              const link = `/${attributes.faq_category.data.attributes.slug}/${attributes.slug}`;
              return (
                <Link href={link} key={attributes.slug}>
                  <div>
                    <h4>{attributes.heading}</h4>
                    <p>{attributes.shortDescription}</p>
                  </div>
                  <span>
                    <Icons.SingleArrowRight />
                  </span>
                </Link>
              );
            })}
          </S.TrendingCards>
        </S.Trending>
        <S.Categories>
          <S.CategoriesTitle>
            <h2>{pageCategories?.title}</h2>
            <p>{pageCategories?.description}</p>
          </S.CategoriesTitle>
          <S.CategoriesCards>
            {pageCategories?.faq_categories?.data?.map(({ attributes }) => {
              const icon = attributes?.icon?.data?.attributes?.url;
              const iconUrl = getImgUrl(icon);
              return (
                <S.CategoriesCard href={`/${attributes.slug}`} key={attributes.slug}>
                  {icon && (
                    <div>
                      <img src={iconUrl} />
                    </div>
                  )}
                  <span>{attributes.title}</span>
                </S.CategoriesCard>
              );
            })}
          </S.CategoriesCards>
        </S.Categories>
        <S.Videos>
          <S.VideosTitle>
            <div>
              <h2>{pageVideos?.title}</h2>
              <p>{pageVideos?.description}</p>
            </div>
            <Link href="#">View all</Link>
          </S.VideosTitle>
          <S.VideosCards>
            {featuredVideo && (
              <S.VideosPrimary>
                <S.VideosPrimaryContainer>
                  <p>{featuredVideo.title}</p>
                  <span>{featuredVideo.author}</span>
                </S.VideosPrimaryContainer>
                <S.IframeContainer>
                  <iframe
                    width="560"
                    height="315"
                    src={featuredVideo.url}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  />
                </S.IframeContainer>
              </S.VideosPrimary>
            )}
            <S.VideosSecondary>
              {allPageVideos?.map((value) => {
                const icon = value?.image?.data?.attributes?.url;
                const iconUrl = getImgUrl(icon);
                return (
                  <S.VideosSecondaryCard href={value.url} target="_blank" key={value.id}>
                    <div>
                      <img src={iconUrl} alt="Polkadex video" />
                    </div>
                    <div>
                      <p>{value.title}</p>
                      <span>{value.author}</span>
                    </div>
                  </S.VideosSecondaryCard>
                );
              })}
            </S.VideosSecondary>
          </S.VideosCards>
        </S.Videos>
      </S.Wrapper>
    </>
  );
};
