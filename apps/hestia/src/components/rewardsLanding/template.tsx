"use client";

import { useResizeObserver } from "usehooks-ts";
import { useRef } from "react";

import { Info } from "./info";
import { HowItWorks } from "./howItWorks";
import { Faq } from "./faq";
import { CallToAction } from "./callToAction";

import { Footer, Header } from "@/components/ui";

export function Template() {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const { height: footerHeight = 0 } = useResizeObserver({
    ref: footerRef,
    box: "border-box",
  });

  return (
    <div
      className="flex flex-1 flex-col bg-backgroundBase h-full"
      vaul-drawer-wrapper=""
    >
      <Header ref={headerRef} />
      <main
        className="flex flex-1 overflow-auto w-full max-w-[1920px] m-auto"
        style={{
          paddingBottom: `${footerHeight}px`,
        }}
      >
        <div className="flex flex-col max-w-[1200px] mx-auto">
          <Info />
          <HowItWorks />
          <Faq />
          <CallToAction />
        </div>
      </main>

      <Footer marketsActive ref={footerRef} />
    </div>
  );
}
