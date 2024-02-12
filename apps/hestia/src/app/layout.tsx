import "@/styles/globals.scss";
import "@polkadex/ux/dist/index.css";
import { GeistSans } from "geist/font/sans";
import { ReactNode } from "react";
import classNames from "classnames";

import { DynamicProviders } from "@/components/ui/DynamicProviders";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={classNames(
          "flex flex-col max-h-screen min-h-screen mx-auto border-x border-primary overflow-x-hidden",
          GeistSans.className
        )}
      >
        <DynamicProviders>{children}</DynamicProviders>
      </body>
    </html>
  );
}
