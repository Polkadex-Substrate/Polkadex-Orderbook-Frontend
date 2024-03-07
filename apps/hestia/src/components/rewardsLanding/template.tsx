"use client";

import { useResizeObserver } from "usehooks-ts";
import { useMemo, useRef } from "react";
import { useWindowSize } from "react-use";

import { Info } from "./info";
import { HowItWorks } from "./howItWorks";
import { Faq } from "./faq";
import { CallToAction } from "./callToAction";

import { Footer, Header } from "@/components/ui";

export function Template() {
  const { width } = useWindowSize();

  const footerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const { height: footerHeight = 0 } = useResizeObserver({
    ref: footerRef,
    box: "border-box",
  });
  const mobileView = useMemo(() => width <= 750, [width]);

  return (
    <div
      className="flex flex-1 flex-col bg-backgroundBase h-full"
      vaul-drawer-wrapper=""
    >
      <Header ref={headerRef} />
      <main
        className="flex flex-col flex-1 overflow-auto w-full max-w-[1100px] m-auto"
        style={{
          paddingBottom: `${footerHeight}px`,
        }}
      >
        <Info />
        <HowItWorks />
        <Faq />
        <CallToAction />
      </main>
      {!mobileView && <Footer marketsActive ref={footerRef} />}
    </div>
  );
}
