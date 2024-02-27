import "@/styles/globals.scss";
import "@polkadex/ux/dist/index.css";
import { ReactNode } from "react";
import classNames from "classnames";
import { Roboto } from "next/font/google";

import { DynamicProviders } from "@/components/ui/DynamicProviders";
const font = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.5,user-scalable=no"
        />
      </head>
      <body
        className={classNames(
          "flex flex-col max-h-screen min-h-screen mx-auto overflow-x-hidden",
          font.className
        )}
      >
        <DynamicProviders>{children}</DynamicProviders>
      </body>
    </html>
  );
}
