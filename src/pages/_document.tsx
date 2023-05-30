import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="preload"
            href="/fonts/work-sans-v13-latin-100.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/fonts/work-sans-v13-latin-200.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/fonts/work-sans-v13-latin-300.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/fonts/work-sans-v13-latin-regular.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/fonts/work-sans-v13-latin-500.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/fonts/work-sans-v13-latin-700.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/fonts/work-sans-v13-latin-600.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/fonts/work-sans-v13-latin-800.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/fonts/work-sans-v13-latin-900.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <meta property="og:title" content="Welcome to Polkadex Orderbook" key="title" />
          <meta
            property="og:description"
            content="A fully decentralized, peer-peer, orderbook based cryptocurrency exchange for the Defi ecosystem in Substrate."
          />
          <meta property="og:url" content="https://www.polkadex.trade" />
          <meta property="og:image" content="https://polkadex.trade/twitterCardImage.jpg" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="https://polkadex.trade/twitterCardImage.jpg" />
          <meta name="twitter:site" content="@polkadex" />
          <meta name="twitter:creator" content="@polkadex" />
        </Head>
        <body>
          <Main />
          <div id="modal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
