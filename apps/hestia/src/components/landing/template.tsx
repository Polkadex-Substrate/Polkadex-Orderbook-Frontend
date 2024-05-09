"use client";
import { Fragment } from "react";

import { ConnectTradingInteraction } from "../ui/ConnectWalletInteraction/connectTradingInteraction";

import { Hero } from "./hero";
import { HowItWorks } from "./HowItWorks";
import { Features } from "./features";
import { QuickLinks } from "./quickLinks";
import { Footer } from "./footer";

import { Header } from "@/components/ui";

export function Template() {
  return (
    <Fragment>
      <ConnectTradingInteraction />
      <div className="flex flex-col flex-1">
        <Header />
        <main>
          <Hero />
          <HowItWorks />
          <Features />
          <QuickLinks />
        </main>
        <Footer />
      </div>
    </Fragment>
  );
}
